import { message } from 'antd'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { randomChar } from '../../common/util'
import { AreaMapProps, ClickHover, MapPath } from '../type'
import { Events, __onMouseMove, __dbclick, __click, floatAreablockMove, floatAreablockClick } from './MapEvent'
import { MapRange } from '../../LczChina2dMap/type'
import {
  addLabel,
  createAreaMapMesh,
  formatColor,
  getOffsetAndSclae,
  getRIH,
  outLineShadow,
  removeComponents,
  removeMaterial,
  replaceLabel,
  resetFloatArea
} from '.'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { isEqual } from 'lodash'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { formatMapPosition } from '../../LczChina2dMap/common'

type OtherProps = {
  setMapPath: (paths: MapPath[]) => void
  setLoadStatus: (status: boolean) => void
  mapHandleEvents: (data: any, type: 'click' | 'doubleClick' | 'mouseenter' | 'mouseleave' | 'mouseout') => void
}
interface CreateThreeMapProps extends AreaMapProps {
  el: HTMLDivElement
  areaMapProps: AreaMapProps
  events?: { [key: string]: { [key: string]: () => void } }
  otherProp: OtherProps
}

type MaterialObj = {
  sideMaterial: THREE.MeshPhongMaterial
  frontMaterial: THREE.MeshPhongMaterial
  justAreaLineMaterial: THREE.LineBasicMaterial
  backAreaLineMaterial: THREE.LineBasicMaterial
  subSideMaterial?: THREE.MeshPhongMaterial
  subFrontMaterial?: THREE.MeshPhongMaterial
  subJustAreaLineMaterial?: THREE.LineBasicMaterial
  subBackAreaLineMaterial?: THREE.LineBasicMaterial
}

export default class CreateThreeMap {
  el: HTMLDivElement
  areaMapProps: AreaMapProps
  width = 0
  height = 0
  otherProp: OtherProps
  _base: string
  uuid: string = randomChar()
  mapData: any
  mapCache: Map<string, any>
  events?: { [key: string]: { [key: string]: () => void } }
  __event?: Events
  level = 1
  isLeaf = true
  RIH: MapPath[] = []
  materialObj?: MaterialObj
  controllerChangeFn = this.cssRenderer.bind(this, 'controller')
  // threejs
  renderer?: THREE.WebGLRenderer // 渲染器
  scene?: THREE.Scene // 场景
  camera?: THREE.PerspectiveCamera // 相机
  controller?: OrbitControls // 控制器
  composer?: EffectComposer // 用作地图边界发光
  mapObj = new THREE.Object3D() // 地图容器  内含有  区块 区线 区标签
  mapGroud: THREE.Group = new THREE.Group() // 整个大容器  内涵子组件
  stats?: Stats // 性能监控
  selectObj?: THREE.Object3D // 鼠标移入选中
  css2dRenderer?: CSS2DRenderer // css 2d 渲染器
  css3dRenderer?: CSS3DRenderer
  clock = new THREE.Clock()
  animateConfig = { FPS: 30, time: 0, first: true }
  labelArr: HTMLDivElement[] = [] // 地区标签数组 用作切换地图时销毁 标签组件
  animateId?: number
  offset = { x: 0, y: 0 }
  scale = { x: 1, y: 1 }
  childComponentUpdataFn: { [key: string]: { fn: () => void; target: any } } = {}
  preAdcode: number | string = ''
  hasChildCom = {} // 保存显示的子组件 防止底图渲染不同步的问题
  isRIHRunning = true
  appearanceAnimate?: TWEEN.Tween<THREE.Vector3>
  isDestroy = false
  // 点击悬浮区域块
  floatAreaAnimate?: TWEEN.Tween<any>
  floatChilds: THREE.Object3D[] = []
  floatCode = ''

  constructor(options: CreateThreeMapProps) {
    this.el = options.el
    this.areaMapProps = options.areaMapProps
    this.width = options.areaMapProps.w || 0
    this.height = options.areaMapProps.h || 0
    this.events = Object.assign(
      { dblclick: { __dbclick }, mousemove: { __onMouseMove }, click: { __click } },
      options.events
    )

    this._base = (process.env.NODE_ENV !== 'production' ? 'HappyServer' : '..') + '/lczCommon/charts/geoJson/'
    if (options.areaMapProps.design === undefined) this._base = 'https://easyv.assets.dtstack.com/components/area/'

    this.otherProp = options.otherProp

    this.mapCache = new Map()
    this.init()
  }

  async init() {
    this.initMaterial()

    await this.getMapInfo()

    await getRIH.call(this)

    // 渲染器
    this.renderer =
      this.renderer ||
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        logarithmicDepthBuffer: true,
        precision: 'highp',
        preserveDrawingBuffer: this.areaMapProps.design
      })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    if (this.areaMapProps.mapConfig?.baseConfig?.sortObjects === false) {
      this.renderer.sortObjects = false
    }
    this.el.appendChild(this.renderer.domElement)

    this.renderer.setClearColor(0x000000, 0)

    // 场景
    this.scene = new THREE.Scene()

    // 相机
    this.setCamera()

    // 添加控制器
    this.setController()

    //平行光
    const g = new THREE.DirectionalLight('#ffffff', 1)
    g.position.x = 60
    g.position.y = 60
    g.position.z = 100
    this.scene.add(g)
    const _ = new THREE.DirectionalLight('#ffffff', 0.4)
    _.position.x = -60
    _.position.y = 60
    _.position.z = 100
    _.rotateX(-Math.PI / 2)
    this.scene.add(_)
    const v = new THREE.AmbientLight('#ffffff', 0.3)
    this.scene.add(v)

    this.initCss2dRenderer()
    this.drawMap()

    if (this.areaMapProps.design === undefined) {
      this.initStats()
      this.buildAuxSystem()
    }

    // 初始化悬浮块容器对象
    if (this.areaMapProps.mapConfig?.baseConfig?.clickHover?.display) {
      const subHoverBlobk = new THREE.Object3D()
      subHoverBlobk.name = '区域悬浮块'
      this.mapGroud.add(subHoverBlobk)
      this.events && (this.events.mousemove['floatAreablockMove'] = floatAreablockMove)
      this.events && (this.events.click['floatAreablockClick'] = floatAreablockClick)
    }

    this.mapGroud.add(this.mapObj)

    this.scene.add(this.mapGroud)

    this.mapGroud.rotateX(-Math.PI / 2)

    const cameraPosition = this.areaMapProps.mapConfig?.baseConfig?.cameraPosition

    this.appearanceAnimate && this.appearanceAnimate.stop()

    this.appearanceAnimate = new TWEEN.Tween(new THREE.Vector3(0, 0, 1000))
      .to(new THREE.Vector3(cameraPosition?.x || 0, cameraPosition?.y || 0, cameraPosition?.z || 0), 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onUpdate(vector => {
        this.camera && this.camera.position.set(vector.x, vector.y, vector.z)
      })
      .onComplete(() => {
        this.otherProp.setLoadStatus(true)
        this.cssRenderer()
      })

    this.initEvent()
    this.animate()
  }

  async updataMap(options: AreaMapProps) {
    const { mapConfig = {}, w = 0, h = 0 } = options || {},
      preMapConfig = this.areaMapProps.mapConfig || {},
      { range, baseConfig, bgConfig, boundary, areaName, areaShadow, rihConfig } = mapConfig,
      {
        range: preRange,
        baseConfig: preBaseConfig,
        bgConfig: preBgConfig,
        boundary: preBoundary,
        areaName: preAreaName,
        areaShadow: preAreaShadow,
        rihConfig: preRihConfig
      } = preMapConfig
    this.width = w
    this.height = h
    this.RIH = []

    this.areaMapProps = options

    // 更新相机
    if (!isEqual(baseConfig?.cameraPosition, preBaseConfig?.cameraPosition)) {
      this.setCamera()
    }

    // 更新控制器
    if (!isEqual(baseConfig?.canZooms, preBaseConfig?.canZooms) || baseConfig?.canDrag != preBaseConfig?.canDrag) {
      this.setController()
    }

    // 更新阴影
    if (!isEqual(areaShadow, preAreaShadow)) {
      const areaBlockObj = this.mapObj?.getObjectByName('区块') as THREE.Object3D
      outLineShadow.call(this, [areaBlockObj])
    }

    // 更新地图
    if (!isEqual(range, preRange) || baseConfig?.stretchHeight != preBaseConfig?.stretchHeight) {
      this.initMaterial()
      if (range?.source === 'system' && !isEqual(range?.adcode, preRange?.adcode)) {
        this.RIH = []
      }
      await this.getMapInfo()
      this.drawMap(false)
    } else {
      this.mapData.features.forEach(elem => {
        const properties = elem.properties,
          adcode = properties.adcode || properties.code,
          centroidPosition = formatMapPosition(properties.centroid),
          centerPosition = formatMapPosition(properties.center),
          center = centroidPosition || centerPosition

        this.mapObj &&
          this.mapObj.children.forEach(item => {
            switch (item.name) {
              case '区块': {
                if (!isEqual(bgConfig, preBgConfig) || baseConfig?.stretchFill != preBaseConfig?.stretchFill) {
                  const areaBlockMesh = item.getObjectByName(adcode) as THREE.Mesh,
                    jcolors = formatColor(bgConfig?.colorObj?.color),
                    stretchColors = formatColor(baseConfig?.stretchFill)

                  if (areaBlockMesh) {
                    areaBlockMesh.material[0].color = jcolors.color
                    areaBlockMesh.material[0].opacity =
                      bgConfig?.display && bgConfig?.colorObj?.display ? jcolors.opacity : 0
                    areaBlockMesh.material[1].color = stretchColors.color
                    areaBlockMesh.material[1].opacity = stretchColors.opacity
                  }
                }
                break
              }
              case '正区线': {
                if (!isEqual(boundary?.topBoundary, preBoundary?.topBoundary)) {
                  const Line = item.getObjectByName(`${adcode}-line`) as THREE.LineSegments,
                    colors = formatColor(boundary?.topBoundary?.color)

                  if (Line) {
                    // @ts-ignore
                    Line.material.color = colors.color
                    // @ts-ignore
                    Line.material.opacity = boundary?.topBoundary?.display ? colors.opacity : 0
                  }
                }
                break
              }
              case '反区线': {
                if (!isEqual(boundary?.bottomBoundary, preBoundary?.bottomBoundary)) {
                  const Line = item.getObjectByName(`${adcode}-line`) as THREE.LineSegments,
                    colors = formatColor(boundary?.bottomBoundary?.color)

                  if (Line) {
                    // @ts-ignore
                    Line.material.color = colors.color
                    // @ts-ignore
                    Line.material.opacity = boundary?.bottomBoundary?.display ? colors.opacity : 0
                  }
                }
                break
              }
              case '区标签': {
                if (!isEqual(areaName, preAreaName)) {
                  const cssobj = item.getObjectByName(`label_${adcode}`) as CSS2DObject

                  if (areaName?.display) {
                    this.initCss2dRenderer(true)
                    if (!cssobj) {
                      addLabel.call(this, item, center, properties)
                    } else {
                      const element = cssobj.element,
                        info = cssobj.userData
                      replaceLabel.call(this, cssobj, center, info, element, true)
                    }
                  } else {
                    item.remove(...item.children)
                    this.labelArr.length && removeComponents(this.labelArr)
                    item.clear()
                  }
                }
                break
              }
            }
          })
      })
    }

    this.cssRenderer()

    // 更新下钻
    if (!isEqual(rihConfig, preRihConfig) || !isEqual(range, preRange)) {
      if (rihConfig?.display) {
        await getRIH.call(this)
      }
    }
  }

  drawMap(updataCamera = true) {
    try {
      if (this.mapData) {
        removeComponents(this.labelArr)
        this.labelArr = []
        console.time('drawMap')
        if (!this.materialObj) this.initMaterial()

        // 建一个空对象存放对象
        if (this.mapObj.children.length) {
          const label = this.mapObj.getObjectByName('区标签')
          label && label.remove(...label.children)
          this.mapObj.remove(...this.mapObj.children)
          this.mapObj.clear()
        }

        const mapConfig = this.areaMapProps.mapConfig || {},
          baseConfig = mapConfig?.baseConfig,
          boundary = mapConfig?.boundary,
          { offset, scale } = getOffsetAndSclae(this.mapData, this.width, this.height),
          areaBlockObj = this.mapObj.getObjectByName('区块') || new THREE.Object3D(),
          justAreaLineObj = this.mapObj.getObjectByName('正区线') || new THREE.Object3D(), // 正区线
          backAreaLineObj = this.mapObj.getObjectByName('反区线') || new THREE.Object3D(), // 反区线
          labelObj = this.mapObj.getObjectByName('区标签') || new THREE.Object3D(),
          depth = baseConfig?.stretchHeight || 1,
          showAreaLine: any = {}

        // 清理边线
        areaBlockObj.children.length && (areaBlockObj.remove(...areaBlockObj.children), areaBlockObj.clear())
        justAreaLineObj.children.length &&
          (justAreaLineObj.remove(...justAreaLineObj.children), justAreaLineObj.clear())
        backAreaLineObj.children.length &&
          (backAreaLineObj.remove(...backAreaLineObj.children), backAreaLineObj.clear())

        // 清除悬浮块
        resetFloatArea.call(this)

        if (boundary?.topBoundary?.display || this.areaMapProps.design) {
          // 控制上下边界的显示i
          showAreaLine.justAreaLineObj = justAreaLineObj
        }

        if (boundary?.bottomBoundary?.display || this.areaMapProps.design) {
          showAreaLine.backAreaLineObj = backAreaLineObj
        }

        this.offset = offset
        this.scale = scale

        const { sideMaterial, frontMaterial, justAreaLineMaterial, backAreaLineMaterial } =
          this.materialObj || ({} as MaterialObj)
        const lineMaterial: any = { justAreaLineMaterial, backAreaLineMaterial }

        for (let i = 0; i < this.mapData.features.length; i++) {
          const elem = this.mapData.features[i]
          // 定一个省份3D对象
          // 每个的 坐标 数组
          const properties = elem.properties || {},
            adcode = properties.adcode || properties.code

          if (!properties.name || (!properties.center && !properties.centroid)) continue

          const BufferGeometry = createAreaMapMesh.call(this, elem, { scale, depth, showAreaLine, lineMaterial })

          const mesh = new THREE.Mesh(BufferGeometry, [sideMaterial.clone(), frontMaterial.clone()])
          mesh.name = adcode
          mesh.castShadow = true
          mesh.receiveShadow = true
          mesh.layers.enable(1)
          Object.assign(mesh.userData, properties || {})
          const centroidPosition = formatMapPosition(properties.centroid),
            centerPosition = formatMapPosition(properties.center),
            position = centroidPosition || centerPosition

          // 添加地区名
          mapConfig?.areaName?.display && addLabel.call(this, labelObj, position, properties)
          areaBlockObj.add(mesh)
        }

        areaBlockObj.name = '区块'
        justAreaLineObj.name = '正区线'
        backAreaLineObj.name = '反区线'
        labelObj.name = '区标签'

        // 设置边界
        outLineShadow.call(this, [areaBlockObj])

        this.mapObj.add(areaBlockObj, justAreaLineObj, backAreaLineObj, labelObj)
        this.mapObj.position.x = offset.x * scale.x
        this.mapObj.position.y = offset.y * scale.y

        if (updataCamera) {
          this.setCamera()
          this.controller && this.controller.update()
        }

        this.appearanceAnimate?.isPlaying() !== undefined &&
          !this.appearanceAnimate?.isPlaying() &&
          this.otherProp.setLoadStatus(true)
        console.timeEnd('drawMap')
        this.upDataMapPath()
      }
    } catch (error) {
      console.log('地图创建失败', error)
    }
    this.isRIHRunning = false
    !Object.values(this.hasChildCom).some(v => !!v) && this.cssRenderer()
  }

  initMaterial() {
    removeMaterial(this.materialObj || {})

    const mapConfig = this.areaMapProps.mapConfig || {},
      bgConfig = mapConfig?.bgConfig,
      baseConfig = mapConfig?.baseConfig,
      boundary = mapConfig?.boundary,
      clickHover = baseConfig?.clickHover || ({} as ClickHover)

    let texture

    if (bgConfig?.display && bgConfig.bgImage?.display && bgConfig.bgImage.image) {
      const { image = '', repeat = { xRepeat: 1, yRepeat: 1 } } = bgConfig.bgImage
      const t = new THREE.TextureLoader().load(image)
      t.wrapS = t.wrapT = THREE.RepeatWrapping
      t.repeat.set(repeat.xRepeat, repeat.yRepeat)
      texture = t
    }

    const sideMaterialColors = formatColor(bgConfig?.colorObj?.color),
      frontMaterialcolors = formatColor(baseConfig?.stretchFill),
      topBoundaryColors = formatColor(boundary?.topBoundary?.color),
      bottomBoundaryColors = formatColor(boundary?.bottomBoundary?.color),
      sideMaterialOption: THREE.MeshPhongMaterialParameters = {
        color: sideMaterialColors.color,
        transparent: true,
        opacity: bgConfig?.display && bgConfig?.colorObj?.display ? sideMaterialColors.opacity : 0
      }
    texture && (sideMaterialOption.map = texture)

    const sideMaterial = new THREE.MeshPhongMaterial(sideMaterialOption),
      frontMaterial = new THREE.MeshPhongMaterial({
        // 地图拉伸部分材质
        color: frontMaterialcolors.color,
        transparent: true,
        opacity: frontMaterialcolors.opacity
      }),
      justAreaLineMaterial = new THREE.LineBasicMaterial({
        // 正面线条材质
        color: topBoundaryColors.color,
        transparent: true,
        linewidth: 1,
        opacity: boundary?.topBoundary?.display ? topBoundaryColors.opacity : 0
      }),
      backAreaLineMaterial = new THREE.LineBasicMaterial({
        // 反面线条材质
        color: bottomBoundaryColors.color,
        transparent: true,
        linewidth: 1,
        opacity: boundary?.bottomBoundary?.display ? bottomBoundaryColors.opacity : 0
      })

    const materialObj: MaterialObj = { sideMaterial, frontMaterial, justAreaLineMaterial, backAreaLineMaterial }

    // 点击悬浮块的材质
    if (clickHover?.display) {
      const bgConfig = clickHover.bgConfig,
        boundary = clickHover.boundary

      let subtexture
      if (bgConfig?.topMap?.display && bgConfig.topMap?.imgUrl) {
        const { imgUrl = '', repeat } = bgConfig.topMap || {}
        const t = new THREE.TextureLoader().load(imgUrl)
        t.wrapS = t.wrapT = THREE.RepeatWrapping
        t.repeat.set(repeat?.xRepeat || 1, repeat?.yRepeat || 1)
        subtexture = t
      }

      const subSideMaterialColors = formatColor(bgConfig?.topColor?.color),
        subFrontMaterialcolors = formatColor(bgConfig?.sideColor),
        subTopBoundaryColors = formatColor(boundary?.topBoundary?.color),
        subBottomBoundaryColors = formatColor(boundary?.bottomBoundary?.color),
        subSideMaterialoptions: THREE.MeshPhongMaterialParameters = {
          color: subSideMaterialColors.color,
          transparent: true,
          opacity: bgConfig?.topColor?.display ? subSideMaterialColors.opacity : 0
        }
      subtexture && (subSideMaterialoptions.map = subtexture)

      const subSideMaterial = new THREE.MeshPhongMaterial(subSideMaterialoptions),
        subfrontMaterial = new THREE.MeshPhongMaterial({
          // 地图拉伸部分材质
          color: subFrontMaterialcolors.color,
          transparent: true,
          opacity: subFrontMaterialcolors.opacity
        }),
        subjustAreaLineMaterial = new THREE.LineBasicMaterial({
          // 正面线条材质
          color: subTopBoundaryColors.color,
          transparent: true,
          linewidth: 1,
          opacity: boundary?.topBoundary?.display ? subTopBoundaryColors.opacity : 0
        }),
        subbackAreaLineMaterial = new THREE.LineBasicMaterial({
          // 反面线条材质
          color: subBottomBoundaryColors.color,
          transparent: true,
          linewidth: 1,
          opacity: boundary?.bottomBoundary?.display ? subBottomBoundaryColors.opacity : 0
        })

      materialObj.subSideMaterial = subSideMaterial
      materialObj.subFrontMaterial = subfrontMaterial
      materialObj.subJustAreaLineMaterial = subjustAreaLineMaterial
      materialObj.subBackAreaLineMaterial = subbackAreaLineMaterial
    }

    this.materialObj = materialObj
  }

  initCss2dRenderer(flag = false) {
    if ((flag || this.areaMapProps.mapConfig?.areaName?.display) && this.scene && !this.css2dRenderer) {
      const css2DRenderer = new CSS2DRenderer()
      css2DRenderer.setSize(this.width, this.height)
      css2DRenderer.domElement.style.position = 'absolute'
      css2DRenderer.domElement.style.top = '0px'
      css2DRenderer.domElement.style.pointerEvents = 'none'
      this.el.append(css2DRenderer.domElement)
      this.css2dRenderer = css2DRenderer
    }
  }

  initCss3dRenderer() {
    if (!this.css3dRenderer) {
      const { width, height, el } = this
      const renderer = new CSS3DRenderer()
      renderer.domElement.style.position = 'absolute'
      renderer.domElement.style.top = '0px'
      renderer.domElement.style.left = '0px'
      renderer.domElement.style.pointerEvents = 'none'
      renderer.setSize(width, height)
      el.appendChild(renderer.domElement)
      this.css3dRenderer = renderer
    }
  }

  // 处理下钻和上钻
  async downUpperdrill(type: 'down' | 'up' | 'path', properties?: any) {
    if (this.isRIHRunning) return false
    this.isRIHRunning = true
    switch (type) {
      case 'down': {
        const { adcode, name, code, childrenNum = 0 } = properties || {},
          preAdcode = this.preAdcode,
          maxLevel = this.areaMapProps.mapConfig?.rihConfig?.maxLevel

        const paramAdcode = adcode || code

        if (!isNaN(Number(maxLevel)) && maxLevel !== null && this.level - 1 === maxLevel) {
          this.isLeaf = false
        }

        if (paramAdcode && this.isLeaf) {
          this.otherProp.setLoadStatus(true)
          this.RIH.push({ name, adcode: paramAdcode })
          const level = this.RIH.length
          this.level = level
          this.mapData = await this.getData(`${this._base}${paramAdcode}.json`)
          const param = {
            adcode: paramAdcode,
            name,
            level: level - 1,
            preAdcode
          }

          this.drawMap()
          childrenNum == 0 && (this.isLeaf = false)
          this.areaMapProps.onDrollDown && this.areaMapProps.onDrollDown(param)
          this.preAdcode = paramAdcode
          this.isRIHRunning = false
        } else {
          this.isRIHRunning = false
        }

        break
      }
      case 'up': {
        const currentPath = this.RIH[this.RIH.length - 2]

        if (currentPath) {
          this.otherProp.setLoadStatus(true)
          this.isLeaf = true
          const laseInfo = this.RIH.pop()
          const adcode = currentPath.adcode
          this.level = this.RIH.length
          this.mapData = await this.getData(`${this._base}${adcode}.json`)
          this.drawMap()
          const param = {
            adcode,
            name: currentPath.name,
            level: this.level - 1,
            preAdcode: laseInfo?.adcode
          }
          this.areaMapProps.onDrollUp && this.areaMapProps.onDrollUp(param)
          this.preAdcode = adcode
        }
        break
      }
    }
  }

  // 获取geojson数据
  async getMapInfo() {
    const range = this.areaMapProps.mapConfig?.range || ({} as MapRange)
    try {
      if (range?.source === 'system' || !range?.uploadData?.src) {
        if (range.adcode?.value === '' || range.adcode?.value === 'Execute Expression Error') throw new Error('ERROR')
        this.RIH[0] = { adcode: range.adcode?.value || '', name: '' }
        this.mapData = await this.getData(`${this._base}${range.adcode?.value}.json`)
        this.preAdcode = range.adcode?.value || ''
        this.upDataMapPath()

        if (!this.areaMapProps.mapConfig?.rihConfig?.display) this.isLeaf = false
      } else {
        this.isLeaf = false
        this.mapData = await this.getData(range?.uploadData?.src)
      }
    } catch (error) {
      message.error({
        content: 'adcode 错误',
        className: 'lcz-notice'
      })
    }
  }

  getData(url: string) {
    return new Promise((resolve, reject) => {
      if (this.mapCache.has(url)) {
        resolve(this.mapCache.get(url))
      } else {
        fetch(url)
          .then(request => request.json())
          .then(res => {
            this.mapCache.set(url, res)
            resolve(res)
          })
          .catch(error => reject(error))
      }
    })
  }

  setCamera() {
    if (this.scene) {
      const cameraPosition = this.areaMapProps.mapConfig?.baseConfig?.cameraPosition
      const camera = this.camera || new THREE.PerspectiveCamera(60, this.width / this.height, 1, 2000)
      camera.position.set(cameraPosition?.x || 0, cameraPosition?.y || 0, cameraPosition?.z || 0)
      camera.lookAt(this.scene.position)
      this.camera = camera
      this.camera.updateProjectionMatrix()
    }
  }

  setController() {
    if (this.camera && this.renderer) {
      this.controller && this.controller.removeEventListener('change', this.controllerChangeFn)

      const baseConfig = this.areaMapProps.mapConfig?.baseConfig
      const controller = this.controller || new OrbitControls(this.camera, this.renderer.domElement)

      // 是否可拖动
      controller.enableRotate = Boolean(baseConfig?.canDrag)
      controller.rotateSpeed = 2
      controller.maxPolarAngle = Math.PI / 2

      // 鼠标滚轮放大缩小
      controller.enableZoom = Boolean(baseConfig?.canZooms.display)
      if (baseConfig?.canZooms.display) {
        const { minDistance, maxDistance } = baseConfig?.canZooms
        let min = minDistance,
          max = maxDistance
        if (minDistance > maxDistance) (min = maxDistance), (max = minDistance)
        // 向内缩放最小距离
        controller.minDistance = min
        // 向外缩放最大距离
        controller.maxDistance = max
      }
      this.controller = controller

      this.controller.addEventListener('change', this.controllerChangeFn)
    }
  }

  // 视图重新渲染
  LoadRenderer() {
    if (this.scene && this.camera && this.renderer) {
      this.controller && this.controller.update()
      this.camera && this.camera.updateMatrixWorld(true)
      this.renderer.setRenderTarget(null)
      this.renderer.clear()
      this.renderer.render(this.scene, this.camera)
      this.composer && this.composer.render()
    }
  }

  cssRenderer(up = 'all') {
    try {
      if (Object.keys(this.childComponentUpdataFn).length > 0 && (up === 'all' || up === 'controller')) return false

      const T = this.clock.getDelta()
      this.animateConfig.time = this.animateConfig.time + T
      if (up == 'all' || this.animateConfig.first || this.animateConfig.time > 1 / this.animateConfig.FPS) {
        setTimeout(() => {
          // 出场动画完成时
          if (this.appearanceAnimate?.isPlaying()) return false
          if (this.scene && this.camera) {
            this.css2dRenderer && this.css2dRenderer.render(this.scene, this.camera)
            this.css3dRenderer && this.css3dRenderer.render(this.scene, this.camera)
          }
          this.LoadRenderer()
          this.animateConfig.first = false
        })
        this.animateConfig.time = 0
        this.stats && this.stats.update()
      }
    } catch (error) {
      console.warn(error)
    }
  }

  animate() {
    this.animateId && cancelAnimationFrame(this.animateId)
    if (this.appearanceAnimate?.isPlaying()) {
      TWEEN.update()
      this.LoadRenderer()
      this.animateId = requestAnimationFrame(this.animate.bind(this))
    } else {
      if (Object.keys(this.childComponentUpdataFn).length) {
        for (const type in this.childComponentUpdataFn) {
          if (Object.prototype.hasOwnProperty.call(this.childComponentUpdataFn, type)) {
            const childUpdateFn = this.childComponentUpdataFn[type]
            childUpdateFn.fn.call(childUpdateFn.target)
          }
        }

        this.animateId = requestAnimationFrame(this.animate.bind(this))
        this.cssRenderer('animate')
      }
    }
  }

  // 更新路径
  upDataMapPath() {
    const RIH = [...this.RIH]
    this.otherProp.setMapPath(RIH)
  }

  // 初始化事件对象
  initEvent() {
    this.__event && this.__event.dispose()
    this.__event = new Events(this)
  }

  // 性能检测器
  initStats() {
    this.stats = Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = '0px'
    this.stats.domElement.style.right = '0px'
    this.stats.domElement.style.left = 'auto'
    this.el.appendChild(this.stats.domElement)
    return this.stats
  }

  buildAuxSystem() {
    const axisHelper = new THREE.AxesHelper(2000)
    this.scene?.add(axisHelper)
    // const gridHelper = new THREE.GridHelper(600, 60)
    // this.scene?.add(gridHelper)
  }

  resize(w, h) {
    this.width = w
    this.height = h
    this.camera && ((this.camera.aspect = w / h), this.camera.updateProjectionMatrix())
    this.renderer && this.renderer.setSize(w, h)
    this.css2dRenderer && this.css2dRenderer.setSize(w, h)
    this.css3dRenderer && this.css3dRenderer.setSize(w, h)
    this.cssRenderer()
  }

  destroy() {
    this.mapData = null
    this.events = undefined

    this.appearanceAnimate && this.appearanceAnimate.stop()

    removeComponents(this.labelArr)

    removeMaterial(this.materialObj || {})

    this.__event?.dispose()
    this.stats?.end()
    this.animateId && cancelAnimationFrame(this.animateId)
    this.mapCache.clear()

    this.selectObj?.clear()

    // 地图对象清除
    this.mapObj?.remove(...this.mapObj?.children)
    this.mapObj?.clear()

    // 大容器清除
    this.mapGroud.remove(...this.mapGroud.children)
    this.mapGroud.clear()

    // 控制器 渲染器清除
    this.camera?.clear()
    this.controller?.dispose()
    this.camera?.remove()
    this.composer?.passes.forEach(pass => {
      this.composer?.removePass(pass)
    })
    this.scene?.traverse((child: any = {}) => {
      child?.clear()
    })
    this.scene?.remove()
    if (this.renderer) {
      this.renderer.forceContextLoss()
      this.renderer.dispose()
      this.renderer.domElement.remove()
      // @ts-ignore
      this.renderer.domElement = this.renderer = null
    }
    if (this.css2dRenderer) {
      this.css2dRenderer.domElement.remove()
      // @ts-ignore
      this.css2dRenderer.domElement = this.css2dRenderer = null
    }
    if (this.css3dRenderer) {
      this.css3dRenderer.domElement.remove()
      // @ts-ignore
      this.css3dRenderer.domElement = this.css3dRenderer = null
    }

    this.isDestroy = true

    // @ts-ignore
    this.__event = this.scene = this.camera = this.controller = this.composer = this.mapGroud = null
    // @ts-ignore
    this.stats = this.mapObj = this.RIH = this.gaodeCityInfo = this.selectObj = this.appearanceAnimate = this.clock = null
    //@ts-ignore
    this.areaMapProps = this.otherProp = this.mapData = this.labelArr = this.mapCache = this.controllerChangeFn = null
    // @ts-ignore
    this.floatAreaAnimate = this.floatChilds = null
  }
}
