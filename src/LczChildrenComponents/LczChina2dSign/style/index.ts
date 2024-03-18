import styled from 'styled-components'

export const NormalSandianWrapper = styled.div`
  pointer-events: none;
  width: 100%;
  height: 100%;

  .sandian {
    position: absolute;
    pointer-events: auto;
    transform-origin: var(--transform-origin);
    transform: translate3d(-50%, -50%, 0) rotateZ(calc(var(--rotate-z) * -1)) rotateY(calc(var(--rotate-y) * -1))
      rotateX(calc(var(--rotate-x) * -1));
    cursor: pointer;
  }

  .dot {
    border-radius: 50%;
  }
  .img {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .icon {
    line-height: 1;
  }
`
