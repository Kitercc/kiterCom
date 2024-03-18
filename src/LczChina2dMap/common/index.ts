import ChinaMap from './chinaMap'
import * as d3 from 'd3'
import { Boundary, DrollParam, MapConfig, MapRange } from '../type'
import { defaultMapConfig } from './defaultValue'

export const hangzhoucode = [
  '330100',
  '330200',
  '330300',
  '330400',
  '330500',
  '330600',
  '330700',
  '330800',
  '330900',
  '331000',
  '331100'
]

export function formatMapPosition(target) {
  if (typeof target === 'string') {
    let _obj: any = target.replace(/\(|\)/g, '')
    _obj = _obj.split(',')

    _obj.forEach((item, i) => {
      const index = item.indexOf(':')
      if (index >= 0) {
        item = item.slice(index + 1)
      }
      _obj[i] = Number(item)
    })
    target = _obj
  }
  return target
}

// 基础绘制底图函数
export function drawSvgPath(
  this: ChinaMap,
  d3Target: d3,
  data: any,
  boundary: Boundary,
  fill: string,
  otherStyle = {}
) {
  const boundaryType = boundary.type || 'solid'

  d3Target
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .style({
      cursor: 'pointer',
      ...otherStyle
    })
    .attr('stroke', boundary.display ? boundary.color : 'none')
    .attr('stroke-width', boundary.display ? boundary.width : '0')
    .attr('stroke-dasharray', boundaryType === 'solid' ? '' : `${boundary.width} 6`)
    .attr('fill', fill)
    .attr('d', this.path)

  return d3Target
}

// 下转事件
async function drolldownEvent(map: ChinaMap, properties: any, type: string) {
  const { drillDown = true, showMultistage, range = defaultMapConfig.range as MapRange, maxLevel } = map.options
    .mapConfig as MapConfig
  const { childrenNum, adcode = '', name, code = '' } = properties

  const targetAdcode = adcode || code,
    mLevel = maxLevel?.value === undefined || maxLevel?.value === '' ? null : maxLevel?.value,
    testLevel = isNaN(Number(mLevel)) ? false : mLevel === null || Math.floor(mLevel) > map.level

  if (type === 'main' && map.isLeaf && drillDown && range.source === 'system' && !showMultistage && testLevel) {
    map.mapData = await map.getData(`${map._base}${targetAdcode}.json`, targetAdcode)
    childrenNum <= 0
      ? ((map.level = map.level + 1), (map.isLeaf = false))
      : ((map.level = map.level + 1), (map.isLeaf = true))
    map.mapData && map.draw.call(map, 'drill')
    map.RIH.push({ adcode: targetAdcode, name })
    const drollParam: DrollParam = {
      adcode: targetAdcode,
      name,
      level: map.level + 1
    }
    // 触发下钻事件
    map.options.drollEvents && map.options.drollEvents.onDrollDown && map.options.drollEvents.onDrollDown(drollParam)

    map.updataMapPath()
  }
}

// svg 底图上面 绑定事件
export function mapBindingEvent(this: ChinaMap, target: d3, type = '') {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this
  const { drillDown = true, drillType = 'click' } = this.options.mapConfig as MapConfig

  target
    .selectAll('path')
    .on('dblclick', async function (this, d) {
      if (self.moveStatus) return false
      self.clickTimer && clearTimeout(self.clickTimer)
      const { adcode = '', name, code = '', parent = {} } = d.properties,
        targetAdcode = adcode || code

      self.options.events?.onDoubleClick &&
        self.options.events.onDoubleClick({ name, adcode: targetAdcode, parentadcode: parent.adcode }, 'doubleClick')
      // 处理下钻
      drillDown && drillType === 'dblclick' && drolldownEvent(self, d.properties, type)
    })
    .on('click', d => {
      if (self.moveStatus) return false
      self.clickTimer && clearTimeout(self.clickTimer)
      self.clickTimer = setTimeout(() => {
        const { adcode = '', name, parent = {}, code = '' } = d.properties
        self.options.events?.onClick &&
          self.options.events.onClick({ name, adcode: adcode || code, parentadcode: parent.adcode }, 'click')

        drillDown && drillType === 'click' && drolldownEvent(self, d.properties, type)
      }, 300)
    })
    .on('mouseenter', d => {
      if (self.moveStatus) return false
      const { adcode = '', name, parent = {}, code = '' } = d.properties
      self.options.events?.onMouseenter &&
        self.options.events.onMouseenter({ name, adcode: adcode || code, parentadcode: parent.adcode }, 'mouseenter')
    })
    .on('mouseleave', d => {
      if (self.moveStatus) return false
      const { adcode, name, parent = {}, code = '' } = d.properties
      self.options.events?.onMouseleave &&
        self.options.events.onMouseleave({ name, adcode: adcode || code, parentadcode: parent.adcode }, 'mouseleave')
    })
}

export function getMouseQuadrant({ x, y }, { width, height }) {
  const center = [width / 2, height / 2],
    deepX = Math.abs(x - center[0]),
    deepY = Math.abs(y - center[1])

  let quadrant = 1,
    _x = -1,
    _y = 1

  if (x <= center[0] && y <= center[1]) {
    quadrant = 2
    _x = 1
    _y = 1
  } else if (x <= center[0] && y >= center[1]) {
    quadrant = 3
    _x = 1
    _y = -1
  } else if (x >= center[0] && y >= center[1]) {
    quadrant = 4
    _x = -1
    _y = -1
  }

  return {
    quadrant,
    x: _x * deepX,
    y: _y * deepY
  }
}

const removeEvent = function (this: ChinaMap, remove = false) {
  this.mapSvg.on('mouseup', null)
  this.mapSvg.on('mousemove', null)
  remove && this.mapSvg.on('mousedown', null)
}

export function listenerKeyDown(this: ChinaMap, callback, event) {
  const { key } = event
  if (key === ' ') {
    event.preventDefault()
    if (this.moveStatus) return false
    this.moveStatus = true
    const wrapperD3 = d3.select(this.wrapper)
    wrapperD3.classed('moved', true)

    this.mapSvg.on('mousedown', () => {
      const event = d3.event
      event.preventDefault()
      const { x, y } = this.scaleData
      const disX = event.clientX - x
      const disY = event.clientY - y

      this.mapSvg.on('mousemove', () => {
        const event = d3.event,
          { clientX: moveX, clientY: moveY } = event
        const left = moveX - disX
        const top = moveY - disY
        this.scaleData = {
          ...this.scaleData,
          x: left,
          y: top
        }

        callback()
      })

      this.mapSvg.on('mouseup', removeEvent.bind(this))
    })
  }
}

export function listenerKeyUp(this: ChinaMap, event) {
  const { key } = event
  if (key === ' ') {
    event.preventDefault()
    const wrapperD3 = d3.select(this.wrapper)
    this.moveStatus = false
    wrapperD3.classed('moved', false)
    removeEvent.call(this, true)
  }
}
