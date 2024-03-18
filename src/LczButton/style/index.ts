import styled from 'styled-components'
import { BgConfig, HoverBgConfig, HoverIconConfig, TextConfig } from '../type'

interface WrapperProps {
  bgConfig: BgConfig
  hoverDis: boolean
  hoverBorderColor: string
  hoverBorderWidth: number
  hoverBgConfig: HoverBgConfig
  hoverTextConfig: TextConfig
  hoverIconConfig: HoverIconConfig
  iconPosition: string // 图标位置
}

const getWrapperBg = (props, TYPE?: string) => {
  const { display, type, color, imageUrl } = props.bgConfig
  if (TYPE && TYPE === 'HOVER') {
    if (!props.hoverBgConfig.display || !props.hoverDis) return ''
    switch (type) {
      case 'color':
        return props.hoverBgConfig.color
      case 'image':
        return `url(${props.hoverBgConfig.imageUrl}) no-repeat center center`
    }
  }

  if (!display) return 'none'
  switch (type) {
    case 'color':
      return color
    case 'image':
      return `url(${imageUrl}) no-repeat center center`
  }
}

const getHoverTextSyle = (props: any, type: string) => {
  return props.hoverDis && props.hoverTextConfig.display && props.hoverTextConfig[type]
    ? props.hoverTextConfig[type]
    : ''
}

const getHoverIconOffset = (props: any) => {
  if (!props.hoverDis || !props.hoverIconConfig.display) return {}
  switch (props.iconPosition) {
    case 'top':
      return {
        t: 0,
        l: props.hoverIconConfig.horiOffset,
        b: props.hoverIconConfig.vertOffset,
        r: 0
      }
    case 'bottom':
      return {
        t: props.hoverIconConfig.vertOffset,
        l: props.hoverIconConfig.horiOffset,
        b: 0,
        r: 0
      }
    case 'left':
      return {
        t: props.hoverIconConfig.vertOffset,
        l: 0,
        b: 0,
        r: -props.hoverIconConfig.horiOffset
      }
    case 'right':
      return {
        t: props.hoverIconConfig.vertOffset,
        l: props.hoverIconConfig.horiOffset,
        b: 0,
        r: 0
      }
  }
}

const getHoverIconStyle = (props: any, type: string) => {
  if (type === 'imgUrl')
    return props.hoverDis && props.hoverIconConfig.display && props.hoverIconConfig[type]
      ? `url(${props.hoverIconConfig[type]})`
      : ''
  return props.hoverDis && props.hoverIconConfig.display && props.hoverIconConfig[type].toString()
    ? props.hoverIconConfig[type]
    : ''
}

export const ButtonWrapper = styled.div<WrapperProps>`
  background: ${props => getWrapperBg(props)};

  &:hover {
    border-color: ${props => (props.hoverDis ? props.hoverBorderColor : '')} !important;
    border-width: ${props => (props.hoverDis ? props.hoverBorderWidth : '')}px !important;
    background: ${props => getWrapperBg(props, 'HOVER')};

    .value {
      font-family: ${props => getHoverTextSyle(props, 'fontFamily')} !important;
      font-size: ${props => getHoverTextSyle(props, 'fontSize')}px !important ;
      color: ${props => getHoverTextSyle(props, 'color')} !important;
      font-weight: ${props => getHoverTextSyle(props, 'fontWeight')} !important;
      letter-spacing: ${props => getHoverTextSyle(props, 'letterSpacing')}px !important;
    }

    .icon-box {
      margin-top: ${props => getHoverIconOffset(props)?.t}px !important;
      margin-bottom: ${props => getHoverIconOffset(props)?.b}px !important;
      margin-left: ${props => getHoverIconOffset(props)?.l}px !important;
      margin-right: ${props => getHoverIconOffset(props)?.r}px !important;

      .icon-con {
        font-size: ${props => getHoverIconStyle(props, 'size')}px !important;
        color: ${props => getHoverIconStyle(props, 'fillColor')} !important;
      }

      .bg-image {
        width: ${props => getHoverIconStyle(props, 'width')}px !important;
        height: ${props => getHoverIconStyle(props, 'height')}px !important;
        background-image: ${props => `url(${getHoverIconStyle(props, 'imageUrl')})`} !important;
      }
    }
  }
`
