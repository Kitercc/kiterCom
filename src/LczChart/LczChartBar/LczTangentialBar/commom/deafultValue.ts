import { ValueLabel } from '../../LczBasicBar/type'
import { PoleConfig } from '../type'

const defaultPoleConfig: PoleConfig = {
  pillarStyle: {
    roundCap: true,
    outRadius: 69,
    inRadius: 10,
    bargap: 50,
    barCategoryGap: 40
  },
  pillarBgStyle: {
    display: false,
    color: 'rgba(180,180,180,1)',
    opacity: 20
  }
}

const defaultTangValueLabel: ValueLabel = {
  display: false,
  valueStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'normal',
    xOffset: 0,
    yOffset: 0,
    rotate: 0,
    format: {
      display: true,
      decollate: true,
      decimal: 2,
      round: false,
      percentage: false,
      negativeing: 'minus'
    }
  },
  position: 'middle'
}

export { defaultPoleConfig, defaultTangValueLabel }
