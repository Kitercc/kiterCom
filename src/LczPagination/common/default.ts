import { PageSizeConfig } from '../type'

const defaultpageSizeConfig: PageSizeConfig = {
  display: false,
  padding: 16,
  content: '10,15,50',
  dropDownConfig: {
    xPadding: 8,
    yPadding: 0,
    dropDownBgColor: {
      color: 'rgba(0,0,0,0)',
      hoverColor: 'rgba(0,0,0,0)',
      activeColor: 'rgba(0,0,0,0)'
    },
    dropDownlBorder: {
      display: true,
      width: 1,
      color: 'rgba(255,255,255,0.2)',
      hoverColor: 'rgba(61,153,252,1) ',
      activeColor: 'rgba(61,153,252,1) '
    },
    dropDownTextStyle: {
      fontFamily: 'PingFangSC-Regular',
      fontSize: 14,
      fontWeight: 'normal',
      color: 'rgba(255,255,255,0.8)',
      hoverColor: 'rgba(61,153,252,1) ',
      activeColor: 'rgba(61,153,252,1) ',
      letterSpacing: 0 // 文字间距
    }
  },
  subPanel: {
    subGlobalConfig: {
      height: 28,
      xSubPadding: 0,
      ySubPadding: 0
    },
    background: {
      color: 'rgba(0,0,0,0)'
    },
    border: {
      display: true,
      width: 1,
      color: 'rgba(255,255,255,0.2)',
      radius: 0
    },
    outShadow: { display: false, color: 'rgba(0,0,0,0.5)', xOffset: 0, yOffset: 0, vague: 4, extend: 0 },
    optionLine: {
      normalStyle: {
        background: {
          color: 'rgba(0,0,0,0)'
        },
        textStyle: {
          fontSize: 14,
          color: 'rgba(255,255,255,0.8)',
          fontWeight: 'normal',
          fontFamily: 'PingFangSC-Regular',
          letterSpacing: 0
        }
      },
      hoverStyle: {
        optionLineHoverDisplay: true,
        background: {
          color: 'rgba(0,0,0,0)'
        },
        textStyle: {
          fontSize: 14,
          color: 'rgba(61,153,252,1)',
          fontWeight: 'normal',
          fontFamily: 'PingFangSC-Regular',
          letterSpacing: 0
        }
      },
      activeStyle: {
        optionLineActiveDisplay: true,
        background: {
          color: 'rgba(0,0,0,0)'
        },
        textStyle: {
          fontSize: 14,
          color: 'rgba(61,153,252,1)',
          fontWeight: 'normal',
          fontFamily: 'PingFangSC-Regular',
          letterSpacing: 0
        }
      }
    }
  }
}

export { defaultpageSizeConfig }
