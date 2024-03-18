import * as d3 from 'd3'
import React, { CSSProperties, memo, SVGAttributes, useState } from 'react'
import ChinaMap from '../../LczChina2dMap/common/chinaMap'
import { OutSanDian, SanDianDataMap, NormalStyle, Shadow, SanDianSelectStyle } from '../../LczChina2dMap/type/child'
import { getSanDianSize, processIconList, processImageListInfo } from './common'
import ImageUtil from '../../common/util/ImageUtil'
import IconUtils from '../../common/util/IconUtil'
import { usemEffect } from '../../common/hooks'

type SvgSandianProps = {
  min: number
  max: number
  data: SanDianDataMap[]
  sandian: OutSanDian
  myMap: ChinaMap
  currentIndex: number
  onClick?: (parpm: any, i: number) => void
}

const nodeType = { dot: 'circle', img: 'image', icon: 'text' }
type SvgSignType = 'circle' | 'image' | 'text'

const SvgSandian = memo(function Sandian({ min, max, data, sandian, myMap, currentIndex, onClick }: SvgSandianProps) {
  const { id = '', global, normalStyle, selectStyle, styleSeries = [] } = sandian,
    { size = { min: 6, max: 6 } } = global || {}
  const { sandianGroup, uuid, projection } = myMap
  const sandianId = id + '_' + uuid

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

  const getSvgNodeAttr = (
    t: SvgSignType,
    itemData: SanDianDataMap,
    style: NormalStyle,
    shadow_id: string,
    selectd: boolean
  ) => {
    const { color, stroke, shadow, imgUrl, iconValue } = style,
      { lng, lat, value } = itemData,
      [x, y] = projection([lng, lat]),
      width = getSanDianSize({ min, max }, size, value),
      w_2 = width / 2

    let attrs: SVGAttributes<SvgSignType> = {}
    const _style: CSSProperties = { pointerEvents: 'auto', cursor: 'pointer' }
    switch (t) {
      case 'circle':
        attrs = {
          r: w_2,
          filter: shadow?.display ? `url(#sandian_${shadow_id})` : '',
          fill: color,
          stroke: stroke?.display ? stroke.color : 'none',
          strokeWidth: stroke?.display ? stroke.width : 0,
          cx: x,
          cy: y,
          style: _style
        }
        break
      case 'image': {
        const imageInfo = ImageUtil.getCurrentImageInfo(imgUrl)
        if (!imgUrl || !imageInfo) return null
        const { w_h, h_w } = imageInfo,
          w = w_h > h_w ? width : width * w_h,
          h = w_h > h_w ? width * h_w : width

        attrs = {
          width: w,
          height: h,
          xlinkHref: imgUrl,
          x: x - w / 2,
          y: y - h / 2,
          style: { mixBlendMode: 'unset', ..._style }
        }
        break
      }
      case 'text': {
        let iconInfo
        if (typeof iconValue === 'string') {
          iconInfo = {
            family: 'lcz-system-icon',
            iconStr: iconValue.split('|')[0]
          }
        } else {
          const { family } = iconValue && IconUtils.getIconInfo(iconValue)
          iconInfo = { family, iconStr: iconValue.iconValue }
        }
        if (!iconValue || !iconInfo) return null
        const { family, iconStr } = iconInfo

        attrs = {
          className: family,
          x,
          y,
          dominantBaseline: 'middle',
          textAnchor: 'middle',
          fill: color,
          style: { fontSize: width, ..._style },
          dangerouslySetInnerHTML: { __html: iconStr }
        }
        break
      }
    }
    selectd && (attrs.id = `sandian_${sandianId}_selected`)
    return attrs
  }

  const renderSvgFilter = (shadow: Shadow, shadow_id: string) => {
    const { c, e } = shadow
    d3.select(`#sandian_${shadow_id}`).node() && d3.select(`#sandian_${shadow_id}`).remove()

    const shadowD3 = sandianGroup.append('filter')
    shadowD3
      .attr('id', `sandian_${shadow_id}`)
      .attr('x', '-100%')
      .attr('y', '-100%')
      .attr('width', '400%')
      .attr('height', '400%')

    shadowD3.append('feFlood').attr('flood-color', c)
    shadowD3.append('feComposite').attr('in2', 'SourceGraphic').attr('operator', 'in')
    shadowD3.append('feGaussianBlur').attr('stdDeviation', e)
    shadowD3
      .append('feComponentTransfer')
      .append('feFuncA')
      .attr('exponent', 1)
      .attr('type', 'gamma')
      .attr('amplitude', 2)
    shadowD3.append('feComposite').attr('in', 'SourceGraphic')
  }

  const renderSvgUse = () => {
    setTimeout(() => {
      d3.select(`#sandian_${sandianId}_use`).node() && d3.select(`#sandian_${sandianId}_use`).remove()
      sandianGroup
        .append('use')
        .attr('id', `sandian_${sandianId}_use`)
        .attr('xlink:href', `#sandian_${sandianId}_selected`)
    })
  }

  function renderItem(itemData: SanDianDataMap, i: number) {
    const { type, id } = itemData
    let _style = normalStyle as NormalStyle

    let shadow_id = 'default_' + sandianId

    let selectd = false

    const findSeries = styleSeries.find(v => v.type === type)
    if (currentIndex === i) {
      const _selectStyle =
        findSeries && !findSeries.syncDefaultSelectStyle
          ? ({ display: true, ...findSeries.seriesSelectStyle } as SanDianSelectStyle)
          : selectStyle
      _selectStyle?.display && (_style = _selectStyle)

      selectd = true
      shadow_id = 'select_' + sandianId
      renderSvgUse()
    } else {
      _style = findSeries ? findSeries : _style
      findSeries && (shadow_id = `series_${findSeries.type}${sandianId}`)
    }
    const { styleType = 'dot', shadow } = _style,
      t = nodeType[styleType] as SvgSignType

    t === 'circle' && shadow?.display && renderSvgFilter(shadow, shadow_id)

    const attrs = getSvgNodeAttr(t, itemData, _style, shadow_id, selectd)
    if (!attrs) return null

    return React.createElement(t, { key: id, ...attrs, onClick: () => onClick && onClick(itemData, i) })
  }

  return <>{data.map(renderItem)}</>
})

export default SvgSandian
