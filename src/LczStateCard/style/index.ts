/* eslint-disable indent */
import styled from 'styled-components'
import { StateCardProps } from '../type'

export const StateCardWrapper = styled.div<StateCardProps>`
  position: relative;

  .lcz-state-card-container {
    overflow: ${({ globalConfig }) => (globalConfig?.overflow === 'animate' ? 'hidden' : globalConfig?.overflow)};
  }

  .lcz-state-card-ul-box {
    flex-direction: ${props => (props.globalConfig?.ArrangementMode === 'portrait' ? 'row' : 'column')};
    ul {
      flex-direction: ${props => (props.globalConfig?.ArrangementMode === 'portrait' ? 'column' : 'row')};

      li {
        .icon-box {
          order: ${props => (props.markStyle?.position === 'left' ? 1 : 3)};
          margin-left: ${props => (props.markStyle?.position === 'left' ? 0 : props.markStyle?.speed || 0)}px;
          margin-right: ${props => (props.markStyle?.position === 'right' ? 0 : props.markStyle?.speed || 0)}px;
        }

        .lcz-state-card-text {
          order: ${props => (props.markStyle?.position === 'left' ? 2 : 1)};
        }

        .lcz-state-card-num-con {
          order: ${props => (props.markStyle?.position === 'left' ? 3 : 2)};
          margin-left: ${props => props.globalConfig?.textNumberSpeed}px;
        }

        &:hover {
          cursor: pointer;

          /* 文字悬浮样式 */
          ${({ hoverFontStyle }) =>
            hoverFontStyle?.display
              ? `
              .lcz-state-card-text{
                color: ${hoverFontStyle?.color} !important;
                font-weight: ${hoverFontStyle?.fontWeight} !important;
              }
              `
              : ''}

          /* 数字 后缀悬浮样式 */
          ${({ numberHoverStyle }) => {
            const suffix = numberHoverStyle?.suffix

            return numberHoverStyle?.display
              ? `
                .lcz-state-card-num{
                  color:${numberHoverStyle.color}!important;
                  font-weight: ${numberHoverStyle.fontWeight}!important
                }

                ${
                  suffix?.display
                    ? `
                    .lcz-state-card-num-suffix{
                      color:${suffix.color}!important;
                      font-weight: ${suffix.fontWeight}!important
                    }
                    `
                    : ''
                }
              `
              : ''
          }}
        }
      }
    }
  }
`
