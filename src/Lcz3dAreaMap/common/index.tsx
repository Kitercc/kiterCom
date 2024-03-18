import React from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import CreateThreeMap from './createThreeMap'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import * as TWEEN from '@tweenjs/tween.js'
import LabelText from '../components/LabelText'
import { AreamConfig, ClickHover } from '../type'
import { MapRange } from '../../LczChina2dMap/type'

export const formatColor = function (color = 'rgba(255,255,255,0)') {
  try {
    if (color.indexOf('#') >= 0) {
      return { color: new THREE.Color(color), opacity: 1 }
    } else {
      const rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      const [, r, g, b, a] = color.match(rgbRegex) as any[]
      return { color: new THREE.Color(`rgb(${r},${g},${b})`), opacity: +a }
    }
  } catch (error) {
    return { color: new THREE.Color('rgb(255,255,255)'), opacity: 0 }
  }
}

export const removeComponents = function (labelArr: (HTMLDivElement | HTMLElement)[] | HTMLDivElement | HTMLElement) {
  if (Array.isArray(labelArr)) {
    labelArr.forEach(item => {
      if (item.nodeName) {
        ReactDOM.unmountComponentAtNode(item)
      }
    })
    labelArr = []
  } else {
    if (labelArr && labelArr.nodeName) {
      ReactDOM.unmountComponentAtNode(labelArr)
    }
  }
}

/**
 * @param this CreateThreeMap
 * @param province 地区容器 THREE.Object3D
 * @param position 定位
 * @param info 详情
 * @param param4 后续需要的参数
 */
export const addLabel = function (
  this: CreateThreeMap,
  labelObj: THREE.Object3D | undefined,
  position: any[],
  info: any
) {
  if (position && position[0] && position[1] && labelObj) {
    const con = document.createElement('div')
    const Label = new CSS2DObject(con)
    replaceLabel.call(this, Label, position, info, con)

    labelObj.add(Label)
    this.labelArr.push(con)
  }
}

export const replaceLabel = function (
  this: CreateThreeMap,
  cssObj: CSS2DObject,
  position: any[],
  info: any,
  dom: HTMLElement,
  updata = false
) {
  const { name, adcode, code } = info || {}
  if (!updata) {
    cssObj.name = `label_${adcode || code}`
    cssObj.userData = info
  }

  let x = position[0],
    y = position[1]

  const areaName = this.areaMapProps.mapConfig?.areaName || ({} as AreamConfig)

  const findSeriesStyle = areaName.textSeries?.find(item => item.value == name)

  if (findSeriesStyle) {
    x += findSeriesStyle.xOffset / 8
    y -= findSeriesStyle.yOffset / 8
  }
  cssObj.position.set(
    x * this.scale.x,
    y * this.scale.y,
    (this.areaMapProps.mapConfig?.baseConfig?.stretchHeight || 0) - 1
  )

  ReactDOM.render(<LabelText areaName={areaName} info={info} key={`label_${adcode || code}`} />, dom)
}

/**
 * @param param0 [x,y] 经纬度
 * @param offset 偏移对象
 */
const getOffset = ([x, y], offset) => {
  if (offset.t == 0) {
    offset.t = y
  } else {
    offset.t < y && (offset.t = y)
  }
  if (offset.b == 0) {
    offset.b = y
  } else {
    offset.b > y && (offset.b = y)
  }
  if (offset.l == 0) {
    offset.l = x
  } else {
    offset.l > x && (offset.l = x)
  }
  if (offset.r == 0) {
    offset.r = x
  } else {
    offset.r < x && (offset.r = x)
  }
}

/**
 * @param multiPolygon geojson 点的数据
 * @param scale  缩放
 * @param center 中心点
 * @returns THREE.Shape
 */
export const drawShape = function (multiPolygon, scale, center = [0, 0]) {
  const vector = multiPolygon.map(polygon => {
    const [x, y] = polygon
    return new THREE.Vector2((x - center[0]) * scale.x, (y - center[1]) * scale.y)
  })

  return new THREE.Shape(vector)
}

/**
 * @param shape THREE.Shape
 * @param material THREE.Material
 * @param depth 地图拉伸的高度
 * @param name 区域名称
 * @param showAreaLine 正反边界线条对象
 * @param lineMaterial 正反边界线条材质
 * @returns
 */
export const shapeToExtrude = function (
  shape: THREE.Shape,
  depth,
  name,
  showAreaLine: any = {},
  lineMaterial: any = {},
  type = 'main'
) {
  const options: THREE.ExtrudeGeometryOptions = {
    bevelEnabled: false
  }
  options.depth = depth
  const geometry = new THREE.ExtrudeGeometry(shape, options)

  if (showAreaLine.justAreaLineObj || showAreaLine.backAreaLineObj) {
    const lineGeometry = new THREE.ExtrudeGeometry(shape, { ...options, depth: 0.1 }),
      _linegeometry = new THREE.EdgesGeometry(lineGeometry)

    const prefix = t => {
      return (
        {
          subtop: '上边线-',
          subbottom: '下边线-'
        }[t] || ''
      )
    }

    if (showAreaLine.justAreaLineObj) {
      const line = new THREE.LineSegments(_linegeometry, lineMaterial.justAreaLineMaterial.clone())
      line.name = prefix(type + 'top') + name + '-line'
      line.position.z = depth
      showAreaLine.justAreaLineObj.add(line)
    }

    if (showAreaLine.backAreaLineObj) {
      const line = new THREE.LineSegments(_linegeometry, lineMaterial.backAreaLineMaterial.clone())
      line.name = prefix(type + 'bottom') + name + '-line'
      line.position.z = -0.1
      showAreaLine.backAreaLineObj.add(line)
    }
  }

  return geometry
}

// 合并THREE.Mesh 数组
export const mergeBufferGeometry = function (objects: THREE.ExtrudeGeometry[]) {
  const sumPosArr: any[] = []
  const sumNormArr: any[] = []
  const sumUvArr: any[] = []

  const modelGeometry = new THREE.BufferGeometry()

  let sumPosCursor = 0
  let sumNormCursor = 0
  let sumUvCursor = 0

  let startGroupCount = 0
  let lastGroupCount = 0

  for (let a = 0; a < objects.length; a++) {
    const item = objects[a]
    const posAttArr = item.getAttribute('position').array

    for (let b = 0; b < posAttArr.length; b++) {
      sumPosArr[b + sumPosCursor] = posAttArr[b]
    }

    sumPosCursor += posAttArr.length

    const numAttArr = item.getAttribute('normal').array

    for (let b = 0; b < numAttArr.length; b++) {
      sumNormArr[b + sumNormCursor] = numAttArr[b]
    }

    sumNormCursor += numAttArr.length

    const uvAttArr = item.getAttribute('uv').array

    for (let b = 0; b < uvAttArr.length; b++) {
      sumUvArr[b + sumUvCursor] = uvAttArr[b]
    }

    sumUvCursor += uvAttArr.length

    const groupArr = item.groups

    for (let b = 0; b < groupArr.length; b++) {
      startGroupCount = lastGroupCount
      modelGeometry.addGroup(startGroupCount, groupArr[b].count, groupArr[b].materialIndex)
      lastGroupCount = startGroupCount + groupArr[b].count
    }
  }

  modelGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sumPosArr, 3))
  sumNormArr.length && modelGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(sumNormArr, 3))
  sumUvArr.length && modelGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(sumUvArr, 2))

  return modelGeometry
}

/**
 * 根据geojson算出 地图距离 [0,0] 的偏移量和缩放比
 * @param mapData geoJSON数据
 * @param width 地图宽
 * @param height 地图高
 * @returns scale  offset
 */
export const getOffsetAndSclae = (mapData: any, width: number, height: number) => {
  const offset = { t: 0, b: 0, l: 0, r: 0 }

  mapData.features.forEach(elem => {
    const coordinates = elem.geometry.coordinates
    const coordinatesType = elem.geometry.type //MultiPolygon  Polygon

    for (let index = 0; index < coordinates.length; index++) {
      const multiPolygon = coordinates[index]
      if (coordinatesType === 'MultiPolygon') {
        if (multiPolygon.length && 2 === multiPolygon[0].length) {
          for (let i = 0; i < multiPolygon.length; i++) {
            const [x, y] = multiPolygon[i]
            getOffset([x, y], offset)
          }
        } else if (multiPolygon.length && multiPolygon[0].length > 2) {
          for (let i = 0; i < multiPolygon[0].length; i++) {
            const [x, y] = multiPolygon[0][i]
            getOffset([x, y], offset)
          }
        }
      } else {
        const polygons = multiPolygon.length > 1 ? multiPolygon : multiPolygon[0]
        if (polygons) {
          for (let i = 0; i < polygons.length; i++) {
            const [x, y] = polygons[i]
            getOffset([x, y], offset)
          }
        }
      }
    }
  })

  const { t, b, l, r } = offset

  const mapWidth = r - l
  const mapHeight = t - b

  const maxSize = Math.max(mapWidth, mapHeight)

  const x = -r + mapWidth / 2
  const y = -t + mapHeight / 2

  return { offset: { x, y }, scale: { x: (height * 0.1) / maxSize, y: (height * 0.12) / maxSize } }
}

export const outLineShadow = function (this: CreateThreeMap, Object3D: THREE.Object3D[]) {
  const areaShadow = this.areaMapProps.mapConfig?.areaShadow
  if (this.renderer && this.scene && this.camera) {
    this.composer?.passes.forEach(pass => {
      this.composer?.removePass(pass)
    })

    if (areaShadow?.display) {
      const renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
        encoding: THREE.sRGBEncoding
      })
      // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
      const composer = this.composer || new EffectComposer(this.renderer, renderTarget)
      // 新建一个场景通道  为了覆盖到原理来的场景上
      const renderPass = new RenderPass(this.scene, this.camera)
      composer.addPass(renderPass)

      const outlinePass = new OutlinePass(new THREE.Vector2(this.width, this.height), this.scene, this.camera)
      composer.addPass(outlinePass)
      const colors = formatColor(areaShadow?.color)
      outlinePass.visibleEdgeColor.set(colors.color) // 呼吸显示的颜色
      outlinePass.edgeStrength = areaShadow.width // 边框的亮度
      outlinePass.edgeGlow = areaShadow.edgeGlow // 光晕[0,1]
      outlinePass.usePatternTexture = false // 是否使用父级的材质
      outlinePass.downSampleRatio = 1 // 边框弯曲度
      outlinePass.clear = true
      outlinePass.selectedObjects = Object3D

      this.composer = composer
    } else {
      this.composer = undefined
    }
  }
}

export const getRIH = async function (this: CreateThreeMap) {
  if (
    this.areaMapProps.mapConfig?.range?.source !== 'system' ||
    !this.areaMapProps.mapConfig.rihConfig?.display ||
    !this.areaMapProps.mapConfig.rihConfig.rootCode?.value
  ) {
    return false
  }
  const range = this.areaMapProps.mapConfig?.range || ({} as MapRange),
    adcode = range.adcode?.value,
    rootcode = this.areaMapProps.mapConfig?.rihConfig?.rootCode?.value || ''

  // 获取到下钻数组
  function findRIH(treeData, adcode) {
    if (treeData.length == 0) return
    for (let i = 0; i < treeData.length; i++) {
      const dataItem = treeData[i]
      if (dataItem.adcode == adcode) {
        return [{ name: dataItem.name, adcode: dataItem.adcode }]
      } else {
        if (dataItem.districts) {
          const res = findRIH(dataItem.districts, adcode)
          if (res !== undefined) {
            return res.concat({ name: dataItem.name, adcode: dataItem.adcode })
          }
        }
      }
    }
  }

  try {
    if (rootcode != adcode && range?.source === 'system') {
      if (adcode != '' && adcode != 'Execute Expression Error') {
        let cityUrl =
          (process.env.NODE_ENV !== 'production' ? 'HappyServer' : '..') + '/lczCommon/matrix/third/amap/district.json'

        if (this.areaMapProps.design === undefined) {
          cityUrl =
            'https://restapi.amap.com/v3/config/district?key=1cd0ca86d2e187b6eaa069471633d80a&subdistrict=3&extensions=base'
        }

        const cityInfo: any = await this.getData(cityUrl),
          RIH = (findRIH(cityInfo.districts || [], adcode) || []).reverse(),
          findRootadcodeIndex = RIH.findIndex(v => v.adcode == rootcode)

        if (findRootadcodeIndex != -1 && findRootadcodeIndex < RIH.length && RIH.length) {
          this.RIH = RIH.slice(findRootadcodeIndex)
          this.level = this.RIH.length - 1
          this.upDataMapPath()
        }
      }
    }
  } catch (error) {
    console.warn(error)
  }
}

// 移除材质
export function removeMaterial(target: any) {
  for (const key in target) {
    const material = target[key]
    material.dispose && material.dispose()
    delete target[key]
  }
}

// 获取绘制地图的geometry
export function createAreaMapMesh(
  this: CreateThreeMap,
  elem: any,
  { scale, depth, showAreaLine, lineMaterial, type = 'main' }
): THREE.BufferGeometry {
  const coordinates = elem.geometry.coordinates,
    coordinatesType = elem.geometry.type, //MultiPolygon  Polygon
    properties = elem.properties || {},
    adcode = properties.adcode || properties.code,
    MeshArr: THREE.ExtrudeGeometry[] = []

  for (let index = 0; index < coordinates.length; index++) {
    const multiPolygon = coordinates[index]
    let Mesh: THREE.ExtrudeGeometry | undefined = undefined
    if (coordinatesType === 'MultiPolygon') {
      if (multiPolygon.length && 2 === multiPolygon[0].length) {
        const shape = drawShape(multiPolygon, scale)
        Mesh = shapeToExtrude(shape, depth, adcode, showAreaLine, lineMaterial, type)
      } else if (multiPolygon.length && multiPolygon[0].length > 2) {
        const shape = drawShape(multiPolygon[0], scale)
        Mesh = shapeToExtrude(shape, depth, adcode, showAreaLine, lineMaterial, type)
      }
    } else {
      const polygon = multiPolygon.length > 1 ? multiPolygon : multiPolygon[0]
      if (polygon) {
        const shape = drawShape(polygon, scale)
        Mesh = shapeToExtrude(shape, depth, adcode, showAreaLine, lineMaterial, type)
      }
    }
    Mesh && MeshArr.push(Mesh)
  }

  const geometry = mergeBufferGeometry(MeshArr)

  return geometry
}

export function resetFloatArea(this: CreateThreeMap) {
  const floatObject3D = this.mapGroud.getObjectByName('区域悬浮块')
  if (floatObject3D) {
    floatObject3D.remove(...floatObject3D.children)
    floatObject3D.clear()
    this.floatChilds.forEach(item => {
      item.position.z = 0
    })
    this.floatChilds = []
    this.floatCode = ''
    this.floatAreaAnimate && this.floatAreaAnimate.stop()
  }
}

// 绘制点击悬浮的块
export function createSubHoverAreaMap(this: CreateThreeMap, clickHover: ClickHover, selectData: any = {}) {
  const adcode = selectData.adcode || selectData.code,
    itemData = this.mapData.features.find(item => item.properties.adcode == adcode || item.properties.code == adcode),
    { stretchHeight, boundary, suspensionHeight, floatingTime } = clickHover,
    baseStretchHeight = this.areaMapProps.mapConfig?.baseConfig?.stretchHeight || 0,
    { subSideMaterial, subFrontMaterial, subJustAreaLineMaterial, subBackAreaLineMaterial } = this.materialObj || {}
  if (
    !itemData ||
    !subSideMaterial ||
    !subFrontMaterial ||
    !subJustAreaLineMaterial ||
    !subBackAreaLineMaterial ||
    this.floatCode == adcode
  )
    return false

  const lastObject = this.mapGroud.getObjectByName('区域悬浮块')
  resetFloatArea.call(this)

  const subHoverBlobk = lastObject || new THREE.Object3D(),
    showAreaLine: any = {}

  if (boundary?.topBoundary?.display) {
    showAreaLine.justAreaLineObj = subHoverBlobk
  }

  if (boundary?.bottomBoundary?.display) {
    showAreaLine.backAreaLineObj = subHoverBlobk
  }

  const lineMaterial: any = {
    justAreaLineMaterial: subJustAreaLineMaterial,
    backAreaLineMaterial: subBackAreaLineMaterial
  }

  const BufferGeometry = createAreaMapMesh.call(this, itemData, {
    scale: this.scale,
    depth: stretchHeight || 0,
    showAreaLine,
    lineMaterial,
    type: 'sub'
  })

  const mesh = new THREE.Mesh(BufferGeometry, [subSideMaterial.clone(), subFrontMaterial.clone()])

  mesh.name = '区域块'
  mesh.castShadow = true
  mesh.receiveShadow = true
  Object.assign(mesh.userData, selectData)
  subHoverBlobk.add(mesh)

  subHoverBlobk.position.x = this.offset.x * this.scale.x
  subHoverBlobk.position.y = this.offset.y * this.scale.y
  subHoverBlobk.position.z = 0

  subHoverBlobk.name = '区域悬浮块'

  this.floatCode = adcode

  subHoverBlobkAniamte.call(this, subHoverBlobk, {
    stretchHeight,
    baseStretchHeight,
    suspensionHeight,
    adcode,
    floatingTime
  })
}

function subHoverBlobkAniamte(
  this: CreateThreeMap,
  subHoverBlobk: THREE.Object3D,
  { stretchHeight, baseStretchHeight, suspensionHeight, adcode, floatingTime }
) {
  const subFloatHeight = baseStretchHeight + suspensionHeight,
    floatChildCom = ['lightbar'],
    floatCom = this.mapGroud.children.filter(item => floatChildCom.includes(item.userData.comName))

  for (let i = 0; i < floatCom.length; i++) {
    const com = floatCom[i],
      inArea = com.children.filter(item => item.userData.adcode == adcode)
    this.floatChilds = [...this.floatChilds, ...inArea]
  }

  this.childComponentUpdataFn['floatAreaAnimatefn'] = {
    target: this,
    fn: () => {
      TWEEN.update()
    }
  }

  this.animate()

  this.floatAreaAnimate = new TWEEN.Tween({ value: 0 })
    .to({ value: subFloatHeight }, floatingTime * 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(({ value }) => {
      subHoverBlobk.position.z = value
      this.floatChilds.forEach(item => {
        item.position.z = value - baseStretchHeight + stretchHeight
      })
    })
    .start()
    .onComplete(() => {
      delete this.childComponentUpdataFn['floatAreaAnimatefn']
      this.cssRenderer()
    })
}
