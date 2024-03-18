import React, { memo, useState, useRef, CSSProperties, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { cloneDeep } from 'lodash'
import { usemEffect, usemMemo, useUnMount } from '../../common/hooks'
import { conversionData } from '../../common/util'
import ChinaMap from '../../LczChina2dMap/common/chinaMap'
import { OutSegmentedRegionalHeat, StyleSeries, ThermalIndicator } from '../../LczChina2dMap/type/child'

const Indicator = memo(function Indicator({
  thermalIndicator,
  styleSeries,
  noData,
  onClick
}: {
  thermalIndicator: ThermalIndicator
  styleSeries: StyleSeries[]
  noData: string
  onClick: (i: number) => void
}) {
  const styles = usemMemo(() => {
    const { position, orientation = 'level', itemGap, fontStyle, indicator } = thermalIndicator
    const ul: CSSProperties = {
      left: position?.x || 0,
      top: position?.y || 0,
      flexDirection: orientation === 'level' ? 'row' : 'column',
      gap: itemGap,
      ...fontStyle?.textStyle
    }
    const li: CSSProperties = {
      gap: fontStyle?.speed || 0
    }
    const indicatorStyle: CSSProperties = {
      width: indicator?.width || 0,
      height: indicator?.height || 0,
      borderRadius: indicator?.radius || 0
    }

    if (fontStyle?.align === 'left') {
      indicatorStyle.order = 2
    }

    return { ul, li, indicatorStyle }
  }, [thermalIndicator])

  function getContent(series: StyleSeries) {
    const { min, max } = series,
      val = [min, max].sort((a, b) => a - b).join(' - ')
    return val
  }

  return (
    <ul style={styles.ul}>
      {styleSeries.map((item, i) => (
        <li
          key={i}
          style={styles.li}
          className={item.selected ? 'selected' : ''}
          onClick={() => {
            thermalIndicator.clickInteraction && onClick(i)
          }}>
          <div
            className='indicator'
            style={{ ...styles.indicatorStyle, backgroundColor: item.selected ? item.color : noData }}
          />
          {thermalIndicator.fontStyle?.display && <span>{getContent(item)}</span>}
        </li>
      ))}
    </ul>
  )
})

type HeatProps = {
  w: number
  h: number
  myMap: ChinaMap
  heatConfig: OutSegmentedRegionalHeat
}

const SegmentedHeat = memo(function SegmentedHeat({ myMap, heatConfig }: HeatProps) {
  const { d3Container, multistageData, mapData, path } = myMap,
    { boundary, noData, styleSeries = [], thermalIndicator, data = [] } = heatConfig,
    fillData = conversionData(data, {
      value: 'num',
      adcode: 'string'
    }),
    stroke = boundary?.display ? boundary.color : 'none',
    strokeWidth = boundary?.display ? boundary.width : 0

  const [_mapData, setMapData] = useState<any>({ features: [] })
  const [_styleSeries, setStyleSeries] = useState<StyleSeries[]>([])
  const indicatorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setStyleSeries(styleSeries.map(v => ({ ...v, selected: true })))
  }, [JSON.stringify(styleSeries)])

  function indicatorHandlerClick(i) {
    const series = cloneDeep(_styleSeries)
    series[i].selected = !series[i].selected
    setStyleSeries(series)
  }

  // 渲染热力指示器
  setTimeout(() => {
    const el = d3Container && d3Container.node()
    if (el && thermalIndicator?.display) {
      const el = indicatorRef.current || (d3Container.append('div').node() as HTMLDivElement)
      el.className = 'indicator-wrapper'

      ReactDOM.render(
        <Indicator
          thermalIndicator={thermalIndicator || ({} as ThermalIndicator)}
          styleSeries={_styleSeries}
          noData={noData}
          onClick={indicatorHandlerClick}
          key={heatConfig.id}
        />,
        el
      )
      indicatorRef.current = el
    }
  })

  // 卸载热力指示器
  useUnMount(() => {
    if (indicatorRef.current) {
      ReactDOM.unmountComponentAtNode(indicatorRef.current)
      indicatorRef.current.remove()
      indicatorRef.current = null
    }
  }, [thermalIndicator?.display])

  usemEffect(() => {
    const _mapData: any = {
      features: []
    }
    if (multistageData) {
      for (const key in multistageData) {
        if (Object.prototype.hasOwnProperty.call(multistageData, key)) {
          const data: any = multistageData[key]
          _mapData.features.push(...data.features)
        }
      }
    } else {
      _mapData.features = mapData.features
    }

    setMapData(_mapData)
  }, [multistageData, mapData])

  function getPathAttrs(feature) {
    let fill = noData
    const properties = feature.properties
    const _findAdcode = fillData.find(v => v.adcode == (properties.adcode || properties.code)),
      _find = _findAdcode || fillData.find(v => v.name === properties.name)
    if (_find) {
      const findStyle = _styleSeries.find(v => v.max >= _find.value && v.min <= _find.value && v.selected)
      findStyle && (fill = findStyle?.color)
    }

    return { stroke, strokeWidth, fill, d: path(feature) }
  }

  return (
    <>
      {_mapData.features.map((item, i) => (
        <path key={i} {...getPathAttrs(item)} style={{ pointerEvents: 'none' }}></path>
      ))}
    </>
  )
})

const LczChina2dMapSegmentedHeat = memo((props: HeatProps) => {
  const { mapData, segmentedRegionalHeatGroup } = props.myMap
  const heatEl = segmentedRegionalHeatGroup.node()
  const heatGrounp = useRef<any>(null)

  if (!heatEl || !mapData) return null

  useUnMount(() => {
    if (heatGrounp.current) {
      ReactDOM.unmountComponentAtNode(heatGrounp.current)
      heatGrounp.current.remove()
    }
  })

  heatGrounp.current = heatGrounp.current || segmentedRegionalHeatGroup.append('g').node()

  return ReactDOM.createPortal(<SegmentedHeat {...props} key={props.heatConfig.id} />, heatGrounp.current)
})

LczChina2dMapSegmentedHeat.displayName = 'LczChina2dMapSegmentedHeat'
export default LczChina2dMapSegmentedHeat
