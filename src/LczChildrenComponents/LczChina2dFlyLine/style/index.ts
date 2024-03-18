import styled from 'styled-components'

export const LineWrapper = styled.div`
  &.lcz-china-map-flyline-wrapper {
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9;

    > div {
      position: absolute;
      left: 0px;
      top: 0px;
      pointer-events: none;

      > canvas {
        position: absolute;
        left: 0px;
        top: 0px;
        pointer-events: none;
      }
    }
  }
`
