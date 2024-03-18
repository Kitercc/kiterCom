import { ControllerConfig, ShaftGlobalConfig } from '../type'

const defaultShaftGlobalConfig: ShaftGlobalConfig = {
  mode: 'horizontal', //'horizontal' | 'vertical'
  labelSpace: 65,
  timeShaftMain: {
    height: 6,
    backgroundColor: 'rgb(28, 45, 76)',
    lineColor: ''
  },
  shaftTextLabel: {
    display: false,
    offset: {
      xOffset: 0,
      yOffset: 0
    },
    textStyle: {
      fontFamily: 'Microsoft Yahei',
      fontSize: 16,
      color: 'rgba(68,106,255,1)',
      fontWeight: 'normal',
      letterSpacing: 0,
      angle: 0
    }
  },
  shaftMoveLabel: {
    display: true,
    yOffset: 10,
    textStyle: {
      fontFamily: 'Microsoft Yahei',
      fontSize: 16,
      color: 'rgba(68,106,255,1)',
      fontWeight: 'normal',
      letterSpacing: 0
    },

    backgroundFrame: {
      display: false,
      size: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      },
      backgroundColor: 'red',
      backgroundImg: '',
      radius: 0
    }
  }
}

const defaultControllerConfig: ControllerConfig = {
  active: { value: '' },
  loopPlay: true,
  autoPlay: true,
  duration: 5,
  progressCursor: {
    image: '',
    size: {
      width: 20,
      height: 20
    }
  },
  playBtn: {
    gap: 10,
    playConfig: {
      image: 'https://easyv.assets.dtstack.com/components/static-image/timeLineV2/play.png',
      size: {
        width: 20,
        height: 20
      }
    },
    stopConfig: {
      image: 'https://easyv.assets.dtstack.com/components/static-image/timeLineV2/stop.png',
      size: {
        width: 20,
        height: 20
      }
    }
  }
}

export { defaultShaftGlobalConfig, defaultControllerConfig }
