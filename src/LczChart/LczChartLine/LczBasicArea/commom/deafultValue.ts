import { generalLegendConfig, generalTitleConfig, generalToolConfig } from '../../../common/generalValue'
import { BrokenLine, DataMarker, AreaGlobalConfig, AreaValueLabel, AreaStyle } from '../type'

const defaultGlobal: AreaGlobalConfig = {
  margin: { t: 45, r: 25, b: 20, l: 25 },
  bgColor: 'rgba(0,0,0,0)',
  titleConfig: generalTitleConfig,
  legendConfig: generalLegendConfig,
  toolConfig: generalToolConfig,
  rotationAnimate: {
    display: false,
    showNumer: 4,
    updateNumber: 1,
    interval: 3,
    dragPan: false
  },
  dataAnimate: true
}

const c = {
  selected: 'single',
  single: 'rgba(0,178,255,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: 'rgba(61, 153, 252,1)'
      },
      {
        begins: 100,
        value: '#ad6405'
      }
    ]
  }
}
const defaultAreaStyle: AreaStyle = {
  areaSyncColor: true,
  color: c,
  startOrigin: 'start',
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  opacity: 0.2
}

//折线
const deafultBrokenLineValue: BrokenLine = {
  type: 'solid', // solid dotted dashed
  color: '#00B2FF',
  lineWidth: 2,
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  opacity: 1,
  step: 'none',
  smooth: false,
  connectNulls: false
}

//数据标记
const defaultDataMarkerValue: DataMarker = {
  display: true,
  xOffset: 0,
  yOffset: 0,
  width: 4,
  height: 4,
  rotate: 0,
  markStyle: 'system',
  // system
  typeStyle: 'emptyCircle', //'emptyCircle(单圆)','circle（双圆）', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
  syncColor: true,
  borderColor: '#00B2FF',
  lineWidth: 0,
  color: '#00B2FF',
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,0)',
  //custom
  img: ''
}

//面积数据标记
const defaulAreaDataMarkerValue: DataMarker = {
  display: false,
  xOffset: 0,
  yOffset: 0,
  width: 4,
  height: 4,
  rotate: 0,
  markStyle: 'system',
  // system
  typeStyle: 'emptyCircle', //'emptyCircle(单圆)','circle（双圆）', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
  syncColor: true,
  borderColor: '#00B2FF',
  lineWidth: 0,
  color: '#00B2FF',
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,0)',
  //custom
  img: ''
}

//数值标签
const defaultValueLabelValue: AreaValueLabel = {
  display: false,
  valueStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'normal',
    rotate: 0
  },
  linePosition: {
    position: 'top', //left right bottom inside
    xOffset: 0,
    yOffset: 0
  },
  format: {
    display: false,
    decollate: true,
    decimal: 0,
    round: true,
    percentage: false,
    negativeing: 'minus' //  负数显示值  负号 minus  括号 brackets  绝对值  abs
  }
}
export {
  defaultGlobal,
  deafultBrokenLineValue,
  defaultDataMarkerValue,
  defaultValueLabelValue,
  defaultAreaStyle,
  defaulAreaDataMarkerValue
}
