import { cloneDeep } from 'lodash'
import { CSSProperties } from 'react'
import { colorFunc } from '../../common/util'
import { currentNumberConfig, NameConfig, NumberConfig, SuffixConfig } from '../type'

export function getCardContainStyle(
  css: { [key: string]: CSSProperties },
  config: NumberConfig | currentNumberConfig | NameConfig,
  cssNames: { [key: string]: string },
  show: { [key: string]: boolean },
  type = ''
) {
  function fillColor(obj: CSSProperties, colors: { color: string; colorType: string }) {
    if (colors.colorType === 'single') {
      obj.color = colors.color
    } else {
      obj.backgroundImage = colors.color
    }
  }

  switch (type) {
    case 'current-num': {
      const _config = cloneDeep(config) as currentNumberConfig
      const suffix = _config.suffixConfig || ({} as SuffixConfig)
      css.currentNumWrapper.left = `calc( 50% + ${_config.xOffset}px )`
      css.currentNumWrapper.top = `calc( 50% + ${_config.yOffset}px )`
      if (!_config.display) show.currentNum = false
      if (!suffix.display) show.currentSuffix = false

      const numColor = colorFunc(_config.textStyle?.color)
      delete _config.textStyle?.color
      Object.assign(css.currentNum, _config.textStyle)
      fillColor(css.currentNum, numColor)
      cssNames.currentNum += numColor.colorType

      if (suffix.display) {
        css.currentSuffix.paddingLeft = suffix.interval
        css.currentSuffix.fontFamily = suffix.fontFamily
        css.currentSuffix.fontSize = suffix.fontSize
        css.currentSuffix.fontWeight = suffix.fontWeight
        css.currentSuffix.letterSpacing = suffix.letterSpacing
        css.currentSuffix.content = suffix.suffixVal
        css.currentSuffix.transform = `translateY(${suffix.yOffset}px)`
        const numSuffixColor = colorFunc(suffix.color)
        fillColor(css.currentSuffix, numSuffixColor)
        cssNames.currentSuffix += numSuffixColor.colorType
      }
      break
    }
    case 'current-name': {
      const _config = cloneDeep(config) as NameConfig
      if (!_config.display) show.currentName = false

      const nameColors = colorFunc(_config.textStyle?.color)
      delete _config.textStyle?.color
      cssNames.currentName += nameColors.colorType
      Object.assign(css.currentName, _config.textStyle)
      fillColor(css.currentName, nameColors)
      css.currentName.left = `calc( 50% + ${_config.xOffset}px )`
      css.currentName.top = `calc( 50% + ${_config.yOffset}px )`
      break
    }
    case 'normal-num': {
      const _config = cloneDeep(config) as NumberConfig
      const suffix = _config.suffixConfig || ({} as SuffixConfig)
      css.normalNumWrapper.left = `calc( 50% + ${_config.xOffset}px )`
      css.normalNumWrapper.top = `calc( 50% + ${_config.yOffset}px )`
      if (!_config.display) show.normalNum = false

      if (!suffix.display) show.normalSuffix = false

      const numColor = colorFunc(_config.textStyle?.color)
      delete _config.textStyle?.color
      Object.assign(css.normalNum, _config.textStyle)
      fillColor(css.normalNum, numColor)
      cssNames.normalNum += numColor.colorType

      if (suffix.display) {
        css.normalSuffix.paddingLeft = suffix.interval
        css.normalSuffix.fontFamily = suffix.fontFamily
        css.normalSuffix.fontSize = suffix.fontSize
        css.normalSuffix.fontWeight = suffix.fontWeight
        css.normalSuffix.letterSpacing = suffix.letterSpacing
        css.normalSuffix.content = suffix.suffixVal
        css.normalSuffix.transform = `translateY(${suffix.yOffset}px)`
        const numSuffixColor = colorFunc(suffix.color)
        fillColor(css.normalSuffix, numSuffixColor)
        cssNames.normalSuffix += numSuffixColor.colorType
      }
      break
    }
    case 'normal-name': {
      const _config = cloneDeep(config) as NameConfig
      if (!_config.display) show.normalName = false

      const nameColors = colorFunc(_config.textStyle?.color)
      delete _config.textStyle?.color
      cssNames.normalName += nameColors.colorType
      Object.assign(css.normalName, _config.textStyle)
      fillColor(css.normalName, nameColors)
      css.normalName.left = `calc( 50% + ${_config.xOffset}px )`
      css.normalName.top = `calc( 50% + ${_config.yOffset}px )`
      break
    }
  }
}
