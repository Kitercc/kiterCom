import styled from 'styled-components'
import { AnimateConfig, MessageBg, MessageConfig, TextConfig, TextStyle } from '../type'

interface ProgressBarWrapperProps {
  message: MessageConfig
  messageBg: MessageBg
  textConfig: TextConfig
  animateConfig: AnimateConfig
  animat: boolean
  arrangement?: string
  messageSectionConfig: { message?: MessageBg; textStyle?: TextStyle; show: boolean }
}

function getValueTransition(props) {
  return (
    props.animat &&
    props.animateConfig.display &&
    props.arrangement === 'self' &&
    props.animateConfig.timer + 'ms linear'
  )
}

function getMessageBorder(props: ProgressBarWrapperProps) {
  const { messageBg, messageSectionConfig } = props
  const { message: sectionMessage, show } = messageSectionConfig

  if (show && sectionMessage?.display) {
    const { borderWidth = 1, borderColor = '#3D99FC' } = sectionMessage
    return `${borderWidth}px solid ${borderColor}`
  } else if (messageBg.display) {
    return `${messageBg.borderWidth}px solid ${messageBg.borderColor}`
  }
  return 'none'
}

export const ProgressBarWrapper = styled.div<ProgressBarWrapperProps>`
  .out-value,
  .in-value {
    margin-top: ${props => props.message.vertOffset}px;
    margin-left: ${props => props.message.horiOffset}px;
    transition: left ${props => getValueTransition(props)};
    border: ${props => getMessageBorder(props)};

    border-radius: ${props => (props.messageBg.display ? props.messageBg.radius : 0)}px;
    span {
      transform: ${props => `translate(${props.textConfig.horiOffset}px, ${props.textConfig.vertOffset}px)`};
      transition: all 0.1s;
    }
  }

  .progress-inner {
    transition: width ${props => props.animateConfig.display && props.animat && props.animateConfig.timer}ms linear;
  }
`
