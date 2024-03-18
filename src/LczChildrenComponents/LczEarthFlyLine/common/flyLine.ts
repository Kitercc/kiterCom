import { isEqual } from 'lodash'
import * as THREE from 'three'
import { formatColor } from '../../../Lcz3dAreaMap/common'
import Earth from '../../../LczEarth/common/earth'
import { FlyLineData, OutFlyLine } from '../../../LczEarth/type/child'

type Options = {
  earth: Earth
  flyLine: OutFlyLine
}

export default class FlyLine {
  earth: Earth
  flyLine: OutFlyLine
  lastFlyLine: OutFlyLine
  flyLineGroup = new THREE.Group()
  flyLines: { [key in string]: THREE.Mesh } = {}
  constructor(options: Options) {
    this.earth = options.earth
    this.flyLine = options.flyLine
    this.lastFlyLine = options.flyLine
    this.earth.earthGroup.add(this.flyLineGroup)
    this.flyLineGroup.renderOrder = 2
    this.initFlyLine()
  }

  updataFlyLine(flyLine: OutFlyLine) {
    this.flyLine = flyLine
    const { data = [], ...otherConfig } = flyLine,
      { data: lastData = [], ...otherLastConfig } = this.lastFlyLine

    if (!isEqual(otherConfig, otherLastConfig)) {
      // 配置改变全量更新
      this.destroyLines()
      this.initFlyLine()
    } else if (!isEqual(data, lastData)) {
      this.updataFlyLineData()
    }

    this.lastFlyLine = flyLine
  }

  updataFlyLineData() {
    const showData = this.currentData,
      names = showData.map(v => this.getName(v)),
      skipName: string[] = [], // 不需要更新的线
      newLineData: FlyLineData[] = []
    for (const name in this.flyLines) {
      const curExist = names.includes(name)
      if (curExist) skipName.push(name)
    }

    this.destroyLines(skipName)

    // 收集新增的数据
    names.forEach((name, i) => !this.flyLines[name] && newLineData.push(showData[i]))

    this.initFlyLine(newLineData)
  }

  initFlyLine(data?: FlyLineData[]) {
    const showData = data || this.currentData

    this.drawFlyLine(showData)

    this.startUpdateAniamte()
  }

  async drawFlyLine(data: FlyLineData[]) {
    const { lineConfig, flyConfig, landingEffect } = this.flyLine,
      { width = 1 } = lineConfig || {},
      { smooth = 50 } = flyConfig || {}

    for (let i = 0; i < data.length; i++) {
      const { fromlng, fromlat, tolng, tolat } = data[i],
        formPos = this.earth.lglt2xyz(fromlng, fromlat),
        toPos = this.earth.lglt2xyz(tolng, tolat),
        curve = this.getCurve(formPos, toPos),
        { lineMaterial, landMaterial, headIconMaterial } = await this.getMaterial()

      // 绘制流动线
      const tubeGeometry = new THREE.TubeGeometry(curve, smooth, width / 8, 3, false),
        flyLineMesh = new THREE.Mesh(tubeGeometry, lineMaterial),
        name = this.getName(data[i])
      this.flyLines[name] = flyLineMesh
      this.flyLineGroup.add(flyLineMesh)
      flyLineMesh.name = name

      // 落地效果
      if (landMaterial) {
        const radius = (landingEffect?.radius || 1) / 2,
          landGeometry = new THREE.PlaneGeometry(radius, radius, 1, 1),
          landMesh = new THREE.Mesh(landGeometry, landMaterial)
        landMesh.position.copy(toPos)
        landMesh.lookAt(0, 0, 0)
        flyLineMesh.userData.circlePlane = landMesh
        this.flyLineGroup.add(landMesh)
      }

      if (headIconMaterial) {
        const headIcon = this.initFlyHeadIcon(formPos, toPos, headIconMaterial)
        flyLineMesh.userData.curve = curve
        flyLineMesh.userData.headIcon = headIcon
        this.flyLineGroup.add(headIcon)
      }
    }
  }

  initFlyHeadIcon(form: THREE.Vector3, to: THREE.Vector3, material: THREE.MeshBasicMaterial) {
    form = form.clone()
    to = to.clone()

    const { width = 10, height = 10 } = this.flyLine.headIcon || {},
      geometry = new THREE.PlaneGeometry(width / 2, height / 2),
      mesh = new THREE.Mesh(geometry, material),
      object3d = new THREE.Object3D()
    mesh.rotation.y = Math.PI
    mesh.rotation.x = Math.PI / 2
    object3d.add(mesh)
    object3d.userData.icon = mesh
    object3d.up = form.add(to).divideScalar(2).normalize()
    return object3d
  }

  startUpdateAniamte() {
    const speed = this.flyLine.flyConfig?.speed || 0
    delete this.earth.childCompUpdataFn[this.flyLine.id]
    if (speed) {
      this.earth.childCompUpdataFn[this.flyLine.id] = {
        fn(this: FlyLine) {
          for (const name in this.flyLines) {
            const line = this.flyLines[name]
            // 线条流动
            const material = line.material as THREE.ShaderMaterial,
              offset = material.uniforms.offset.value,
              lineLength = material.uniforms.lineLength.value,
              time = material.uniforms.time.value + speed
            material.uniforms.time.value = time

            const { headIcon, curve, circlePlane } = line.userData as {
              headIcon: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
              curve: THREE.CubicBezierCurve3
              circlePlane: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
            }

            let progress = 5e-4 * time + offset
            progress = (progress - Math.floor(progress)) * (1 + lineLength)
            // 落地点动画
            if (circlePlane) {
              progress > 1 &&
                progress < 1 + lineLength &&
                (circlePlane.material.uniforms.time.value = (progress - 1) / lineLength)
            }

            // 头部图标
            if (headIcon && curve) {
              const icon = headIcon.userData.icon,
                pos = curve.getPointAt(progress, new THREE.Vector3()) as THREE.Vector3,
                headFacePos = curve.getPointAt(progress + 0.02, new THREE.Vector3())
              headIcon.position.copy(pos)
              icon.material.opacity = progress > 0.8 ? (1 - progress) / 0.2 : progress < 0.2 ? progress / 0.2 : 1
              headIcon.lookAt(headFacePos.applyMatrix4(this.flyLineGroup.matrixWorld))
            }
          }
        },
        target: this
      }
    }
  }

  async getMaterial() {
    const { lineConfig, flyConfig, landingEffect, headIcon } = this.flyLine,
      { baseLine, flyLine } = lineConfig || {},
      { random } = flyConfig || {},
      { display = false, color } = landingEffect || {},
      baseLineColor = formatColor(baseLine?.color),
      flyLineStartColor = formatColor(flyLine?.color?.start),
      flyLineEndColor = formatColor(flyLine?.color?.end),
      landingColor = formatColor(color)

    const lineMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          // @ts-ignore
          type: 'f',
          value: 0
        },
        offset: {
          // @ts-ignore
          type: 'f',
          value: random ? Math.random() * Math.random() * 10 : 0
        },
        lineShow: {
          value: baseLine?.display || false
        },
        lineColor: {
          value: baseLineColor.color
        },
        lineOpacity: {
          value: baseLineColor.opacity
        },
        startColor: {
          value: flyLineStartColor.color
        },
        startOpacity: {
          value: flyLineStartColor.opacity
        },
        endColor: {
          value: flyLineEndColor.color
        },
        endOpacity: {
          value: flyLineEndColor.opacity
        },
        lineLength: {
          value: (flyLine?.length || 10) / 100
        }
      },
      vertexShader: `
        #include <common>
        #include <logdepthbuf_pars_vertex>
        varying vec2 vUv;
        void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        #include <logdepthbuf_vertex>
      }`,
      fragmentShader: `
        #include <logdepthbuf_pars_fragment>
        varying vec2 vUv;
        uniform float time;
        uniform float offset;
        uniform bool lineShow;
        uniform vec3 lineColor;
        uniform float lineOpacity;
        uniform vec3 startColor;
        uniform float startOpacity;
        uniform vec3 endColor;
        uniform float endOpacity;
        uniform float lineLength;
        void main(){
        #include <logdepthbuf_fragment>
        float start = time * 0.0005 + offset;
        start = fract(start) * (1.0 + lineLength) - lineLength;
        float end = start + lineLength;
        float offset = end - vUv.x;
        if(offset < 0.0 || offset > lineLength) {
          if(lineShow) {
          gl_FragColor = vec4(lineColor, lineOpacity);
          } else {
          discard;
          }
        } else {
          float intensity = 1.0;
          intensity = 1.0 - abs(offset / lineLength);
          gl_FragColor = vec4(vec3(mix(endColor, startColor, intensity)), mix(endOpacity, startOpacity, intensity));
        }
      }`,
      transparent: true,
      side: THREE.DoubleSide
    })

    const landMaterial =
      display &&
      new THREE.ShaderMaterial({
        uniforms: {
          time: {
            // @ts-ignore
            type: 'f',
            value: 0
          },
          color: {
            value: landingColor.color
          },
          opacity: {
            value: landingColor.opacity
          }
        },
        vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float time;
          uniform float opacity;
          uniform vec3 color;
          void main(){
            float w = 0.4;
            float r = distance(vec2(0.5), vUv);
            float calR = 0.5*time;
            if(r > calR-0.2 && r < calR) {
                if(r > 0.5 - 0.2) {
                  discard;
                }else {
                  float a = (r - (calR-0.2))/0.2;
                  gl_FragColor = vec4(color, a * opacity);
                }
            }else {
              discard;
            }
          }
        `,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        depthTest: false
      })

    let headIconMaterial
    if (headIcon?.display) {
      const { imgUrl = '' } = headIcon
      const texture = imgUrl && (await this.earth.textureLoad.load(imgUrl))
      headIconMaterial = new THREE.MeshBasicMaterial({
        map: texture || undefined,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false
      })
    }

    return { lineMaterial, landMaterial, headIconMaterial }
  }
  // 卸载当前的线条
  destroyLines(skipName: string[] = []) {
    for (const name in this.flyLines) {
      if (skipName.includes(name)) continue
      const line = this.flyLines[name]

      if (line) {
        const { headIcon, circlePlane } = line.userData
        // @ts-ignore
        line.geometry && (line.geometry.dispose(), (line.geometry = null))
        // @ts-ignore
        line.material && (line.material.dispose(), (line.material = null))
        this.flyLineGroup.remove(line)
        if (headIcon) {
          const icon = headIcon.userData.icon
          // @ts-ignore
          icon.geometry && (icon.geometry.dispose(), (icon.geometry = null))
          // @ts-ignore
          icon.material && (icon.material.dispose(), (icon.material = null))
          this.flyLineGroup.remove(headIcon)
        }

        if (circlePlane) {
          // @ts-ignore
          circlePlane.geometry && (circlePlane.geometry.dispose(), (circlePlane.geometry = null))
          // @ts-ignore
          circlePlane.material && (circlePlane.material.dispose(), (circlePlane.material = null))
          this.flyLineGroup.remove(circlePlane)
        }
      }

      delete this.flyLines[name]
    }
  }

  // 获取贝塞尔曲线
  getCurve(form: THREE.Vector3, to: THREE.Vector3) {
    // 夹角
    let angle = (form.angleTo(to) * 12) / Math.PI / 0.1 //0~Math.PI
    angle = angle < 5 ? 5 : angle
    const aLen = angle,
      hLen = angle * angle * 6,
      p0 = new THREE.Vector3(0, 0, 0), //用于求两点形成的向量的法向量
      //法线向量：THREE.Ray(v1,v2) 向量v1v2缩成方向的法向量
      //圆点与向量form,to的终点形成的垂直于向量form,to的向量
      rayLine = new THREE.Ray(p0, this.getVCenter(form.clone(), to.clone())),
      //顶点坐标
      vtop = rayLine.at(hLen / rayLine.at(1, new THREE.Vector3(0, 0, 0)).distanceTo(p0), new THREE.Vector3(0, 0, 0)),
      //控制点坐标
      v1 = this.getLenVcetor(form.clone(), vtop, aLen),
      v2 = this.getLenVcetor(to.clone(), vtop, aLen),
      //绘制贝塞尔曲线
      curve = new THREE.CubicBezierCurve3(form, v1, v2, to)

    return curve
  }

  get currentData() {
    const data = this.flyLine.data || []
    return data.filter(({ fromlat, fromlng, tolat, tolng }) => `${fromlat}${fromlng}` !== `${tolat}${tolng}`)
  }

  // 计算v1,v2 的中点
  getVCenter(v1: THREE.Vector3, v2: THREE.Vector3) {
    const v = v1.add(v2)
    return v.divideScalar(2)
  }

  // 计算V1，V2向量固定长度的点
  getLenVcetor(v1, v2, len) {
    const v1v2Len = v1.distanceTo(v2)
    return v1.lerp(v2, len / v1v2Len)
  }

  getName(cData: FlyLineData) {
    const id = this.flyLine.id
    return `${id}-${cData.fromlng}-${cData.fromlat}-${cData.tolng}-${cData.tolat}`
  }

  destroy() {
    this.destroyLines()
    if (!this.earth.isDestroy) {
      delete this.earth.childCompUpdataFn[this.flyLine.id]
      this.earth.earthGroup.remove(this.flyLineGroup)
    }

    // @ts-ignore
    this.earth = this.flyLine = this.lastFlyLine = this.flyLineGroup = this.flyLines = null
  }
}
