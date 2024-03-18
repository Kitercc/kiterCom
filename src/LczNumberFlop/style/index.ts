import styled from 'styled-components'

interface CountWrapperProps {
  refresh: boolean
  numBoxRadius: number | string
  numBgColor: string
  numBoxBg: string
  separateBg: boolean
  spanSpeed: number
  numberDis: boolean
  widthAdaptation: boolean
  titlePosition: string
  numColor: any
  verMargin: number
  horMargin: number
}

function getBgImage(props) {
  return `url(${props.numBoxBg})`
}

export const CountWrapper = styled.div<CountWrapperProps>`
  transition: opacity 0.4s;
  opacity: ${props => (props.refresh ? 1 : 0)};

  .countUp-box {
    width: ${props => (props.titlePosition === 'top' || props.titlePosition === 'top' ? '100%' : 'initial')};

    .count-up {
      line-height: 1;
      flex: ${props => `${props.widthAdaptation ? 1 : 0} 1 0%`};
    }
  }

  .number-animate-span,
  .number-animate-dot {
    padding: ${props => (props.numberDis ? `${props.verMargin}px ${props.horMargin}px` : '0')};
  }
  .count-item {
    transition: all 0.3s;
    background: ${props => !props.numBoxBg && props.numberDis && props.numBgColor} !important;
    border-radius: ${props => (props.numberDis ? props.numBoxRadius : 0)}px;
    background-image: ${props => props.numberDis && getBgImage(props)};
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    display: inline-block;
    margin-right: ${props => props.spanSpeed}px;
    padding: ${props => (props.numberDis ? `${props.verMargin}px ${props.horMargin}px` : '0')};

    &:last-of-type {
      margin-right: 0;
    }
    &.count-divider {
      background: ${props => !props.separateBg && 'none'} !important;
    }

    i {
      color: ${props => (props.numColor.colorType !== 'gradient' ? props.numColor.color : 'transparent')};
      background: ${props => (props.numColor.colorType === 'gradient' ? props.numColor.color : 'transparent')};
    }
  }

  .minus-brackets {
    color: ${props => (props.numColor.colorType !== 'gradient' ? props.numColor.color : 'transparent')};
    background: ${props => (props.numColor.colorType === 'gradient' ? props.numColor.color : 'transparent')};
  }

  .number-animate-dom {
    .num-i {
      color: ${props => (props.numColor.colorType !== 'gradient' ? props.numColor.color : 'transparent')};
      background: ${props => (props.numColor.colorType === 'gradient' ? props.numColor.color : 'transparent')};
    }
  }
`

interface SymbolProps {
  numberSpeed?: number
  symbolMemo?: any
  symbolSpeed?: number
  symbolSize?: number
  numColor: any
}
export const SymbolWrapper = styled.div<SymbolProps>`
  background-image: ${props => props.symbolMemo.type === 'url' && `url(${props.symbolMemo.url})`} !important;
  margin-right: ${({ symbolMemo, symbolSpeed, numberSpeed }) =>
    symbolMemo.type === 'url' ? symbolSpeed : numberSpeed}px;
  width: ${({ symbolSize, symbolMemo }) => (symbolMemo.type === 'url' ? `${symbolSize}px` : 'initial')};
  height: ${({ symbolSize, symbolMemo }) => (symbolMemo.type === 'url' ? `${symbolSize}px` : 'initial')};
  color: ${props => (props.numColor.colorType !== 'gradient' ? props.numColor.color : 'transparent')};
  background: ${props =>
    props.numColor.colorType === 'gradient' && props.symbolMemo.type === 'text' ? props.numColor.color : ''};
  flex-shrink: 0;
  background-size: 100% 100%;
  background-position: center center;
`
