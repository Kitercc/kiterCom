import {
  CurrentTime,
  CutdownArea,
  CutoffRule,
  DateChoiceSection,
  DateDefaultValue,
  DatePickerConfig,
  DefaultStyle,
  DisabledArea,
  ExtendArea,
  GlobalStyle,
  GolbalTextStyle,
  PanelHead,
  PickerBoder,
  RapidOption,
  SelectedArea,
  TextBoxConfig
} from '../type'

const defaultTextBoxConfig: TextBoxConfig = {
  sectionSymbl: '至', // 区间分割符
  leftAndRightMargin: 14, //左右边距
  boxBgColor: '#15181C', //背景颜色
  borderRadius: 0, // 边框圆角
  // 边框样式
  textBoxBorder: {
    display: true,
    borderColor: '#313337', // 边框颜色
    borderWidth: 1, // 边框宽度
    boxHoverBorderC: '#3D99FC', // 边框悬浮色
    boxFocusBorderC: '#3D99FC' // 边框激活色
  },
  // 文本样式
  inputTextStyle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'normal',
    placeholderColor: '#5F6975'
  },

  // 日历图标样式
  boxIcon: {
    display: true,
    boxIconLocation: 'left',
    boxIconSize: 16,
    boxIconColor: '#3D99FC'
  },
  // 清空图标设置
  clearIcon: {
    display: true,
    iconSize: 16,
    color: '	#C8D0D8'
  }
}

const defaultPickerBoder: PickerBoder = {
  display: true,
  color: '#313337',
  width: 1
}
const defaultCutoffRule: CutoffRule = {
  color: '#313337',
  width: 1
}
const defaultPanelHead: PanelHead = {
  fontSize: 15,
  fontWeight: 'bold',
  defaultColor: '#C8D0D8',
  hoverColor: '#3D99FC',
  toggleButton: {
    color: '#C8D0D8',
    hoverColor: '#FFFFFF'
  }
}
const defaultDefaultStyle: DefaultStyle = {
  fontSize: 14,
  fontWeight: 'normal',
  color: '#C8D0D8',
  notTodayColor: '#333333',
  bgHoverColor: '#2B323B',
  hoverColor: '#C8D0D8'
}
const defaultCurrentTime: CurrentTime = {
  display: true,
  color: '#3D99FC',
  bgcolor: 'rgba(255,255,255,0)',
  currrentTimeBorder: {
    display: true,
    color: '#3D99FC',
    width: 1
  }
}
const defaultSelectedArea: SelectedArea = {
  bgcolor: '#2B323B',
  selectTime: {
    color: '#FFFFFF',
    bgcolor: '#3D99FC'
  }
}
const defaultExtendArea: ExtendArea = {
  display: true,
  extendAreaBorder: {
    display: true,
    borderType: 'dashed',
    color: '#3D99FC',
    width: 1
  }
}
const defaultCutdownArea: CutdownArea = {
  display: true,
  bgcolor: '#324459'
}
const defaultDisabledArea: DisabledArea = {
  color: 'rgba(200, 208, 216, .1)',
  bgcolor: '#2B323B'
}
const defaultRapidOption: RapidOption = {
  display: true,
  location: 'left',
  width: 120,
  areaMargin: {
    topMargin: 16,
    bottomMargin: 16,
    leftMargin: 16,
    rightMargin: 16
  },
  optionMargin: 12,
  rapidTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#C8D0D8',
    rapidTextHoverStyle: {
      display: true,
      fontSize: 14,
      fontWeight: 'normal',
      color: 'rgba(61, 153, 252, 1)'
    }
  },
  rapidSeries: []
}

const defaultDatePickerConfig: DatePickerConfig = {
  pickerTopOffset: 8,
  pickerAlign: 'left',
  pickerLeftOffset: 0,
  pickerBgColor: '#15181C',
  PickerRadius: 0,
  //选择面板边框
  pickerBoder: defaultPickerBoder,
  //选择面板分割线
  cutoffRule: defaultCutoffRule,
  //选择面板面板头
  panelHead: defaultPanelHead,
  //默认样式
  defaultStyle: defaultDefaultStyle,
  //当前时间样式
  currentTime: defaultCurrentTime,
  //选中区域样式
  selectedArea: defaultSelectedArea,
  //延伸区域样式
  extendArea: defaultExtendArea,
  //缩短区域样式
  cutdownArea: defaultCutdownArea,
  //禁用区域
  disabledArea: defaultDisabledArea,
  //快捷选项
  rapidOption: defaultRapidOption
}

const defaultDateDefaultValue: DateDefaultValue = {
  display: true,
  dateStartTime: { value: '' },
  dateEndTime: { value: '' }
}
const defaultDateChoiceSection: DateChoiceSection = {
  display: false,
  dateMinTime: { value: '' },
  dateMaxTime: { value: '' }
}
const defaultGolbalTextStyle: GolbalTextStyle = {
  fontFamily: 'PingFang-SC Regular',
  letterSpacing: 0
}

const defaultGlobalStyle: GlobalStyle = {
  pickerType: 'YYYY-MM-DD',
  startIsNull: false,
  endIsNull: false,
  dateDefaultValue: defaultDateDefaultValue, // 日期可选范围
  dateChoiceSection: defaultDateChoiceSection,
  golbalTextStyle: defaultGolbalTextStyle
}

export {
  defaultTextBoxConfig,
  defaultDatePickerConfig,
  defaultPickerBoder,
  defaultCutoffRule,
  defaultPanelHead,
  defaultDefaultStyle,
  defaultCurrentTime,
  defaultSelectedArea,
  defaultExtendArea,
  defaultCutdownArea,
  defaultDisabledArea,
  defaultRapidOption,
  defaultGlobalStyle,
  defaultDateDefaultValue,
  defaultDateChoiceSection,
  defaultGolbalTextStyle
}
