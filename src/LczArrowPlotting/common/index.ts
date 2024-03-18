import { ArrowConfig, lineConfig } from '../type'

const difference = (a, b) => {
  if (a > b) return (a - b).toFixed(2)
  return (b - a).toFixed(2)
}

interface paths {
  startPath: string
  endPath: string
  mainPath: string
  textLength: number
}

export const countPath = (box: { w: number; h: number }, lineConfig: lineConfig, arrowConfig: ArrowConfig): paths => {
  const _obj: paths = { startPath: '', endPath: '', mainPath: '', textLength: 0 }

  const { w, h } = box
  const { leftHeightRatio, rightHeightRatio, LineType } = lineConfig
  const { display: ArrowDis, startDis, endDis, width: ArrowW, height: ArrowH } = arrowConfig

  const startMAX = ArrowDis && startDis ? Math.max(ArrowW, ArrowH) : 0
  const endMAX = ArrowDis && endDis ? Math.max(ArrowW, ArrowH) : 0
  const speedMAX = Math.max(startMAX, endMAX)

  //  a 50 50 0 0 0 50 -50

  switch (LineType) {
    case 'LleftRbottom': {
      _obj.mainPath = `
      M${speedMAX} ${speedMAX + h * leftHeightRatio}  
      L ${w - speedMAX} ${speedMAX + h * leftHeightRatio} 
      L ${w - speedMAX} ${speedMAX + h * rightHeightRatio}`
      break
    }
    case 'LtopRright': {
      _obj.mainPath = `
      M${speedMAX} ${speedMAX + h * leftHeightRatio} 
      L ${speedMAX} ${speedMAX + h * rightHeightRatio} 
      L ${w - speedMAX} ${speedMAX + h * rightHeightRatio}`
      break
    }
    case 'LleftRright': {
      _obj.mainPath = `
      M${speedMAX} ${h * leftHeightRatio} 
      L ${w / 2 - 50} ${h * leftHeightRatio} 
      a 50 50 0 0 1 50 50
      L ${w / 2} ${h * rightHeightRatio - 50} 
       a 50 50 0 0 0 50 50
      L ${w - speedMAX} ${h * rightHeightRatio}`
      break
    }
    case 'LtopRbottom': {
      const middenVal =
        (Number(difference(leftHeightRatio, rightHeightRatio)) / 2 + Math.min(leftHeightRatio, rightHeightRatio)) * h
      _obj.mainPath = `
      M${speedMAX} ${h * leftHeightRatio} 
      L ${speedMAX} ${middenVal} 
      L${w - speedMAX} ${middenVal}  
      L${w - speedMAX} ${h * rightHeightRatio}`
      break
    }
    default:
      break
  }

  _obj.startPath = `M0,${ArrowH / 2} L${ArrowW},${ArrowH} L${ArrowW},0 z`
  _obj.endPath = `M${ArrowW},${ArrowH / 2} L0,${ArrowH} L0,0 z`
  _obj.textLength = w * Number(difference(leftHeightRatio, rightHeightRatio)) + w

  return _obj
}
