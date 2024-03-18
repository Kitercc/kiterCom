import { MapConfig, Transformation } from '../type'

const defaultMapConfig: MapConfig = {
  range: {
    source: 'system',
    adcode: { value: '100000' },
    uploadData: {}
  },
  showMultistage: false,
  drillDown: true,
  drillType: 'dblclick',
  upperType: 'operation_blank',
  wheelZoom: false,
  southChinaSea: {
    displayType: 'mosaic',
    fillColor: 'rgba(0,0,0,0)',
    storke: '#FFFFFF'
  },
  callbackBtn: {
    content: '返回',
    position: { x: 0, y: 0 },
    fontStyle: {
      fontFamily: 'PingFangSC-Regular',
      fontSize: 12,
      color: '#fff',
      fontWeight: 'normal',
      letterSpacing: 0
    },
    bgConfig: {
      color: '',
      imgUrl: '',
      width: 40,
      height: 20,
      radius: 4
    },
    border: {
      display: true,
      color: 'skyblue',
      width: 1
    }
  },
  bgConfig: {
    display: false,
    colorConfig: { display: true, range: 'global', starColor: '#FF1649', endColor: '#000000', direction: 20 },
    texture: {
      display: true,
      imgUrl: '',
      repeat: false,
      opacity: 1,
      width: 8,
      height: 8
    }
  },
  boundary: {
    display: true,
    color: '#82BCFF',
    width: 1
  },
  areaName: {
    display: true,
    reversion: false,
    fontFamily: '微软雅黑',
    fontSize: 12,
    color: '#fff',
    fontWeight: 400,
    letterSpacing: 0,
    textSeries: []
  }
}

const defaultTransformation: Transformation = {
  perspective: false,
  rotate: {
    x: 0,
    y: 0,
    z: 0
  }
}

export { defaultMapConfig, defaultTransformation }
