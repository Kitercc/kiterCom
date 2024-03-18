import { generalTitleConfig, generalToolConfig } from '../../../common/generalValue'
import { GlobalConfig } from '../type'

const defaultGlobalConfig: GlobalConfig = {
  position: 'level',
  margin: {
    t: 10,
    b: 10,
    l: 10,
    r: 10
  },
  bgColor: 'rgba(0,0,0,0)',
  titleConfig: generalTitleConfig,
  toolbarConfig: generalToolConfig,
  dataAnimate: true
}

export { defaultGlobalConfig }
