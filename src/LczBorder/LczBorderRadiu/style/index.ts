import styled from 'styled-components'

interface BorderWrapperProps {
  ratio: number
  borderColor: string
  borderRadiu: number
  hornColor: string
}

function getLinearGradient(position, props, str) {
  switch (str) {
    case 'tr':
      if (props.ratio <= 1) {
        if (props.ratio < 0.4) {
          return `linear-gradient(${position}, ${props.hornColor} 0%, ${props.borderColor} 25%) !important`
        }
        return `linear-gradient(${position}, ${props.hornColor} 0%, ${props.borderColor} 20%) !important`
      }
      return `linear-gradient(${position}, ${props.hornColor} 0%, ${props.borderColor} 8%) !important`
    case 've':
      if (props.ratio <= 1) {
        if (props.ratio < 0.4) {
          return `linear-gradient(${position}, ${props.hornColor} 0%, ${props.borderColor} 8%) !important`
        }
        return `linear-gradient(${position}, ${props.hornColor} 0%, ${props.borderColor} 10%) !important`
      } else if (props.ratio <= 3) {
        return `linear-gradient(${position}, ${props.hornColor} 0%, ${props.borderColor} 20%) !important`
      }
      return `linear-gradient(${position}, ${props.hornColor} 0%, ${props.borderColor} 30%) !important`
  }
}

export const BorderRadioWrapper = styled.div<BorderWrapperProps>`
  .border-radiu-wrapper {
    border-radius: ${props => props.borderRadiu}px !important;
    border-color: ${props => props.hornColor} !important;
  }
  &::before {
    background: ${props => getLinearGradient('to bottom', props, 've')};
  }
  &::after {
    background: ${props => getLinearGradient('to right', props, 'tr')};
  }
  .line-1 {
    &::before {
      background: ${props => getLinearGradient('to top', props, 've')};
    }
    &::after {
      background: ${props => getLinearGradient('to right', props, 'tr')};
    }
  }

  .line-2 {
    &::before {
      background: ${props => getLinearGradient('to left', props, 'tr')};
    }
    &::after {
      background: ${props => getLinearGradient('to bottom', props, 've')};
    }
  }

  .line-3 {
    &::before {
      background: ${props => getLinearGradient('to left', props, 'tr')};
    }
    &::after {
      background: ${props => getLinearGradient('to top', props, 've')};
    }
  }
`
