import React, { memo, useState } from 'react'
import { LczAMap } from '../'
import { AmapProps } from '../LczAMap/type'

const c1 = {
  selected: 'gradient',
  single: '#00ff9d',
  gradient: {
    gradualAngle: 1,
    colors: [
      {
        begins: 0,
        value: '#fc3d86'
      },
      {
        begins: 100,
        value: '#21ad05'
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

export const T_lczAmap = memo(function T_lczAmap() {
  const [Chindsstatus, setChindsstatus] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ])

  const config: AmapProps = {
    mapStyleId: 'amap://styles/22fcefd7fbf3d69c0edc32753aecdd7e',
    mapsettings: {
      showLabel: true,
      showRoad: true,
      showBuild: true,
      showPoint: true,
      showTraffic: false
    },
    cameraSettings: {
      Lng: 120.266443,
      Lat: 30.194103,
      initZoom: 4,
      viewMode: '3D',
      skyColor: 'rgba(255,0,0,0)',
      pitch: 60
    },
    childComponents: [
      {
        id: 'asas',
        type: 'lcz-amap-point',
        config: {
          show: Chindsstatus[0],
          condition: true,
          globalConfig: {
            level: 1,
            viewRange: {
              min: 1,
              max: 20
            },
            carousel: {
              display: true,
              speed: 5
            }
          },
          iconConfig: {
            imageStyle: {
              imageType: 'bitmap',
              bitmapUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
              vectorUrl: 'https://easyv.assets.dtstack.com/components/static-image/aMapComponent/point.png',
              fillColor: c1,
              radius: 20,
              width: 40,
              height: 40,
              xOffset: 0,
              yOffset: 0,
              rotate: 0
            },
            animation: {
              display: true,
              delayed: 0,
              loop: true,
              interval: 0,
              animationType: 'custom', // 'opacity' 'scale' 'clockwise' 'anticlockwise' 'backrotation' 'custom'
              duration: 3,
              speed: 'linear',
              keyFrame: [
                {
                  duration: 1000,
                  opacity: 1,
                  rotate: {
                    display: true,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0
                  },
                  scale: {
                    display: true,
                    scaleX: 100,
                    scaleY: 100
                  },
                  translate: {
                    display: true,
                    translateX: 0,
                    translateY: 0
                  }
                },

                {
                  duration: 2000,
                  opacity: 1,
                  rotate: {
                    display: true,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0
                  },
                  scale: {
                    display: true,
                    scaleX: 100,
                    scaleY: 100
                  },
                  translate: {
                    display: true,
                    translateX: 0,
                    translateY: 0
                  }
                }
              ]
            },
            highLight: {
              display: true,
              highLinghtStyle: {
                imageFllow: false,
                bitmapUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
                vectorUrl: 'https://easyv.assets.dtstack.com/components/static-image/aMapComponent/point.png',
                fillColor: c2,
                radius: 10,
                scale: 1.2,
                xOffset: 10,
                yOffset: 10,
                rotate: 40
              }
            }
          },
          customIcon: [
            {
              conditionType: { value: 'text6' },
              imageStyle: {
                imageType: 'bitmap',
                bitmapUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
                vectorUrl: 'https://easyv.assets.dtstack.com/components/static-image/chinaMap2d/chinaMap2dBG2.png',
                fillColor: c2,
                radius: 0,
                width: 40,
                height: 40,
                xOffset: 0,
                yOffset: 0,
                rotate: 0
              },
              animation: {
                display: true,
                delayed: 3,
                loop: true,
                interval: 0,
                animationType: 'custom', // 'opacity' 'scale' 'clockwise' 'anticlockwise' 'backrotation' 'custom'
                duration: 3,
                speed: 'linear',
                keyFrame: [
                  {
                    duration: 1000,
                    opacity: 1,
                    rotate: {
                      display: true,
                      rotateX: 0,
                      rotateY: 0,
                      rotateZ: 0
                    },
                    scale: {
                      display: true,
                      scaleX: 100,
                      scaleY: 100
                    },
                    translate: {
                      display: true,
                      translateX: 0,
                      translateY: 0
                    }
                  },
                  {
                    duration: 2000,
                    opacity: 1,
                    rotate: {
                      display: true,
                      rotateX: 0,
                      rotateY: 0,
                      rotateZ: 0
                    },
                    scale: {
                      display: true,
                      scaleX: 100,
                      scaleY: 100
                    },
                    translate: {
                      display: true,
                      translateX: 0,
                      translateY: 0
                    }
                  }
                ]
              },
              highLight: {
                display: true,
                highLinghtStyle: {
                  imageFllow: true,
                  bitmapUrl: 'https://easyv.assets.dtstack.com/components/static-image/chinaMap2d/chinaMap2dBG2.png',
                  vectorUrl: 'https://easyv.assets.dtstack.com/components/static-image/chinaMap2d/chinaMap2dBG2.png',
                  fillColor: c1,
                  radius: 10,
                  scale: 1.2,
                  xOffset: 0,
                  yOffset: 0,
                  rotate: 60
                }
              }
            }
          ],
          focusIcon: {
            imageStyle: {
              imageType: 'bitmap',
              bitmapUrl: 'https://easyv.assets.dtstack.com/data/assets/nqxv03lzv_1639473271127_xjf3vv2np.png',
              vectorUrl: 'https://easyv.assets.dtstack.com/data/assets/nqxv03lzv_1639473271127_xjf3vv2np.png',
              fillColor: c1,
              radius: 10,
              width: 40,
              height: 40,
              xOffset: 0,
              yOffset: 0,
              rotate: 0
            },
            animation: {
              display: true,
              delayed: 0,
              loop: true,
              interval: 0,
              animationType: 'custom', // 'opacity' 'scale' 'clockwise' 'anticlockwise' 'backrotation' 'custom'
              duration: 3,
              speed: 'linear',
              keyFrame: [
                {
                  duration: 200,
                  opacity: 1,
                  rotate: {
                    display: false,
                    rotateX: 10,
                    rotateY: 20,
                    rotateZ: 30
                  },
                  scale: {
                    display: true,
                    scaleX: 30,
                    scaleY: 30
                  },
                  translate: {
                    display: false,
                    translateX: 100,
                    translateY: 0
                  }
                },
                {
                  duration: 300,
                  opacity: 1,
                  rotate: {
                    display: false,
                    rotateX: 30,
                    rotateY: 10,
                    rotateZ: 20
                  },
                  scale: {
                    display: false,
                    scaleX: 50,
                    scaleY: 50
                  },
                  translate: {
                    display: false,
                    translateX: 100,
                    translateY: 100
                  }
                },
                {
                  duration: 200,
                  opacity: 1,
                  rotate: {
                    display: false,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0
                  },
                  scale: {
                    display: true,
                    scaleX: 0,
                    scaleY: 0
                  },
                  translate: {
                    display: false,
                    translateX: 0,
                    translateY: 0
                  }
                }
              ]
            }
          }
        },
        event: {
          onClick: data => {
            console.log(data)
          },
          onMouseenter: data => {
            console.log(data)
          },
          onMouseleave: data => {
            console.log(data)
          },
          onChange: data => {
            console.log(data)
          }
        },

        data: [
          {
            lng: 116.3,
            lat: 39.9,
            id: '1',
            type: '哈哈'
          },
          {
            lng: 121.48,
            lat: 31.22,
            id: '2',
            type: 'text2'
          },
          {
            lng: 140,
            lat: 35,
            id: '3',
            type: 'text3'
          },
          {
            lng: 151.12,
            lat: -33.77,
            id: '4',
            type: 'text4'
          },
          {
            lng: 114.05,
            lat: 22.55,
            id: '5',
            type: 'text5'
          },
          {
            lng: 120,
            lat: 30,
            id: '6',
            type: 'text6'
          },
          {
            lng: 72.85,
            lat: 18.9,
            id: '7',
            type: 'text7'
          }
        ]
      },
      {
        id: 'asqwas',
        type: 'lcz-amap-center-point',
        config: {
          show: Chindsstatus[1],
          condition: true,
          level: 6,
          viewRange: {
            min: 10,
            max: 16
          },
          defaultUse: true,
          centerStyle: {
            imageType: 'vector',
            bitmapUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
            vectorUrl: 'https://easyv.assets.dtstack.com/components/static-image/aMapComponent/point.png',
            fillColor: c1,
            radius: 0,
            width: 30,
            height: 30,
            xOffset: 0,
            yOffset: 0,
            rotate: 0,
            highLight: {
              display: true,
              highLinghtStyle: {
                imageFllow: false,
                bitmapUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
                vectorUrl: 'https://easyv.assets.dtstack.com/components/static-image/aMapComponent/point.png',
                fillColor: c2,
                radius: 0,
                scale: 1.2,
                xOffset: 0,
                yOffset: 0,
                rotate: 10
              }
            }
          }
        },
        event: {
          onClick: () => {},
          onDataChange: () => {}
        },
        data: [
          {
            lng: 120.818121,
            lat: 30.2412,
            zoom: 10
          }
        ]
      },
      {
        id: '12as',
        type: 'lcz-amap-polyline',
        config: {
          show: Chindsstatus[2],
          condition: true,
          globalConfig: {
            level: 10,
            defaultSelect: {
              value: '5号线'
            }
          },
          lineConfig: {
            color: '#FAD91C',
            width: 10,
            opacity: 100,
            stroke: {
              display: false,
              color: '#f00',
              width: 3
            },
            selectStyle: {
              display: true,
              opacity: 100,
              stroke: {
                display: true,
                color: 'skyblue',
                width: 3
              }
            },
            unSelectStyle: {
              display: true,
              opacity: 50
            }
          },
          customLine: [
            {
              condition: {
                value: '2号线'
              },
              color: '#f00',
              width: 10,
              opacity: 100,
              stroke: {
                display: false,
                color: '#f00',
                width: 3
              },
              selectStyle: {
                display: true,
                opacity: 100,
                stroke: {
                  display: true,
                  color: 'skyblue',
                  width: 3
                }
              },
              unSelectStyle: {
                display: true,
                opacity: 50
              }
            }
          ]
        },
        event: {
          onClick: () => {}
        },
        data: [
          {
            lng: 120.266443,
            lat: 30.194102,
            id: '2号线'
          },
          {
            lng: 120.266615,
            lat: 30.18112,
            id: '2号线'
          },
          {
            lng: 120.267044,
            lat: 30.170658,
            id: '2号线'
          },
          {
            lng: 120.267302,
            lat: 30.159082,
            id: '2号线'
          },
          {
            lng: 120.267387,
            lat: 30.147949,
            id: '2号线'
          },
          {
            lng: 120.267473,
            lat: 30.134663,
            id: '2号线'
          },
          {
            lng: 120.230888,
            lat: 30.182908,
            id: '5号线'
          },
          {
            lng: 120.243934,
            lat: 30.182463,
            id: '5号线'
          },
          {
            lng: 120.253289,
            lat: 30.181795,
            id: '5号线'
          },
          {
            lng: 120.266593,
            lat: 30.180979,
            id: '5号线'
          },
          {
            lng: 120.27818,
            lat: 30.180756,
            id: '5号线'
          },
          {
            lng: 120.285562,
            lat: 30.180385,
            id: '5号线'
          },
          {
            lng: 120.295604,
            lat: 30.172669,
            id: '5号线'
          }
        ]
      },
      {
        id: 'ajsc',
        type: 'lcz-amap-text-label',
        config: {
          show: Chindsstatus[3],
          condition: true,
          globalConfig: {
            level: 4,
            viewRange: {
              min: 1,
              max: 20
            }
          },
          offset: {
            x: 0,
            y: 0
          },
          globalStyle: {
            display: true,
            bgConfig: {
              color: c1,
              radius: 10
            },
            padding: {
              x: 8,
              y: 2
            },
            stroke: {
              display: true,
              color: '#1A4A92',
              width: 1
            },
            size: {
              width: null,
              height: null
            }
          },
          textStyle: {
            fontFamily: 'SourceHanSansCN-Regular',
            fontSize: 12,
            color: '#fff',
            fontWeight: 'normal',
            letterSpacing: 0
          }
        },
        data: [
          {
            lng: 120.580763,
            lat: 30.244566,
            rotate: 0,
            value: 'saaasas'
          },
          {
            lng: 120.435787,
            lat: 30.235861,
            rotate: 0,
            value: '萧山国际机场'
          },
          {
            lng: 120.122677,
            lat: 30.229929,
            rotate: 0,
            value: '西湖风景区'
          },
          {
            lng: 120.007321,
            lat: 30.355621,
            rotate: 0,
            value: '良渚文化村'
          },
          {
            lng: 120.081478,
            lat: 30.304652,
            rotate: 0,
            value: '浙江大学'
          }
        ]
      },
      {
        id: 'ajsc_tooltip',
        type: 'lcz-amap-tooltip',
        config: {
          show: Chindsstatus[4],
          condition: true,
          globalConfig: {
            level: 3,
            viewRange: {
              min: 2,
              max: 10
            }
          },
          size: {
            width: 280,
            height: 180
          },
          positionConfig: {
            fixed: false,
            fixedPosition: {
              left: 745,
              top: 315
            },
            padding: {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            },
            bgConfig: {
              color: c1,
              imgUrl: '',
              radius: 0
            },
            stroke: {
              display: true,
              color: 'red',
              width: 2
            },
            offset: {
              x: 10,
              y: 100
            }
          },
          lineContent: [
            {
              fieldName: 'title',
              title: '标题',
              latout: {
                arrangement: 'row',
                lineHeight: 20,
                lineWidth: 60,
                horizontal: 'flex-start',
                vertical: 'center',
                contentOverflow: 'show'
              },
              position: { x: 30, y: 10 },
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
            },
            {
              fieldName: 'value1',
              title: 'value1',
              latout: {
                arrangement: 'row',
                lineHeight: null,
                lineWidth: null,
                horizontal: 'flex-start',
                vertical: 'center',
                contentOverflow: 'show'
              },
              position: { x: 30, y: 40 },
              titleStyle: {
                fontFamily: '微软雅黑',
                fontSize: 14,
                color: '#fff',
                fontWeight: 400,
                letterSpacing: 0
              },
              valueStyle: {
                leftOffset: 10,
                valueType: 'number',
                textStyle: {
                  fontFamily: '微软雅黑',
                  fontSize: 20,
                  color: '#eb0000',
                  fontWeight: 400,
                  letterSpacing: 0
                },
                format: {
                  display: true,
                  thousandth: true, // 千分位
                  numDo: 2, // 保留小数 小数点位数
                  rounding: true, // 四舍五入
                  percentage: false,
                  negativeing: 'minus' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
                },
                intervalStyle: true,
                styleInterval: [{ min: 200, max: 800, color: 'skyblue', fontWeight: 'bold', fontSize: 30 }],
                suffixConfig: {
                  display: true,
                  leftOffset: 0,
                  topOffset: 0,
                  suffix: 'suffix',
                  textStyle: {
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                    color: '#fff',
                    fontWeight: 400,
                    letterSpacing: 0
                  }
                }
              }
            },
            {
              fieldName: 'value2',
              title: 'value',
              latout: {
                arrangement: 'row',
                lineHeight: null,
                lineWidth: null,
                horizontal: 'flex-start',
                vertical: 'center',
                contentOverflow: 'show'
              },
              position: { x: 30, y: 100 },
              titleStyle: {
                fontFamily: '微软雅黑',
                fontSize: 14,
                color: '#fff',
                fontWeight: 400,
                letterSpacing: 0
              },
              valueStyle: {
                leftOffset: 20,
                valueType: 'state',
                textStyle: {
                  fontFamily: '微软雅黑',
                  fontSize: 19,
                  color: '#1bfff4',
                  fontWeight: 400,
                  letterSpacing: 0
                },
                stateStyles: [
                  {
                    stateVal: 'tip1',
                    textStyle: {
                      fontFamily: '微软雅黑',
                      fontSize: 24,
                      color: '#eb0000',
                      fontWeight: 400,
                      letterSpacing: 0
                    }
                  },
                  {
                    stateVal: 'tip2',
                    textStyle: {
                      fontFamily: '微软雅黑',
                      fontSize: 24,
                      color: '#1606ff',
                      fontWeight: 400,
                      letterSpacing: 0
                    }
                  }
                ],
                suffixConfig: {
                  display: true,
                  leftOffset: 0,
                  topOffset: 0,
                  suffix: 'suffix',
                  textStyle: {
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                    color: '#fff',
                    fontWeight: 400,
                    letterSpacing: 0
                  }
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
            lng: 120.218131,
            lat: 30.2412,
            title: '杭州111',
            value1: 795.37,
            value2: 'tip1'
          },
          {
            lng: 120.218121,
            lat: 30.5412,
            title: '杭州',
            value1: 795.37,
            value2: 'tip2'
          }
        ]
      },
      {
        id: 'ascasckc',
        type: 'lcz-amap-ripples',
        config: {
          show: Chindsstatus[5],
          condition: true,
          globalConfig: {
            level: 20,
            viewRange: {
              min: 1,
              max: 30
            }
          },
          ripplesConfig: {
            duration: 1000,
            normalStyle: {
              display: true,
              size: { value: 160 },
              ripplesImageType: 'custom',
              systemType: 'red',
              customImgUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png'
            },
            sectionConfig: [
              {
                min: 0,
                max: 20,
                size: { value: 160 },
                ripplesImageType: 'custom',
                systemType: 'red',
                customImgUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png'
              }
            ]
          }
        },
        data: [
          {
            lng: 120.218121,
            lat: 30.2412,
            value: 5
          },
          {
            lng: 120.266443,
            lat: 30.194102,
            value: 5
          },
          {
            lng: 120.218121,
            lat: 30.5412,
            value: 5
          },
          {
            lng: 120.818121,
            lat: 30.2412,
            value: 15
          },
          {
            lng: 120.418121,
            lat: 30.9412,
            value: 105
          }
        ]
      },
      {
        id: 'asfdfzxz',
        type: 'lcz-amap-flyline',
        config: {
          show: Chindsstatus[6],
          condition: true,
          globalConfig: {
            level: 4,
            viewRange: {
              min: 1,
              max: 30
            }
          },
          flight: {
            smoothSteps: 100,
            speed: 10,
            height: 10000
          },
          lineConfig: {
            startWidth: 1,
            endWidth: 1,
            baseline: {
              display: true,
              color: [{ value: '#FCF064' }, { value: '#F00' }]
            },
            flyline: {
              color: { headColor: '#FCF064', trailColor: '#FFA343' },
              interval: 100
            }
          }
        },
        data: [
          {
            fromLng: 120.218121,
            fromLat: 30.2412,
            toLng: 119.990341,
            toLat: 30.215689
          },
          {
            fromLng: 120.218121,
            fromLat: 30.2412,
            toLng: 120.007638,
            toLat: 30.301032
          },
          {
            fromLng: 120.218121,
            fromLat: 30.2412,
            toLng: 120.101224,
            toLat: 30.115689
          },
          {
            fromLng: 120.218121,
            fromLat: 30.2412,
            toLng: 120.051266,
            toLat: 30.259932
          },
          {
            fromLng: 120.218121,
            fromLat: 30.2412,
            toLng: 120.017341,
            toLat: 30.17456
          }
        ]
      },
      {
        id: 'asfdfzxzcluster',
        type: 'lcz-amap-cluster-layer',
        config: {
          show: Chindsstatus[7],
          condition: true,
          globalConfig: {
            zIndex: 100
          },
          clusterConfig: {
            gridSize: 100,
            maxZoom: 18,
            minClusterSize: 2
          },
          clusterIconConfig: {
            iconType: 'custom',
            imageUrl: 'https://pic1.zhimg.com/80/v2-4af581163d11d760c7347265459d04c1_720w.jpg',
            icon: 'yuan',
            iconColor: '#fff',
            width: 40,
            height: 40,
            globalOffset: { x: 0, y: 0 },
            fontStyle: {
              fontFamily: 'SourceHanSansCN-Regular',
              fontSize: 30,
              color: '#ff0000',
              fontWeight: 'bold',
              letterSpacing: 0
            },
            offset: { x: 20, y: -20 },
            iconSeries: [
              {
                min: 2,
                max: 5,
                iconType: 'custom',
                imageUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
                icon: 'yuan',
                iconColor: '#f82e2e',
                width: 40,
                height: 40,
                globalOffset: { x: 0, y: 0 },
                styleFollow: false,
                fontStyle: {
                  fontFamily: 'SourceHanSansCN-Regular',
                  fontSize: 30,
                  color: '#09ff00',
                  fontWeight: 'bold',
                  letterSpacing: 0
                },
                offset: { x: 20, y: -20 }
              }
            ]
          },
          iconConfig: {
            imageUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
            width: 40,
            height: 40,
            globalOffset: { x: 0, y: 0 },
            fontConfig: {
              display: true,
              styleFollow: false,
              fontStyle: {
                fontFamily: 'SourceHanSansCN-Regular',
                fontSize: 30,
                color: '#00ff0d',
                fontWeight: 'bold',
                letterSpacing: 0
              },
              offset: { x: 0, y: 0 }
            },
            iconSeries: [
              {
                condition: {
                  value: '964'
                },
                imageUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
                width: 40,
                height: 40,
                globalOffset: { x: 0, y: 0 },
                fontConfig: {
                  display: true,
                  fontStyle: {
                    fontFamily: 'SourceHanSansCN-Regular',
                    fontSize: 30,
                    color: '#ff0000',
                    fontWeight: 'bold',
                    letterSpacing: 0
                  },
                  offset: { x: 0, y: 0 }
                }
              }
            ]
          },
          selectIcon: {
            imageUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg',
            width: 40,
            height: 40,
            globalOffset: { x: 10, y: 0 },
            fontConfig: {
              display: true,
              fontStyle: {
                fontFamily: 'SourceHanSansCN-Regular',
                fontSize: 30,
                color: '#1eff4f',
                fontWeight: 'bold',
                letterSpacing: 0
              },
              offset: { x: 0, y: 0 }
            },
            iconSeries: [
              {
                condition: {
                  value: '964'
                },
                imageUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c',
                width: 40,
                globalOffset: { x: 10, y: 0 },
                height: 40,
                fontConfig: {
                  display: true,
                  styleFollow: false,
                  fontStyle: {
                    fontFamily: 'SourceHanSansCN-Regular',
                    fontSize: 30,
                    color: '#ff0000',
                    fontWeight: 'bold',
                    letterSpacing: 0
                  },
                  offset: { x: 0, y: 0 }
                }
              }
            ]
          }
        },
        event: {
          onClick: () => {}
        },
        data: [
          {
            lng: 160.71909217655482,
            lat: 83.08867922618226,
            id: 950,
            name: '950'
          },
          {
            lng: 102.78855805336104,
            lat: 96.94793907741155,
            id: 951,
            name: '951'
          },
          {
            lng: 88.23226120429248,
            lat: 103.25115107401854,
            id: 952,
            name: '952'
          },
          {
            lng: 151.52584546507023,
            lat: 83.87727203455657,
            id: 953,
            name: '953'
          },
          {
            lng: 69.98090950507236,
            lat: 138.4151132479704,
            id: 954,
            name: '954'
          },
          {
            lng: 156.0097964168417,
            lat: 59.353386684791815,
            id: 955,
            name: '955'
          },
          {
            lng: 111.83363388011075,
            lat: 135.44363835770847,
            id: 956,
            name: '956'
          },
          {
            lng: 108.40833888938516,
            lat: 8.42790696346614,
            id: 957,
            name: '957'
          },
          {
            lng: 57.9225425518578,
            lat: 40.278354654828306,
            id: 958,
            name: '958'
          },
          {
            lng: 19.12529692951377,
            lat: 32.51129253289051,
            id: 959,
            name: '959'
          },
          {
            lng: 168.99300321964316,
            lat: 158.39790158220748,
            id: 960,
            name: '960'
          },
          {
            lng: 163.00011557690624,
            lat: 32.0248711491806,
            id: 961,
            name: '961'
          },
          {
            lng: 71.57742303105093,
            lat: 117.08494518719621,
            id: 962,
            name: '962'
          },
          {
            lng: 15.254577536602714,
            lat: 165.63557652574787,
            id: 963,
            name: '963'
          },
          {
            lng: 178.0726507161898,
            lat: 33.29299932199775,
            id: 964,
            name: '964',
            type: '964'
          },
          {
            lng: 4.492567705168766,
            lat: 152.29831575071722,
            id: 965,
            name: '965'
          },
          {
            lng: 124.60941059319887,
            lat: 70.7440578122391,
            id: 966,
            name: '966'
          },
          {
            lng: 11.38116584966518,
            lat: 25.93134599679255,
            id: 967,
            name: '967'
          },
          {
            lng: 57.12228437463776,
            lat: 10.271497569092869,
            id: 968,
            name: '968'
          },
          {
            lng: 30.474925306556457,
            lat: 151.74288394056356,
            id: 969,
            name: '969'
          },
          {
            lng: 103.39611988750859,
            lat: 89.69895383193422,
            id: 970,
            name: '970'
          },
          {
            lng: 132.436544512923,
            lat: 114.45392230112,
            id: 971,
            name: '971'
          },
          {
            lng: 98.1902342939471,
            lat: 94.66053528554356,
            id: 972,
            name: '972'
          },
          {
            lng: 33.45034650838969,
            lat: 65.93247321145319,
            id: 973,
            name: '973'
          },
          {
            lng: 35.390315652753166,
            lat: 24.290177132625345,
            id: 974,
            name: '974'
          },
          {
            lng: 6.724300121603695,
            lat: 90.18036609677607,
            id: 975,
            name: '975'
          },
          {
            lng: 78.4726145177165,
            lat: 152.24920498127105,
            id: 976,
            name: '976'
          },
          {
            lng: 63.28562577875598,
            lat: 33.80479640716537,
            id: 977,
            name: '977'
          },
          {
            lng: 160.8485246204233,
            lat: 177.25681169969678,
            id: 978,
            name: '978'
          },
          {
            lng: 175.96404544416993,
            lat: 37.41079046313415,
            id: 979,
            name: '979'
          },
          {
            lng: 141.68400107608971,
            lat: 152.14088510277102,
            id: 980,
            name: '980'
          },
          {
            lng: 137.6428088847928,
            lat: 65.59501527043075,
            id: 981,
            name: '981'
          },
          {
            lng: 90.86787966383329,
            lat: 73.13149534227077,
            id: 982,
            name: '982'
          },
          {
            lng: 40.76925120163991,
            lat: 170.13014942920665,
            id: 983,
            name: '983'
          },
          {
            lng: 126.19820199143183,
            lat: 155.4299702832169,
            id: 984,
            name: '984'
          },
          {
            lng: 66.23301433879328,
            lat: 140.1658973799364,
            id: 985,
            name: '985'
          },
          {
            lng: 142.4056719519298,
            lat: 120.04751416648467,
            id: 986,
            name: '986'
          },
          {
            lng: 10.613703509217345,
            lat: 46.00749979923944,
            id: 987,
            name: '987'
          },
          {
            lng: 13.984466290525077,
            lat: 39.98685297501679,
            id: 988,
            name: '988'
          },
          {
            lng: 52.776246981457426,
            lat: 113.71034154272863,
            id: 989,
            name: '989'
          },
          {
            lng: 55.64537287041314,
            lat: 176.4421909282377,
            id: 990,
            name: '990'
          },
          {
            lng: 0.7579859605068817,
            lat: 59.11549373951106,
            id: 991,
            name: '991'
          },
          {
            lng: 133.26254886369455,
            lat: 86.70267620780912,
            id: 992,
            name: '992'
          },
          {
            lng: 73.09377114417074,
            lat: 114.92855249259891,
            id: 993,
            name: '993'
          },
          {
            lng: 153.2141757815574,
            lat: 158.53034610899033,
            id: 994,
            name: '994'
          },
          {
            lng: 116.55066378318568,
            lat: 147.85283638649528,
            id: 995,
            name: '995'
          },
          {
            lng: 13.963867492458974,
            lat: 98.54530986055852,
            id: 996,
            name: '996'
          },
          {
            lng: 128.14732424489372,
            lat: 83.48155189088509,
            id: 997,
            name: '997'
          },
          {
            lng: 139.12978692237425,
            lat: 8.43380329644921,
            id: 998,
            name: '998'
          },
          {
            lng: 141.03501376072805,
            lat: 53.04502912736171,
            id: 999,
            name: '999'
          }
        ]
      },
      {
        id: 'asfdfzxzclasasuster',
        type: 'lcz-amap-heatmap-layer',
        config: {
          show: Chindsstatus[8],
          condition: true,
          globalConfig: {
            zIndex: 100,
            viewRange: {
              min: 4,
              max: 12
            }
          },
          heatStyle: {
            range: 'province',
            adcode: {
              value: 330000
            },
            deps: 1,
            outline: {
              colors: {
                provinceStroke: '#ff8800',
                cityStroke: '#09ff3e',
                countyStroke: '#2de7ff'
              },
              width: 2
            },
            nullColor: 'rgba(31, 255, 106, 0.2)',
            styleSeries: []
          }
        },
        data: [
          {
            adcode: '331000',
            value: 20
          },
          {
            adcode: '330300',
            value: 40
          }
        ]
      },
      {
        id: 'lcz-amap-polymerization-heat-12as',
        type: 'lcz-amap-polymerization-heat',
        config: {
          show: Chindsstatus[9],
          condition: true,
          globalConfig: {
            zIndex: 10,
            viewRange: {
              min: 4,
              max: 12
            }
          },
          thermalPoint: {
            radius: 10,
            maxVal: null,
            minOpacity: 40,
            maxOpacity: 100,
            threeConfig: {
              heightScale: 0.3,
              gridSize: 4,
              heightBezier: {
                X1: 0.4,
                Y1: 0.2,
                X2: 0.4,
                Y2: 0.8
              }
            },
            gradient: [
              {
                proportion: 1,
                color: '#0eff36'
              },
              {
                proportion: 0.7,
                color: 'rgba(93,192,208,1.00)'
              },
              {
                proportion: 0.5,
                color: 'rgba(96,119,136,1.00)'
              },
              {
                proportion: 0.3,
                color: 'rgba(231,93,126,1.00)'
              },
              {
                proportion: 0,
                color: '#0bbb72'
              }
            ]
          }
        },
        data: [
          {
            lng: 123.50419,
            lat: 43.52114,
            value: 10
          },
          {
            lng: 121.137429,
            lat: 41.097683,
            value: 15
          },
          {
            lng: 123.323188,
            lat: 41.417706,
            value: 32
          },
          {
            lng: 108.646282,
            lat: 40.721718,
            value: 1
          },
          {
            lng: 120.099913,
            lat: 30.865839,
            value: 101
          },
          {
            lng: 116.292059,
            lat: 39.817946,
            value: 53
          },
          {
            lng: 116.227996,
            lat: 39.90506,
            value: 11
          },
          {
            lng: 112.566635,
            lat: 37.865722,
            value: 16
          },
          {
            lng: 108.307045,
            lat: 22.787902,
            value: 56
          },
          {
            lng: 121.425611,
            lat: 31.180283,
            value: 19
          },
          {
            lng: 116.280681,
            lat: 39.911227,
            value: 89
          },
          {
            lng: 116.334921,
            lat: 40.079066,
            value: 32
          },
          {
            lng: 117.15323,
            lat: 38.903156,
            value: 25
          },
          {
            lng: 118.788774,
            lat: 32.049346,
            value: 64
          },
          {
            lng: 111.985122,
            lat: 43.63984,
            value: 12
          },
          {
            lng: 105.973687,
            lat: 31.577775,
            value: 1
          },
          {
            lng: 126.483804,
            lat: 46.831892,
            value: 1
          },
          {
            lng: 87.259625,
            lat: 44.015248,
            value: 1
          },
          {
            lng: 115.687475,
            lat: 37.73053,
            value: 1
          },
          {
            lng: 114.300583,
            lat: 30.547577,
            value: 1
          },
          {
            lng: 100.798852,
            lat: 22.00249,
            value: 1
          },
          {
            lng: 116.640619,
            lat: 39.906542,
            value: 1
          },
          {
            lng: 112.150747,
            lat: 32.041325,
            value: 1
          },
          {
            lng: 87.516855,
            lat: 43.838059,
            value: 1
          },
          {
            lng: 121.757621,
            lat: 41.369826,
            value: 1
          },
          {
            lng: 125.939058,
            lat: 41.7225,
            value: 1
          },
          {
            lng: 80.74716,
            lat: 44.184077,
            value: 1
          },
          {
            lng: 120.03429,
            lat: 36.256094,
            value: 1
          },
          {
            lng: 99.423821,
            lat: 26.445785,
            value: 1
          },
          {
            lng: 102.734253,
            lat: 25.081585,
            value: 1
          },
          {
            lng: 104.536171,
            lat: 32.408316,
            value: 1
          },
          {
            lng: 116.505767,
            lat: 40.035314,
            value: 1
          },
          {
            lng: 104.750396,
            lat: 31.457849,
            value: 1
          },
          {
            lng: 112.556381,
            lat: 37.818839,
            value: 1
          },
          {
            lng: 120.324637,
            lat: 31.557511,
            value: 1
          },
          {
            lng: 118.703665,
            lat: 41.928365,
            value: 1
          },
          {
            lng: 114.1207,
            lat: 22.54708,
            value: 1
          },
          {
            lng: 107.04393,
            lat: 39.390117,
            value: 1
          },
          {
            lng: 115.464224,
            lat: 38.456056,
            value: 1
          },
          {
            lng: 126.975657,
            lat: 45.539109,
            value: 1
          },
          {
            lng: 121.60947,
            lat: 38.930722,
            value: 1
          },
          {
            lng: 120.441691,
            lat: 40.367574,
            value: 1
          },
          {
            lng: 116.358376,
            lat: 39.850994,
            value: 1
          },
          {
            lng: 116.326726,
            lat: 39.786505,
            value: 1
          },
          {
            lng: 108.320068,
            lat: 22.815542,
            value: 1
          },
          {
            lng: 123.779995,
            lat: 41.289629,
            value: 1
          },
          {
            lng: 127.484116,
            lat: 42.175549,
            value: 1
          },
          {
            lng: 112.941049,
            lat: 27.78016,
            value: 1
          },
          {
            lng: 118.311992,
            lat: 29.709533,
            value: 1
          },
          {
            lng: 115.243365,
            lat: 37.528638,
            value: 1
          },
          {
            lng: 114.196513,
            lat: 36.688914,
            value: 1
          },
          {
            lng: 114.363958,
            lat: 35.921147,
            value: 1
          }
        ]
      }
    ]
  }

  const [status, setStatus] = useState(true)

  return (
    <div style={{ width: 900, height: 900 }}>
      <ul>
        {config.childComponents &&
          config.childComponents.map((item, i) => {
            return (
              <li
                style={{ color: Chindsstatus[i] ? '#f00' : '#fff' }}
                key={item.id}
                onClick={() => {
                  const arr: boolean[] = [...Chindsstatus]
                  arr[i] = !Chindsstatus[i]
                  setChindsstatus(arr)
                }}>
                {item.type}
              </li>
            )
          })}
      </ul>
      <button
        onClick={() => {
          setStatus(!status)
        }}>
        Change
      </button>
      {status && (
        <LczAMap
          design={false}
          {...config}
          w={900}
          h={900}
          onChildComEvent={(a, b, t) => console.log(a, b, t, 'childComponentEvent')}
          onClick={a => console.log(a)}
        />
      )}
    </div>
  )
})
