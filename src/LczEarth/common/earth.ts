import { isEqual } from 'lodash'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { randomChar } from '../../common/util/index'
import { removeMaterial } from '../../Lcz3dAreaMap/common'
import { LczEarthProps } from '../type'
import EarthEvent from './EarthEvent'

type Props = {
  w: number
  h: number
  el: HTMLDivElement
  design: boolean
  baseConfig: {
    cameraConfig?: LczEarthProps['cameraConfig']
    rotateConfig?: LczEarthProps['rotateConfig']
    controllerConfig?: LczEarthProps['controllerConfig']
  }
  onLoad?(): void
}

type Materials = {
  baseEarthMaterial?: THREE.MeshPhysicalMaterial
}

export default class Earth {
  el: HTMLDivElement
  isDestroy = false
  uuid = randomChar('lcz-earth-')
  mapDataCache = new Map<string, any | 'loading'>()
  options: Props
  __event?: EarthEvent
  events: { [key: string]: { [key: string]: () => void } } // 地球上的所有事件
  renderer?: THREE.WebGLRenderer //渲染器
  scene?: THREE.Scene // 场景
  camera?: THREE.PerspectiveCamera // 相机
  controller?: OrbitControls // 控制器
  textureLoad = new THREE.TextureLoader() // 资源加载器
  earthGroup = new THREE.Group() // 地球容器
  lightGroup = new THREE.Group() // 灯光容器
  materials: Materials = {}
  animateId?: number
  tweenObjects: { [key: string]: TWEEN.Tween<any> } = {}
  childCompUpdataFn: { [key in string]: { fn(step: number): void; target: any } } = {}

  constructor(options: Props) {
    this.el = options.el
    this.options = options
    this.events = { dblclick: {}, mousemove: {}, click: {} }
    this.initScene()
  }

  updataBase(w: number, h: number, baseConfig: Props['baseConfig']) {
    const { w: prew, h: preh, baseConfig: preBase } = this.options
    if (w !== prew || h !== preh) {
      //resize
      setTimeout(() => {
        this.camera && ((this.camera.aspect = w / h), this.camera.updateProjectionMatrix())
        this.renderer && this.renderer.setSize(w, h)
      })
    }

    if (!isEqual(baseConfig.cameraConfig, preBase.cameraConfig)) {
      setTimeout(() => this.initcamera())
    }

    if (!isEqual(baseConfig.controllerConfig, preBase.controllerConfig)) {
      setTimeout(() => this.initController())
    }

    this.options = { ...this.options, w, h, baseConfig }
  }

  initScene() {
    const { design, w, h, el } = this.options

    // 初始化渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
      preserveDrawingBuffer: design
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(w, h)
    el.appendChild(this.renderer.domElement)
    this.renderer.setClearColor(0x000000, 0)
    // 初始化场景
    this.scene = new THREE.Scene()
    // 初始化相机
    this.initcamera(true)
    // 添加控制器
    this.initController()
    // 初始化开场动画
    this.createWorldofwar()
    // 执行渲染动画
    this.animate()

    this.scene && this.scene.add(this.earthGroup)
    this.scene && this.scene.add(this.lightGroup)
    // 初始化事件对象
    this.initEvent()
  }

  animate() {
    this.animateId = requestAnimationFrame(step => {
      const { camera, controller, renderer, scene } = this
      if (camera && controller && renderer && scene) {
        controller.update()
        renderer.clear()
        renderer.render(scene, camera)
        this.processRotate()
        this.updateTweens()
        // 更新渲染子组件
        for (const key in this.childCompUpdataFn) {
          const { fn, target } = this.childCompUpdataFn[key] || {}
          if (target) fn.call(target, step)
        }

        this.animate()
      }
    })
  }

  createWorldofwar() {
    if (!this.camera) return
    const { position, distance = 0 } = this.options.baseConfig.cameraConfig || {},
      endPos = this.lglt2xyz(position?.lng || '', position?.lat || '', distance * 30 + 100)
    this.tweenObjects['worldofwar'] = new TWEEN.Tween(this.camera.position.clone())
      .to(endPos, 3000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onStart(() => {
        this.controller && ((this.controller.enableRotate = false), (this.controller.enableZoom = false))
      })
      .onUpdate(vector => {
        this.camera && this.camera.position.set(vector.x, vector.y, vector.z)
      })
      .onComplete(() => {
        this.initController()
        this.options.onLoad && this.options.onLoad()
      })
  }

  processRotate() {
    if (!this.scene) return
    const { earth = 0, scene = 0 } = this.options.baseConfig.rotateConfig || {}
    earth && this.earthGroup.rotateY(earth * 0.0005)
    scene && this.scene.rotateY(scene * 0.0005)
  }

  initcamera(init = false) {
    if (!this.scene) return
    const { w, h, baseConfig } = this.options,
      { position, distance = 0 } = baseConfig.cameraConfig || {},
      { lng = 116.3, lat = 39.9 } = position || {},
      comPos = this.lglt2xyz(lng, lat, distance * 30 + 100),
      camera = this.camera || new THREE.PerspectiveCamera()

    camera.position.set(comPos.x, comPos.y, comPos.z)
    camera.lookAt(this.scene.position)
    camera.updateProjectionMatrix()
    this.camera = camera
    this.camera.aspect = w / h
    this.camera.fov = 45
    this.camera.near = 0.0001
    this.camera.far = 100000
    this.camera.position.x = comPos.x
    this.camera.position.y = comPos.y
    this.camera.position.z = (function () {
      if (!init) return comPos.z
      const char = comPos.z < 0 ? -1 : 1
      return comPos.z + 500 * char
    })()
    this.camera.updateProjectionMatrix()
  }

  initController() {
    if (!this.camera || !this.renderer) return false
    const { enableRotate = true, enableZoom = true } = this.options.baseConfig.controllerConfig || {}
    const controller = this.controller || new OrbitControls(this.camera, this.renderer.domElement)
    controller.enableRotate = enableRotate
    controller.enableZoom = enableZoom
    controller.enablePan = false
    controller.enableDamping = true
    controller.dampingFactor = 0.05
    controller.screenSpacePanning = false
    controller.minDistance = 100
    controller.maxPolarAngle = Math.PI
    controller.zoomSpeed = 3
    this.controller = controller
  }

  initLight() {
    if (!this.scene) return
    const id = `${this.uuid}_light-group`
    // 环境光
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.6)
    const lightGroup = this.scene.getObjectByName(id) || new THREE.Group()
    lightGroup.clear()
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1000, 1000, 1000).normalize()
    lightGroup.add(ambientLight)
    lightGroup.add(directionalLight)
    lightGroup.name = id
    this.scene.add(lightGroup)
  }

  getMapData(url: string) {
    return new Promise(resolve => {
      const data = this.mapDataCache.get(url)

      const runningGetData = () => {
        const cData = this.mapDataCache.get(url)
        if (!cData) return
        if (cData === 'loading') {
          requestIdleCallback(runningGetData)
        } else {
          resolve(cData)
        }
      }

      if (data) {
        return data === 'loading' ? runningGetData() : resolve(data)
      } else {
        this.mapDataCache.set(url, 'loading')
        fetch(url)
          .then(request => request.json())
          .then(res => {
            this.mapDataCache.set(url, res)
            resolve(res)
          })
          .catch(() => {
            this.mapDataCache.delete(url)
            resolve(null)
          })
      }
    })
  }

  updateTweens() {
    for (const key in this.tweenObjects) {
      const tween = this.tweenObjects[key]
      if (tween.isPlaying()) {
        tween.update()
      } else {
        TWEEN.remove(tween)
        delete this.tweenObjects[key]
      }
    }
  }

  // 初始化事件对象
  initEvent() {
    this.__event && this.__event.dispose()
    this.__event = new EarthEvent(this)
  }

  lglt2xyz(lng: number | string, lat: number | string, _radius = 100) {
    lng = +lng
    lat = +lat
    return new THREE.Vector3(
      Math.cos((lng / 180) * Math.PI) * Math.cos((lat / 180) * Math.PI) * _radius,
      Math.sin((lat / 180) * Math.PI) * _radius,
      -Math.sin((lng / 180) * Math.PI) * Math.cos((lat / 180) * Math.PI) * _radius
    )
  }

  destroy() {
    this.animateId && cancelAnimationFrame(this.animateId)
    removeMaterial(this.materials)

    this.scene?.traverse((child: any = {}) => {
      child?.clear()
    })
    this.scene?.remove()

    // 控制器 渲染器清除
    this.camera?.clear()
    this.camera?.remove()
    this.controller?.dispose()

    if (this.renderer) {
      this.renderer.forceContextLoss()
      this.renderer.dispose()
      this.renderer.domElement.remove()
    }

    this.isDestroy = true

    this.mapDataCache.clear()

    this.__event?.dispose()

    // @ts-ignore
    this.options = this.renderer = this.scene = this.camera = this.controller = this.textureLoad = null
    // @ts-ignore
    this.earthGroup = this.materials = this.mapDataCache = this.__event = this.events = null
  }
}
