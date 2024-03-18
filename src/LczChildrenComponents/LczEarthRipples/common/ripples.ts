import { isEqual } from 'lodash'
import * as THREE from 'three'
import Earth from '../../../LczEarth/common/earth'
import { OutRipples, RipplesData } from '../../../LczEarth/type/child'

type Options = {
  ripples: OutRipples
  earth: Earth
}

export default class Ripples {
  earth: Earth
  ripples: OutRipples
  lastRipples: OutRipples
  ripplesGroup = new THREE.Group()
  material?: THREE.MeshBasicMaterial
  geometry?: THREE.PlaneGeometry
  ripplesMap: { [key: string]: THREE.Mesh } = {}
  constructor(options: Options) {
    this.earth = options.earth
    this.ripples = options.ripples
    this.lastRipples = options.ripples

    this.earth.earthGroup.add(this.ripplesGroup)
    this.ripplesGroup.renderOrder = 1

    this.initMaterial()
    this.initRipples()
  }

  updata(ripples: OutRipples) {
    this.ripples = ripples
    const { data, ...otherConfig } = ripples,
      { data: lastData, ...lastOtherConfig } = this.lastRipples

    if (!isEqual(otherConfig, lastOtherConfig)) {
      this.destoryGeometryMaterial()
      this.destroyRipples()
      this.initMaterial()
      this.initRipples()
    } else if (!isEqual(data, lastData)) {
      this.updataRippleData()
    }

    this.lastRipples = ripples
  }

  updataRippleData() {
    const data = this.ripples.data || [],
      names: string[] = data.map(v => this.getName(v)),
      skipName: string[] = [], // 不需要更新
      newData: RipplesData[] = []

    for (const name in this.ripplesMap) {
      const curExist = names.includes(name)
      if (curExist) skipName.push(name)
    }
    this.destroyRipples(skipName)

    // 收集新增的数据
    names.forEach((name, i) => !this.ripplesMap[name] && newData.push(data[i]))

    this.initRipples(newData)
  }

  initRipples(data?: RipplesData[]) {
    data = data || this.ripples.data || []
    const { startRadiu = 0, endRadiu = 60 } = this.ripples.baseConfig || {},
      initScale = startRadiu / (endRadiu || 1)

    for (let i = 0; i < data.length; i++) {
      const cData = data[i],
        name = this.getName(cData)

      if (!this.ripplesMap[name] && this.geometry && this.material) {
        const mesh = new THREE.Mesh(this.geometry, this.material.clone()),
          pos = this.earth.lglt2xyz(cData.lng, cData.lat)
        mesh.position.set(pos.x, pos.y, pos.z)
        mesh.lookAt(0, 0, 0)
        mesh.scale.set(initScale, initScale, 1)
        mesh.userData.scale = initScale
        mesh.userData.initScale = initScale
        this.ripplesMap[name] = mesh
        this.ripplesGroup.add(mesh)
      }
    }

    this.startUpdateAniamte()
  }

  startUpdateAniamte() {
    const { speed = 0, interval = 1 } = this.ripples.baseConfig || {},
      _speed = speed / 20,
      _interval = interval * 1000
    delete this.earth.childCompUpdataFn[this.ripples.id]

    if (speed) {
      this.earth.childCompUpdataFn[this.ripples.id] = {
        fn(this: Ripples, step: number) {
          for (const name in this.ripplesMap) {
            const mesh = this.ripplesMap[name],
              material = mesh.material as THREE.MeshBasicMaterial,
              { scale, initScale, pause = false, currentStep = 0 } = mesh.userData

            if (_interval && pause && currentStep > 0) {
              if (step - currentStep >= _interval) {
                mesh.userData.pause = false
              } else continue
            }

            let _scale = scale + _speed
            _scale = _scale >= 1 ? initScale : _scale
            if (_scale <= 0.8) {
              material.opacity = (_scale * 5) / 4
            } else {
              material.opacity = (1 - _scale) * 5
            }

            if (interval && _scale + _speed >= 1 && !pause) {
              mesh.userData.pause = true
              mesh.userData.currentStep = step
              material.opacity = 0
            }
            mesh.userData.scale = _scale
            mesh.scale.set(_scale, _scale, 1)
          }
        },
        target: this
      }
    }
  }

  initMaterial() {
    const { endRadiu = 60, circleNum = 2 } = this.ripples.baseConfig || {},
      styleSeries = this.ripples.styleSeries || [],
      seriesLen = styleSeries.length,
      styles = (() => {
        if (circleNum <= seriesLen) {
          return styleSeries.slice(0, circleNum)
        } else {
          return new Array(circleNum).fill(null).map((_, i) => styleSeries[i % seriesLen])
        }
      })()

    if (!seriesLen) {
      return false
    }

    const canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
      totalRatio = styles.reduce((pre, cur) => pre + cur.ratio, 0)
    canvas.width = 80
    canvas.height = 80
    let len = 40

    styles.reverse().forEach(({ ratio, color }) => {
      ctx.beginPath()
      const clineW = (ratio / totalRatio) * 80
      ctx.arc(40, 40, len, 0, 2 * Math.PI)
      len -= clineW / 2
      ctx.fillStyle = color
      ctx.fill()
      ctx.closePath()
    })

    const canvasTexture = new THREE.CanvasTexture(canvas)
    this.material = new THREE.MeshBasicMaterial({
      map: canvasTexture,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      depthTest: false
    })
    canvasTexture.needsUpdate = true
    this.material.needsUpdate = true
    this.geometry = new THREE.PlaneGeometry(endRadiu / 2, endRadiu / 2)
  }

  destroyRipples(skipName: string[] = []) {
    for (const name in this.ripplesMap) {
      if (skipName.includes(name)) continue
      const mesh = this.ripplesMap[name]
      // @ts-ignore
      mesh.material.map.dispose(), mesh.material.dispose(), (mesh.material = null)
      this.ripplesGroup.remove(mesh)
      delete this.ripplesMap[name]
    }
  }

  destoryGeometryMaterial() {
    if (this.material) {
      this.material.dispose()
      // @ts-ignore
      this.material = null
    }
    if (this.geometry) {
      this.geometry.dispose()
      // @ts-ignore
      this.geometry = null
    }
  }

  getName(item: RipplesData) {
    return `${this.ripples.id}-${item.lng}-${item.lat}`
  }

  destroy() {
    this.destroyRipples()
    this.destoryGeometryMaterial()
    if (!this.earth.isDestroy) {
      delete this.earth.childCompUpdataFn[this.ripples.id]
      this.earth.earthGroup.remove(this.ripplesGroup)
    }

    // @ts-ignore
    this.earth = this.ripples = this.lastRipples = this.ripplesGroup = this.material = this.geometry = this.ripplesMap = null
  }
}
