import mAMap from '../../../LczAMap/common/AMap'
import { OutTextLabel, TextLabelDataMap } from '../../../LczAMap/type/child'
import { getColorObj } from '../../../common/util'

interface TextLabelProps {
  mAmap: mAMap
}

export default class TextLabel {
  mAmap: mAMap
  map: any
  textList: Map<string, any>
  textLabel?: OutTextLabel
  constructor(options: TextLabelProps) {
    this.mAmap = options.mAmap
    this.map = options.mAmap.map
    this.textList = new Map()
  }

  drawLabels(textLabel: OutTextLabel) {
    this.textLabel = textLabel
    if (this.textList.size === 0) {
      this.initList()
    } else {
      this.mergeList()
    }
  }

  mergeList() {
    const data = this.textLabel?.data || []
    for (const [key, val] of this.textList) {
      const findData = data.find(item => `${item.lat}|${item.lng}` === key)
      if (!findData) {
        this.textList.delete(key)
        val.remove()
      }
    }

    for (let i = 0; i < data.length; i++) {
      const item = data[i],
        name = `${item.lat}|${item.lng}`,
        textItem = this.textList.get(name),
        textOption = this.getLabelStyle(item)
      if (textItem) {
        textItem.setStyle(textOption.style)
        textItem.setText(item.value)
        textItem.setOffset(textOption.offset)
        textItem.setAngle(item.rotate || 0)
        textItem.setzIndex(textOption.zIndex)
      } else {
        const textCase = new AMap.Text(textOption)
        textCase.setMap(this.map)
        this.textList.set(name, textCase)
      }
    }
  }

  initList() {
    const data = this.textLabel?.data || []

    data.forEach(item => {
      const name = `${item.lat}|${item.lng}`,
        textOption = this.getLabelStyle(item),
        textCase = new AMap.Text(textOption)

      if (!this.textList.get(name)) {
        textCase.setMap(this.map)
        this.textList.set(name, textCase)
      }
    })
  }

  getLabelStyle(item: TextLabelDataMap) {
    const { globalConfig, globalStyle, offset, textStyle } = this.textLabel || {}
    const textOption = {
      text: item.value,
      anchor: 'center',
      zIndex: globalConfig?.level || 1,
      zooms: [globalConfig?.viewRange.min || 2, globalConfig?.viewRange.max || 30],
      position: [item.lng, item.lat],
      angle: item.rotate || 0,
      offset: new AMap.Pixel(offset?.x || 0, offset?.y || 0),
      style: {
        'font-family': textStyle?.fontFamily,
        color: textStyle?.color,
        'font-size': `${textStyle?.fontSize}px`,
        'font-weight': textStyle?.fontWeight,
        'letter-spacing': `${textStyle?.letterSpacing}px`,
        overflow: 'initial',
        'text-overflow': 'initial',
        'text-align': 'center',
        'line-height': 1.2
      }
    }

    if (globalStyle?.display) {
      const { bgConfig, stroke, padding, size } = globalStyle,
        { color, radius } = bgConfig || {}

      const { color: _color, colorType } = getColorObj(color)
      if (colorType === 'single') {
        textOption.style['background-color'] = _color
      } else {
        textOption.style['background'] = `linear-gradient( ${_color} )`
      }
      textOption.style['border-radius'] = `${radius}px`

      textOption.style['padding'] = `${padding?.y || 0}px ${padding?.x || 0}px`

      if (stroke?.display) {
        textOption.style['border'] = `${stroke.width}px solid ${stroke.color}`
      } else {
        textOption.style['border'] = 'none'
      }

      if (size?.width !== null && !isNaN(Number(size?.width))) textOption.style['width'] = `${size?.width}px`
      if (size?.height !== null && !isNaN(Number(size?.height))) textOption.style['height'] = `${size?.height}px`
    } else {
      textOption.style['background-color'] = 'transparent'
      textOption.style['border-radius'] = '0px'
      textOption.style['border'] = 'none'
      textOption.style['padding'] = 0
    }

    return textOption
  }

  destroy() {
    for (const [, val] of this.textList) {
      val.remove()
    }

    //@ts-ignore
    ;(this.mAmap = null), (this.textLabel = null)
    this.map = null
    this.textList.clear()
  }
}
