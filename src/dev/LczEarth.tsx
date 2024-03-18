import React, { memo, useState } from 'react'
import { LczEarth } from '../'
import { LczEarthProps } from '../LczEarth/type'

const T_LczEarth = memo(function T_LczEarth() {
  const colorStr = {
    selected: 'gradient',
    single: '#79d127',
    gradient: {
      gradualAngle: 3,
      colors: [
        {
          begins: 0,
          value: '#1ece0e'
        },
        {
          begins: 50,
          value: 'rgba(255,0,0,1)'
        },
        {
          begins: 100,
          value: '#7b07ff'
        }
      ]
    }
  }

  const config: LczEarthProps = {
    cameraConfig: {
      position: { lng: 116.4, lat: 40 },
      distance: 8
    },
    rotateConfig: { earth: 0, scene: 0 },
    controllerConfig: { enableRotate: true, enableZoom: true },
    childComponents: [
      {
        type: 'lcz-earth-real-earth',
        id: 'lcz-earth-real-earth_232323',
        config: {
          show: true,
          condition: true,
          baseConfig: {
            color: '#ffffff',
            texture: 'HappyServer/lczResource/img/app_d5d1ac682d4647aebce45d95c5727405/1/5cc6a8609820492ca4d4.jpg'
          }
        }
      },
      {
        type: 'lcz-earth-ambient-light',
        id: 'lcz-earth-ambient-light-asas',
        config: {
          show: true,
          condition: true,
          baseConfig: {
            color: '#fff',
            intensity: 0.6
          }
        }
      },
      {
        type: 'lcz-earth-directional-light',
        id: 'lcz-earth-directional-light-sdsd',
        config: {
          show: true,
          condition: true,
          baseConfig: {
            color: '#fff',
            intensity: 0.6,
            position: {
              x: 100,
              y: 100,
              z: 100
            }
          }
        }
      },
      {
        type: 'lcz-earth-area-heat',
        id: 'lcz-earth-area-heat-sdsd',
        config: {
          show: true,
          condition: true,
          baseConfig: {
            jsonUrl: { src: 'https://easyv.assets.dtstack.com/components/static-image/borderMap/earthMap.json' },
            height: 0,
            defaultFill: 'rgba(255, 0, 0, 0.1)'
          },
          boundary: {
            display: true,
            width: 1,
            color: 'red'
          },
          styleSeries: [
            { min: 0, max: 30, fill: '#ff6b08' },
            { min: 30, max: 60, fill: '#10fff3' },
            { min: 60, max: 90, fill: 'yellow' }
          ]
        },
        data: [
          {
            value: 20,
            name: '江西省'
          },
          {
            value: 50,
            name: '浙江省'
          },
          {
            value: 80,
            name: '安徽省'
          }
        ]
      },
      {
        type: 'lcz-earth-scatter-point',
        id: 'lcz-earth-scatter-point-121212',
        config: {
          show: true,
          condition: true,
          baseConfig: {
            imgUrl: 'HappyServer/lczCommon/matrix/images/component/lcz-china-2dmap/sandian.png',
            color: 'rgba(255,0,0,1)',
            size: {
              width: 16,
              height: 16
            }
          }
        },
        data: [
          {
            lng: 105.177,
            lat: 34.739951
          },
          {
            lng: 84.172059,
            lat: 38.752506
          },
          {
            lng: 77.404481,
            lat: 20.877453
          },
          {
            lng: 105.617372,
            lat: 14.262423
          },
          {
            lng: 114.318544,
            lat: -0.529359
          },
          {
            lng: 139.455262,
            lat: 36.807665
          },
          {
            lng: 134.88495,
            lat: 52.213099
          },
          {
            lng: 112.912294,
            lat: 23.642671
          },
          {
            lng: 53.498231,
            lat: 19.971448
          },
          {
            lng: 81.886903,
            lat: -6.055173
          },
          {
            lng: 160.19745,
            lat: 10.139941
          },
          {
            lng: -28.152159,
            lat: 35.958586
          },
          {
            lng: -33.249816,
            lat: 9.880283
          },
          {
            lng: 66.418153,
            lat: -16.5539
          },
          {
            lng: 21.242372,
            lat: -5.005409
          },
          {
            lng: 62.726747,
            lat: 62.470789
          },
          {
            lng: 39.172059,
            lat: 50.34417
          },
          {
            lng: 4.543153,
            lat: 69.808611
          },
          {
            lng: -5.300597,
            lat: 62.226054
          },
          {
            lng: -62.253722,
            lat: 66.407146
          },
          {
            lng: -111.648253,
            lat: 0.6132
          },
          {
            lng: -8.113097,
            lat: -55.827109
          },
          {
            lng: 120.558778,
            lat: -50.570567
          },
          {
            lng: -104.089659,
            lat: -24.448991
          },
          {
            lng: -64.890441,
            lat: 34.522995
          },
          {
            lng: -151.902159,
            lat: 52.960657
          },
          {
            lng: -27.273253,
            lat: 54.00658
          },
          {
            lng: -45.378721,
            lat: -55.629138
          },
          {
            lng: 94.191591,
            lat: -38.892607
          },
          {
            lng: 47.433779,
            lat: -59.845831
          },
          {
            lng: 31.789247,
            lat: -41.707239
          },
          {
            lng: -4.597471,
            lat: -3.076715
          },
          {
            lng: -0.906065,
            lat: 31.426937
          },
          {
            lng: -66.999815,
            lat: -24.608908
          },
          {
            lng: -151.374815,
            lat: -53.90553
          },
          {
            lng: -155.066221,
            lat: -1.320265
          },
          {
            lng: -107.956846,
            lat: 60.107662
          },
          {
            lng: -114.10919,
            lat: 38.34007
          },
          {
            lng: -67.351378,
            lat: 53.171907
          },
          {
            lng: 75.382997,
            lat: 54.212678
          },
          {
            lng: 55.168154,
            lat: 34.087386
          },
          {
            lng: 28.273622,
            lat: 28.534498
          },
          {
            lng: -1.433409,
            lat: 46.617872
          },
          {
            lng: -11.277159,
            lat: 21.041604
          },
          {
            lng: 20.011904,
            lat: 34.956338
          },
          {
            lng: 177.687685,
            lat: 33.503073
          },
          {
            lng: -173.347471,
            lat: -17.729685
          },
          {
            lng: 165.382998,
            lat: -46.981632
          },
          {
            lng: 163.800966,
            lat: -60.371429
          },
          {
            lng: 139.718935,
            lat: -33.065619
          },
          {
            lng: 134.79706,
            lat: -16.385332
          },
          {
            lng: 151.320497,
            lat: 31.576812
          },
          {
            lng: 145.695497,
            lat: 13.152407
          },
          {
            lng: 172.238466,
            lat: 57.749997
          },
          {
            lng: 135.675966,
            lat: 63.113723
          },
          {
            lng: -148.738096,
            lat: 27.135568
          },
          {
            lng: 94.367372,
            lat: -18.897806
          }
        ],
        event: {
          onClick: () => {}
        }
      },
      {
        type: 'lcz-earth-fly-line',
        id: 'lcz-earth-fly-line-asasas',
        config: {
          show: true,
          condition: true,
          flyConfig: {
            smooth: 50,
            speed: 3,
            random: true
          },
          lineConfig: {
            width: 2,
            baseLine: {
              display: true,
              color: '#FFFF00'
            },
            flyLine: {
              color: {
                start: '#F5D827',
                end: 'rgba(255,255,255,0.3)'
              },
              length: 100
            }
          },
          headIcon: {
            display: true,
            imgUrl: 'https://easyv.assets.dtstack.com/components/static-image/earth3DNew/aircraft.png',
            width: 40,
            height: 40
          },
          landingEffect: {
            display: true,
            radius: 30,
            color: '#FFFF00'
          }
        },
        data: [
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 11,
            tolng: 121
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 35.419484,
            tolng: 106.57066
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 36.079282,
            tolng: 120.437847
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 37.487051,
            tolng: 121.371685
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 30.391097,
            tolng: 100.669048
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 30.391097,
            tolng: 120.669048
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 40.391097,
            tolng: 90.669048
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 50,
            tolng: 125
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 10,
            tolng: 10
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 25,
            tolng: 160
          },
          {
            fromlat: 39.9,
            fromlng: 116.3,
            tolat: 50,
            tolng: 100
          }
        ]
      },
      {
        type: 'lcz-earth-title-bubble',
        id: 'lcz-earth-title-bubble-232323',
        config: {
          show: true,
          condition: true,
          baseConfig: {
            bgType: 'custom',
            bgColor: colorStr,
            bgImgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
            opacity: 70,
            size: { width: 200, height: 60 },
            border: {
              display: false,
              color: '#ff0000',
              width: 20
            },
            basicPosition: { x: 0, y: 0 },
            fontStyle: {
              fontFamily: 'Microsoft YaHei',
              fontSize: 14,
              color: '#fff',
              fontWeight: '400'
            },
            textOffset: { x: 0, y: 0 }
          }
        },
        data: [
          {
            name: '地点地点地点#1',
            lng: 90.39880221,
            lat: 39.919237
          },
          {
            name: '地点#2',
            lng: 117.123899,
            lat: 36.643101
          },
          {
            name: '地点#3',
            lng: 120.222043,
            lat: 30.222312
          },
          {
            name: '地点#4',
            lng: 100.533079,
            lat: 23.526889
          }
        ],
        event: {
          onClick: () => {}
        }
      },
      {
        type: 'lcz-earth-ripples',
        id: 'lcz-earth-ripples-43434',
        config: {
          show: true,
          condition: true,
          baseConfig: {
            startRadiu: 10,
            endRadiu: 20,
            circleNum: 3,
            speed: 0.1,
            interval: 0
          },
          styleSeries: [
            {
              ratio: 20,
              color: '#f00'
            },
            {
              ratio: 30,
              color: '#3cff00'
            },
            {
              ratio: 50,
              color: '#00ff6a7a'
            }
          ]
        },
        data: [
          {
            lng: 105.177,
            lat: 34.739951
          },
          {
            lng: 116.398801,
            lat: 39.919237
          },
          {
            lng: 117.123899,
            lat: 36.643101
          },
          {
            lng: 120.222043,
            lat: 30.222312
          },
          {
            lng: 106.533079,
            lat: 29.526889
          }
        ]
      }
    ]
  }

  const w = 901,
    h = 900

  const [show, setShow] = useState(true)
  return (
    <div style={{ width: w, height: h }}>
      <button onClick={() => setShow(!show)}>CHANGE</button>
      {show && (
        <LczEarth
          {...config}
          w={w}
          h={h}
          design={false}
          onLoad={() => console.log('onload')}
          onChildComEvent={(a, b, c) => console.log(a, b, c)}
        />
      )}
    </div>
  )
})

export default T_LczEarth
