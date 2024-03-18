import React, { memo, useMemo, CSSProperties } from 'react'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { GeneralPieDataMap } from '../../../common/type'
import { defaultCurrentValue } from '../common/defaultValue'
import { CurrentValue, CurrentSeriesName, CurrentProportion, CurrentTrueValue, Prefixsuffix, DataSeries } from '../type'

interface LabelProps {
  data: GeneralPieDataMap[]
  index: number
  currentValue: CurrentValue
  colors: string[]
  dataSeries: DataSeries[]
}

export default memo(function Label(props: LabelProps) {
  const { currentValue, data, index, colors, dataSeries = [] } = props
  const {
    position = { x: 0, y: 0 },
    spacing = 0,
    currentSeriesName = defaultCurrentValue.currentSeriesName as CurrentSeriesName,
    currentProportion = defaultCurrentValue.currentProportion as CurrentProportion,
    currentTrueValue = defaultCurrentValue.currentTrueValue as CurrentTrueValue
  } = currentValue

  const {
    currentPrefix = defaultCurrentValue?.currentTrueValue?.currentPrefix as Prefixsuffix,
    currentSuffix = defaultCurrentValue?.currentTrueValue?.currentSuffix as Prefixsuffix
  } = currentTrueValue

  const { numberformat } = currentTrueValue

  const values = useMemo(() => {
    const _obj: any = {}
    const sumValue = data.reduce((pre, item) => pre + item.value, 0)
    const item = data[index]
    if (item) {
      const findSeries = dataSeries.find(v => v?.map?.fieldName === item.item)
      _obj.truevalue = numberForMat(item.value, numberformat)
      _obj.proportion = ((item.value / sumValue) * 100).toFixed(currentProportion.decimal)
      _obj.seriesName =
        findSeries && findSeries?.map?.displayName ? findSeries?.map?.displayName : item.itemTitle || item.item
    }
    return _obj
  }, [JSON.stringify(data), index, numberformat, currentProportion.decimal, JSON.stringify(dataSeries)])

  const valuesStyle = useMemo(() => {
    const _obj: {
      name: CSSProperties
      trueValue: CSSProperties
      propor: CSSProperties
      prefix: CSSProperties
      suffix: CSSProperties
    } = { name: {}, trueValue: {}, propor: {}, prefix: {}, suffix: {} }

    const { display: sdis, xOffset: sXoffset, yOffset: sYoffset, ...sText } = currentSeriesName
    if (sdis) {
      _obj.name = { ...sText }
      _obj.name.transform = `translate(${sXoffset}px, ${sYoffset}px)`
      _obj.name.marginTop = spacing
    }

    const {
      display: pdis,
      xOffset: pXoffset,
      yOffset: pYoffset,
      colorFollow: pColorFollow,
      ...pText
    } = currentProportion
    if (pdis) {
      _obj.propor = { ...pText }
      _obj.propor.color = pColorFollow ? colors[index] : pText.color
      _obj.propor.transform = `translate(${pXoffset}px, ${pYoffset}px)`
      _obj.propor.marginTop = spacing
    }

    const {
      display: tdis,
      xOffset: tXoffset,
      colorFollow: tColorFollow,
      yOffset: tYoffset,
      ...tText
    } = currentTrueValue
    if (tdis) {
      _obj.trueValue = { ...tText }
      _obj.trueValue.color = tColorFollow ? colors[index] : tText.color
      _obj.trueValue.transform = `translate(${tXoffset}px, ${tYoffset}px)`
      _obj.trueValue.marginTop = spacing
    }

    const {
      display: predis,
      xOffset: preXoffset,
      yOffset: preYoffset,
      colorFollow: preColorFollow,
      ...preText
    } = currentPrefix
    if (predis) {
      _obj.prefix = { ...preText }
      _obj.prefix.color = tColorFollow && preColorFollow ? colors[index] : preColorFollow ? tText.color : preText.color
      _obj.prefix.transform = `translate(${preXoffset}px, ${preYoffset}px)`
    }

    const {
      display: sufdis,
      xOffset: sufXoffset,
      yOffset: sufYoffset,
      colorFollow: sufColorFollow,
      ...sufText
    } = currentSuffix
    if (sufdis) {
      _obj.suffix = { ...sufText }
      _obj.suffix.color = tColorFollow && sufColorFollow ? colors[index] : sufColorFollow ? tText.color : sufText.color
      _obj.suffix.transform = `translate(${sufXoffset}px, ${sufYoffset}px)`
    }

    return _obj
  }, [JSON.stringify(currentValue), JSON.stringify(colors), index, spacing])

  return (
    <div className='lcz-label-wrapper' style={{ left: `${position.x}%`, top: `${position.y}%` }}>
      {currentProportion.display && <p style={valuesStyle.propor}>{values.proportion}%</p>}
      {currentTrueValue.display && (
        <p className='lcz-label-truevalue' style={valuesStyle.trueValue}>
          {currentPrefix.display && <span style={valuesStyle.prefix}>{currentPrefix.content}</span>}
          {values.truevalue}
          {currentSuffix.display && <span style={valuesStyle.suffix}>{currentSuffix.content}</span>}
        </p>
      )}
      {currentSeriesName.display && <p style={valuesStyle.name}>{values.seriesName}</p>}
    </div>
  )
})
