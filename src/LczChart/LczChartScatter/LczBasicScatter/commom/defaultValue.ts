import { ScatterGlobalConfig } from '../type'
import { defaultGlobal } from '../../../LczChartBar/LczBasicBar/commom/defaultValue'

const defaultGlobalConfig: ScatterGlobalConfig = {
  ...defaultGlobal,
  dataZoom: {
    display: false,
    x: true,
    y: true
  }
}

export { defaultGlobalConfig }
