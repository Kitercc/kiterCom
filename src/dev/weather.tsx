import React from 'react'
import { LczWeather } from '..'
import { lczWeatherConfig } from '../LczWeather/type'

export const T_weather = () => {
  const iconSeries = [
    {
      weatherValue: '云',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      imgSrc: 'sunxxxx',
      height: 40,
      width: 40
    },
    {
      weatherValue: '晴',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '多云',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '阴',
      iconType: 'custom', // system 系统 custom 自定义
      size: 40,
      iconValue: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      imgSrc: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      height: 80,
      width: 80
    },
    {
      weatherValue: '阵雨',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '阵雪',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '雷阵雨',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '雨',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '大雨',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '雪',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '大雪',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '风',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    },
    {
      weatherValue: '雾',
      iconType: 'system', // system 系统 custom 自定义
      size: 40,
      iconValue: '',
      imgSrc: '',
      height: 40,
      width: 40
    }
  ]
  const config: lczWeatherConfig = {
    globalConfig: {
      citySelect: { label: '杭州市', value: '330100' },
      iconLetterSpace: 15,
      weatherLayout: { flexDirection: 'row', alignItems: 'center', reverseSort: false },
      iconInfo: {
        display: true,
        site: 'row',
        iconSeries: iconSeries
      }
    },
    weatherConfig: {
      minSpace: 0,
      weatherTitleInfo: {
        display: true,
        horOffset: 0,
        verOffset: 0,
        TextStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 18,
          color: 'rgba(255,255,255,1)',
          fontWeight: 400,
          letterSpacing: 0,
          italics: false
        }
      },
      temperatureInfo: {
        display: true,
        horOffset: 0,
        verOffset: 0,
        connectors: '~',
        TextStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 18,
          color: 'rgba(255,255,255,1)',
          fontWeight: 400,
          letterSpacing: 0,
          italics: false
        },
        tempSuffix: {
          display: true,
          content: '℃',
          fontFamily: 'PingFangSC-Regular',
          fontSize: 18,
          color: 'rgba(255,255,255,1)',
          fontWeight: 400,
          letterSpacing: 0,
          italics: false
        }
      },
      windInfo: {
        display: true,
        horOffset: 0,
        verOffset: 0,
        TextStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 18,
          color: 'rgba(255,255,255,1)',
          fontWeight: 400,
          letterSpacing: 0,
          italics: false
        }
      }
    }
  }

  const data = [
    {
      weather: '云',
      mintemperature: 11,
      maxtemperature: 28,
      winddirection: '东南风',
      windlevel: '3'
      // weather: '',
      // mintemperature: '',
      // maxtemperature: '',
      // winddirection: '',
      // windlevel: ''
    }
  ]

  return (
    <div style={{ width: 300, height: 200, margin: '0 auto', backgroundColor: 'pink' }}>
      <LczWeather {...config} data={data} />
    </div>
  )
}
