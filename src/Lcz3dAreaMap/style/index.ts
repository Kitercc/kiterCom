import styled from 'styled-components'
import { FontStyle } from '../../LczNewsList/type'

interface AreaMapWrapperProps {
  textHightStyle?: FontStyle
}

export const AreaMapWrapper = styled.div<AreaMapWrapperProps>`
  width: 100%;
  height: 100%;
  .lcz-3d-area-map {
    .areaname_active {
      font-size: ${({ textHightStyle }) => textHightStyle?.fontSize}px !important;
      color: ${({ textHightStyle }) => textHightStyle?.color} !important;
      font-family: ${({ textHightStyle }) => textHightStyle?.fontFamily} !important;
      font-weight: ${({ textHightStyle }) => textHightStyle?.fontWeight} !important;
      letter-spacing: ${({ textHightStyle }) => textHightStyle?.letterSpacing}px !important;
    }
  }
`
