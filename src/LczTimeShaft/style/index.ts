/* eslint-disable indent */
import styled, { CSSObject } from 'styled-components'
import { colorFunc } from '../../common/util'
import { ShaftGlobalConfig, ControllerConfig, ShaftSize, ProgressCursor, PlayBtn } from '../type'

interface ShaftWrapperProps {
  progressWidth: number
  shaftGlobalConfig: ShaftGlobalConfig
  controllerConfig: ControllerConfig
  btnStatus: boolean
}

function getSize(size: ShaftSize) {
  const css: CSSObject = { ...size }
  return css
}

function getBtnStyle(style: PlayBtn, isPlaying: boolean) {
  const { gap, playConfig, stopConfig } = style
  const btnConfig: ProgressCursor = isPlaying ? playConfig : stopConfig
  const css: CSSObject = {
    ...getSize(btnConfig.size),
    gap: gap + 'px',
    background: `url(${btnConfig.image}) 50% 50% / 100% 100%`
  }
  return css
}

function getCurrentImgStyle(mode: string) {
  const css: CSSObject = {}

  if (mode == 'horizontal') {
    css.left = 'calc(var(--progressFillWidth) - var(--signSize))'
    css.top = '50%'
    css.transform = 'translateY(-50%)'
  } else {
    css.top = 'calc(var(--progressFillWidth) - var(--signSize))'
    css.left = '50%'
    css.transform = 'translateX(-50%)'
  }
  return css
}

export const ShaftWrapper = styled.div<ShaftWrapperProps>`
  gap: ${props => props.controllerConfig.playBtn.gap}px;
  flex-direction: ${props => (props.shaftGlobalConfig.mode == 'horizontal' ? 'row' : 'column')};

  .time-shaft-playbtn {
    ${props => getBtnStyle(props.controllerConfig.playBtn, props.btnStatus)}
  }

  .time-shaft-progress {
    width: ${props =>
      props.shaftGlobalConfig.mode == 'horizontal'
        ? props.progressWidth
        : props.shaftGlobalConfig.timeShaftMain.height}px;

    height: ${props =>
      props.shaftGlobalConfig.mode == 'horizontal'
        ? props.shaftGlobalConfig.timeShaftMain.height
        : props.progressWidth}px;

    background-color: ${props => props.shaftGlobalConfig.timeShaftMain.backgroundColor};

    .time-shaft-fill {
      background: ${props => colorFunc(props.shaftGlobalConfig.timeShaftMain.lineColor).color};
      width: ${props => (props.shaftGlobalConfig.mode == 'horizontal' ? 'var(--progressFillWidth)' : '100%')};
      height: ${props => (props.shaftGlobalConfig.mode == 'horizontal' ? '100%' : 'var(--progressFillWidth)')};
    }

    .time-shaft-cursor-img {
      position: absolute;
      background-image: ${props => `url(${props.controllerConfig.progressCursor.image})`};
      ${props => getSize(props.controllerConfig.progressCursor.size)}
      ${props => getCurrentImgStyle(props.shaftGlobalConfig.mode)}
      background-size: 100% 100%;
    }
  }
`
