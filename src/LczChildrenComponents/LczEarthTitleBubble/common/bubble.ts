import { isEqual } from 'lodash'
import * as THREE from 'three'
import { getImage } from '.'
import Earth from '../../../LczEarth/common/earth'
import EarthEvent from '../../../LczEarth/common/EarthEvent'
import { OutTitleBubble, TitleBubbleData } from '../../../LczEarth/type/child'

type Options = {
  earth: Earth
  titleBubble: OutTitleBubble
  onClick(itemData: TitleBubbleData): void
}

type DataType = { [key: string]: TitleBubbleData }

export default class Bubble {
  earth: Earth
  titleBubble: OutTitleBubble
  lastTitleBubble: OutTitleBubble
  materialCanvasMap: { [key: string]: { canvas: HTMLCanvasElement; material: THREE.SpriteMaterial } } = {}
  bubbleGroup = new THREE.Group()
  bubbles: { [key: string]: THREE.Sprite } = {}
  angleMap = {
    1: [0, 0, 0, 1], // 上往下
    2: [0, 1, 0, 0], // 下往上
    3: [0, 0, 1, 0], // 左往右
    4: [1, 0, 0, 0] // 右往左
  }
  onClick: Options['onClick']

  constructor(options: Options) {
    this.earth = options.earth
    this.titleBubble = options.titleBubble
    this.lastTitleBubble = options.titleBubble
    this.onClick = options.onClick
    this.earth.earthGroup.add(this.bubbleGroup)
    this.bubbleGroup.renderOrder = 3
    this.initTitleBubble()

    this.initBubbleEvent()
  }

  updata(titleBubble: OutTitleBubble) {
    this.titleBubble = titleBubble
    const { data = [], baseConfig } = titleBubble,
      { data: lastData = [], baseConfig: lastBaseConfig } = this.lastTitleBubble
    if (!isEqual(baseConfig, lastBaseConfig)) {
      this.destroyBubbles()
      this.initTitleBubble()
    } else if (!isEqual(data, lastData)) {
      this.updataBubbleData()
    }

    this.lastTitleBubble = titleBubble
  }

  updataBubbleData() {
    const showData = this.currrentData,
      skipName: string[] = [],
      newBubbleData: DataType = {}

    for (const name in this.bubbles) {
      if (showData[name]) skipName.push(name)
    }
    this.destroyBubbles(skipName)

    for (const name in showData) {
      if (!this.bubbles[name]) newBubbleData[name] = showData[name]
    }

    this.initTitleBubble(newBubbleData)
  }

  async initTitleBubble(data?: DataType) {
    data = data || this.currrentData
    const { x = 0, y = 0 } = this.titleBubble.baseConfig?.basicPosition || {},
      { width = 100, height = 100 } = this.titleBubble.baseConfig?.size || {},
      dep = width / height

    this.angleMap = {
      1: [0, 0, 0, height], // 上往下
      2: [0, height, 0, 0], // 下往上
      3: [0, 0, width, 0], // 左往右
      4: [width, 0, 0, 0] // 右往左
    }

    for (const name in data) {
      const itemData = data[name],
        { lng, lat, height = 0 } = itemData,
        material = await this.getMaterial(itemData),
        pos = this.earth.lglt2xyz(lng, lat, height + 101),
        sprite = new THREE.Sprite(material)
      sprite.name = name
      sprite.center = new THREE.Vector2(x, y)
      sprite.position.set(pos.x, pos.y, pos.z)
      sprite.scale.set(6 * dep, 6, 1)
      sprite.userData.currentData = itemData
      this.bubbles[name] = sprite
      this.bubbleGroup.add(sprite)
    }

    this.updataVisibal()
  }

  // 处理标牌在地球后面
  updataVisibal() {
    delete this.earth.childCompUpdataFn[this.titleBubble.id]
    this.bubbleGroup.children.length &&
      (this.earth.childCompUpdataFn[this.titleBubble.id] = {
        fn(this: Bubble) {
          if (this.earth.camera) {
            const cameraPos = this.earth.camera.position,
              cameraPosLen = cameraPos.length()
            for (const name in this.bubbles) {
              const bubble = this.bubbles[name],
                position = bubble.position.clone()
              position.applyMatrix4(this.bubbleGroup.matrixWorld)
              bubble.visible = position.distanceTo(cameraPos) <= cameraPosLen
            }
          }
        },
        target: this
      })
  }

  async getMaterial(itemData: TitleBubbleData) {
    const { name } = itemData,
      opacity = this.titleBubble.baseConfig?.opacity || 0
    let map = this.materialCanvasMap[name]
    if (map) return map.material
    const canvas = document.createElement('canvas')
    await this.drawText(canvas, name)

    map = {
      canvas,
      material: new THREE.SpriteMaterial({
        transparent: true,
        depthTest: false
      })
    }
    map.material.map = new THREE.Texture(canvas)
    map.material.map.needsUpdate = true
    map.material.opacity = opacity / 100
    this.materialCanvasMap[name] = map
    return map.material
  }

  async drawText(canvas: HTMLCanvasElement, name: string) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return false
    const { bgType, bgColor = {}, bgImgUrl, size, border, fontStyle, textOffset } = this.titleBubble.baseConfig || {},
      { color = '#fff', fontFamily = 'Microsoft Yahei', fontSize = 12, fontWeight = 'normal' } = fontStyle || {},
      { width = 100, height = 100 } = size || {}
    canvas.setAttribute('width', '' + width)
    canvas.setAttribute('height', '' + height)
    ctx.clearRect(0, 0, width, height)
    // 绘制背景
    switch (bgType) {
      case 'color':
        if (bgColor.selected === 'single') {
          ctx.fillStyle = bgColor.single
        } else if (bgColor?.gradient?.colors?.length === 1) {
          ctx.fillStyle = bgColor.gradient.colors[0].value
        } else {
          const gradualAngle = bgColor?.gradient?.gradualAngle || 1,
            angle = this.angleMap[gradualAngle]
          const gradient = ctx.createLinearGradient(angle[0], angle[1], angle[2], angle[3])
          bgColor?.gradient?.colors.forEach(item => gradient.addColorStop(item.begins / 100, item.value))
          ctx.fillStyle = gradient
        }
        break
      case 'custom': {
        ctx.fillStyle = 'transparent'
        const img = await getImage(bgImgUrl || '')
        if (img) {
          img.width = width
          img.height = height
          ctx.drawImage(img, 0, 0, width, height)
        }
        break
      }
    }

    ctx.fillRect(0, 0, width, height)

    if (border?.display && border.width) {
      ctx.strokeStyle = border.color
      ctx.lineWidth = border.width
      ctx.strokeRect(0, 0, width, height)
    }
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(name, width / 2 + (textOffset?.x || 0), height / 2 + (textOffset?.y || 0))
  }

  initBubbleEvent() {
    if (this.titleBubble.onClick && this.earth.__event && this.earth.__event.events) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      this.earth.__event.events.click[this.titleBubble.id] = function (this: EarthEvent) {
        const intersects = this.__raycaster.intersectObjects(self.bubbleGroup.children, true)

        if (intersects.length > 0) {
          for (let i = 0; i < intersects.length; i++) {
            const intersect = intersects[i],
              targetObj = intersect.object

            if (
              targetObj &&
              targetObj.type === 'Sprite' &&
              targetObj.userData.currentData &&
              targetObj.name.indexOf('lcz-earth-title-bubble') === 0
            ) {
              const currentData = targetObj.userData.currentData
              self.onClick(currentData)
            }
          }
        }
      }

      this.earth.__event.initEventListeners(true)
    }
  }

  destroyBubbles(skipName: string[] = []) {
    for (const name in this.bubbles) {
      if (skipName.includes(name)) continue
      const bubble = this.bubbles[name],
        currentData = bubble.userData.currentData as TitleBubbleData,
        { material, canvas } = this.materialCanvasMap[name] || {}
      if (material) {
        material.dispose()
        material.map?.dispose()
        canvas.remove()
      }
      if (bubble) {
        bubble.geometry.dispose()
        bubble.material.dispose()
        // @ts-ignore
        bubble.geometry = bubble.material = null
      }
      delete this.bubbles[name]
      delete this.materialCanvasMap[currentData.name]
      this.bubbleGroup.remove(bubble)
    }
  }

  get currrentData() {
    const data = this.titleBubble.data || [],
      dataMap: DataType = {}
    data.forEach(item => {
      const name = this.getName(item)
      !dataMap[name] && (dataMap[name] = item)
    })
    return dataMap
  }

  destroyEvent() {
    if (this.earth.__event && this.earth.__event.events) {
      this.earth.__event.dispose()
      delete this.earth.__event.events.click[this.titleBubble.id]
      this.earth.__event.initEventListeners()
    }
  }

  getName(itemData: TitleBubbleData) {
    const { lng, lat, name } = itemData,
      id = this.titleBubble.id
    return `${id}-${lng}-${lat}-${name}`
  }

  destroy() {
    this.destroyBubbles()

    if (!this.earth.isDestroy) {
      this.earth.earthGroup.remove(this.bubbleGroup)
      delete this.earth.childCompUpdataFn[this.titleBubble.id]
      this.destroyEvent()
    }

    // @ts-ignore
    this.earth = this.titleBubble = this.lastTitleBubble = this.materialCanvasMap = this.bubbleGroup = null
    // @ts-ignore
    this.bubbles = this.angleMap = null
  }
}
