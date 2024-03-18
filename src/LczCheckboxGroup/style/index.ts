/* eslint-disable indent */
import styled from 'styled-components'
import LczComCon from '../../common/LczComCon'
import { getComStyle } from '../../common/util'
import { CheckboxProps, GlobalConfig } from '../type'

interface CheckboxWrapperProps extends CheckboxProps {
  value?: any
}

export const CheckboxWrapper = styled(LczComCon)<CheckboxWrapperProps>`
  overflow: ${({ globalConfig }) =>
    getComStyle(globalConfig, 'show') === 'auto' ? 'hidden' : getComStyle(globalConfig, 'show')};

  &:hover {
    overflow: ${({ globalConfig }) => getComStyle(globalConfig, 'show')};
  }

  .ant-checkbox-group {
    /* flex-direction: ${({ globalConfig }) => getComStyle(globalConfig, 'mode')}; */

    flex-wrap: ${({ globalConfig }) => getStyle(globalConfig, 'wrap')};

    .lcz-checkbox-row-wrapper {
      flex-direction: ${({ globalConfig }) => getComStyle(globalConfig, 'mode')};
      width: ${({ globalConfig }) => (getComStyle(globalConfig, 'mode') === 'row' ? '100%' : 'initial')};
      height: ${({ globalConfig }) => (getComStyle(globalConfig, 'mode') === 'custom' ? '100%' : 'initial')};
    }

    .lcz-checkbox-item {
      margin-right: ${({ globalConfig }) => getComStyle(globalConfig, 'horizontalSpacing')}px;
      margin-bottom: ${({ globalConfig }) => getComStyle(globalConfig, 'verticalSpacing')}px;

      ${({ globalConfig }) =>
        globalConfig?.mode === 'row' && !globalConfig.rowAdapt && globalConfig.bisectorWidth
          ? `
         &.lcz-checkbox-item{
           margin-right: 0;
           width: calc( 100% / ${globalConfig.rownum} )
         }
      `
          : ''}

      .ant-checkbox-wrapper {
        font-size: ${({ normalStyle }) => getComStyle(normalStyle, 'textStyle.fontSize')}px;
        color: ${({ normalStyle }) => getComStyle(normalStyle, 'textStyle.color')};
        font-weight: ${({ normalStyle }) => getComStyle(normalStyle, 'textStyle.fontWeight')};

        ${({ normalStyle }) =>
          getComStyle(normalStyle, 'hoverStyle.display')
            ? `
              &:hover{
                ${
                  normalStyle?.hoverStyle?.checkStyle?.display
                    ? `
                      .ant-checkbox-inner{
                        background-color: ${getComStyle(normalStyle, 'hoverStyle.checkStyle.bgColor')};
                        border-color: ${getComStyle(normalStyle, 'hoverStyle.checkStyle.color')};
                      }
                    `
                    : ''
                }

                ${
                  normalStyle?.hoverStyle?.hoverTextStyle?.display
                    ? `
                    font-size: ${getComStyle(normalStyle, 'hoverStyle.hoverTextStyle.fontSize')}px;
                    color: ${getComStyle(normalStyle, 'hoverStyle.hoverTextStyle.color')};
                    font-weight: ${getComStyle(normalStyle, 'hoverStyle.hoverTextStyle.fontWeight')};
                      `
                    : ''
                }
              }
            `
            : ''}

        &.ant-checkbox-wrapper-checked {
          ${({ focusStyle }) =>
            getComStyle(focusStyle, 'textStyle.display')
              ? `
                  font-size: ${getComStyle(focusStyle, 'textStyle.fontSize')}px;
                  color: ${getComStyle(focusStyle, 'textStyle.color')};
                  font-weight: ${getComStyle(focusStyle, 'textStyle.fontWeight')};
                `
              : ''}

          .ant-checkbox-inner {
            background-color: ${({ focusStyle }) => getComStyle(focusStyle, 'checkStyle.bgColor')};
            border-color: ${({ focusStyle }) => getComStyle(focusStyle, 'checkStyle.color')};

            &::after {
              border-color: ${({ focusStyle }) => getComStyle(focusStyle, 'checkStyle.tickColor')};
            }
          }

          ${({ focusStyle }) =>
            getComStyle(focusStyle, 'hoverStyle.display')
              ? `
                  &:hover{
                    ${
                      focusStyle?.hoverStyle?.checkStyle?.display
                        ? `
                          .ant-checkbox-inner{
                            background-color: ${getComStyle(focusStyle, 'hoverStyle.checkStyle.bgColor')};
                            border-color: ${getComStyle(focusStyle, 'hoverStyle.checkStyle.color')};
                              &::after {
                                border-color: ${getComStyle(focusStyle, 'hoverStyle.checkStyle.tickColor')};
                              }
                          }

                          .ant-checkbox-checked::after{
                            border-color: ${getComStyle(focusStyle, 'hoverStyle.checkStyle.color')};
                          }
                        `
                        : ''
                    }

                    ${
                      focusStyle?.hoverStyle?.hoverTextStyle?.display
                        ? `
                            font-size: ${getComStyle(focusStyle, 'hoverStyle.hoverTextStyle.fontSize')}px;
                            color: ${getComStyle(focusStyle, 'hoverStyle.hoverTextStyle.color')};
                            font-weight: ${getComStyle(focusStyle, 'hoverStyle.hoverTextStyle.fontWeight')};
                          `
                        : ''
                    }

                  
                  }
                `
              : ''}
        }
      }

      .ant-checkbox {
        display: ${({ globalConfig }) => (getComStyle(globalConfig, 'checkConfig.display') ? 'inline-block' : 'none')};
        order: ${({ globalConfig }) => getStyle(globalConfig, 'position')};
        margin: ${({ globalConfig }) => getStyle(globalConfig, 'spacing')};

        .ant-checkbox-inner {
          width: ${({ globalConfig }) => getComStyle(globalConfig, 'checkConfig.size')}px;
          height: ${({ globalConfig }) => getComStyle(globalConfig, 'checkConfig.size')}px;
          overflow: hidden;
          border-radius: ${({ globalConfig }) => getComStyle(globalConfig, 'checkConfig.fillet')}px;

          background-color: ${({ normalStyle }) => getComStyle(normalStyle, 'checkStyle.bgColor')};
          border-color: ${({ normalStyle }) => getComStyle(normalStyle, 'checkStyle.color')};
          border-width: ${({ normalStyle }) => getComStyle(normalStyle, 'checkStyle.width')}px;
        }
      }

      .ant-checkbox-checked::after {
        border-radius: ${({ globalConfig }) => getComStyle(globalConfig, 'checkConfig.fillet')}px;
      }
    }
  }
`

function getStyle(config: GlobalConfig | undefined, type: 'position' | 'spacing' | 'wrap') {
  const { mode = 'row', checkConfig } = config as GlobalConfig

  if (type === 'position') {
    return checkConfig?.position === 'after' ? 3 : 1
  }
  if (type === 'spacing') {
    return checkConfig?.position === 'before' ? `0 ${checkConfig?.spacing}px 0 0 ` : `0  0 0 ${checkConfig?.spacing}px`
  }

  if (type === 'wrap') {
    return mode === 'column' ? 'nowrap' : 'wrap'
  }
}
