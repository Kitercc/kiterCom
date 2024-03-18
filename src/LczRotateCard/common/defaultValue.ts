import { FormatConfig } from '../../LczIndicatorsTrends/type'
import {
  AnimateConfig,
  CameraPosition,
  Carousel,
  GlobalConfig,
  NormalCard,
  TrackConfig,
  SuffixConfig,
  HoverStyle,
  CurrentStyle,
  ArrowConfig
} from '../type'

const defailtGlobal: GlobalConfig = {
  type: 'index',
  index: { value: 0 },
  defaultId: { value: '1' },
  allAlongpositive: true
}

const defaultCarousel: Carousel = {
  display: true,
  stopCondition: true,
  speed: 10, // s
  position: 1, // 1顺时针 -1 逆时针
  movePause: true
}

const defaultAnimate: AnimateConfig = {
  switchSpeed: 1500,
  carousel: defaultCarousel
}

const defaultTrackConfig: TrackConfig = {
  radius: 800,
  rearNot: false,
  proportion: 0
}

const defaultCameraPosition: CameraPosition = {
  x: 0,
  y: 0,
  z: 2000
}

const defaultSuffixConfig: SuffixConfig = {
  display: false,
  suffixVal: '/单位',
  yOffset: 0,
  fontFamily: '时尚中黑简',
  fontSize: 14,
  interval: 2,
  color: {
    selected: 'gradient',
    single: '#99F6FF',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: '#99F6FF'
        },
        {
          begins: 0,
          value: '#08D7FC'
        }
      ]
    }
  },
  fontWeight: 'normal',
  letterSpacing: 0
}

const defaultNormalCard: NormalCard = {
  width: 200,
  height: 200,
  radius: 0,
  opacity: 0.5,
  bgConfig: {
    display: true,
    color: {
      selected: 'single',
      single: 'rgba(2,13,37,1)',
      gradient: {
        gradualAngle: 90,
        colors: [
          {
            begins: 0,
            value: 'rgba(2,13,37,1)'
          },
          {
            begins: 0,
            value: 'rgba(2,13,37,1)'
          }
        ]
      }
    },
    imgUrl: ''
  },
  border: {
    display: false,
    color: '#04B1F0',
    width: 1
  },
  outShadow: {
    display: false,
    color: 'rgba(0,0,0,0.5)',
    x: 0,
    y: 2,
    vague: 4,
    extend: 0
  },
  inShadow: { display: true, color: '#04B1F0', x: 0, y: 2, vague: 22, extend: 0 }
}

const defaultHoverStyle: HoverStyle = {
  display: false,
  opacity: 100,
  zoom: 1,
  yOffset: 0,
  bgConfig: {
    display: true,
    color: '#0A235A',
    imgUrl: ''
  },
  border: {
    display: false,
    color: '#04B1F0',
    width: 1
  }
}

const defaultCurrentStyle: CurrentStyle = {
  display: false,
  opacity: 1,
  zoom: 1,
  yOffset: 0,
  bgConfig: {
    display: true,
    color: {
      selected: 'single',
      single: '#0A235A',
      gradient: {
        gradualAngle: 90,
        colors: [
          {
            begins: 0,
            value: '#0A235A'
          },
          {
            begins: 0,
            value: '#0A235A'
          }
        ]
      }
    },
    imgUrl: ''
  },
  border: {
    display: false,
    color: '#04B1F0',
    width: 1
  }
}

const defaultArrowConfig: ArrowConfig = {
  display: false,
  spacing: 20,
  yOffset: 0,
  showType: 'all',
  arrowIconType: 'custom',
  iconValue: '',
  iconSize: 56,
  iconColor: {
    selected: 'single',
    single: '#99F6FF',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: '#99F6FF'
        },
        {
          begins: 0,
          value: '#08D7FC'
        }
      ]
    }
  },
  imgUrl: '',
  imgWidth: 56,
  imgHeight: 56
}

const defaultTextStyle = {
  fontFamily: '微软雅黑',
  fontSize: 14,
  color: '#fff',
  fontWeight: 'normal',
  letterSpacing: 0
}
const defaultFormat: FormatConfig = {
  display: true,
  thousandth: true,
  numDo: 0, // 保留小数 小数点位数
  rounding: true, // 四舍五入
  percentage: false,
  negativeing: 'minus' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
}

export {
  defailtGlobal,
  defaultAnimate,
  defaultCarousel,
  defaultTrackConfig,
  defaultCameraPosition,
  defaultNormalCard,
  defaultSuffixConfig,
  defaultHoverStyle,
  defaultCurrentStyle,
  defaultArrowConfig,
  defaultTextStyle,
  defaultFormat
}
