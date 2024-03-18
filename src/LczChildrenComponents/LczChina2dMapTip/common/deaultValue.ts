import { CurrentArea, PromptBoxStyle } from '../../../LczChina2dMap/type/child'

const colorStr = {
  selected: 'single',
  single: 'rgba(255,255,255,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: 'rgba(255,255,255,1)'
      }
    ]
  }
}

const defaultCurrentArea: CurrentArea = {
  manualTrigger: true,
  targetType: 'click',
  autoCarousel: true,
  residenceTime: 5,
  movePause: true,
  sign: {
    display: true,
    width: 80,
    height: 80,
    imgUrl: '',
    rotate: true
  },
  area: {
    display: true,
    color: '#174893',
    borderColor: '#A0CFFE'
  }
}

const defaultPromptBoxStyle: PromptBoxStyle = {
  fixed: true,
  fixedSeat: {
    x: 745,
    y: 315
  },
  fixedPadd: {
    t: 16,
    b: 16,
    l: 16,
    r: 16
  },
  fixedBgConfig: {
    color: colorStr,
    imgUrl: ''
  },
  fixedBorder: {
    display: true,
    color: 'red',
    width: 1
  },
  leftT: {
    seat: { x: 0, y: 0 },
    padd: {
      t: 16,
      b: 16,
      l: 16,
      r: 16
    },
    bgConfig: {
      color: colorStr,
      imgUrl: ''
    },
    border: {
      display: true,
      color: 'red',
      width: 1
    }
  },
  leftB: {
    seat: { x: 0, y: 0 },
    padd: {
      t: 16,
      b: 16,
      l: 16,
      r: 16
    },
    bgConfig: {
      color: colorStr,
      imgUrl: ''
    },
    border: {
      display: true,
      type: 'solid',
      color: 'red',
      width: 1
    }
  },
  rightT: {
    seat: { x: 0, y: 0 },
    padd: {
      t: 16,
      b: 16,
      l: 16,
      r: 16
    },
    bgConfig: {
      color: colorStr,
      imgUrl: ''
    },
    border: {
      display: true,
      color: 'red',
      width: 1
    }
  },
  rightB: {
    seat: { x: 0, y: 0 },
    padd: {
      t: 16,
      b: 16,
      l: 16,
      r: 16
    },
    bgConfig: {
      color: colorStr,
      imgUrl: ''
    },
    border: {
      display: true,
      color: 'red',
      width: 1
    }
  }
}

const defaultTextStyle = {
  fontFamily: '微软雅黑',
  fontSize: 14,
  color: '#fff',
  fontWeight: 'normal',
  letterSpacing: 0
}

export { defaultCurrentArea, defaultPromptBoxStyle, defaultTextStyle }
