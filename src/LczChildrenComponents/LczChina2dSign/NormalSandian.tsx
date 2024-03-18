import React, { CSSProperties, memo, useState } from 'react'
import ChinaMap from '../../LczChina2dMap/common/chinaMap'
import { OutSanDian, SanDianDataMap, NormalStyle, SanDianSelectStyle } from '../../LczChina2dMap/type/child'
import { getSanDianSize, processIconList, processImageListInfo } from './common'
import { NormalSandianWrapper } from './style'
import IconCon from '../../common/IconCon'
import ImageUtil from '../../common/util/ImageUtil'
import { usemEffect } from '../../common/hooks'

type NormalSandianProps = {
  min: number
  max: number
  data: SanDianDataMap[]
  sandian: OutSanDian
  myMap: ChinaMap
  currentIndex: number
  onClick?: (parpm: any, i: number) => void
}

const NormalSandian = memo(function NormalSandian({
  min,
  max,
  data,
  sandian,
  myMap,
  currentIndex,
  onClick
}: NormalSandianProps) {
  const { global, normalStyle, selectStyle, styleSeries = [] } = sandian,
    { size = { min: 6, max: 6 } } = global || {}
  const { projection } = myMap

  const [, setUpdate] = useState({})
  // 用作散点子组件更新 原因：在散点渲染阶段有
  usemEffect(() => {
    ;(async () => {
      // 处理图片
      await processImageListInfo(sandian)
      // 处理图标
      await processIconList(sandian)
      setUpdate({})
    })()
  }, [normalStyle, selectStyle, styleSeries])

  function renderItem(itemData: SanDianDataMap, i: number) {
    const { lng, lat, value, type, id } = itemData,
      [x, y] = projection([lng, lat]),
      width = getSanDianSize({ min, max }, size, value)

    const style: CSSProperties = { left: x, top: y }
    let _style = normalStyle as NormalStyle
    const findSeries = styleSeries.find(v => v.type === type)

    if (currentIndex === i) {
      const _selectStyle =
        findSeries && !findSeries.syncDefaultSelectStyle
          ? ({ display: true, ...findSeries.seriesSelectStyle } as SanDianSelectStyle)
          : selectStyle
      _selectStyle?.display && (_style = _selectStyle)
      style.zIndex = 2
    } else {
      _style = findSeries ? findSeries : _style
    }

    const { styleType = 'dot', imgUrl, shadow, stroke, iconValue } = _style

    switch (styleType) {
      case 'dot': {
        const { display: sDis = false, e = 0, c } = shadow || {},
          { display: borDis, color, width: bWidth = 1 } = stroke || {}
        sDis && (style.boxShadow = `0 0 ${e}px ${c}`)
        borDis && (style.border = `${bWidth}px solid ${color}`)
        style.backgroundColor = _style.color
        style.width = width
        style.height = width

        return <div key={id} className='sandian dot' style={style} onClick={() => onClick && onClick(itemData, i)} />
      }
      case 'img': {
        const imageInfo = ImageUtil.getCurrentImageInfo(imgUrl)
        if (!imgUrl || !imageInfo) return null
        const { w_h, h_w } = imageInfo
        style.width = w_h > h_w ? width : width * w_h
        style.height = w_h > h_w ? width * h_w : width
        style.backgroundImage = `url(${imgUrl})`
        return <div key={id} className='sandian img' style={style} onClick={() => onClick && onClick(itemData, i)} />
      }
      case 'icon': {
        style.fontSize = width
        style.color = _style.color
        return (
          <IconCon
            key={id}
            className='sandian icon'
            style={style}
            iconValue={iconValue}
            onClick={() => onClick && onClick(itemData, i)}
          />
        )
      }
    }
  }

  return (
    <NormalSandianWrapper className='lcz-china2d-map-sandian-wrap reversion'>
      {data.map((v, i) => renderItem(v, i))}
    </NormalSandianWrapper>
  )
})

export default NormalSandian
