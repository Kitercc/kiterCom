import React from 'react'
import { LczPagination } from '..'
import { LczPaginationProps } from '../LczPagination/type'

export const T_LczPagination = () => {
  const config: LczPaginationProps = {
    globalConfig: {
      prevBtn: true,
      width: 50,
      height: 35,
      radius: 0,
      padding: 10,
      linePageSize: 15,
      globalTextStyle: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#f51111',
        hoverColor: '#3D99FC ',
        activeColor: '#b5e40d ',
        letterSpacing: 0 // 文字间距
      },
      globalBgColor: {
        globalBgType: 'color', //'color' | 'custom',
        // color
        color: '#f3efef',
        hoverColor: '#f70a0a',
        activeColor: 'rgba(0,0,0,1)',
        //custom
        img: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
        hoverImg: 'http://static.runoob.com/images/demo/demo1.jpg',
        activeImg: 'http://static.runoob.com/images/demo/demo1.jpg'
      },
      globalBorder: { display: false, width: 1, color: '#fa0e0e', hoverColor: '#3D99FC ', activeColor: '#3D99FC ' }
    },
    elliptical: {
      color: '#3a3636'
    },
    totalConfig: {
      display: true,
      padding: 16,
      prefix: {
        content: '总共',
        padding: 10
      },
      suffix: {
        content: '条',
        padding: 10
      },
      textStyle: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#f70808',
        letterSpacing: 0 // 文字间距
      }
    },
    // pageSizeConfig: {
    //   display: true,
    //   padding: 12,
    //   content: '10,15,50',
    //   dropDownConfig: {
    //     xPadding: 16,
    //     yPadding: 12,
    //     dropDownBgColor: {
    //       color: '#fdfcfc',
    //       hoverColor: '#f8f2f2',
    //       activeColor: '#f7f6fa'
    //     },
    //     dropDownlBorder: {
    //       display: true,
    //       width: 1,
    //       color: '#0f0e0e',
    //       hoverColor: '#3dfc8d ',
    //       activeColor: '#3D99FC '
    //     },
    //     dropDownTextStyle: {
    //       fontFamily: 'PingFangSC-Regular',
    //       fontSize: 14,
    //       fontWeight: 'normal',
    //       color: '#f00909',
    //       hoverColor: '#3D99FC ',
    //       activeColor: '#080c0f ',
    //       letterSpacing: 0 // 文字间距
    //     }
    //   },
    //   subPanel: {
    //     subGlobalConfig: {
    //       height: 28,
    //       xSubPadding: 10,
    //       ySubPadding: 20
    //     },
    //     background: {
    //       color: '#fafafa'
    //     },
    //     border: {
    //       display: true,
    //       width: 1,
    //       color: '#43f2ff',
    //       radius: 8
    //     },
    //     outShadow: { display: true, color: '#53b2ff', xOffset: 0, yOffset: 0, vague: 14, extend: 0 },
    //     optionLine: {
    //       normalStyle: {
    //         background: {
    //           color: '#0de40d'
    //         },
    //         textStyle: {
    //           fontSize: 12,
    //           color: '#ffffff',
    //           fontWeight: 'normal',
    //           fontFamily: '微软雅黑',
    //           letterSpacing: 0
    //         }
    //       },
    //       hoverStyle: {
    //         optionLineHoverDisplay: true,
    //         background: {
    //           color: '#e4520f'
    //         },
    //         textStyle: {
    //           fontSize: 12,
    //           color: '#ff00aa',
    //           fontWeight: 'normal',
    //           fontFamily: '微软雅黑',
    //           letterSpacing: 0
    //         }
    //       },
    //       activeStyle: {
    //         optionLineActiveDisplay: true,
    //         background: {
    //           color: '#53b2ff'
    //         },
    //         textStyle: {
    //           fontSize: 12,
    //           color: '#340edd',
    //           fontWeight: 'normal',
    //           fontFamily: '微软雅黑',
    //           letterSpacing: 0
    //         }
    //       }
    //     }
    //   }
    // },
    skipConfig: {
      display: true,
      padding: 18,
      suffix: {
        content: '跳转',
        padding: 4
      },
      textStyle: { fontSize: 14, color: '#ff00aa', fontWeight: 'normal', fontFamily: '微软雅黑', letterSpacing: 5 },
      inputConfig: {
        width: 98,
        height: 28,
        inputBgColor: {
          color: '#f3efef',
          hoverColor: '#f3efef',
          activeColor: '#f3efef'
        },
        inputBorder: { display: true, width: 1, color: '#FFFFFF', hoverColor: '#3D99FC ', activeColor: '#fc3d3d ' },
        inputTextStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 14,
          fontWeight: 'normal',
          color: '#eb1010',
          letterSpacing: 0 // 文字间距
        }
      },
      confirmBtnConfig: {
        display: true,
        content: '确定',
        margin: 8,
        padding: {
          xPadding: 16,
          yPadding: 3
        },
        btnBgColor: {
          btnBgType: 'custom', //'color' | 'custom',
          // color
          color: 'rgba(0,0,0,1)',
          hoverColor: '#f50909',
          //custom
          img: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          hoverImg: 'http://static.runoob.com/images/demo/demo1.jpg'
        },
        btnBorder: { display: true, width: 1, color: '#FFFFFF', hoverColor: '#3D99FC ' },
        btnTextStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 14,
          fontWeight: 'normal',
          color: '#FFFFFF',
          letterSpacing: 0 // 文字间距
        }
      }
    }
  }

  const data = [
    {
      count: 100
    }
  ]

  const onClick = data => {
    console.log(data)
  }

  return (
    <div style={{ width: 1200, height: 300, margin: ' 0 auto', border: '1px solid red' }}>
      {<LczPagination {...config} data={data} onClick={onClick} />}
    </div>
  )
}
