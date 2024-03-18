import CreateThreeMap from './createThreeMap'
import * as THREE from 'three'
import { createSubHoverAreaMap, formatColor } from '.'

export class Events {
  __raycaster: THREE.Raycaster
  __mouse: THREE.Vector2
  events: { [key: string]: { [key: string]: () => void } } = {}
  target: CreateThreeMap
  mousemove_timer: any
  mousemove_interval: number
  mouseStatus: 'in' | 'out' = 'out'
  enable: boolean // 底图上是否可点击
  eventsList = {}
  constructor(options: CreateThreeMap) {
    this.__raycaster = new THREE.Raycaster()
    this.__mouse = new THREE.Vector2()
    this.events = options.events || {}
    this.target = options

    this.mousemove_timer = null
    this.mousemove_interval = 2
    this.enable = true

    this.eventsList = {
      click: this.aboutClickEvents.bind(this, this.events['click']),
      dblclick: this.aboutClickEvents.bind(this, this.events['dblclick']),
      mousemove: this.aboutMouseEvents.bind(this, this.events['mousemove']),
      mouseout: this.wrapperMouseout.bind(this)
    }

    this.initEventListeners()
  }

  initEventListeners(update = false) {
    update && this.dispose()
    if (this.events) {
      for (const fnName in this.events) {
        if (Object.prototype.hasOwnProperty.call(this.events, fnName)) {
          if (fnName === 'dblclick' || fnName === 'click') {
            this.target.el.addEventListener(fnName, this.eventsList[fnName])
          }

          if (fnName === 'mousemove') {
            this.target.el.addEventListener(fnName, this.eventsList[fnName])
          }
        }
      }

      this.target.el.addEventListener('mouseout', this.eventsList['mouseout'])
    }
  }

  wrapperMouseout() {
    this.enable = true
    this.target.selectObj && __onMouseMove.call(this.target, null, undefined, 'out')
  }

  aboutClickEvents(fn, event) {
    event.preventDefault()
    this.__mouse.x = ((event.offsetX || event.clientX) / this.target.el.offsetWidth) * 2 - 1
    this.__mouse.y = -((event.offsetY || event.clientY) / this.target.el.offsetHeight) * 2 + 1
    if (this.target.camera && this.target.scene && this.target.mapObj) {
      this.__raycaster.setFromCamera(this.__mouse, this.target.camera)

      for (const fnName in fn) {
        if (Object.prototype.hasOwnProperty.call(fn, fnName)) {
          const callback = fn[fnName]

          switch (fnName) {
            case '__dbclick':
            case '__click': {
              if (!this.enable) continue
              const intersects = this.__raycaster.intersectObjects(this.target.mapObj.children, true)
              if (intersects.length > 0) {
                let selectedObj: any = null
                for (let i = 0; i < intersects.length; i++) {
                  if (
                    intersects[i].object &&
                    intersects[i].object.type === 'Mesh' &&
                    intersects[i].object?.userData &&
                    Object.keys(intersects[i].object?.userData || {}).length > 0
                  ) {
                    selectedObj = intersects[i].object?.userData
                    break
                  }
                }
                if (selectedObj) {
                  callback.bind(this.target)(selectedObj, 'inner')
                } else {
                  callback.bind(this.target)({}, 'out')
                }
              } else {
                callback.bind(this.target)({}, 'out')
              }
              break
            }
            case 'floatAreablockClick': {
              if (this.enable) continue
              callback.call(this)
              break
            }

            default:
              break
          }
        }
      }
    }
  }

  aboutMouseEvents(fn, event) {
    event.preventDefault()
    this.mousemove_timer && clearTimeout(this.mousemove_timer)

    this.mousemove_timer = setTimeout(() => {
      if (this.target.camera && this.target.scene) {
        this.__mouse.x = (event.offsetX / this.target.el.offsetWidth) * 2 - 1
        this.__mouse.y = -(event.offsetY / this.target.el.offsetHeight) * 2 + 1
        this.__raycaster.setFromCamera(this.__mouse, this.target.camera)

        for (const fnName in fn) {
          if (Object.prototype.hasOwnProperty.call(fn, fnName)) {
            const callback = fn[fnName]

            if (fnName === '__onMouseMove') {
              if (!this.enable) continue
              const intersects = this.__raycaster.intersectObjects(this.target.mapObj.children, true)
              let selectedObj: any = null,
                targetMesh: any = null
              if (intersects.length > 0) {
                for (let i = 0; i < intersects.length; i++) {
                  const intersect = intersects[i]
                  if (
                    intersect.object &&
                    intersect.object.type === 'Mesh' &&
                    intersect.object?.userData &&
                    Object.keys(intersect.object?.userData || {}).length > 0
                  ) {
                    targetMesh = intersect.object
                    selectedObj = intersect.object?.userData || {}
                    break
                  }
                }
                if (selectedObj && targetMesh) {
                  callback.bind(this.target)(selectedObj, targetMesh, 'inner')
                  this.mouseStatus = 'in'
                } else {
                  this.mouseStatus === 'in' && callback.bind(this.target)({}, targetMesh, 'out')
                  this.mouseStatus = 'out'
                }
              } else {
                this.mouseStatus === 'in' && callback.bind(this.target)({}, targetMesh, 'out')
                this.mouseStatus = 'out'
              }
            } else if (fnName.indexOf('lightbar_') === 0) {
              callback.call(this)
            } else if (fnName === 'floatAreablockMove') {
              callback.call(this)
            }
          }
        }
      }
    }, this.mousemove_interval)
  }

  dispose() {
    if (this.events) {
      for (const fnName in this.events) {
        if (Object.prototype.hasOwnProperty.call(this.events, fnName)) {
          if (fnName === 'dblclick' || fnName === 'click') {
            this.target.el.removeEventListener(fnName, this.eventsList[fnName])
          }

          if (fnName === 'mousemove') {
            this.target.el.removeEventListener(fnName, this.eventsList[fnName])
          }
        }
      }

      this.target.el.removeEventListener('mouseout', this.eventsList['mouseout'])
    }
  }
}

// 鼠标移入事件
export function __onMouseMove(
  this: CreateThreeMap,
  selectData,
  targetMesh: THREE.Mesh | undefined,
  type: 'inner' | 'out'
) {
  const lastObjId = this.selectObj?.id || '',
    { topBoundary, bottomBoundary } = this.areaMapProps.mapConfig?.boundary || {},
    bgConfig = this.areaMapProps.mapConfig?.bgConfig,
    areaName = this.areaMapProps.mapConfig?.areaName,
    h = 0.1
  if (targetMesh) this.selectObj = targetMesh

  const justareaLineObj = this.mapObj?.getObjectByName('正区线'),
    backareaLineObj = this.mapObj?.getObjectByName('反区线'),
    areaLabelObj = this.mapObj?.getObjectByName('区标签')

  // 移入 地图面 和边框高亮
  function _selectArea(mesh: THREE.Mesh) {
    if (mesh) {
      if (bgConfig?.display && bgConfig?.highlight?.display) {
        const colors = formatColor(bgConfig?.highlight?.fill)
        mesh.material[0].color = colors.color
        mesh.material[0].opacity = colors.opacity
        mesh.position.z += h
      }

      const justLine = justareaLineObj?.getObjectByName(mesh.name + '-line')
      if (justLine && topBoundary?.display && topBoundary?.highlight?.display) {
        const colors = formatColor(topBoundary?.highlight?.color)
        // @ts-ignore
        justLine.material.color = colors.color
        // @ts-ignore
        justLine.material.opacity = colors.opacity
      }

      const backAreaLine = backareaLineObj?.getObjectByName(mesh.name + '-line')
      if (backAreaLine && bottomBoundary?.display && bottomBoundary?.highlight?.display) {
        const colors = formatColor(bottomBoundary?.highlight?.color)
        // @ts-ignore
        backAreaLine.material.color = colors.color
        // @ts-ignore
        backAreaLine.material.opacity = colors.opacity
      }

      justLine && (justLine.position.z += h)
      backAreaLine && (backAreaLine.position.z += h)

      const areaLabel = areaLabelObj?.getObjectByName(`label_${mesh.name}`)
      if (areaLabel && areaName?.display && areaName.highlight?.display) {
        // @ts-ignore
        const element = areaLabel.element as HTMLDivElement
        element.firstElementChild?.classList.add('areaname_active')
      }
    }
  }

  // 移除取消高亮
  function _unSelectArea(mesh) {
    if (mesh) {
      if (bgConfig?.display && bgConfig?.highlight?.display) {
        mesh.position.z -= h

        if (bgConfig?.colorObj?.display) {
          const colors = formatColor(bgConfig?.colorObj?.color)
          mesh.material[0].color = colors.color
          mesh.material[0].opacity = colors.opacity
        } else {
          mesh.material[0].opacity = 0
        }
      }

      const justLine = justareaLineObj?.getObjectByName(mesh.name + '-line') as THREE.LineSegments
      if (justLine && topBoundary?.display) {
        const colors = formatColor(topBoundary?.color)
        // @ts-ignore
        justLine.material.color = colors.color
        // @ts-ignore
        justLine.material.opacity = colors.opacity
      }

      const backAreaLine = backareaLineObj?.getObjectByName(mesh.name + '-line') as THREE.LineSegments
      if (backAreaLine && bottomBoundary?.display) {
        const colors = formatColor(bottomBoundary?.color)
        // @ts-ignore
        backAreaLine.material.color = colors.color
        // @ts-ignore
        backAreaLine.material.opacity = colors.opacity
      }

      justLine && (justLine.position.z -= h)
      backAreaLine && (backAreaLine.position.z -= h)

      const areaLabel = areaLabelObj?.getObjectByName(`label_${mesh.name}`)
      if (areaLabel && areaName?.display && areaName.highlight?.display) {
        // @ts-ignore
        const element = areaLabel.element as HTMLDivElement
        element.firstElementChild?.classList.remove('areaname_active')
      }
    }
  }

  // 地图内
  if (type === 'inner') {
    this.el.style.cursor = 'pointer'
    //已选中对象
    if (this.selectObj && targetMesh) {
      //如果不是同一个对象

      if (lastObjId != this.selectObj.id) {
        if (lastObjId) {
          const target = this.scene?.getObjectById(lastObjId)
          _unSelectArea(target)
        }
        this.otherProp.mapHandleEvents(selectData, 'mouseenter')
        _selectArea(targetMesh)
        this.LoadRenderer()
      }
    } else {
      if (lastObjId) {
        const target = this.scene?.getObjectById(lastObjId)
        _unSelectArea(target)
        this.LoadRenderer()
      }
    }
  } else {
    this.el.style.cursor = 'default'
    // 没有移入地图 还原已选中元素
    if (this.selectObj) {
      _unSelectArea(this.selectObj)
      this.LoadRenderer()
      this.selectObj = undefined
    }
    this.otherProp.mapHandleEvents(selectData, 'mouseout')
  }
}

// 底图的双击事件
export function __dbclick(this: CreateThreeMap, selectData, type: 'inner' | 'out') {
  switch (type) {
    case 'inner': {
      !this.areaMapProps.mapConfig?.baseConfig?.clickHover?.display && this.downUpperdrill('down', selectData)
      break
    }
    case 'out': {
      // this.downUpperdrill('up')
      break
    }
  }
}

export function __click(this: CreateThreeMap, selectData, type: 'inner' | 'out') {
  switch (type) {
    case 'inner': {
      if (this.areaMapProps.mapConfig?.baseConfig?.clickHover?.display && this.__event?.enable) {
        const clickHover = this.areaMapProps.mapConfig?.baseConfig?.clickHover
        createSubHoverAreaMap.call(this, clickHover, selectData)
      }

      this.otherProp.mapHandleEvents(selectData, 'click')
      break
    }
    case 'out': {
      break
    }
  }
}

// 悬浮区域块的移入事件
export function floatAreablockMove(this: Events) {
  try {
    const floatObject3D = this.target.mapGroud.getObjectByName('区域悬浮块')
    if (floatObject3D) {
      const mesh = floatObject3D.children.filter(item => item.type === 'Mesh')
      const intersects = this.__raycaster.intersectObjects(mesh, true)
      if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
          const intersect = intersects[i],
            targetObj = intersect.object

          if (
            targetObj &&
            ((targetObj.parent && targetObj.parent.name === '区域悬浮块') || targetObj.name === '区域悬浮块')
          ) {
            this.target.el.style.cursor = 'pointer'
            const mesh = this.target.mapObj.getObjectByName(
              targetObj.userData.adcode || targetObj.userData.code
            ) as THREE.Mesh
            __onMouseMove.call(this.target, targetObj.userData || {}, mesh, 'inner')
            this.enable = false
            break
          } else {
            !this.enable && this.wrapperMouseout()
            break
          }
        }
      } else {
        !this.enable && this.wrapperMouseout()
      }
    }
  } catch (error) {
    console.warn(error)
  }
}

// 悬浮块的点击事件
export function floatAreablockClick(this: Events) {
  try {
    const floatObject3D = this.target.mapGroud.getObjectByName('区域悬浮块')
    let selectData
    if (floatObject3D) {
      const mesh = floatObject3D.children.filter(item => item.type === 'Mesh')
      const intersects = this.__raycaster.intersectObjects(mesh, true)
      if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
          const intersect = intersects[i],
            targetObj = intersect.object

          if (
            targetObj &&
            ((targetObj.parent && targetObj.parent.name === '区域悬浮块') || targetObj.name === '区域悬浮块')
          ) {
            selectData = targetObj.userData
          }
        }
      }
    }

    if (selectData) {
      this.target.downUpperdrill('down', selectData)
      this.target.otherProp.mapHandleEvents(selectData, 'click')
    }
  } catch (error) {
    console.warn(error)
  }
}
