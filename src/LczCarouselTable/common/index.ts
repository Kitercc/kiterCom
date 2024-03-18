import { isEqual } from 'lodash'
import { CSSProperties } from 'styled-components'
import { configDisplayCompatible, numberRound } from '../../common/util'
import { BorderConfig, NumberFormat, SerialStyleList, ShadowConfig, StatusBgConfig, StatusTextStyle } from '../type'
import { defaultColBorderStyle, defaultShadow, defaultStatusBgconfig, defaultStatusTextStyle } from './defaultValue'

// 获取 自定义的 样式
export const getColStyle = (columnConfig, i, code) => {
  const colStyle: any = columnConfig[i]
  const { borderStyle } = colStyle
  if (code === 'heard') {
    return {
      width: colStyle.colWidth,
      y: colStyle.horOffset,
      x: colStyle.verOffset,
      marginLeft: colStyle.colSpeed
    }
  }
  const borderDis = configDisplayCompatible(borderStyle, 'borderd')
  return {
    width: colStyle?.colWidth,
    align: colStyle?.alignType,
    y: colStyle.horOffset,
    x: colStyle.verOffset,
    marginLeft: colStyle.colSpeed,
    borderWidth: borderDis ? borderStyle.borderWidth : 0,
    borderColor: borderStyle.borderColor,
    borderRadius: borderStyle.borderRadius
  }
}

export const numberForMat = (num: number, forMat?: NumberFormat) => {
  if (isNaN(Number(num))) return num
  const { percentage = false, round = false, decimal = 0, decollate = true, negativeing = 'minus', zeroFill = true } =
    forMat || {}

  let nums: any = num
  if (forMat?.display) {
    nums = percentage ? nums * 100 : nums

    if (round) {
      nums = numberRound(nums, decimal)
    } else {
      nums = parseFloat(((nums * Math.pow(10, decimal)) / Math.pow(10, decimal)).toString())
        .toFixed(decimal + 1)
        .slice(0, -1)

      if (decimal == 0) {
        nums = Number(nums)
      }
    }
    nums = nums.toString()

    const parts = nums.split('.')
    const regExp = new RegExp('(\\d)(?=(\\d{3})+(?!\\d))', 'g')

    parts[0] = decollate ? parts[0].replace(regExp, '$1' + ',') : parts[0]
    nums = parts.join('.')

    const dec = String(nums).split('.')
    if (!zeroFill && dec && dec[1]) {
      if (Number(dec[1]) === 0) {
        nums = dec[0]
      } else {
        const dec1 = String(Number(`0.${dec[1]}`)).split('.')[1]
        nums = [dec[0], dec1].join('.')
      }
    }

    nums = percentage ? nums + '%' : nums

    if (num < 0) {
      switch (negativeing) {
        case 'minus':
          return nums
        case 'brackets':
          return `(${nums.replace('-', '')})`
        case 'abs':
          return nums.replace('-', '')
      }
    }

    return nums
  }
  return num
}

/*
 // 参数：
 // startColor：开始颜色hex
 // endColor：结束颜色hex
 // step:几个阶级（几步）
 */
export const gradientColor = function (startColor, endColor, step) {
  const startRGB = colorRgb(startColor) //转换为rgb数组模式

  const startR = startRGB[0]
  const startG = startRGB[1]
  const startB = startRGB[2]
  const startA = startRGB[3] || 1
  const endRGB = colorRgb(endColor)
  const endR = endRGB[0]
  const endG = endRGB[1]
  const endB = endRGB[2]
  const endA = endRGB[3] || 1
  const sR = (endR - startR) / step //总差值
  const sG = (endG - startG) / step
  const sB = (endB - startB) / step
  const sA = (endA - startA) / step

  const colorArr: string[] = []
  for (let i = 0; i < step; i++) {
    //计算每一步的hex值
    const hex: string = colorHex(
      'rgba(' +
        parseInt(sR * i + startR) +
        ',' +
        parseInt(sG * i + startG) +
        ',' +
        parseInt(sB * i + startB) +
        ',' +
        parseFloat(sA * i + startA).toFixed(1) +
        ')'
    )
    colorArr.push(hex)
  }
  return colorArr
}
// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
const colorRgb = function (sColor) {
  if (sColor.indexOf('rgb') >= 0) {
    const strArr = sColor.split('(')[1].split(')')[0].split(',').map(Number)
    sColor = rgbaToHexColor(strArr)
  }

  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/
  sColor = sColor.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //处理六位的颜色值
    const sColorChange: any[] = []
    if (sColor.length === 7) {
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
    }

    if (sColor.length === 9) {
      for (let i = 1; i < 9; i += 2) {
        if (sColorChange.length < 3) {
          sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        } else {
          sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)) / 255)
        }
      }
    }
    return sColorChange
  } else {
    return sColor
  }
}
// 将rgb表示方式转换为hex表示方式
const colorHex = function (rgb) {
  const _this = rgb
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/
  if (/^(rgb|RGB)/.test(_this)) {
    const aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, '').split(',')
    let strHex = '#'
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16)
      hex = +hex < 10 ? 0 + '' + hex : hex // 保证每个rgb的值为2位
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
    }
    if (strHex.length !== 7) {
      strHex = _this
    }
    return strHex
  } else if (reg.test(_this)) {
    const aNum = _this.replace(/#/, '').split('')
    if (aNum.length === 6) {
      return _this
    } else if (aNum.length === 3) {
      let numHex = '#'
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i]
      }
      return numHex
    }
  } else {
    return _this
  }
}

const rgbaToHexColor = function (rgbaArray, alphaMaxVal = 1) {
  //补位警号
  return (
    '#' +
    rgbaArray
      .map((chanel, index) => {
        let hexNum = ''
        if (index === 3) {
          //这是alpha通道
          hexNum = Number(Math.round((chanel * 255) / alphaMaxVal)).toString(16)
        } else {
          //普通通道直接转换
          hexNum = Number(chanel).toString(16)
        }
        return hexNum.length === 1 ? '0' + hexNum : hexNum //这里解决了部分通道数字小于10的情况进行补位
      })
      .join('')
  )
}

// 获取指定序号样式
export const getSerialStyle = function (
  item: any,
  index: number,
  serialStyleList: SerialStyleList[] = []
): { bgStyle: CSSProperties; valStyle: CSSProperties } {
  const _style: { bgStyle: CSSProperties; valStyle: CSSProperties } = { bgStyle: {}, valStyle: {} }
  let _bgStyle: StatusBgConfig | null = null
  let _valStyle: StatusTextStyle | null = null
  let _borderConfig: BorderConfig | null = null
  let _shadowConfig: ShadowConfig | null = null

  if (serialStyleList.length <= 0) return _style

  const _nowId = item._id
  const _nullList = serialStyleList.filter(
    _item =>
      String(_item.serialVal) === '' ||
      String(_item.serialVal) === 'null' ||
      String(_item.serialVal) === 'undefined' ||
      String(_item.serialVal) === 'NaN'
  )
  const _findList = serialStyleList.filter(_item => _item.serialVal === _nowId)

  if (_nullList.length > 0) {
    _bgStyle = _nullList[index % _nullList.length].bgConfig || defaultStatusBgconfig
    _valStyle = _nullList[index % _nullList.length].textStyle || defaultStatusTextStyle
    _borderConfig = _nullList[index % _nullList.length].borderConfig || defaultColBorderStyle
    _shadowConfig = _nullList[index % _nullList.length].shadowConfig || defaultShadow
  }

  if (_findList.length > 0) {
    const _findItem = _findList[_findList.length - 1]
    _bgStyle = _findItem.bgConfig || defaultStatusBgconfig
    _valStyle = _findItem.textStyle || defaultStatusTextStyle
    _borderConfig = _findItem.borderConfig || defaultColBorderStyle
    _shadowConfig = _findItem.shadowConfig || defaultShadow
  }

  if (_bgStyle && _bgStyle.display) {
    _style.bgStyle.transform = `translate(calc( -50% + ${_bgStyle.xOffset}px ), calc( -50% + ${_bgStyle.yOffset}px ))`
    _style.bgStyle.width = _bgStyle.width
    _style.bgStyle.height = _bgStyle.height
    _style.bgStyle.borderRadius = _bgStyle.radius
    _style.bgStyle.backgroundColor = _bgStyle.color

    if (_bgStyle.imgUrl) {
      _style.bgStyle.backgroundImage = `url(${_bgStyle.imgUrl})`
    }
  }

  const borderDis = configDisplayCompatible(_borderConfig, 'borderd')
  if (_borderConfig && borderDis) {
    _style.bgStyle.border = `${_borderConfig.borderWidth}px solid ${_borderConfig.borderColor}`
  } else {
    _style.bgStyle.border = 'none'
  }

  if (_valStyle) {
    const { display: textDis, xOffset, yOffset, ...otherStyle } = _valStyle

    if (textDis) {
      _style.valStyle.transform = `translate( calc( -50% + ${xOffset}px ), calc( -50% + ${yOffset}px ))`
      _style.valStyle = { ..._style.valStyle, ...otherStyle }
    }
  }

  if (_shadowConfig && _shadowConfig.display) {
    _style.valStyle.textShadow = `${_shadowConfig.xOffset}px ${_shadowConfig.yOffset}px ${_shadowConfig.vague}px ${_shadowConfig.color}`
  }

  return _style
}

export const compareTableData = (oldData: any[], newData: any[], keys: string[] = []) => {
  const oVal = oldData.map(v => {
    const item = {}
    for (const key in v) {
      if (keys.includes(key)) item[key] = v[key]
    }
    return item
  })

  const nVal = newData.map(v => {
    const item = {}
    for (const key in v) {
      if (keys.includes(key)) item[key] = v[key]
    }
    return item
  })

  return !isEqual(oVal, nVal)
}
