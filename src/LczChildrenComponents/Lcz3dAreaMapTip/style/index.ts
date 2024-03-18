import styled from 'styled-components'

export const Area3dMapTipWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  pointer-events: none;

  .lcz-3d-area-map-tooltip-wrapper {
    position: absolute;
    pointer-events: none;

    .lcz-3d-area-map-tooltip-container {
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0;
      left: 0;
      top: 0;
      padding: 0;
      list-style: none;

      li {
        position: absolute;
        display: flex;
        line-height: 1.5;

        .lcz-tip-value {
          .lcz-tip-suffix {
            display: inline-block;
          }
        }
      }
    }

    .lcz-3d-area-map-tooltip-image {
      position: absolute;
      pointer-events: auto;
      overflow: hidden;
      cursor: pointer;

      .ant-image-mask {
        display: none !important;
      }
    }
  }
`

export const SignContain = styled.div`
  pointer-events: none;
  &.scaleing {
    animation: scaleing 1s linear infinite;
    transform-origin: 50% 50%;
  }

  > div {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;

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
`
