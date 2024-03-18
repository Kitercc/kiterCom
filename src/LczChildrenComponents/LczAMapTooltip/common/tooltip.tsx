import React from 'react'
import ReactDOM from 'react-dom'
import { randomChar } from '../../../common/util'
import mAMap from '../../../LczAMap/common/AMap'
import { OutToolTip } from '../../../LczAMap/type/child'
import Tooltip from '../components/Tooltip'

interface AmaptooltipProps {
  mAmap: mAMap
}

export default class Amaptooltip {
  design: boolean
  map: any
  tooltip?: OutToolTip
  tooltipList: Map<string, any>
  constructor(options: AmaptooltipProps) {
    this.map = options.mAmap.map
    this.design = options.mAmap.config?.design || false
    this.tooltipList = new Map()
  }

  upDataView(tooltip: OutToolTip) {
    this.tooltip = tooltip

    if (this.tooltipList.size === 0) {
      this.initList()
    } else {
      this.mergeTooltipList()
    }
  }

  mergeTooltipList() {
    const data = this.tooltip?.data || []
    for (const [key, val] of this.tooltipList) {
      const findData = data.find(item => `${item.lat}|${item.lng}` === key)
      if (!findData) {
        this.tooltipList.delete(key)
        this.removeMarkerReactDom(val)
        val.remove()
      }
    }

    for (let i = 0; i < data.length; i++) {
      const item = data[i],
        name = `${item.lat}|${item.lng}`,
        tipItem = this.tooltipList.get(name),
        tipOption = this.getMarkerOptions(item, tipItem?.getExtData()?.id)
      if (tipItem) {
        tipItem.setOptions(tipOption)
      } else {
        const tipCase = new AMap.Marker(tipOption)
        this.tooltipList.set(name, tipCase)
        this.map.add(tipCase)
      }
    }

    this.renderComponent()
  }

  initList() {
    const data = this.tooltip?.data || []

    data.forEach(item => {
      const name = `${item.lat}|${item.lng}`,
        tipOption = this.getMarkerOptions(item),
        tipCase = new AMap.Marker(tipOption)
      this.tooltipList.set(name, tipCase)
    })

    const tooltips = this.getTooltip()

    this.map.add(tooltips)

    this.renderComponent()
  }

  renderComponent() {
    const tooltips = this.getTooltip(),
      tooltip = this.tooltip || ({} as OutToolTip)
    for (let i = 0; i < tooltips.length; i++) {
      const item = tooltips[i],
        extData = item.getExtData(),
        id = extData.id,
        data = extData.data,
        markerDom = document.getElementById(id)

      markerDom &&
        ReactDOM.render(
          <Tooltip key={id} id={this.tooltip?.id || ''} design={this.design} data={data} tooltip={tooltip} />,
          markerDom
        )
    }
  }

  getMarkerOptions(itemData, id = '') {
    const { globalConfig, size } = this.tooltip || {},
      width = size?.width || 0,
      height = size?.height || 0,
      uid = id || randomChar('lcz-amap-tooltip'),
      options: any = {
        position: new AMap.LngLat(itemData.lng, itemData.lat),
        clickable: false,
        zIndex: globalConfig?.level || 100,
        zooms: [globalConfig?.viewRange.min || 2, globalConfig?.viewRange.max || 30],
        extData: { id: uid, data: itemData },
        offset: new AMap.Pixel(-width / 2, -height / 2)
      }
    !id && (options.content = `<div id="${uid}"></div>`)

    return options
  }

  getTooltip() {
    return Array.from(this.tooltipList.values())
  }

  // 移除react组件实例
  removeMarkerReactDom(markers: any[] | any) {
    const _markers = Array.isArray(markers) ? markers : [markers]
    _markers.forEach(item => {
      const dom = item.dom?.children?.[0]
      dom && ReactDOM.unmountComponentAtNode(dom)
    })
  }

  destroy() {
    const tooltips = this.getTooltip()
    this.removeMarkerReactDom(tooltips)
    this.map.remove(tooltips)
    this.tooltipList.clear()
    // @ts-ignore
    ;(this.map = null), (this.tooltip = null), (this.tooltipList = null)
  }
}
