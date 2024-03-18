import {
  ArrowConfig,
  GlobalConfig,
  IconConfig,
  LineStyle,
  SearchConfig,
  StyleConfig,
  TextBox,
  ParentNode,
  Icons
} from '../type'

const defaultGlobal: GlobalConfig = {
  current: 'first',
  defaultId: { value: '' },
  isleafVal: '1',
  parentSelect: false,
  accordionMode: false,
  connectLine: {
    display: false,
    color: '#D8E0E9',
    width: 1
  },
  textStyle: {
    fontFamily: 'PingFangSC-Regular',
    letterSpacing: 0
  }
}

const defaultTextBox: TextBox = {
  bgColor: '#15181C',
  btnColor: '#CCCCCC',
  borderConfig: {
    display: true,
    color: '#313337',
    width: 1,
    hoverColor: '#3D99FC',
    focusColor: '#3D99FC'
  },
  searchTextStyle: {
    placeholder: '搜索',
    fontSize: 13,
    placeholderColor: '#C9CFD7',
    textColor: '#D8E0E9',
    mateColor: '#3D99FC',
    fontWeight: 'normal'
  }
}

const defaultSearchConfig: SearchConfig = {
  display: true,
  height: 32,
  speed: 12,
  textBox: defaultTextBox
}

const defaultArrowConfig: ArrowConfig = {
  speed: 8,
  size: 16,
  icon: 'filled',
  color: '#C8D0D8',
  hoverColor: '#C8D0D8',
  focusColor: '#3D99FC'
}

const defaultLineStyle: LineStyle = {
  indent: 20,
  lineHeight: 32,
  lineSpeed: 8,
  hoverBgColor: {},
  focusBgColor: {}
}

const defaultStyleConfig: StyleConfig = {
  fontSize: 14,
  color: '#D8E0E9',
  fontWeight: 'normal',
  hoverStyle: {
    display: false,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'normal'
  },
  focusStyle: {
    display: true,
    fontSize: 14,
    color: '#3D99FC',
    fontWeight: 'normal'
  }
}

const defaultParentNode: ParentNode = {
  display: true,
  parentNodeType: 'system',
  stowed: {
    iconValue: 'wenjianjiastowed',
    color: '#D8D8D8',
    hoverColor: '#D8D8D8',
    focusColor: '#3D99FC',
    imgUrl: '',
    hoverImgUrl: '',
    focusImgUrl: ''
  },
  expand: {
    iconValue: 'wenjianjiaexpand',
    color: '#D8D8D8',
    hoverColor: '#D8D8D8',
    focusColor: '#3D99FC',
    imgUrl: '',
    hoverImgUrl: '',
    focusImgUrl: ''
  }
}

const defaultChildNode: Icons = {
  display: true,
  nodeType: 'system',
  iconValue: '&#845715;|1',
  color: '#D8D8D8',
  hoverColor: '#D8D8D8',
  focusColor: '#3D99FC',
  imgUrl: '',
  hoverImgUrl: '',
  focusImgUrl: ''
}

const defaultIconConfig: IconConfig = {
  display: false,
  width: 16,
  height: 16,
  parentNode: defaultParentNode,
  childNode: defaultChildNode
}

export {
  defaultGlobal,
  defaultSearchConfig,
  defaultTextBox,
  defaultArrowConfig,
  defaultLineStyle,
  defaultStyleConfig,
  defaultIconConfig,
  defaultParentNode,
  defaultChildNode
}
