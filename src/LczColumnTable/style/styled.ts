import styled from 'styled-components'
import { ScrollConfig } from '../type'

interface StyledProps {
  isPortrait: boolean
  scrollConfig: ScrollConfig
}

export function setScroll(scrollConfig: ScrollConfig, type: 'x' | 'y' = 'x') {
  const { display = false, displayType = 'hover', trackConfig, sliderConfig } = scrollConfig,
    { display: tDis = true, thickness: tThick = 0, color: tColor = 'rgba(255,0,0,0)', radius: tRadius = 0 } =
      trackConfig || {},
    { size: sSize = 1, color: sColor = 'rgba(0,0,0,0)', radius: sRadius = 0 } = sliderConfig || {}
  if (!display)
    return 'overflow:hidden;scrollbar-width: none;scrollbar-track-color: transparent;-ms-scrollbar-track-color:transparent;'

  let styleStr = ''
  switch (type) {
    case 'x': {
      styleStr = displayType === 'all' ? 'overflow:auto hidden;' : 'overflow:hidden;'
      if (displayType === 'hover') {
        styleStr += '&:hover{ overflow:auto hidden;}'
      }
      break
    }
    case 'y': {
      styleStr = displayType === 'all' ? 'overflow:hidden auto !important;' : 'overflow:hidden !important;'
      if (displayType === 'hover') {
        styleStr += '&:hover{ overflow:hidden auto !important;}'
      }
      break
    }
  }

  const barWidth = (tThick * (1 - sSize)) / 2

  styleStr += `
    &::-webkit-scrollbar {
      display: ${tDis ? 'block' : 'none'};
      height: ${tThick}px !important ; 
      width: ${tThick}px !important ; 
    }
    &::-webkit-scrollbar-track {
      border-radius: ${tRadius}px;
      background: ${tColor};
    }
    &::-webkit-scrollbar-thumb {
      border-radius: ${sRadius * sSize}px;
      background: content-box content-box ${sColor};
      border-style: solid;
      border-color: transparent;
      border-width: ${barWidth}px;
      border-image: initial;
      ${type === 'x' ? ' border-left-width: 0; border-right-width: 0;' : 'border-top-width: 0;border-bottom-width: 0;'}
     
    }

    scrollbar-color: ${`${sColor} ${tColor}`};
    scrollbar-width: thin; 
  `
  return styleStr
}

export const LczColumnTableWrapper = styled.div<StyledProps>`
  ${props => setScroll(props.scrollConfig, 'x')}

  .lcz-column-table-container {
    height: 100%;
    ${props => setScroll(props.scrollConfig, 'y')}
  }

  .lcz-column-table-list {
    flex-direction: ${props => (props.isPortrait ? 'row' : 'column')};

    .lcz-column-table-ul {
      flex-direction: ${props => (props.isPortrait ? 'column' : 'row')};
    }
  }
`
