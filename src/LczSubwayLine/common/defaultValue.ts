import {
  GlobalConfig,
  LineConfig,
  ZoomConfig,
  ManualZoom,
  LineRotation,
  SideConfig,
  TextStyle,
  TransferPointStyle,
  GeneralPoint
} from '../type'
import { outPanel, SitePolling } from '../type/child'

const defaultTextconfig: TextStyle = {
  fontFamily: 'PingFangSC-Regular',
  fontSize: 12,
  color: 'rgba(255,255,255,1)',
  fontWeight: 'normal',
  letterSpacing: 0
}

const defaultLineRotation: LineRotation = {
  display: false,
  stopCondition: false,
  interval: 10000,
  moveStay: true
}

const defalutLineConfig: LineConfig = {
  currentLine: { value: '' },
  maskColor: 'rgba(0,0,0,0.5)',
  clickSelect: true,
  selectCenter: true,
  lineName: false,
  lineRotation: defaultLineRotation
}

const defaultManualZoom: ManualZoom = {
  display: true,
  position: 'top',
  xOffset: 0,
  yOffset: 0,
  arrangementMode: 'level',
  buttonSize: 40,
  bgColor: '#3D99FC',
  symbolColor: '#fff'
}

const defaultZoomConfig: ZoomConfig = {
  defaultProportion: 1,
  manualZoom: defaultManualZoom
}

const defaultGlobalConfig: GlobalConfig = {
  cityId: { value: 3301 },
  centerSite: { value: '' },
  zoomConfig: defaultZoomConfig
}

const defaultSideConfig: SideConfig = {
  clickSideCenter: true,
  sideName: defaultTextconfig
}

const defaultPromptPanel: outPanel = {
  id: '',
  show: true,
  condition: false,
  type: 'lcz-subway-panel',
  contain: {
    link: null,
    url: ''
  },
  xOffset: 20,
  yOffset: 20,
  width: 400,
  height: 580
}

const defaultSitePolling: SitePolling = {
  display: false,
  condition: '',
  triggerEvent: true,
  interval: 5,
  stopTime: 20,
  showPanle: true,
  moveStop: true
}

const defaultTransferPoint: TransferPointStyle = {
  display: false,
  transferType: 'system',
  systemUrl: '',
  customUrl: ''
}

const defaultGeneralPoint: GeneralPoint = {
  display: false,
  generalType: 'system',
  systemUrl: '',
  customUrl: ''
}

export {
  defalutLineConfig,
  defaultGlobalConfig,
  defaultZoomConfig,
  defaultManualZoom,
  defaultLineRotation,
  defaultSideConfig,
  defaultTextconfig,
  defaultPromptPanel,
  defaultSitePolling,
  defaultTransferPoint,
  defaultGeneralPoint
}
