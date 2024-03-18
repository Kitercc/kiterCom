import styled from 'styled-components'

export const TipWrapper = styled.div`
  &.lcz-china-map-tip-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99;

    .lcz-china-map-area {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;

      > svg {
        position: absolute;
        left: 0;
        top: 0;
      }

      .tip-area-name {
        user-select: none;
        white-space: nowrap;
        position: absolute;
        transform: translate3d(-50%, -50%, 0px) scale(calc(1 / var(--area-scale)));
      }

      .lcz-china-map-tip-sign {
        position: absolute;

        &.scaleing {
          animation: scaleing 1s linear infinite;
          transform-origin: 50% 50%;
        }

        > div {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0px;
          top: 0px;
          background-size: 100% 100% !important;

          &.rotateing {
            animation: rotate 3s linear infinite;
            transform-origin: 50% 50%;
          }

          @keyframes rotate {
            0% {
              transform: rotate3d(0, 0, 1, 0deg);
            }

            100% {
              transform: rotate3d(0, 0, 1, 360deg);
            }
          }
        }

        @keyframes scaleing {
          0% {
            transform: scale(3);
            opacity: 0;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
    }

    .lcz-china-map-tip {
      pointer-events: auto;
    }
  }
`
