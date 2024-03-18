import { generalShadowStyle } from '../../../common/generalValue'
import { TooltipConfig } from '../../../LczChartBar/LczBasicBar/type'
import { GlobalConfig, WordTextStyle } from '../type'

const defaultWordTextStyle: WordTextStyle = {
  fontFamily: 'PingFangSC-Regular',
  maxSize: 20,
  minSize: 12,
  gridsize: 4,
  maxRotat: -90,
  minRotat: 90,
  rotationStep: 1,
  fontWeight: 'normal',
  shadow: generalShadowStyle,
  highlight: {
    display: false,
    focus: false,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'normal',
    shadow: generalShadowStyle
  }
}

const defaultGlobal: GlobalConfig = {
  margin: {
    t: 'center',
    l: 'center'
  },
  backgroundColor: 'rgba(0,0,0,0)',
  wordsStyle: {
    width: 100,
    height: 100,
    shape: 'system',
    systemStyle: 'cardioid',
    customStyle: ''
  },
  wordTextStyle: defaultWordTextStyle
}

const defaultTooltipConfig: TooltipConfig = {
  autoPlay: {
    display: false,
    interval: 3
  },
  hoverTrigger: {
    display: false,
    alwaysShowContent: false
  },
  tooltip: {
    tipposition: {
      offsetType: 'normal',
      xPosition: 0,
      yPosition: 0,
      margin: {
        t: 5,
        r: 7,
        b: 5,
        l: 7
      }
    },
    tipStyle: {
      textStyle: {
        color: '#D5E9FF',
        fontFamily: 'PingFangSC-Regular',
        fontSize: 13,
        fontWeight: 'normal',
        fontStyle: 'normal'
      },
      bgStyle: {
        backgroundColor: 'rgba(0,0,0,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 0,
        borderRadius: 0,
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,0)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        className: ''
      }
    }
  }
}

export { defaultGlobal, defaultWordTextStyle, defaultTooltipConfig }
