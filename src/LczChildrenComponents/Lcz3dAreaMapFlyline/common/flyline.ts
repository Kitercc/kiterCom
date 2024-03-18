import { cloneDeep, isEqual } from 'lodash'
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { formatColor } from '../../../Lcz3dAreaMap/common'
import CreateThreeMap from '../../../Lcz3dAreaMap/common/createThreeMap'
import { FlightConfig, LineConfig, OutFlyLine } from '../../../Lcz3dAreaMap/type/child'

interface FlyLineProps {
  flyline: OutFlyLine
  stretchHeight: number
  threeMap: CreateThreeMap
  level: number
}

export default class Flyline {
  flyline: OutFlyLine
  lastFlyline?: OutFlyLine
  mapInstance: CreateThreeMap
  level: number
  firstLoad = true
  materialObj: { [key: string]: any } = {}
  flyLineGrop = new THREE.Group()
  baselineObject = new THREE.Object3D()
  flowlineObject = new THREE.Object3D()
  show = true
  constructor(option: FlyLineProps) {
    this.flyline = option.flyline
    this.mapInstance = option.threeMap
    this.level = option.level

    this.flyLineGrop.add(this.baselineObject)
    this.flyLineGrop.add(this.flowlineObject)

    this.mapInstance.mapGroud.add(this.flyLineGrop)

    this.initLevel()
  }

  initLevel() {
    const levels = this.flyline.globalConfig?.levels || '',
      levelArr = levels.split(',').map(v => (v === '' ? null : Number(v))),
      speed = this.flyline.flightConfig?.speed || 0

    this.flyLineGrop.visible = true
    if (levels === '' || levelArr.includes(this.level)) {
      if (speed > 0) {
        this.mapInstance.childComponentUpdataFn[this.flyline.id] = {
          target: this,
          fn: () => {
            for (let i = 0; i < this.flowlineObject.children.length; i++) {
              const flowLine = this.flowlineObject.children[i] as THREE.Mesh
              // @ts-ignore
              flowLine.material.uniforms.time.value += speed
            }
          }
        }
      }
      this.mapInstance.animate()
      this.show = true
    } else {
      delete this.mapInstance.childComponentUpdataFn[this.flyline.id]
      this.flyLineGrop.visible = false
      this.show = false
      this.mapInstance.cssRenderer()
    }
  }

  updataView(flyline: OutFlyLine, stretchHeight: number, threeMap: CreateThreeMap, level: number) {
    if (!this.firstLoad) {
      this.flyline = flyline
      this.mapInstance = threeMap
      this.level = level
    }
    this.firstLoad = false

    if (!this.lastFlyline || !isEqual(flyline.lineConfig, this.lastFlyline.lineConfig)) {
      this.getMaterial()
    }

    this.initLevel()

    if (this.show) this.drawFlyLine()

    const { x: scaleX, y: scaleY } = this.mapInstance.scale
    const { x: offsetX, y: offsetY } = this.mapInstance.offset
    this.flyLineGrop.position.set(offsetX * scaleX, offsetY * scaleY, stretchHeight)

    this.lastFlyline = cloneDeep(this.flyline)
  }

  drawFlyLine() {
    const { x: scaleX, y: scaleY } = this.mapInstance.scale,
      { data = [], flightConfig = {} as FlightConfig, lineConfig } = this.flyline,
      flyLineChild = this.flowlineObject.children,
      { height = 1, smooth = 1, randomStart = false } = flightConfig

    if (!lineConfig?.baseLine?.display) {
      this.removeLine('base')
    }

    for (let index = 0; index < flyLineChild.length; index++) {
      const line = flyLineChild[index],
        name = line.name,
        dataitem = data.find(item => this.getName(item) == name)

      if (!dataitem) {
        line && this.flowlineObject.remove(line)
        const baseLine = this.baselineObject.getObjectByName(name)
        baseLine && this.baselineObject.remove(baseLine)
        index--
      }
    }

    for (let i = 0; i < data.length; i++) {
      const { fromLat, fromLng, toLat, toLng } = data[i],
        _fromlat = +fromLat * scaleY,
        _fromlng = +fromLng * scaleX,
        _tolat = +toLat * scaleY,
        _tolng = +toLng * scaleX,
        name = this.getName(data[i])

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(_fromlng, _fromlat, 0),
        new THREE.Vector3((_fromlng + _tolng) / 2, (_fromlat + _tolat) / 2, height),
        new THREE.Vector3(_tolng, _tolat, 0)
      )

      // 绘制底线
      if (lineConfig?.baseLine?.display) {
        const points = curve.getPoints(smooth),
          positions = points.reduce((arr: any, item) => {
            return arr.concat(item.x, item.y, item.z)
          }, []),
          geometry = new LineGeometry(),
          findBaseline = this.baselineObject.getObjectByName(name) as Line2
        geometry.setPositions(positions)

        if (!findBaseline) {
          const baseline = new Line2(geometry, this.materialObj.baseline)
          baseline.name = name
          baseline.computeLineDistances()
          this.baselineObject.add(baseline)
        } else {
          findBaseline.geometry = geometry
          findBaseline.material = this.materialObj.baseline
          findBaseline.computeLineDistances()
        }
      }

      const findflowline = this.flowlineObject.getObjectByName(name) as THREE.Mesh

      if (!findflowline) {
        // 绘制流动的线
        const flowline = this.drawFlowLine(curve, flightConfig, randomStart) as THREE.Mesh
        flowline.name = name
        this.flowlineObject.add(flowline)
      } else {
        const tubeGeometry = this.drawFlowLine(curve, flightConfig, randomStart, 'update') as THREE.TubeGeometry
        findflowline.material = this.materialObj.flowMaterial.clone()
        //@ts-ignore
        randomStart && (findflowline.material.uniforms.offset.value = Math.random() * Math.random() * 10)
        findflowline.geometry = tubeGeometry
      }
    }
  }

  drawFlowLine(curve: THREE.QuadraticBezierCurve3, flightConfig: FlightConfig, randomStart: boolean, type = 'all') {
    const tubeGeometry = new THREE.TubeGeometry(
      curve,
      flightConfig.smooth || 1,
      (this.flyline.lineConfig?.flyline?.lineWidth || 0) / 16,
      8,
      false
    )
    if (type === 'all') {
      const material = this.materialObj.flowMaterial.clone()
      randomStart && (material.uniforms.offset.value = Math.random() * Math.random() * 10)
      return new THREE.Mesh(tubeGeometry, material)
    } else if (type === 'update') {
      return tubeGeometry
    }
  }

  getMaterial() {
    const { baseLine, flyline } = this.flyline.lineConfig || ({} as LineConfig),
      baselineColor = formatColor(String(baseLine?.baseColor || '#FCF064')),
      flylineStartcolor = formatColor(flyline?.flyColor?.start || '#FCF064'),
      flylineEndcolor = formatColor(flyline?.flyColor?.end || '#FFA343')

    const material = new LineMaterial({
      // @ts-ignore
      color: baselineColor.color,
      transparent: true,
      opacity: baselineColor.opacity,
      side: THREE.DoubleSide,
      linewidth: baseLine?.lineWidth || 0
    })
    material.resolution.set(this.mapInstance.width, this.mapInstance.height)

    const startRandom = this.flyline.flightConfig?.randomStart || false,
      yn = {
        vertexShader: `#include <common>
          #include <logdepthbuf_pars_vertex>
          varying vec2 vUv;
          void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          #include <logdepthbuf_vertex>
        }`,
        fragmentShader: `#include <logdepthbuf_pars_fragment>
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
          }`
      }

    const flowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          // @ts-ignore
          type: 'f',
          value: 0
        },
        offset: {
          // @ts-ignore
          type: 'f',
          value: startRandom ? Math.random() * Math.random() * 10 : 0
        },
        lineShow: {
          value: false
        },
        lineColor: {
          value: new THREE.Color('#ffffff')
        },
        lineOpacity: {
          value: 1
        },
        startColor: {
          value: flylineStartcolor.color
        },
        startOpacity: {
          value: flylineStartcolor.opacity
        },
        endColor: {
          value: flylineEndcolor.color
        },
        endOpacity: {
          value: flylineEndcolor.opacity
        },
        lineLength: {
          value: (flyline?.lineLen || 0) / 100
        }
      },
      vertexShader: yn.vertexShader,
      fragmentShader: yn.fragmentShader,
      transparent: true
    })

    this.materialObj = {
      baseline: material,
      flowMaterial
    }
  }

  getName(data) {
    return `line-${data.fromLat}_${data.fromLng}_${data.toLat}_${data.toLng}`
  }

  removeLine(type: 'all' | 'base' | 'fly' = 'all') {
    switch (type) {
      case 'all':
        this.baselineObject.remove(...this.baselineObject.children)
        this.baselineObject.clear()
        this.flowlineObject.remove(...this.flowlineObject.children)
        this.flowlineObject.clear()
        break
      case 'base': {
        this.baselineObject.remove(...this.baselineObject.children)
        this.baselineObject.clear()
        break
      }
      case 'fly': {
        this.flowlineObject.remove(...this.flowlineObject.children)
        this.flowlineObject.clear()
        break
      }
      default:
        break
    }
  }

  destroy() {
    for (const key in this.materialObj) {
      if (Object.prototype.hasOwnProperty.call(this.materialObj, key)) {
        const material = this.materialObj[key] as THREE.ShaderMaterial
        material.dispose()
      }
    }

    delete this.mapInstance.childComponentUpdataFn[this.flyline.id]

    this.removeLine()

    this.flyLineGrop.remove(...this.flyLineGrop.children)
    this.flyLineGrop.clear()

    this.mapInstance.mapGroud && this.mapInstance.mapGroud.remove(this.flyLineGrop)

    !this.mapInstance.isDestroy && this.mapInstance.cssRenderer()

    //@ts-ignore
    this.flyline = this.lastFlyline = this.mapInstance = null

    //@ts-ignore
    this.materialObj = this.flyLineGrop = this.baselineObject = this.flowlineObject = null
  }
}
