import styled from 'styled-components'

export const ToolTipWrapper = styled.div`
  pointer-events: none;
  position: relative;
  .amap-tooltip-container {
    pointer-events: auto;
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

  .amap-tip-image {
    position: absolute;
    pointer-events: auto;
    overflow: hidden;
    cursor: pointer;

    .ant-image-mask {
      display: none !important;
    }
  }
`
