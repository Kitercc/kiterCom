import React, { memo, useState } from 'react'
import { Lcz3dAreaMap } from '../'
import { AreaMapProps } from '../Lcz3dAreaMap/type'

const c1 = {
  selected: 'gradient',
  single: '#00ff9d',
  gradient: {
    gradualAngle: 1,
    colors: [
      {
        begins: 0,
        value: '#66ff00'
      },
      {
        begins: 100,
        value: '#ff23ff'
      }
    ]
  }
}

const c2 = {
  selected: 'gradient',
  single: '#00ff9d',
  gradient: {
    gradualAngle: 1,
    colors: [
      {
        begins: 0,
        value: '#f00'
      },
      {
        begins: 100,
        value: '#999'
      }
    ]
  }
}

export const T_Lcz3dAreaMap = memo(function T_Lcz3dAreaMap() {
  const config: AreaMapProps = {
    mapConfig: {
      range: {
        source: 'system',
        adcode: { value: '100000' },
        uploadData: { src: 'https://easyv.assets.dtstack.com/components/area/330100.json' }
      },
      baseConfig: {
        stretchHeight: 3,
        stretchFill: 'rgba(52,158,255,1)',
        cameraPosition: {
          x: 0,
          y: 70,
          z: 40
        },
        canDrag: true,
        canZooms: {
          display: true,
          minDistance: 10,
          maxDistance: 300
        },
        sortObjects: true,

        clickHover: {
          display: true,
          stretchHeight: 1,
          suspensionHeight: 4,
          floatingTime: 1,
          bgConfig: {
            topColor: {
              display: true,
              color: '#ffdc15'
            },
            topMap: {
              display: false,
              imgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
              repeat: {
                yRepeat: 0.02,
                xRepeat: 0.02
              }
            },
            sideColor: '#329cff'
          },
          boundary: {
            topBoundary: {
              display: true,
              color: '#e100ff'
            },
            bottomBoundary: {
              display: true,
              color: '#ff7b00'
            }
          }
        }
      },
      bgConfig: {
        colorObj: {
          color: '#2b14ff',
          display: true
        },
        highlight: {
          display: true,
          fill: 'rgba(0, 255, 234,1)'
        },
        display: true,
        bgImage: {
          image: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
          display: false,
          repeat: {
            yRepeat: 0.02,
            xRepeat: 0.02
          }
        }
      },
      boundary: {
        topBoundary: {
          display: true,
          color: '#6EC6FF',
          highlight: {
            display: true,
            color: '#e100ff'
          }
        },
        bottomBoundary: {
          display: true,
          color: '#60C6FF',
          highlight: {
            display: true,
            color: '#ff7b00'
          }
        }
      },
      areaName: {
        display: true,
        fontStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 14,
          color: '#ffffff',
          fontWeight: 'normal',
          letterSpacing: 0
        },
        textSeries: [
          {
            value: '河北省',
            xOffset: 10,
            yOffset: 0
          }
        ],
        highlight: {
          display: true,
          fontStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: '#f715ff',
            fontWeight: 'normal',
            letterSpacing: 0
          }
        }
      },
      areaShadow: {
        display: false,
        width: 10,
        color: 'rgba(255, 0, 0,1)',
        edgeGlow: 1
      },
      rihConfig: {
        display: true,
        rootCode: { value: '' },
        maxLevel: null,
        callbackBtn: {
          content: '返回11',
          position: { x: 0, y: 0 },
          fontStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: '#fff',
            fontWeight: 'normal',
            letterSpacing: 0
          },
          bgConfig: {
            color: c2,
            imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
            width: 40,
            height: 20,
            radius: 4
          },
          border: {
            display: true,
            color: 'skyblue',
            width: 1
          }
        }
      }
    },
    childComponents: [
      {
        id: 'xxxxx',
        type: 'lcz-3d-area-map-ripples',
        config: {
          show: false,
          condition: true,
          globalConfig: {
            levels: '0',
            zIndex: 1
          },
          ripplesConfig: {
            normalStyle: {
              display: true,
              radius: '1',
              haloRadius: '100',
              haloInterval: 1,
              haloSpeed: 3,
              color: 'rgba(0,0,0,0.2)',
              stroke: {
                color: '#ff0000',
                inShadow: {
                  display: true,
                  x: 0,
                  y: 0,
                  extend: 0,
                  vague: 40,
                  color: '#7bff00'
                }
              }
            },
            styleSection: [
              {
                condition: true,
                radius: '1',
                haloRadius: '100',
                haloInterval: 1,
                haloSpeed: 3,
                color: 'rgba(0,0,0,0.2)',
                stroke: {
                  color: '#ff0000',
                  inShadow: {
                    display: true,
                    x: 0,
                    y: 0,
                    extend: 0,
                    vague: 40,
                    color: '#ff9c1b'
                  }
                }
              }
            ]
          }
        },
        data: [
          {
            lat: 32.05,
            lng: 118.78333,
            value: 3500
          },
          {
            lat: 24.46667,
            lng: 118.55555,
            value: 2200
          }
        ]
      },
      {
        id: 'aeqqwdd',
        type: 'lcz-3d-area-map-tooltip',
        config: {
          show: false,
          condition: true,
          globalConfig: {
            levels: '0'
          },
          currentArea: {
            manualTrigger: true,
            targetType: 'click',
            autoCarousel: true,
            residenceTime: 5,
            movePause: false,
            sign: {
              display: true,
              width: 80,
              height: 80,
              imgUrl: 'https://easyv.assets.dtstack.com/components/static-image/chinaMap2d/chinaMap2dBG2.png',
              rotate: true
            },
            area: {
              display: true,
              color: '#ff0000'
            }
          },
          size: { width: 188, height: 145 },
          styleConfig: {
            position: {
              x: 945,
              y: 715
            },
            padding: {
              t: 16,
              b: 16,
              l: 16,
              r: 16
            },
            bgConfig: {
              color: c2,
              imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
              radius: 4
            },
            border: {
              display: true,
              color: '#ff0000',
              width: 10
            }
          },
          lineContent: [
            {
              fieldName: 'title',
              title: '标题',
              latout: {
                arrangement: 'row',
                lineHeight: '',
                lineWidth: '90',
                horizontal: 'flex-start',
                vertical: 'center',
                contentOverflow: 'lineFeed'
              },
              position: { x: 16, y: 16 },
              titleStyle: {
                fontFamily: '微软雅黑',
                fontSize: 14,
                color: '#fff',
                fontWeight: 400,
                letterSpacing: 0
              },
              valueStyle: {
                leftOffset: 10,
                valueType: 'text',
                textStyle: {
                  fontFamily: '微软雅黑',
                  fontSize: 20,
                  color: '#eb0000',
                  fontWeight: 400,
                  letterSpacing: 0
                }
              }
            }
          ],
          imageConfig: {
            display: true,
            source: 'fixed',
            expImgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
            radius: 10,
            width: 40,
            height: 40,
            rotate: 10,
            position: { x: 10, y: 10 },
            clickPreview: true,
            fixedImageList: [
              {
                fixedImgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
                radius: 10,
                width: 40,
                height: 40,
                rotate: 10,
                position: { x: 10, y: 10 },
                clickPreview: true
              },
              {
                fixedImgUrl:
                  'https://p9-passport.byteacctimg.com/img/user-avatar/88e0048614d7b44d917e57bb854a4d4e~300x300.image',
                radius: 0,
                width: 40,
                height: 40,
                rotate: 10,
                position: { x: 20, y: 60 },
                clickPreview: false
              }
            ]
          }
        },
        data: [
          {
            lat: '29.64415',
            lng: 91.1145,
            adcode: '540000',
            title: '拉萨',
            value1: 86.8,
            value2: 31662,
            value3: 678
          },
          {
            lat: 30.65089,
            lng: 104.07572,
            adcode: '510000',
            title: '四川',
            value1: 8370,
            value2: 486000,
            value3: 48600
          },
          {
            lat: 43.79343,
            lng: 87.6271,
            adcode: '650000',
            title: '新疆',
            value1: 2590,
            value2: 1664900,
            value3: 14000
          }
        ],
        event: {
          onDataChange: () => {}
        }
      },
      {
        id: '12121dds',
        type: 'lcz-3d-area-map-sign',
        config: {
          show: true,
          condition: true,
          globalConfig: {
            levels: '0',
            zIndex: 2,
            select: {
              value: '330000'
            }
          },
          normalStyle: {
            normalBackType: 'color',
            bgColor: c1,
            imageUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
            radius: 4,
            border: { display: true, color: 'red', width: 1 },
            padding: { top: 4, right: 8, bottom: 4, left: 8 },
            decorate: {
              imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
              width: 20,
              height: 20,
              offset: { x: 10, y: -10 }
            },
            offset: { x: 0, y: 0 },
            fontStyle: {
              fontFamily: 'PingFangSC-Regular',
              fontSize: 12,
              color: '#ff4aff',
              fontWeight: 'normal',
              letterSpacing: 0
            }
          },
          focuStyle: {
            focusBackType: 'custom',
            bgColor: c2,
            imageUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
            radius: 4,
            border: { display: true, color: 'skyblue', width: 1 },
            padding: { top: 4, right: 8, bottom: 4, left: 8 },
            decorate: {
              imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
              width: 20,
              height: 20,
              offset: { x: 10, y: -10 }
            },
            offset: { x: 0, y: 0 },
            fontStyle: {
              styleFollow: true,
              fontFamily: 'PingFangSC-Regular',
              fontSize: 12,
              color: '#ff4aff',
              fontWeight: 'normal',
              letterSpacing: 0
            }
          }
        },
        data: [
          {
            // lat: 30.26667,
            // lng: 120.2,
            adcode: '330000',
            area: '浙江省'
          },
          {
            // lat: 39.91667,
            // lng: 116.41667,
            adcode: '110000',
            area: '北京市'
          },
          {
            // lat: 45.742347,
            // lng: 126.661669,
            adcode: '230000',
            area: '黑龙江省'
          }
        ]
      },
      {
        type: 'lcz-3d-area-map-areaheat',
        id: 'lcz-3d-area-map-areaheat',
        config: {
          show: false,
          condition: true,
          heatConfig: {
            styleSeries: [
              {
                min: 0,
                max: 200,
                color: '#b3ff5c'
              },
              {
                min: 200,
                max: 400,
                color: '#5208ff'
              },
              {
                min: 400,
                max: 600,
                color: '#fbff07'
              }
            ],
            defectColor: '#15ff63'
          }
        },
        data: [
          {
            value: 580,
            adcode: '330000'
          },
          {
            value: 550,
            adcode: '320000'
          },
          {
            value: 450,
            adcode: '370000'
          },
          {
            value: 430,
            adcode: '350000'
          },
          {
            value: 350,
            adcode: '340000'
          },
          {
            value: 330,
            adcode: '360000'
          },
          {
            value: 240,
            adcode: '420000'
          },
          {
            value: 270,
            adcode: '430000'
          },
          {
            value: 270,
            adcode: '440000'
          },
          {
            value: 120,
            adcode: '500000'
          },
          {
            value: 180,
            adcode: '520000'
          },
          {
            value: 130,
            adcode: '450000'
          }
        ]
      },
      {
        type: 'lcz-3d-area-map-scatter',
        id: '1212voiajvio',
        config: {
          show: false,
          condition: true,
          globalConfig: {
            levels: '0',
            zIndex: 0,
            size: { min: { value: 20 }, max: { value: 60 } }
          },
          scatterNormalStyle: {
            scatter: {
              imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
              opacity: 100
            },
            scatterSign: {
              display: true,
              imgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
              opacity: 100,
              size: { width: 40, height: 20 },
              offset: { x: 0, y: 0 },
              fontStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: 12,
                color: '#ffa600',
                fontWeight: 'normal',
                letterSpacing: 0
              }
            }
          },
          scatterStyleList: []
        },
        data: [
          {
            lat: 31.22,
            lng: 121.48,
            value: 1,
            type: '类型1'
          },
          {
            lat: 40.817498,
            lng: 111.765617,
            value: 1,
            type: '类型1'
          },
          {
            lat: 29.64692,
            lng: 91.117212,
            value: 1,
            type: '类型1'
          },
          {
            lat: 46.75,
            lng: 129.63,
            value: 1,
            type: '类型1'
          }
        ],
        event: {
          onClick: () => {}
        }
      },
      {
        type: 'lcz-3d-area-map-flyline',
        id: '1212flylinevoiajvio',
        config: {
          show: false,
          condition: true,
          globalConfig: {
            levels: '0'
          },
          flightConfig: {
            speed: 1,
            height: 20,
            smooth: 100,
            randomStart: true
          },
          lineConfig: {
            baseLine: {
              display: true,
              baseColor: '#b3ff00',
              lineWidth: 1
            },
            flyline: {
              flyColor: {
                start: '#ffa908',
                end: 'rgba(255, 164, 67, 0.3)'
              },
              lineWidth: 4,
              lineLen: 20
            }
          }
        },
        data: [
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '36.204957',
            toLng: '117.661322'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '36.204957',
            toLng: '117.661322'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '31.901798',
            toLng: '120.024719'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '33.949758',
            toLng: '112.960157'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '36.663933',
            toLng: '111.856319'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '33.642549',
            toLng: '113.769638'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '31.713261',
            toLng: '117.22833'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '29.806773',
            toLng: '120.319076'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '26.348131',
            toLng: '118.184989'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '27.469714',
            toLng: '115.609368'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '30.51024',
            toLng: '112.297854'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '28.058889',
            toLng: '111.78273'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '30.191111',
            toLng: '107.735325'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '30.191111',
            toLng: '107.735325'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '41.534708',
            toLng: '123.262643'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '22.781739',
            toLng: '113.401692'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLat: '40.671907',
            toLng: '109.924603'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '125.378332',
            toLat: '43.921505'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '126.537362',
            toLat: '46.126158'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '106.208349',
            toLat: '38.421743'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '108.783971',
            toLat: '34.332201'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '103.927084',
            toLat: '30.51024'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '106.649884',
            toLat: '26.646114'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '102.749657',
            toLat: '24.880241'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '108.37923',
            toLat: '22.849963'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '110.237357',
            toLat: '19.973167'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '103.779906',
            toLat: '36.203066'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '101.425052',
            toLat: '36.663933'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '90.993784',
            toLat: '29.774677'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '87.608682',
            toLat: '43.775043'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '117.191535',
            toLat: '39.041408'
          },
          {
            fromLat: '39.794602',
            fromLng: '116.88798',
            toLng: '121.577988',
            toLat: '25.040524'
          }
        ]
      },
      {
        type: 'lcz-3d-area-map-lightbar',
        id: '1212flylinebarvoiajvio',
        config: {
          show: false,
          condition: true,
          globalConfig: {
            levels: '0',
            actionWay: 'auto',
            sliderPassStyle: { start: '#FF0000', end: 'rgba(255, 111, 0, 0.1)' }
          },
          lightbarConfig: {
            colors: {
              start: 'rgba(255,221,0,1)',
              end: 'rgba(255,110,0,0.2)'
            },
            raiseTime: 1,
            barWidth: 20,
            barHeight: {
              min: 20,
              max: 40
            },
            barType: 'rect'
          },
          textConfig: {
            mainSection: {
              offset: { x: 10, y: 20 },
              width: 110,
              height: 110,
              bgColor: c2
            },
            suffix: {
              content: '/单位',
              offset: 0,
              fontStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: 12,
                color: '#fff',
                fontWeight: 'normal',
                letterSpacing: 0
              }
            },
            serialSection: {
              display: true,
              size: 40,
              offset: { x: 0, y: 0 },
              fontStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: 12,
                color: '#fff',
                fontWeight: 'normal',
                letterSpacing: 0
              },
              radius: 20,
              customBackground: true,
              bgImageUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
              outshadow: { display: true, color: '#2ab889', x: 0, y: 0, vague: 4, extend: 7 },
              inshadow: { display: true, color: '#1e8bca', x: 0, y: 0, vague: 4, extend: 7 },
              border: {
                display: true,
                color: '#fff',
                width: 1
              }
            },
            valueSection: {
              offset: { x: 50, y: 0 },
              bgColor: c1,
              radius: 4,
              border: {
                display: true,
                color: '#fff',
                width: 1
              },
              padding: { t: 2, r: 4, b: 2, l: 4 },
              fontStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: 12,
                color: '#fff',
                fontWeight: 'normal',
                letterSpacing: 0
              },
              format: {
                display: false,
                decollate: true,
                decimal: 0,
                round: true,
                percentage: true,
                negativeing: 'minus'
              }
            },
            addressSection: {
              display: true,
              offset: { x: 60, y: 80 },
              fontStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: 12,
                color: '#fff',
                fontWeight: 'normal',
                letterSpacing: 0
              }
            },
            scale: {
              min: 0.5,
              max: 1.5
            }
          }
        },
        data: [
          {
            lng: 119.4104,
            lat: 29.916852,
            area: '杭州市',
            adcode: '330100',
            value: 118
          },
          {
            lng: 120.014648,
            lat: 30.836215,
            area: '湖州市',
            adcode: '330500',
            value: 60
          },
          {
            lng: 120.860596,
            lat: 30.713504,
            area: '嘉兴市',
            adcode: '330400',
            value: 67
          },
          {
            lng: 120.60111,
            lat: 29.878755,
            area: '绍兴市',
            adcode: '330600',
            value: 60
          },
          {
            lng: 121.468491,
            lat: 29.818994,
            area: '宁波市',
            adcode: '330200',
            value: 60
          },
          {
            lng: 119.972924,
            lat: 29.152805,
            area: '金华市',
            adcode: '330700',
            value: 84
          },
          {
            lng: 121.147338,
            lat: 28.881641,
            area: '台州市',
            adcode: '331000',
            value: 129
          },
          {
            lng: 118.714868,
            lat: 28.918133,
            area: '衢州市',
            adcode: '330800',
            value: 65
          },
          {
            lng: 119.52561,
            lat: 28.187378,
            area: '丽水市',
            adcode: '331100',
            value: 53
          },
          {
            lng: 120.5761694,
            lat: 27.87057,
            area: '温州市',
            adcode: '330300',
            value: 76
          },
          {
            lng: 122.122875,
            lat: 30.200114,
            area: '舟山市',
            adcode: '330900',
            value: 33
          }
        ],
        event: {
          onClick: () => {}
        }
      }
    ]
  }
  const [status, setStatus] = useState(true)

  return (
    <div style={{ width: 900, height: 900 }}>
      <button
        onClick={() => {
          setStatus(!status)
        }}>
        Change
      </button>
      {status && (
        <Lcz3dAreaMap
          // design={true}
          onClick={a => console.log(a, 'click')}
          onChildComEvent={(a, b, c) => console.log(a, b, c)}
          onDrollDown={a => console.log(a, '下钻')}
          onDrollUp={a => console.log(a, '上钻')}
          {...config}
          w={900}
          h={900}
        />
      )}
    </div>
  )
})
