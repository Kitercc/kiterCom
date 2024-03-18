import styled from 'styled-components'
import { ManualZoom, TextStyle } from '../type'
import { outPanel } from '../type/child'

interface WrapperProps {
  manualZoom: ManualZoom
  lineName: boolean
  sideName: TextStyle
  promptPanel: outPanel
  infoWindowId: string
  maskColor: string
}

function getZoomControl({ manualZoom }: WrapperProps) {
  const { position, xOffset, yOffset } = manualZoom
  switch (position) {
    case 'top':
      return {
        left: `calc( 50% + ${xOffset}px )`,
        top: 20 + 'px',
        right: 'initial',
        bottom: 'initial',
        transform: `translate(-50%, ${yOffset}px)`
      }
    case 'bottom':
      return {
        left: `calc( 50% + ${xOffset}px )`,
        top: 'initial',
        right: 'initial',
        bottom: 20 + 'px',
        transform: `translate(-50%, ${yOffset}px)`
      }
    case 'left':
      return {
        left: 20 + 'px',
        top: `calc( 50% + ${yOffset}px )`,
        right: 'initial',
        bottom: 'initial',
        transform: `translate( ${xOffset}px , -50%)`
      }
    case 'right':
      return {
        left: 'initial',
        top: `calc( 50% + ${yOffset}px )`,
        right: 20 + 'px',
        bottom: 'initial',
        transform: `translate( ${xOffset}px , -50%)`
      }
    default:
      break
  }
}

export const SubwayWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;

  .lcz-subway-zoom {
    left: ${props => getZoomControl(props)?.left};
    top: ${props => getZoomControl(props)?.top};
    right: ${props => getZoomControl(props)?.right};
    bottom: ${props => getZoomControl(props)?.bottom};
    transform: ${props => getZoomControl(props)?.transform};

    .zoom-wrapper {
      flex-direction: ${props => (props.manualZoom.arrangementMode === 'level' ? 'column' : 'row-reverse')};

      button {
        width: ${props => props.manualZoom.buttonSize}px;
        height: ${props => props.manualZoom.buttonSize}px;
        background: ${props => props.manualZoom.bgColor};
        color: ${props => props.manualZoom.symbolColor};
        font-size: ${props => Math.min(props.manualZoom.buttonSize, props.manualZoom.buttonSize)}px;
        line-height: ${props => Math.min(props.manualZoom.buttonSize, props.manualZoom.buttonSize)}px;
      }

      .ant-slider-rail {
        width: ${props => (props.manualZoom.arrangementMode === 'level' ? '2px' : '100%')};
        height: ${props => (props.manualZoom.arrangementMode === 'level' ? '100%' : '2px')};
        background: ${props => props.manualZoom.bgColor};
        opacity: 0.4;
      }
      .ant-slider-handle {
        width: ${props => (props.manualZoom.arrangementMode === 'level' ? '20px' : '4px')};
        height: ${props => (props.manualZoom.arrangementMode === 'level' ? '4px' : '20px')};

        margin-left: ${props => (props.manualZoom.arrangementMode === 'level' ? '-9px' : 'initial')};
        margin-top: ${props => (props.manualZoom.arrangementMode === 'level' ? 'initial' : '-9px')};
        background: ${props => props.manualZoom.bgColor};
      }

      .ant-slider {
        width: ${props => (props.manualZoom.arrangementMode === 'level' ? 'initial' : '90px')};
        height: ${props => (props.manualZoom.arrangementMode === 'level' ? '90px' : 'initial')};
      }
    }
  }

  .amap-subway-api .line_name {
    display: ${props => (props.lineName ? 'flex' : 'none')};
  }

  .amap-subway-api #subway-svg text {
    font-size: ${props => props.sideName.fontSize}px;
    font-weight: ${props => props.sideName.fontWeight};
    font-family: ${props => props.sideName.fontFamily};
    letter-spacing: ${props => props.sideName.letterSpacing}px;
  }

  .amap-subway-api #select_bg {
    fill: ${props => props.maskColor};
  }

  .subway-content {
    fill: ${props => props.sideName.color};
    stroke: none;
  }

  #${props => props.infoWindowId} {
    transform: ${props => `translate(${props.promptPanel.xOffset}px, ${props.promptPanel.yOffset}px)`};
  }
`
