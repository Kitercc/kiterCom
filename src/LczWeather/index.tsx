import React, { memo, useEffect, useMemo, useState } from 'react'
import { CSSProperties } from 'styled-components'
import LczComCon from '../common/LczComCon'
import { lczWeatherConfig } from './type'
import {
  defaultGlobalConfig,
  defaultIconInfo,
  defaultTemperatureInfo,
  defaultWeatherConfig,
  defaultWeatherTitleInfo,
  defaultWindInfo
} from './common/defaultValue'
import { getCityParams } from './common/api'

export default memo(function LczWeather(props: lczWeatherConfig) {
  const { globalConfig = defaultGlobalConfig, weatherConfig = defaultWeatherConfig, data = [] } = props
  const { iconInfo = defaultIconInfo, citySelect } = globalConfig
  const [cityWeather, setCityWeather] = useState({
    weather: '',
    minTemp: '',
    maxTemp: '',
    winddirection: '',
    windPower: ''
  })
  const {
    minSpace = 0,
    weatherTitleInfo = defaultWeatherTitleInfo,
    temperatureInfo = defaultTemperatureInfo,
    windInfo = defaultWindInfo
  } = weatherConfig

  useEffect(() => {
    getCityParams({ city: citySelect?.value || '110000' }).then((res: any) => {
      if (res.status == '0') {
        return
      }
      const { dayweather, nighttemp, daytemp, daywind, daypower } = res.forecasts[0].casts[0]
      setCityWeather({
        weather: dayweather,
        minTemp: nighttemp,
        maxTemp: daytemp,
        winddirection: daywind,
        windPower: daypower
      })
    })
  }, [JSON.stringify(citySelect)])

  const getIsSelectCity = useMemo(() => {
    const _a =
      data.length &&
      (data[0].weather ||
        data[0].mintemperature ||
        data[0].maxtemperature ||
        data[0].winddirection ||
        data[0].windlevel)

    return _a
  }, [JSON.stringify(data)])

  const getIconSrc = useMemo(() => {
    let weatherIcon = ''
    const currentWeather = getIsSelectCity ? data[0].weather : cityWeather.weather
    if (currentWeather && iconInfo.iconSeries.length) {
      const currentIcon = iconInfo.iconSeries.filter(v => {
        return v.weatherValue == currentWeather
      })

      if (currentIcon.length > 0) {
        const _currentIcon = currentIcon[currentIcon.length - 1]
        if (_currentIcon.iconType == 'system') {
          weatherIcon = _currentIcon.iconValue
        } else {
          weatherIcon = _currentIcon.imgSrc
        }
      }
    }

    return weatherIcon
  }, [JSON.stringify(iconInfo), JSON.stringify(data), JSON.stringify(cityWeather)])
  const getWind = useMemo(() => {
    let wind = ''
    if (data[0] && data[0].windlevel) {
      wind = data[0]?.windlevel.includes('级') ? data[0].windlevel : data[0].windlevel + '级'
    }
    return wind
  }, [JSON.stringify(data)])

  const infoContainerStyle = useMemo(() => {
    const { weatherLayout } = globalConfig
    const value = {
      flexDirection: '',
      alignItems: '',
      width: ''
    }
    const titleInfo: CSSProperties = {
      order: 1
    }
    const tempInfo: CSSProperties = {
      order: 2
    }
    const windInfo: CSSProperties = {
      order: 3
    }
    value.flexDirection = weatherLayout.flexDirection
    if (weatherLayout.reverseSort) {
      titleInfo.order = 3
      windInfo.order = 1
    } else {
      titleInfo.order = 1
      windInfo.order = 3
    }
    if (weatherLayout.flexDirection == 'row') {
      value.alignItems = 'center'
      value.width = '100%'
    } else {
      switch (weatherLayout.alignItems) {
        case 'left':
          value.alignItems = 'flex-start'
          break
        case 'center':
          value.alignItems = 'center'
          break
        case 'right':
          value.alignItems = 'flex-end'
          break
      }
    }

    return { value, titleInfo, tempInfo, windInfo }
  }, [JSON.stringify(globalConfig)])

  const iconStyle = useMemo(() => {
    const { iconInfo, iconLetterSpace } = globalConfig
    const iconBoxStyle: CSSProperties = {
      height: 40,
      width: 40
    }
    const imgStyle: CSSProperties = {
      height: 40,
      width: 40
    }
    switch (iconInfo.site) {
      case 'row':
        iconBoxStyle.margin = `0 ${iconLetterSpace}px 0 0`
        break
      case 'row-reverse':
        iconBoxStyle.margin = `0 0 0 ${iconLetterSpace}px`
        break
      case 'column':
        iconBoxStyle.margin = `0 0 ${iconLetterSpace}px 0`
        break
      case 'column-reverse':
        iconBoxStyle.margin = `${iconLetterSpace}px 0 0 0 `
        break
    }

    const currentWeather = getIsSelectCity ? data[0].weather : cityWeather.weather

    if (currentWeather && iconInfo.iconSeries.length) {
      const currentIcon = iconInfo.iconSeries.filter(v => {
        return v.weatherValue == currentWeather
      })

      if (currentIcon.length > 0) {
        const _currentIcon = currentIcon[currentIcon.length - 1]
        if (_currentIcon.iconType == 'system') {
          iconBoxStyle.height = _currentIcon.size
          iconBoxStyle.width = _currentIcon.size
          imgStyle.height = _currentIcon.size
          imgStyle.width = _currentIcon.size
          imgStyle.display = iconInfo.display ? '' : 'none'
        } else {
          iconBoxStyle.height = _currentIcon.height
          iconBoxStyle.width = _currentIcon.width
          imgStyle.height = _currentIcon.height
          imgStyle.width = _currentIcon.width
          imgStyle.display = iconInfo.display ? '' : 'none'
        }
      }
    }
    return { iconBoxStyle, imgStyle }
  }, [JSON.stringify(globalConfig), JSON.stringify(cityWeather), JSON.stringify(data)])

  const weatherContainerMinSpace = useMemo(() => {
    const { weatherLayout } = globalConfig

    const infoMinSpace: CSSProperties = {}
    weatherLayout.flexDirection.includes('row')
      ? (infoMinSpace.margin = `0 ${minSpace}px`)
      : (infoMinSpace.margin = `${minSpace}px 0`)
    return infoMinSpace
  }, [JSON.stringify(globalConfig), JSON.stringify(minSpace)])

  const titleInfoStyle = useMemo(() => {
    const { TextStyle } = weatherTitleInfo
    const titleStyle: CSSProperties = {
      display: weatherTitleInfo.display ? '' : 'none',
      transform: `translate3d(${weatherTitleInfo.horOffset}px,${weatherTitleInfo.verOffset}px, 0px)`,
      fontFamily: TextStyle.fontFamily,
      fontSize: TextStyle.fontSize,
      color: TextStyle.color,
      fontWeight: TextStyle.fontWeight,
      letterSpacing: TextStyle.letterSpacing,
      fontStyle: TextStyle.italics ? 'italic' : 'normal'
    }
    return { titleStyle }
  }, [JSON.stringify(weatherTitleInfo)])

  const tempInfoStyle = useMemo(() => {
    const { TextStyle, tempSuffix } = temperatureInfo
    const tempStyle: CSSProperties = {
      display: temperatureInfo.display ? '' : 'none',
      transform: `translate3d(${temperatureInfo.horOffset}px,${temperatureInfo.verOffset}px, 0px)`,
      fontFamily: TextStyle.fontFamily,
      fontSize: TextStyle.fontSize,
      color: TextStyle.color,
      fontWeight: TextStyle.fontWeight,
      letterSpacing: TextStyle.letterSpacing,
      fontStyle: TextStyle.italics ? 'italic' : 'normal'
    }
    const suffixStle: CSSProperties = {
      display: tempSuffix.display ? '' : 'none',
      fontFamily: tempSuffix.fontFamily,
      fontSize: tempSuffix.fontSize,
      color: tempSuffix.color,
      fontWeight: tempSuffix.fontWeight,
      letterSpacing: tempSuffix.letterSpacing,
      fontStyle: tempSuffix.italics ? 'italic' : 'normal'
    }
    return {
      tempStyle,
      suffixStle
    }
  }, [JSON.stringify(temperatureInfo)])

  const windInfoStyle = useMemo(() => {
    const { TextStyle } = windInfo
    const windStyle: CSSProperties = {
      display: windInfo.display ? '' : 'none',
      transform: `translate3d(${windInfo.horOffset}px,${windInfo.verOffset}px, 0px)`,
      fontFamily: TextStyle.fontFamily,
      fontSize: TextStyle.fontSize,
      color: TextStyle.color,
      fontWeight: TextStyle.fontWeight,
      letterSpacing: TextStyle.letterSpacing,
      fontStyle: TextStyle.italics ? 'italic' : 'normal'
    }
    return { windStyle }
  }, [JSON.stringify(windInfo)])

  const getTemp = useMemo(() => {
    let minTemp: any = ''
    let maxTemp: any = ''
    if (data[0] && (data[0].mintemperature || data[0].mintemperature === 0)) {
      minTemp = isNaN(+data[0].mintemperature) ? '' : +data[0].mintemperature
    }
    if (data[0] && (data[0].maxtemperature || data[0].maxtemperature === 0)) {
      maxTemp = isNaN(+data[0].maxtemperature) ? '' : +data[0].maxtemperature
    }
    return {
      minTemp,
      maxTemp
    }
  }, [JSON.stringify(data)])

  return (
    <>
      <LczComCon style={{ overflow: 'initial' }}>
        <div className='weather-wrapper' style={{ flexDirection: iconInfo.site } as CSSProperties}>
          <div className='weather-icon' style={{ ...iconStyle.iconBoxStyle }}>
            <span style={{ ...iconStyle.imgStyle, backgroundImage: `url(${getIconSrc})` }}></span>
          </div>
          <div className='info-container' style={{ ...(infoContainerStyle.value as CSSProperties) }}>
            <div className='title-info' style={{ ...titleInfoStyle.titleStyle, ...infoContainerStyle.titleInfo }}>
              <span>{getIsSelectCity ? data[0]?.weather : cityWeather.weather}</span>
            </div>
            <div
              className='temp-info'
              style={{ ...tempInfoStyle.tempStyle, ...weatherContainerMinSpace, ...infoContainerStyle.tempInfo }}>
              <span>{getIsSelectCity ? getTemp.minTemp : cityWeather.minTemp}</span>
              <span>{temperatureInfo.connectors}</span>
              <span>{getIsSelectCity ? getTemp.maxTemp : cityWeather.maxTemp}</span>
              <span style={{ ...tempInfoStyle.suffixStle }}>{temperatureInfo.tempSuffix.content}</span>
            </div>
            <div className='wind-info' style={{ ...windInfoStyle.windStyle, ...infoContainerStyle.windInfo }}>
              <span>{getIsSelectCity ? data[0]?.winddirection : cityWeather.winddirection}</span>
              <span>{getIsSelectCity ? getWind : cityWeather.windPower + '级'}</span>
            </div>
          </div>
        </div>
      </LczComCon>
    </>
  )
})
