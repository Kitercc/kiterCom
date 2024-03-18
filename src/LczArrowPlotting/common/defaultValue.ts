import { ArrowConfig, lineConfig } from '../type'

const defaultLineConfig: lineConfig = {
  leftHeightRatio: 0.5,
  rightHeightRatio: 0.5,
  LineType: 'LleftRbottom'
}

const defultArrowConfig: ArrowConfig = {
  display: true,
  startDis: false,
  endDis: true,
  width: 2,
  height: 2,
  color: '#3d99fc'
}

export { defaultLineConfig, defultArrowConfig }
