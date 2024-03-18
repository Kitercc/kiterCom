import React, { memo, useState } from 'react'
import { LczChina2dMap } from '../'
import { ChinaMapProps } from '../LczChina2dMap/type'

const colorStr = {
  selected: 'gradient',
  single: '#79d127',
  gradient: {
    gradualAngle: 0,
    colors: [
      {
        begins: 0,
        value: '#1ece0e'
      },
      {
        begins: 0,
        value: 'rgba(255,0,0,1)'
      },
      {
        begins: 0,
        value: '#8cd439'
      }
    ]
  }
}

export const T_LczChina2dmap = memo(function LczChina2dmap() {
  const config: ChinaMapProps = {
    mapConfig: {
      range: {
        source: 'system',
        adcode: { value: '100000' },
        uploadData: { src: '/HappyServer/lczCommon/charts/geoJson/330000.json' }
      },
      showMultistage: false,
      drillDown: true,
      drillType: 'dblclick',
      upperType: 'back_button',
      wheelZoom: false,
      southChinaSea: {
        displayType: 'mosaic',
        fillColor: 'rgba(0,0,0,0)',
        storke: '#77ffb0'
      },
      maxLevel: {
        value: ''
      },
      rootCode: {
        value: '100000'
      },
      callbackBtn: {
        content: '返回',
        position: { x: 0, y: 0 },
        fontStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#fff',
          fontWeight: 'normal',
          letterSpacing: 0
        },
        bgConfig: {
          color: colorStr,
          imgUrl: '',
          width: 40,
          height: 20,
          radius: 4
        },
        border: {
          display: true,
          color: 'skyblue',
          width: 1
        }
      },
      bgConfig: {
        display: false,
        colorConfig: {
          display: true,
          range: 'current',
          starColor: '#edf3d2',
          endColor: '#2fc55c',
          direction: 2
        },
        texture: {
          display: true,
          imgUrl: 'https://easyv.assets.dtstack.com/components/static-image/chinaMap2d/pattern.png',
          repeat: false,
          opacity: 1,
          width: 8,
          height: 8
        }
      },
      boundary: {
        display: true,
        type: 'solid',
        color: '#ff8282',
        width: 1
      },
      extremityBoundary: {
        display: true,
        type: 'dashed',
        color: '#48688d',
        width: 1
      },
      areaName: {
        display: true,
        reversion: true,
        fontFamily: '微软雅黑',
        fontSize: 12,
        color: '#fff',
        fontWeight: 400,
        letterSpacing: 0,
        textSeries: []
      },
      extremityAreaName: {
        display: false,
        reversion: false,
        fontFamily: '微软雅黑',
        fontSize: 8,
        color: '#7effff',
        fontWeight: 400,
        letterSpacing: 0,
        textSeries: []
      },
      overlappingBottom: [
        // {
        //   gaussianBlur: 10,
        //   xOffset: 10,
        //   yOffset: 10,
        //   fillColor: 'green',
        //   borderConfig: {
        //     display: true,
        //     range: 'global',
        //     startColor: '#f00',
        //     endColor: 'skyblue',
        //     angle: 50,
        //     width: 6
        //   }
        // }
        // {
        //   gaussianBlur: 10,
        //   xOffset: 20,
        //   yOffset: 20,
        //   fillColor: '#f00',
        //   borderConfig: {
        //     display: false,
        //     range: 'global',
        //     startColor: '#f00',
        //     endColor: 'skyblue',
        //     angle: 50,
        //     width: 4
        //   }
        // }
      ]
    },
    transformation: {
      perspective: true,
      rotate: {
        x: 30,
        y: 0,
        z: 0
      }
    },
    childComponents: [
      {
        type: 'lcz-china-2dmap-segmentedRegionalHeat',
        id: 'dsasad132323',
        config: {
          show: false,
          condition: true,
          noData: 'rgba(255, 255, 255, 0.363)',
          boundary: {
            display: true,
            color: '#69ff24',
            width: 1
          },
          styleSeries: [
            {
              min: 0,
              max: 40,
              color: '#0485ff'
            },
            {
              min: 40,
              max: 100,
              color: '#19cce4'
            }
          ],
          thermalIndicator: {
            display: true,
            position: { x: 60, y: 0 },
            orientation: 'level',
            itemGap: 16,
            fontStyle: {
              display: true,
              align: 'right',
              speed: 10,
              textStyle: {
                fontFamily: '微软雅黑',
                fontSize: 12,
                color: '#fff',
                fontWeight: 400,
                letterSpacing: 0
              }
            },
            indicator: {
              width: 16,
              height: 10,
              radius: 2
            },
            clickInteraction: true
          }
        },
        data: [
          {
            value: 20,
            adcode: 360000
          },
          {
            value: 50,
            adcode: 330000
          },
          {
            value: 20,
            adcode: 140000
          }
        ]
      },
      {
        type: 'lcz-china-2dmap-sandian',
        id: '1212',
        config: {
          show: true,
          condition: true,
          global: {
            clickToSelect: true,
            reversion: true,
            beyondVisible: true,
            size: { min: 16, max: 24 }
          },
          normalStyle: {
            styleType: 'img',
            color: '#FCF064',
            stroke: { display: true, width: 1, color: '#F5A623' },
            shadow: {
              display: true,
              c: 'rgba(255,173,13,40)',
              e: 4
            },
            iconValue: {
              iconValue: '&#59361;'
            },
            imgUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp'
          },
          selectStyle: {
            display: true,
            styleType: 'dot',
            color: '#FCF064',
            stroke: { display: true, width: 1, color: '#F5A623' },
            shadow: {
              display: true,
              c: 'rgba(255,173,13,40)',

              e: 4
            },
            iconValue: {
              iconValue: '&#59361;'
            },
            imgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg'
          },
          styleSeries: [
            {
              type: '类型11',
              styleType: 'dot',
              color: '#a30ea8',
              stroke: { display: false, width: 1, color: '#00e24b' },
              shadow: {
                display: true,
                c: '#2600ff',

                e: 4
              },
              syncDefaultSelectStyle: true,
              iconValue: '&#59230;|1',
              imgUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp'
            }
          ],
          carouselConfig: {
            display: true,
            stopCondition: false,
            interval: 3
          }
        },
        data: [
          {
            lng: '123.504194',
            lat: 43.52114,
            type: '类型11',
            value: 1
          },
          {
            lng: 121.137429,
            lat: 41.097683,
            type: '类型1',
            value: 1
          },
          {
            lng: 123.323188,
            lat: 41.417706,
            type: '类型1',
            value: 1
          },
          {
            lng: 108.646282,
            lat: 40.721718,
            type: '类型1',
            value: 1
          },
          {
            lng: 120.099913,
            lat: 30.865839,
            type: '类型1',
            value: 1
          },
          {
            lng: 116.292059,
            lat: 39.817946,
            type: '类型1',
            value: 1
          },
          {
            lng: 116.227996,
            lat: 39.90506,
            type: '类型2',
            value: 1
          },
          {
            lng: 112.566635,
            lat: 37.865722,
            type: '类型2',
            value: 1
          },
          {
            lng: 108.307045,
            lat: 22.787902,
            type: '类型2',
            value: 1
          },
          {
            lng: 121.425611,
            lat: 31.180283,
            type: '类型2',
            value: 1
          },
          {
            lng: 116.280681,
            lat: 39.911227,
            type: '类型3',
            value: 1
          },
          {
            lng: 116.334921,
            lat: 40.079066,
            type: '类型2',
            value: 1
          },
          {
            lng: 117.15323,
            lat: 38.903156,
            type: '类型4',
            value: 1
          },
          {
            lng: 118.788774,
            lat: 32.049346,
            type: '类型2',
            value: 1
          },
          {
            lng: 111.985122,
            lat: 43.63984,
            type: '类型1',
            value: 1
          },
          {
            lng: 105.973687,
            lat: 31.577775,
            type: '类型1',
            value: 1
          },
          {
            lng: 126.483804,
            lat: 46.831892,
            type: '类型1',
            value: 1
          },
          {
            lng: 87.259625,
            lat: 44.015248,
            type: '类型1',
            value: 1
          },
          {
            lng: 115.687475,
            lat: 37.73053,
            type: '类型1',
            value: 1
          },
          {
            lng: 114.300583,
            lat: 30.547577,
            type: '类型1',
            value: 1
          },
          {
            lng: 100.798852,
            lat: 22.00249,
            type: '类型1',
            value: 1
          },
          {
            lng: 116.640619,
            lat: 39.906542,
            type: '类型1',
            value: 1
          },
          {
            lng: 112.150747,
            lat: 32.041325,
            type: '类型1',
            value: 1
          },
          {
            lng: 87.516855,
            lat: 43.838059,
            type: '类型4',
            value: 1
          },
          {
            lng: 121.757621,
            lat: 41.369826,
            type: '类型1',
            value: 1
          },
          {
            lng: 125.939058,
            lat: 41.7225,
            type: '类型1',
            value: 1
          },
          {
            lng: 80.74716,
            lat: 44.184077,
            type: '类型1',
            value: 1
          },
          {
            lng: 120.03429,
            lat: 36.256094,
            type: '类型1',
            value: 1
          },
          {
            lng: 99.423821,
            lat: 26.445785,
            type: '类型1',
            value: 1
          },
          {
            lng: 102.734253,
            lat: 25.081585,
            type: '类型1',
            value: 1
          },
          {
            lng: 104.536171,
            lat: 32.408316,
            type: '类型1',
            value: 1
          },
          {
            lng: 116.505767,
            lat: 40.035314,
            type: '类型4',
            value: 1
          },
          {
            lng: 104.750396,
            lat: 31.457849,
            type: '类型1',
            value: 1
          },
          {
            lng: 112.556381,
            lat: 37.818839,
            type: '类型1',
            value: 1
          },
          {
            lng: 120.324637,
            lat: 31.557511,
            type: '类型2',
            value: 1
          },
          {
            lng: 118.703665,
            lat: 41.928365,
            type: '类型1',
            value: 1
          },
          {
            lng: 114.1207,
            lat: 22.54708,
            type: '类型1',
            value: 1
          },
          {
            lng: 107.04393,
            lat: 39.390117,
            type: '类型1',
            value: 1
          },
          {
            lng: 115.464224,
            lat: 38.456056,
            type: '类型1',
            value: 1
          },
          {
            lng: 126.975657,
            lat: 45.539109,
            type: '类型1',
            value: 1
          },
          {
            lng: 121.60947,
            lat: 38.930722,
            type: '类型4',
            value: 1
          },
          {
            lng: 120.441691,
            lat: 40.367574,
            type: '类型1',
            value: 1
          },
          {
            lng: 116.358376,
            lat: 39.850994,
            type: '类型2',
            value: 1
          },
          {
            lng: 116.326726,
            lat: 39.786505,
            type: '类型3',
            value: 1
          },
          {
            lng: 108.320068,
            lat: 22.815542,
            type: '类型5',
            value: 1
          },
          {
            lng: 123.779995,
            lat: 41.289629,
            type: '类型1',
            value: 1
          },
          {
            lng: 127.484116,
            lat: 42.175549,
            type: '类型1',
            value: 1
          },
          {
            lng: 112.941049,
            lat: 27.78016,
            type: '类型1',
            value: 1
          },
          {
            lng: 118.311992,
            lat: 29.709533,
            type: '类型1',
            value: 1
          },
          {
            lng: 115.243365,
            lat: 37.528638,
            type: '类型1',
            value: 1
          },
          {
            lng: 114.196513,
            lat: 36.688914,
            type: '类型1',
            value: 1
          },
          {
            lng: 114.363958,
            lat: 35.921147,
            type: '类型1',
            value: 1
          }
        ],
        event: {
          onClick: () => {},
          onChange: () => {}
        }
      },
      {
        type: 'lcz-china-2dmap-tip',
        id: '1212',
        config: {
          show: false,
          condition: true,
          reversion: true,
          currentArea: {
            manualTrigger: true,
            targetType: 'click',
            autoCarousel: false,
            residenceTime: 5,
            movePause: true,
            sign: {
              display: true,
              width: 80,
              height: 80,
              imgUrl: 'https://easyv.assets.dtstack.com/components/static-image/chinaMap2d/chinaMap2dBG2.png',
              rotate: true
            },
            area: {
              display: true,
              color: colorStr,
              borderColor: '#A0CFFE'
            },
            areaName: {
              display: true,
              reversion: true,
              fontFamily: '微软雅黑',
              fontSize: 12,
              color: '#fff',
              fontWeight: 400,
              letterSpacing: 0,
              textSeries: [
                {
                  value: '四川省',
                  xOffset: -10,
                  yOffset: -10
                }
              ]
            }
          },
          size: { width: 188, height: 145 },
          promptBox: {
            fixed: false,
            fixedSeat: {
              x: 945,
              y: 715
            },
            fixedPadd: {
              t: 16,
              b: 16,
              l: 16,
              r: 16
            },
            fixedBgConfig: {
              color: colorStr,
              imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg'
            },
            fixedBorder: {
              display: true,
              color: 'red',
              width: 1
            },
            leftT: {
              seat: { x: 0, y: 0 },
              padd: {
                t: 16,
                b: 16,
                l: 16,
                r: 16
              },
              bgConfig: {
                color: colorStr,
                imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg'
              },
              border: {
                display: true,
                color: 'red',
                width: 1
              }
            },
            leftB: {
              seat: { x: 0, y: 0 },
              padd: {
                t: 16,
                b: 16,
                l: 16,
                r: 16
              },
              bgConfig: {
                color: colorStr,
                imgUrl: 'https://pic1.zhimg.com/80/v2-4af581163d11d760c7347265459d04c1_720w.jpg'
              },
              border: {
                display: true,
                color: 'red',
                width: 1
              }
            },
            rightT: {
              seat: { x: 0, y: 0 },
              padd: {
                t: 16,
                b: 16,
                l: 16,
                r: 16
              },
              bgConfig: {
                color: colorStr,
                imgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c'
              },
              border: {
                display: true,
                color: 'red',
                width: 1
              }
            },
            rightB: {
              seat: { x: 0, y: 0 },
              padd: {
                t: 16,
                b: 16,
                l: 16,
                r: 16
              },
              bgConfig: {
                color: colorStr,
                imgUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c'
              },
              border: {
                display: true,
                color: 'red',
                width: 1
              }
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
          ]
        },
        data: [
          {
            lng: 91.1145,
            value2: 31662,
            adcode: '540000',
            value1: 86.8,
            value3: 678,
            title: '富阳区',
            lat: 29.64415
          },
          {
            lng: 104.07572,
            value2: 486000,
            adcode: '510000',
            value1: 8370,
            value3: 48600,
            title: '奉化区',
            lat: 30.65089
          },
          {
            lng: 87.6271,
            value2: 1664900,
            adcode: '650000',
            value1: 2590,
            value3: 14000,
            title: '景宁畲族自治县',
            lat: 43.79343
          }
        ],
        event: {
          onChange: () => {},
          onMouseenter: () => {},
          onMouseleave: () => {}
        }
      },
      {
        type: 'lcz-china-2dmap-flyline',
        id: '1212',
        config: {
          show: false,
          condition: true,
          flight: { smooth: 120, speed: 1, radian: 2, randomStart: false },
          lineConfig: {
            baseline: {
              display: true,
              width: 3,
              color: 'rgba(255, 232, 136,0.3)'
            },
            flyLine: {
              colors: {
                startColor: 'rgba(255, 93, 19,1)',
                endColor: 'rgba(255, 255, 0,0)'
              },
              width: 6,
              len: 1
            }
          },
          toGround: {
            display: true,
            color: '#ff0909e5',
            cut: 0.2,
            haloRadius: 40,
            startRadius: 0,
            stepTime: 1,
            stroke: {
              display: true,
              color: '#00e1ff',
              width: 1
            },
            time: 3,
            times: 3
          }
        },
        data: [
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '36.204957',
            tolng: '117.661322'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '31.901798',
            tolng: '120.024719'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '33.949758',
            tolng: '112.960157'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '36.663933',
            tolng: '111.856319'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '33.642549',
            tolng: '113.769638'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '31.713261',
            tolng: '117.22833'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '29.806773',
            tolng: '120.319076'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '26.348131',
            tolng: '118.184989'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '27.469714',
            tolng: '115.609368'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '30.51024',
            tolng: '112.297854'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '28.058889',
            tolng: '111.78273'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '30.191111',
            tolng: '107.735325'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '30.191111',
            tolng: '107.735325'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '41.534708',
            tolng: '123.262643'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '22.781739',
            tolng: '113.401692'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolat: '40.671907',
            tolng: '109.924603'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '125.378332',
            tolat: '43.921505'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '126.537362',
            tolat: '46.126158'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '106.208349',
            tolat: '38.421743'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '108.783971',
            tolat: '34.332201'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '103.927084',
            tolat: '30.51024'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '106.649884',
            tolat: '26.646114'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '102.749657',
            tolat: '24.880241'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '108.37923',
            tolat: '22.849963'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '110.237357',
            tolat: '19.973167'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '103.779906',
            tolat: '36.203066'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '101.425052',
            tolat: '36.663933'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '90.993784',
            tolat: '29.774677'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '87.608682',
            tolat: '43.775043'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '117.191535',
            tolat: '39.041408'
          },
          {
            fromlat: '39.794602',
            fromlng: '116.88798',
            tolng: '121.577988',
            tolat: '25.040524'
          }
        ]
      },
      {
        type: 'lcz-china-2dmap-polymerizationHeat',
        id: '',
        config: {
          show: false,
          condition: true,
          fuzzyFactor: 1,
          maxOpacity: 100,
          maxValue: 100,
          minOpacity: 40,
          minValue: 0,
          radius: 20,
          colorSeries: [
            {
              proportion: 1,
              color: 'rgba(255,50,74,1)'
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
              color: 'rgba(55,28,176,1.00)'
            }
          ],
          dataAnimate: {
            display: true,
            frequency: 10,
            speed: 50
          }
        },
        data: [
          {
            lng: 123.504194,
            lat: 43.52114,
            type: '大货店',
            value: 80
          },
          {
            lng: 121.137429,
            lat: 41.097683,
            type: '大货店',
            value: 50
          },
          {
            lng: 123.323188,
            lat: 41.417706,
            type: '大货店',
            value: 10
          },
          {
            lng: 108.646282,
            lat: 40.721718,
            type: '大货店',
            value: 76
          },
          {
            lng: 125.329582,
            lat: 46.410636,
            type: '大货店',
            value: 62
          },
          {
            lng: 121.601698,
            lat: 39.018619,
            type: '大货店',
            value: 32
          },
          {
            lng: 121.532743,
            lat: 38.860338,
            type: '大货店',
            value: 80
          },
          {
            lng: 121.78076,
            lat: 39.04809,
            type: '大货店',
            value: 10
          },
          {
            lng: 125.145264,
            lat: 42.901402,
            type: '大货店',
            value: 33
          },
          {
            lng: 116.657118,
            lat: 36.939804,
            type: '大货店',
            value: 60
          },
          {
            lng: 104.057432,
            lat: 30.674023,
            type: '大货店',
            value: 90
          },
          {
            lng: 115.870889,
            lat: 39.053455,
            type: '大货店',
            value: 95
          },
          {
            lng: 111.70165,
            lat: 41.522506,
            type: '大货店',
            value: 98
          },
          {
            lng: 120.099913,
            lat: 30.865839,
            type: '大货店',
            value: 100
          },
          {
            lng: 116.292059,
            lat: 39.817946,
            type: '大货店',
            value: 66
          },
          {
            lng: 116.227996,
            lat: 39.90506,
            type: '综合店',
            value: 88
          },
          {
            lng: 112.566635,
            lat: 37.865722,
            type: '大货店',
            value: 99
          },
          {
            lng: 108.307045,
            lat: 22.787902,
            type: '工厂店',
            value: 50
          },
          {
            lng: 121.425611,
            lat: 31.180283,
            type: '工厂店',
            value: 20
          },
          {
            lng: 116.347479,
            lat: 39.9071,
            type: '大货店',
            value: 18
          },
          {
            lng: 111.679602,
            lat: 40.846019,
            type: '大货店',
            value: 10
          },
          {
            lng: 125.094824,
            lat: 46.593936,
            type: '大货店',
            value: 1
          },
          {
            lng: 122.172169,
            lat: 37.422716,
            type: '大货店',
            value: 99
          },
          {
            lng: 117.28933,
            lat: 31.861992,
            type: '大货店',
            value: 88
          },
          {
            lng: 122.827894,
            lat: 41.994793,
            type: '大货店',
            value: 40
          },
          {
            lng: 126.625255,
            lat: 45.770159,
            type: '大货店',
            value: 60
          },
          {
            lng: 127.109319,
            lat: 46.440103,
            type: '大货店',
            value: 90
          },
          {
            lng: 115.467197,
            lat: 38.893683,
            type: '大货店',
            value: 80
          },
          {
            lng: 105.666293,
            lat: 38.833411,
            type: '大货店',
            value: 80
          },
          {
            lng: 115.86392,
            lat: 39.323538,
            type: '大货店',
            value: 80
          },
          {
            lng: 116.846109,
            lat: 40.373815,
            type: '大货店',
            value: 70
          },
          {
            lng: 121.963882,
            lat: 39.400762,
            type: '大货店',
            value: 90
          },
          {
            lng: 114.49438,
            lat: 36.61134,
            type: '大货店',
            value: 20
          },
          {
            lng: 129.618026,
            lat: 44.586399,
            type: '工厂店',
            value: 60
          },
          {
            lng: 116.340998,
            lat: 39.731628,
            type: '工厂店',
            value: 55
          },
          {
            lng: 121.579443,
            lat: 31.133919,
            type: '工厂店',
            value: 34
          },
          {
            lng: 121.482023,
            lat: 31.23805,
            type: '大货店',
            value: 90
          },
          {
            lng: 123.620154,
            lat: 41.844007,
            type: '奥莱工厂店',
            value: 80
          },
          {
            lng: 123.344981,
            lat: 41.803142,
            type: '大货店',
            value: 80
          },
          {
            lng: 125.300852,
            lat: 43.870351,
            type: '工厂店',
            value: 40
          },
          {
            lng: 114.48455,
            lat: 38.04405,
            type: '大货店',
            value: 20
          },
          {
            lng: 122.070973,
            lat: 41.123676,
            type: '大货店',
            value: 30
          },
          {
            lng: 131.00485,
            lat: 45.771203,
            type: '大货店',
            value: 60
          },
          {
            lng: 114.517395,
            lat: 36.608954,
            type: '工厂店',
            value: 50
          },
          {
            lng: 116.670943,
            lat: 39.908379,
            type: '大货店',
            value: 90
          },
          {
            lng: 123.806879,
            lat: 41.849382,
            type: '大货店',
            value: 80
          },
          {
            lng: 121.492872,
            lat: 31.184648,
            type: '全品类标杆店',
            value: 65
          },
          {
            lng: 125.71194,
            lat: 42.53574,
            type: '大货店',
            value: 66
          },
          {
            lng: 109.969568,
            lat: 39.819141,
            type: '大货店',
            value: 88
          },
          {
            lng: 121.532724,
            lat: 38.862515,
            type: '大货店',
            value: 99
          },
          {
            lng: 116.280681,
            lat: 39.911227,
            type: '综合店',
            value: 32
          },
          {
            lng: 116.334921,
            lat: 40.079066,
            type: '工厂店',
            value: 56
          },
          {
            lng: 117.15323,
            lat: 38.903156,
            type: '奥莱工厂店',
            value: 99
          },
          {
            lng: 118.788774,
            lat: 32.049346,
            type: '工厂店',
            value: 40
          },
          {
            lng: 111.735571,
            lat: 40.836354,
            type: '大货店',
            value: 60
          },
          {
            lng: 125.989524,
            lat: 46.070877,
            type: '大货店',
            value: 44
          },
          {
            lng: 121.425195,
            lat: 31.172281,
            type: '工厂店',
            value: 66
          },
          {
            lng: 120.460944,
            lat: 32.84657,
            type: '大货店',
            value: 55
          },
          {
            lng: 127.104257,
            lat: 46.440756,
            type: '大货店',
            value: 33
          },
          {
            lng: 118.366384,
            lat: 31.310879,
            type: '大货店',
            value: 20
          },
          {
            lng: 117.350932,
            lat: 38.365381,
            type: '大货店',
            value: 60
          },
          {
            lng: 111.60427,
            lat: 26.434827,
            type: '大货店',
            value: 40
          },
          {
            lng: 116.412,
            lat: 39.914967,
            type: '大货店',
            value: 50
          },
          {
            lng: 111.466215,
            lat: 27.320078,
            type: '大货店',
            value: 20
          },
          {
            lng: 126.566819,
            lat: 43.849729,
            type: '大货店',
            value: 10
          },
          {
            lng: 106.56378,
            lat: 29.526104,
            type: '大货店',
            value: 1
          },
          {
            lng: 111.985122,
            lat: 43.63984,
            type: '大货店',
            value: 1
          },
          {
            lng: 105.973687,
            lat: 31.577775,
            type: '大货店',
            value: 100
          },
          {
            lng: 126.483804,
            lat: 46.831892,
            type: '大货店',
            value: 1
          },
          {
            lng: 87.259625,
            lat: 44.015248,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.687475,
            lat: 37.73053,
            type: '大货店',
            value: 1
          },
          {
            lng: 118.117393,
            lat: 24.471433,
            type: '工厂店',
            value: 1
          },
          {
            lng: 124.824829,
            lat: 45.116115,
            type: '大货店',
            value: 1
          },
          {
            lng: 114.006319,
            lat: 22.733638,
            type: '大货店',
            value: 1
          },
          {
            lng: 126.694425,
            lat: 45.726527,
            type: '工厂店',
            value: 1
          },
          {
            lng: 113.344505,
            lat: 23.123434,
            type: '大货店',
            value: 1
          },
          {
            lng: 123.401978,
            lat: 41.791284,
            type: '大货店',
            value: 1
          },
          {
            lng: 81.671645,
            lat: 36.85593,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.6468,
            lat: 40.132487,
            type: '大货店',
            value: 1
          },
          {
            lng: 118.355531,
            lat: 34.527699,
            type: '大货店',
            value: 1
          },
          {
            lng: 121.966453,
            lat: 39.399619,
            type: '大货店',
            value: 1
          },
          {
            lng: 112.978697,
            lat: 28.19251,
            type: '综合店',
            value: 1
          },
          {
            lng: 116.534278,
            lat: 39.80107,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.731957,
            lat: 24.720795,
            type: '大货店',
            value: 1
          },
          {
            lng: 126.25115,
            lat: 48.037239,
            type: '大货店',
            value: 1
          },
          {
            lng: 114.344614,
            lat: 30.586784,
            type: '工厂店',
            value: 1
          },
          {
            lng: 116.520746,
            lat: 39.940198,
            type: '工厂店',
            value: 1
          },
          {
            lng: 117.850354,
            lat: 25.693283,
            type: '大货店',
            value: 1
          },
          {
            lng: 130.398787,
            lat: 48.892923,
            type: '大货店',
            value: 1
          },
          {
            lng: 114.321674,
            lat: 30.364957,
            type: '大货店',
            value: 1
          },
          {
            lng: 124.07229,
            lat: 40.45884,
            type: '大货店',
            value: 1
          },
          {
            lng: 114.300583,
            lat: 30.547577,
            type: '大货店',
            value: 1
          },
          {
            lng: 100.798852,
            lat: 22.00249,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.640619,
            lat: 39.906542,
            type: '大货店',
            value: 1
          },
          {
            lng: 112.150747,
            lat: 32.041325,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.666153,
            lat: 39.883834,
            type: '大货店',
            value: 1
          },
          {
            lng: 106.93653,
            lat: 30.33507,
            type: '大货店',
            value: 1
          },
          {
            lng: 122.365509,
            lat: 40.403364,
            type: '大货店',
            value: 1
          },
          {
            lng: 108.94334,
            lat: 34.232124,
            type: '大货店',
            value: 1
          },
          {
            lng: 114.01536,
            lat: 34.721252,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.040676,
            lat: 40.326879,
            type: '奥莱工厂店',
            value: 1
          },
          {
            lng: 113.038047,
            lat: 22.519859,
            type: '大货店',
            value: 1
          },
          {
            lng: 109.963339,
            lat: 39.822507,
            type: '大货店',
            value: 1
          },
          {
            lng: 113.627207,
            lat: 28.158423,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.288183,
            lat: 39.958263,
            type: '大货店',
            value: 1
          },
          {
            lng: 108.76914,
            lat: 36.822025,
            type: '大货店',
            value: 1
          },
          {
            lng: 122.353119,
            lat: 40.406072,
            type: '大货店',
            value: 1
          },
          {
            lng: 103.843671,
            lat: 36.052007,
            type: '综合店',
            value: 1
          },
          {
            lng: 119.747162,
            lat: 49.214012,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.892233,
            lat: 28.676271,
            type: '大货店',
            value: 1
          },
          {
            lng: 123.900367,
            lat: 41.859985,
            type: '大货店',
            value: 1
          },
          {
            lng: 100.5535,
            lat: 25.472493,
            type: '大货店',
            value: 1
          },
          {
            lng: 124.371017,
            lat: 43.169384,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.589808,
            lat: 32.634584,
            type: '大货店',
            value: 1
          },
          {
            lng: 121.51388,
            lat: 31.300404,
            type: '中国李宁店',
            value: 1
          },
          {
            lng: 87.516855,
            lat: 43.838059,
            type: '综合店',
            value: 1
          },
          {
            lng: 121.757621,
            lat: 41.369826,
            type: '大货店',
            value: 1
          },
          {
            lng: 125.939058,
            lat: 41.7225,
            type: '大货店',
            value: 1
          },
          {
            lng: 80.74716,
            lat: 44.184077,
            type: '大货店',
            value: 1
          },
          {
            lng: 122.069897,
            lat: 41.158678,
            type: '大货店',
            value: 1
          },
          {
            lng: 127.158254,
            lat: 44.917229,
            type: '大货店',
            value: 1
          },
          {
            lng: 126.806582,
            lat: 42.3915,
            type: '大货店',
            value: 1
          },
          {
            lng: 120.462758,
            lat: 41.590669,
            type: '大货店',
            value: 1
          },
          {
            lng: 124.89925,
            lat: 46.601439,
            type: '大货店',
            value: 1
          },
          {
            lng: 131.010253,
            lat: 45.7728,
            type: '大货店',
            value: 1
          },
          {
            lng: 120.03429,
            lat: 36.256094,
            type: '大货店',
            value: 1
          },
          {
            lng: 99.423821,
            lat: 26.445785,
            type: '大货店',
            value: 1
          },
          {
            lng: 102.734253,
            lat: 25.081585,
            type: '大货店',
            value: 1
          },
          {
            lng: 104.536171,
            lat: 32.408316,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.505767,
            lat: 40.035314,
            type: '奥莱工厂店',
            value: 1
          },
          {
            lng: 104.750396,
            lat: 31.457849,
            type: '大货店',
            value: 1
          },
          {
            lng: 112.556381,
            lat: 37.818839,
            type: '大货店',
            value: 1
          },
          {
            lng: 120.324637,
            lat: 31.557511,
            type: '工厂店',
            value: 1
          },
          {
            lng: 118.703665,
            lat: 41.928365,
            type: '大货店',
            value: 1
          },
          {
            lng: 114.1207,
            lat: 22.54708,
            type: '大货店',
            value: 1
          },
          {
            lng: 120.092658,
            lat: 43.879393,
            type: '大货店',
            value: 1
          },
          {
            lng: 124.824035,
            lat: 45.115764,
            type: '工厂店',
            value: 1
          },
          {
            lng: 117.179937,
            lat: 39.135044,
            type: '中国李宁店',
            value: 1
          },
          {
            lng: 125.299533,
            lat: 48.87669,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.185822,
            lat: 39.763197,
            type: '奥莱工厂店',
            value: 1
          },
          {
            lng: 126.540966,
            lat: 43.833445,
            type: '大货店',
            value: 1
          },
          {
            lng: 113.864215,
            lat: 22.57465,
            type: '大货店',
            value: 1
          },
          {
            lng: 124.040746,
            lat: 42.54465,
            type: '大货店',
            value: 1
          },
          {
            lng: 113.218369,
            lat: 33.971399,
            type: '大货店',
            value: 1
          },
          {
            lng: 124.893707,
            lat: 46.637432,
            type: '综合店',
            value: 1
          },
          {
            lng: 121.578522,
            lat: 31.256856,
            type: '大货店',
            value: 1
          },
          {
            lng: 121.556182,
            lat: 29.871856,
            type: '大货店',
            value: 1
          },
          {
            lng: 125.293523,
            lat: 43.872491,
            type: '大货店',
            value: 1
          },
          {
            lng: 113.921491,
            lat: 22.532768,
            type: '大货店',
            value: 1
          },
          {
            lng: 121.514011,
            lat: 31.14031,
            type: '大货店',
            value: 1
          },
          {
            lng: 126.647462,
            lat: 45.76184,
            type: '大货店',
            value: 1
          },
          {
            lng: 126.625429,
            lat: 45.742234,
            type: '工厂店',
            value: 1
          },
          {
            lng: 107.04393,
            lat: 39.390117,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.464224,
            lat: 38.456056,
            type: '大货店',
            value: 1
          },
          {
            lng: 126.975657,
            lat: 45.539109,
            type: '大货店',
            value: 1
          },
          {
            lng: 121.60947,
            lat: 38.930722,
            type: '奥莱工厂店',
            value: 1
          },
          {
            lng: 120.441691,
            lat: 40.367574,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.358376,
            lat: 39.850994,
            type: '工厂店',
            value: 1
          },
          {
            lng: 116.326726,
            lat: 39.786505,
            type: '综合店',
            value: 1
          },
          {
            lng: 108.320068,
            lat: 22.815542,
            type: '全品类标杆店',
            value: 1
          },
          {
            lng: 117.15323,
            lat: 38.903156,
            type: '奥莱工厂店',
            value: 1
          },
          {
            lng: 116.35371,
            lat: 40.009626,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.497509,
            lat: 39.349398,
            type: '大货店',
            value: 1
          },
          {
            lng: 123.508416,
            lat: 43.514185,
            type: '大货店',
            value: 1
          },
          {
            lng: 123.400614,
            lat: 41.792633,
            type: '大货店',
            value: 1
          },
          {
            lng: 123.779995,
            lat: 41.289629,
            type: '大货店',
            value: 1
          },
          {
            lng: 120.853284,
            lat: 40.757815,
            type: '大货店',
            value: 1
          },
          {
            lng: 126.666895,
            lat: 45.7129,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.491279,
            lat: 38.857851,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.984561,
            lat: 39.699903,
            type: '大货店',
            value: 1
          },
          {
            lng: 121.43613,
            lat: 31.153806,
            type: '工厂店',
            value: 1
          },
          {
            lng: 121.783101,
            lat: 39.059898,
            type: '大货店',
            value: 1
          },
          {
            lng: 117.264531,
            lat: 39.067224,
            type: '工厂店',
            value: 33
          },
          {
            lng: 112.694372,
            lat: 22.363969,
            type: '大货店',
            value: 90
          },
          {
            lng: 112.19491,
            lat: 30.35138,
            type: '工厂店',
            value: 90
          },
          {
            lng: 117.197299,
            lat: 39.126915,
            type: '大货店',
            value: 90
          },
          {
            lng: 115.154511,
            lat: 38.695736,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.188961,
            lat: 39.908942,
            type: '大货店',
            value: 90
          },
          {
            lng: 124.823036,
            lat: 45.113947,
            type: '大货店',
            value: 100
          },
          {
            lng: 111.958768,
            lat: 21.848977,
            type: '大货店',
            value: 1
          },
          {
            lng: 120.859617,
            lat: 40.754347,
            type: '大货店',
            value: 90
          },
          {
            lng: 114.47452,
            lat: 38.04131,
            type: '全品类标杆店',
            value: 100
          },
          {
            lng: 121.445134,
            lat: 31.037495,
            type: '大货店',
            value: 1
          },
          {
            lng: 117.065831,
            lat: 38.83432,
            type: '大货店',
            value: 1
          },
          {
            lng: 121.506007,
            lat: 31.083023,
            type: '大货店',
            value: 50
          },
          {
            lng: 131.225769,
            lat: 45.257356,
            type: '大货店',
            value: 1
          },
          {
            lng: 124.071833,
            lat: 40.454184,
            type: '大货店',
            value: 1
          },
          {
            lng: 121.278425,
            lat: 31.386506,
            type: '大货店',
            value: 1
          },
          {
            lng: 114.240166,
            lat: 30.625578,
            type: '大货店',
            value: 100
          },
          {
            lng: 123.958016,
            lat: 47.342534,
            type: '大货店',
            value: 100
          },
          {
            lng: 114.086225,
            lat: 22.545679,
            type: '大货店',
            value: 100
          },
          {
            lng: 113.123291,
            lat: 36.197235,
            type: '大货店',
            value: 60
          },
          {
            lng: 119.492404,
            lat: 31.402682,
            type: '大货店',
            value: 50
          },
          {
            lng: 125.319095,
            lat: 43.891209,
            type: '大货店',
            value: 100
          },
          {
            lng: 112.570732,
            lat: 37.869263,
            type: '全品类标杆店',
            value: 100
          },
          {
            lng: 104.742665,
            lat: 31.463939,
            type: '大货店',
            value: 40
          },
          {
            lng: 124.463417,
            lat: 47.797626,
            type: '大货店',
            value: 100
          },
          {
            lng: 115.323022,
            lat: 38.42085,
            type: '大货店',
            value: 100
          },
          {
            lng: 113.156322,
            lat: 23.032312,
            type: '工厂店',
            value: 20
          },
          {
            lng: 123.469765,
            lat: 41.802888,
            type: '大货店',
            value: 100
          },
          {
            lng: 123.369594,
            lat: 41.793154,
            type: '工厂店',
            value: 1
          },
          {
            lng: 113.664767,
            lat: 34.766986,
            type: '大货店',
            value: 10
          },
          {
            lng: 120.100617,
            lat: 30.865842,
            type: '大货店',
            value: 1
          },
          {
            lng: 113.373,
            lat: 34.536138,
            type: '大货店',
            value: 1
          },
          {
            lng: 127.484116,
            lat: 42.175549,
            type: '大货店',
            value: 1
          },
          {
            lng: 112.941049,
            lat: 27.78016,
            type: '大货店',
            value: 80
          },
          {
            lng: 118.311992,
            lat: 29.709533,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.243365,
            lat: 37.528638,
            type: '大货店',
            value: 70
          },
          {
            lng: 114.196513,
            lat: 36.688914,
            type: '大货店',
            value: 80
          },
          {
            lng: 103.835482,
            lat: 30.047892,
            type: '大货店',
            value: 1
          },
          {
            lng: 122.06964,
            lat: 41.127429,
            type: '大货店',
            value: 60
          },
          {
            lng: 117.449588,
            lat: 28.378044,
            type: '大货店',
            value: 1
          },
          {
            lng: 108.31981,
            lat: 22.817332,
            type: '大货店',
            value: 60
          },
          {
            lng: 114.985784,
            lat: 27.111114,
            type: '大货店',
            value: 1
          },
          {
            lng: 117.241669,
            lat: 39.117846,
            type: '大货店',
            value: 60
          },
          {
            lng: 114.363958,
            lat: 35.921147,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.60551,
            lat: 35.40768,
            type: '大货店',
            value: 60
          },
          {
            lng: 121.600767,
            lat: 37.385351,
            type: '大货店',
            value: 60
          },
          {
            lng: 116.096261,
            lat: 39.943603,
            type: '大货店',
            value: 1
          },
          {
            lng: 114.386667,
            lat: 38.309229,
            type: '大货店',
            value: 1
          },
          {
            lng: 116.141442,
            lat: 39.728711,
            type: '大货店',
            value: 60
          },
          {
            lng: 103.003707,
            lat: 29.984718,
            type: '大货店',
            value: 1
          },
          {
            lng: 117.07129,
            lat: 39.37008,
            type: '大货店',
            value: 40
          },
          {
            lng: 102.708621,
            lat: 25.035939,
            type: '中国李宁店',
            value: 50
          },
          {
            lng: 117.68344,
            lat: 36.210906,
            type: '大货店',
            value: 100
          },
          {
            lng: 113.297241,
            lat: 22.211096,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.716943,
            lat: 39.571432,
            type: '大货店',
            value: 1
          },
          {
            lng: 115.7182,
            lat: 39.39175,
            type: '工厂店',
            value: 1
          },
          {
            lng: 116.22685,
            lat: 39.905888,
            type: '大货店',
            value: 100
          },
          {
            lng: 118.704956,
            lat: 39.740176,
            type: '大货店',
            value: 100
          }
        ]
      }
    ]
  }

  const [show, setShow] = useState(true)

  const w = 900,
    h = 900

  return (
    <div style={{ width: w, height: h }}>
      <button onClick={() => setShow(!show)}>CHANGE</button>
      {show && (
        <LczChina2dMap
          {...config}
          w={w}
          h={h}
          // onDrollUp={param => console.log(param, 'onDrollUp')}
          // onDrollDown={param => console.log(param, 'onDrollDown')}
          // onDoubleClick={a => console.log('onDbClick', a)}
          // onClick={a => console.log('onClick', a)}
          onChildComEvent={(a, type, b) => console.log(a, type, b)}
        />
      )}
    </div>
  )
})
