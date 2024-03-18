/* eslint-disable indent */
import Styled from 'styled-components'
import { configDisplayCompatible } from '../../common/util'
import { RadioStyle, CheckBox, TextStyle } from '../type'
interface RadioProps {
  arrangement: string
  radioStyle?: RadioStyle
  ordTextStyle?: TextStyle
  ordCheckBox?: CheckBox
  ordHoverTextStyle?: TextStyle
  ordHoverCheck?: CheckBox
  selectTextStyle?: TextStyle
  selectCheckBox?: CheckBox
  selectHoverTextStyle?: TextStyle
  selectHoverCheck?: CheckBox
  ordHoverDis: boolean
  selectHoverDis: boolean
}

function getStyle(flag, obj, type, suffix = '') {
  return flag && obj.display ? obj[type] + suffix : ''
}

export const RadioWrapper = Styled.div<RadioProps>`
${({ radioStyle, ordCheckBox }) =>
  configDisplayCompatible(radioStyle, 'radioDisplay')
    ? `
      .ant-radio{
        display:${(radioStyle?.radioSize || 0) > 0 ? 'block' : 'none'};

        .ant-radio-inner{
          width:${radioStyle?.radioSize}px;
          height:${radioStyle?.radioSize}px;
          border-color:${ordCheckBox?.checkBorderColor};

          &::after{
            background-color:${ordCheckBox?.checkBorderColor};
            margin-left: ${-(radioStyle?.radioSize || 0) / 2}px;
            margin-top:  ${-(radioStyle?.radioSize || 0) / 2}px;
            width:${radioStyle?.radioSize || 0}px;
            height:${radioStyle?.radioSize || 0}px;
            border-radius:50%;
          }
        }
      }

      span.ant-radio + *{
        padding-left:${radioStyle?.textSpacing}px;
        padding-right:0px;
      }
    `
    : `
      .ant-radio{
        display:none;
      }

      span.ant-radio + *{
        padding-left:0;
        padding-right:0px;
      }
    `}






.ant-radio-wrapper.ant-radio-wrapper-checked{
  color:${props => getStyle(true, props.selectTextStyle, 'color')} !important;
  font-size:${props => getStyle(true, props.selectTextStyle, 'fontSize', 'px')} !important;
  font-weight:${props => getStyle(true, props.selectTextStyle, 'fontWeight')} !important;

  .ant-radio-inner{
    display: ${props =>
      props.selectCheckBox?.display && configDisplayCompatible(props.radioStyle, 'radioDisplay') ? 'block' : 'none'};
    border-color:${props => getStyle(true, props.selectCheckBox, 'checkBorderColor')};

    &::after{
      background-color:${props => getStyle(true, props.selectCheckBox, 'checkBorderColor')};
    }
  }

  >span:last-of-type{
    display:${props => (props.selectTextStyle?.display ? 'block' : 'none')};
  }
}
.ant-radio-wrapper.ant-radio-wrapper-checked:hover{
    font-size:${props => getStyle(props.selectHoverDis, props.selectHoverTextStyle, 'fontSize', 'px')} !important;
    color:${props => getStyle(props.selectHoverDis, props.selectHoverTextStyle, 'color')} !important;
    font-weight:${props => getStyle(props.selectHoverDis, props.selectHoverTextStyle, 'fontWeight')}!important;

    .ant-radio-inner{
      border-color:${props => getStyle(props.selectHoverDis, props.selectHoverCheck, 'checkBorderColor')}!important;
      &::after{
        background-color:${props =>
          getStyle(props.selectHoverDis, props.selectHoverCheck, 'checkBorderColor')}!important;
      }
    }
  }

.ant-radio-group{
  display:${props => (props.arrangement === 'level' ? 'flex' : 'inline-block')};

  .ant-radio-wrapper{
  transition:all .3s;
  font-size:${props => props.ordTextStyle?.fontSize}px;
  color:${props => props.ordTextStyle?.color};
  font-weight:${props => props.ordTextStyle?.fontWeight};
  &:hover{
    font-size:${props => getStyle(props.ordHoverDis, props.ordHoverTextStyle, 'fontSize', 'px')};
    color:${props => getStyle(props.ordHoverDis, props.ordHoverTextStyle, 'color')};
    font-weight:${props => getStyle(props.ordHoverDis, props.ordHoverTextStyle, 'fontWeight')};

    .ant-radio-inner{
      border-color:${props => getStyle(props.ordHoverDis, props.ordHoverCheck, 'checkBorderColor')};
      &::after{
        background-color:${props => getStyle(props.ordHoverDis, props.ordHoverCheck, 'checkBorderColor')};
      }
    }
  }
}
}

`
