import styled from 'styled-components'

export const SubwaySignWrapper = styled.div`
  pointer-events: none;
  position: relative;
  z-index: 2;
  > div {
    position: absolute;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    transform: translate(-50%, -50%);
    transition: all 0.3s;

    &.gradient-shadow {
      z-index: 1;
    }
  }
`
