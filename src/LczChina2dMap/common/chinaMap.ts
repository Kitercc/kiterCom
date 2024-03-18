/* eslint-disable indent */
import { message } from 'antd'
import * as d3 from 'd3'
import { cloneDeep, isEqual } from 'lodash'
import { drawSvgPath, formatMapPosition, hangzhoucode, listenerKeyDown, listenerKeyUp, mapBindingEvent } from '.'
import { randomChar } from '../../common/util'
import { MapPath } from '../../Lcz3dAreaMap/type'
import { AreaName, BgConfig, Boundary, DrollParam, MapConfig, MapRange } from '../type'
import { defaultMapConfig } from './defaultValue'

type EventType = (param: any, type: 'click' | 'doubleClick' | 'mouseenter' | 'mouseleave') => void
interface ChinaMapProps {
  el?: HTMLDivElement
  wrapper?: HTMLDivElement
  w?: number
  h?: number
  mapConfig?: MapConfig
  events?: {
    onClick?: EventType
    onDoubleClick?: EventType
    onMouseenter?: EventType
    onMouseleave?: EventType
  }
  setState?: { setMyMap?: (param: ChinaMap) => void; setMappath?: (param: MapPath[]) => void }
  drollEvents?: {
    onDrollDown?: (param: DrollParam) => void //下钻时
    onDrollUp?: (param: DrollParam) => void // 上钻
  }
}

export default class ChinaMap {
  _base: string // geojson 请求路径
  options: ChinaMapProps // 地图图配置
  lastOptions?: ChinaMapProps // 更新前的地图配置
  el?: HTMLDivElement
  wrapper?: HTMLDivElement
  uuid: string = randomChar('lcz-cn-map') // 组件id
  width: number
  height: number

  projection: any // 经纬度映射函数
  path: any // svg path 转换函数
  mapData: any // 底图geojson
  multistageData: any = null // 二级地图geojson  { [adcode]: [json] }
  level = 0 // 下钻等级
  isLeaf: boolean // 是否可以下钻
  RIH: { adcode: string | number; name: string }[] // 下钻路径列表
  d3Container: d3 // 地图dom 生成的d3 对象
  mapSvg: d3 // 地图 svg 的 d3对象
  mapSvgGroup: d3 // svg g标签  用来陈放绘制地图的group
  sideLineGroup: d3 // svg g标签 装叠底的group
  baseMapGroup: d3 // svg g标签 底图dom group
  backGroundlinearGradient: d3 // svg linearGradient标签 用作地图背景渐变
  lineMaskGroup: d3 // 用作地图背景贴图
  areaNameGroup: d3 // 地图的 区域名称 d3 对象  div
  multistageGroup: d3 // 二级地图的 d3 对象数组
  multistageAreNameGroup: { [key: string]: d3 } = {} // 二级地图的 区域名称 对象
  segmentedRegionalHeatGroup: d3 // 区域热力子组件 group
  sandianGroup: d3 // 散点子组件 group
  scaleData = {
    scale: 1,
    x: 0,
    y: 0
  }
  moveStatus = false
  eventListers: any = {}
  hideQundaoTenLine = false
  tenLineQundaoGroup: d3

  mapCache: Map<string, any> // 用作缓存geojson 防止多次请求
  updata: (options: ChinaMapProps) => any // 地图更新函数
  clickTimer: NodeJS.Timeout | null = null

  constructor(options: ChinaMapProps) {
    this.options = options
    this.el = options.el
    this.wrapper = options.wrapper
    this.width = options.w || 1200
    this.height = options.h || 900
    this.isLeaf = true
    this.RIH = []
    this._base = (process.env.NODE_ENV !== 'production' ? 'HappyServer' : '..') + '/lczCommon/charts/geoJson/'
    this.mapCache = new Map()

    options.mapConfig?.wheelZoom && this.bindWheelEvents()

    this.updata = async function (options: ChinaMapProps) {
      this.RIH = []
      this.level = 0
      this.options = options
      this.width = options.w || 1200
      this.height = options.h || 900

      this.multistageData = null

      await this.getMapInfo()

      const mapConfig = options.mapConfig || ({} as MapConfig),
        lastMapConfig = this.lastOptions?.mapConfig
      if (this.options.mapConfig?.drillDown && this.options.mapConfig?.rootCode?.value) {
        this.getRIH()
      }

      // 绘制地图
      if (this.mapData) {
        this.draw()
      } else {
        this.d3Container && this.d3Container.selectAll('*').remove()
        this.mapSvg && (this.mapSvg = null)
        this.mapSvgGroup && (this.mapSvgGroup = null)
        this.baseMapGroup && (this.baseMapGroup = null)
        this.backGroundlinearGradient && (this.backGroundlinearGradient = null)
        this.lineMaskGroup && (this.lineMaskGroup = null)
        this.areaNameGroup && (this.areaNameGroup = null)
        this.segmentedRegionalHeatGroup && (this.segmentedRegionalHeatGroup = null)
        this.sandianGroup && (this.sandianGroup = null)
      }

      // 绘制2级地图
      if (mapConfig?.showMultistage && this.multistageData) {
        if (
          !this.lastOptions ||
          !isEqual(mapConfig?.range, lastMapConfig?.range) ||
          !isEqual(mapConfig?.bgConfig, lastMapConfig?.bgConfig) ||
          !isEqual(mapConfig?.extremityBoundary, lastMapConfig?.extremityBoundary) ||
          !isEqual(mapConfig.extremityAreaName, lastMapConfig?.extremityAreaName) ||
          mapConfig.showMultistage !== lastMapConfig?.showMultistage ||
          this.width !== this.lastOptions.w ||
          this.height !== this.lastOptions.h
        ) {
          this.drawMultistage()
        }
      } else {
        this.multistageGroup && this.multistageGroup.selectAll('*').remove()
        this.multistageAreNameDestroy()
      }

      this.lastOptions = cloneDeep(this.options)

      options?.setState?.setMyMap && options.setState.setMyMap({ ...this })

      this.updataMapPath()
      return this
    }
  }

  async getMapInfo() {
    const { range = {} as MapRange, showMultistage = false } = this.options.mapConfig as MapConfig
    try {
      if (range?.source === 'system' || !range?.uploadData?.src) {
        const rAdcode = range.adcode?.value + ''
        if (rAdcode === '' || rAdcode === 'Execute Expression Error') throw new Error('ERROR')
        this.RIH.push({ adcode: rAdcode, name: '' })
        this.level = this.RIH.length - 1
        this.mapData = await this.getData(`${this._base}${rAdcode}.json`, rAdcode)

        if (showMultistage) {
          const levelList = ['province', 'city', 'district']
          const features = this.mapData.features || []
          for (let i = 0; i < features.length; i++) {
            const item = features[i]
            const properties = item.properties,
              childAdcode = properties.adcode,
              childLevel = properties.level,
              childrenNum = properties.childrenNum,
              parentCode = properties?.parent?.adcode

            if ((levelList.includes(childLevel) && childrenNum > 0) || hangzhoucode.includes(String(parentCode))) {
              const childJson = await this.getData(`${this._base}${childAdcode}.json`, childAdcode)
              !this.multistageData && (this.multistageData = Object.create(null))
              this.multistageData[childAdcode] = childJson
            }
          }
        } else {
          this.multistageData = null
        }
      } else {
        this.mapData = await this.getData(range?.uploadData?.src)
        this.multistageData = null
      }
    } catch (error) {
      console.log(error)
      message.error({
        content: 'adcode 错误',
        className: 'lcz-notice'
      })
      this.mapData = null
      this.multistageData = null
      // 通知地图更新
      this.options?.setState?.setMyMap && this.options.setState.setMyMap({ ...this })
    }
  }

  draw(type = '') {
    if (!this.el) throw new Error(`el is ${this.el}`)
    const {
      bgConfig = defaultMapConfig.bgConfig as BgConfig,
      drillDown = true,
      drillType = 'click',
      upperType = 'operation_blank',
      southChinaSea,
      range = defaultMapConfig.range as MapRange,
      boundary = defaultMapConfig.boundary as Boundary,
      areaName
    } = this.options.mapConfig as MapConfig
    const tenLinedispayType = southChinaSea?.displayType || 'mosaic'

    this.d3Container = d3.select(this.el)
    this.mapSvg = this.mapSvg || this.d3Container.append('svg')
    this.mapSvg.attr('width', this.width).attr('height', this.height)
    const { projection, path } = this.setProjectionPath()
    this.projection = projection
    this.path = path
    // eslint-disable-next-line
    const self = this
    // 绘制底图
    this.mapSvgGroup = this.mapSvgGroup || this.mapSvg.append('g')

    const showMultistage = this.options.mapConfig && this.multistageData

    showMultistage && (this.multistageGroup = this.multistageGroup || this.mapSvgGroup.append('g'))

    this.baseMapGroup && this.baseMapGroup.selectAll('path').remove()
    const fill =
      bgConfig.display && bgConfig.colorConfig?.display ? `url(#linearGradient_${this.uuid})` : 'rgba(0,0,0,0)'
    this.sideLineGroup = this.sideLineGroup || this.mapSvgGroup.append('g') // 叠底容器
    this.baseMapGroup = this.baseMapGroup || this.mapSvgGroup.append('g')

    if (tenLinedispayType) this.tenLineQundaoGroup = this.tenLineQundaoGroup || this.mapSvgGroup.append('g')

    // 初始底地图
    drawSvgPath.call(
      this,
      this.baseMapGroup,
      this.mapData,
      boundary,
      showMultistage ? 'rgba(0,0,0,0)' : fill,
      showMultistage ? { 'pointer-events': 'none' } : {}
    )

    // 为底图绑定事件
    if (!showMultistage) {
      mapBindingEvent.call(this, this.baseMapGroup, 'main')
    }

    if (drillDown && !showMultistage && range.source === 'system' && upperType === 'operation_blank') {
      // 下钻时双击外面回到初始
      self.mapSvg.node()[`on${drillType}`] = async function ({ target }) {
        if (!self.moveStatus && target === this && range.source === 'system' && upperType === 'operation_blank') {
          self.upperDrilling.call(self)
        }
      }
    }

    // 绘制背景
    this.drawBgConfig()

    // 绘制区域名称
    areaName?.display
      ? (this.areaNameGroup = this.drawAreaName(this.areaNameGroup, areaName, this.mapData))
      : this.areaNameGroup && this.areaNameGroup.selectAll('span').remove()

    // 绘制分段指标热力容器
    this.segmentedRegionalHeatGroup =
      this.segmentedRegionalHeatGroup ||
      this.mapSvgGroup
        .append('g')
        .attr('id', `segmentedRegionalHeatGroup_${this.uuid}`)
        .style({ 'pointer-events': 'none' })

    // 绘制散点容器
    this.sandianGroup =
      this.sandianGroup ||
      this.mapSvgGroup
        .append('g')
        .attr('id', `sandianGroup_${this.uuid}`)
        .attr('class', 'lcz-china-2dmap-sandian-group')
        .style({ 'pointer-events': 'none' })

    // 通知地图更新
    type === 'drill' && this.options?.setState?.setMyMap && this.options.setState.setMyMap({ ...this })
  }

  drawMultistage() {
    const {
      bgConfig = defaultMapConfig.bgConfig as BgConfig,
      extremityBoundary = defaultMapConfig.boundary as Boundary,
      extremityAreaName
    } = this.options.mapConfig as MapConfig

    this.multistageGroup && this.multistageGroup.selectAll('*').remove()
    const fill =
      bgConfig.display && bgConfig.colorConfig?.display ? `url(#linearGradient_${this.uuid})` : 'rgba(0,0,0,0)'

    this.multistageAreNameDestroy()

    for (const key in this.multistageData) {
      if (Object.prototype.hasOwnProperty.call(this.multistageData, key)) {
        const childData = this.multistageData[key]
        const group = this.multistageGroup.append('g')
        drawSvgPath.call(this, group, childData, extremityBoundary, fill).selectAll('path')

        if (extremityAreaName?.display) {
          this.multistageAreNameGroup[key] = this.drawAreaName(
            this.multistageAreNameGroup[key],
            extremityAreaName,
            childData,
            'multistage'
          )
        }
      }
    }

    // 绑定事件
    mapBindingEvent.call(this, this.multistageGroup)
  }

  drawAreaName(target, areaName: AreaName, data, type = '') {
    const { reversion = false, textSeries = [] } = areaName
    target = target || this.d3Container.append('div').classed(`lcz-china-map-area-name ${type}`, true)
    target.classed('reversion', reversion)
    target.selectAll('span').remove()

    target.style({
      'font-family': areaName.fontFamily,
      'font-size': `${areaName.fontSize}px`,
      color: areaName.color,
      'letter-spacing': `${areaName.letterSpacing}px`,
      'font-weight': areaName.fontWeight
    })

    target
      .selectAll('span')
      .data(data.features)
      .enter()
      .append('span')
      .text(d => d.properties.name)
      .attr('style', d => {
        const offset = { x: 0, y: 0 }

        let { centroid, center } = d.properties

        if (centroid === undefined && center === undefined) return ''

        centroid = formatMapPosition(centroid)
        center = formatMapPosition(center)

        let po = centroid || center ? this.projection(centroid || center) : []

        if (!centroid && typeof center === 'string') {
          po = this.projection(center.split(','))
        }

        const find = textSeries.find(v => v.value === d.properties.name)
        if (find) {
          offset.x = find.xOffset
          offset.y = find.yOffset
        }

        return ` 
          left:${po[0] + offset.x}px; 
          top: ${po[1] + offset.y}px;
        `
      })

    return target
  }

  drawBgConfig() {
    const { bgConfig = defaultMapConfig.bgConfig as BgConfig } = this.options.mapConfig as MapConfig

    this.mapSvgGroup.selectAll('defs').remove()
    const defs = this.mapSvgGroup.append('defs')

    const { colorConfig, texture } = bgConfig,
      { display: colorDis, range = 'global', starColor, endColor, direction = 0 } = colorConfig || {}

    this.backGroundlinearGradient && this.backGroundlinearGradient.remove()
    if (bgConfig.display && colorDis) {
      const bgData = [
        { offset: 0, color: starColor },
        { offset: 1, color: endColor }
      ]
      // 背景颜色
      const linearGradient = defs
        .append('linearGradient')
        .attr('id', `linearGradient_${this.uuid}`)
        .attr('gradientTransform', `rotate(${direction}, .5, .5)`)

      if (range === 'global') {
        linearGradient
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', this.width)
          .attr('y2', 0)
      }

      this.backGroundlinearGradient = linearGradient
        .selectAll('stop')
        .data(bgData)
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color)
    }

    // 纹理
    defs
      .append('mask')
      .attr('id', `lineMask_${this.uuid}`)
      .append('g')
      .selectAll('path')
      .data(this.mapData.features)
      .enter()
      .append('path')
      .attr('fill', 'rgba(255, 255 ,255, 1)')
      .attr('d', this.path)
      .style({
        'pointer-events': 'none'
      })

    this.lineMaskGroup =
      this.lineMaskGroup ||
      this.mapSvgGroup.append('g').attr('mask', `url(#lineMask_${this.uuid})`).style({ 'pointer-events': 'none' })

    this.lineMaskGroup.selectAll('defs').remove()
    this.lineMaskGroup.selectAll('rect').remove()

    if (bgConfig.display && texture?.display && texture.imgUrl) {
      this.lineMaskGroup
        .append('defs')
        .append('pattern')
        .attr('id', `pattern_${this.uuid}`)
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', texture.width)
        .attr('height', texture.height)
        .append('image')
        .attr('xlink:href', texture.imgUrl)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', texture.width)
        .attr('height', texture.height)

      this.lineMaskGroup
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('fill', `url(#pattern_${this.uuid})`)
        .style({
          'pointer-events': 'none',
          opacity: texture.opacity
        })
    }
  }

  bindWheelEvents() {
    if (!this.mapSvg) {
      requestIdleCallback(() => this.bindWheelEvents())
    } else {
      const container = this.wrapper?.querySelector('.lcz-china-map-container') as HTMLDivElement

      if (container && this.el) {
        const containerD3 = d3.select(container)
        let enlargeScale = 1
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this

        const transformFn = () => {
          const { x, y, scale } = this.scaleData
          // containerD3.style('transform', `translate(${x}px,${y}px) scale(${scale})`)
          containerD3.style('--area-scale', scale)
          containerD3.style('--area-translate-x', x + 'px')
          containerD3.style('--area-translate-y', y + 'px')
        }

        this.mapSvg.on('wheel', () => {
          if (!this.moveStatus) {
            const event = d3.event
            event.preventDefault()
            const { detail, wheelDelta } = event,
              { scale, x, y } = self.scaleData,
              delta = detail ? detail > 0 : wheelDelta < 0,
              step = !delta ? 0.1 : -0.1

            let _scale = +parseFloat(String(scale + step)).toFixed(2)
            _scale = _scale <= 0.5 ? 0.5 : _scale >= 5 ? 5 : _scale

            if (_scale !== scale) {
              if (!delta) {
                self.scaleData = {
                  ...self.scaleData,
                  scale: _scale
                }
                enlargeScale = _scale
              } else {
                const t = _scale / enlargeScale
                self.scaleData = {
                  x: x * t,
                  y: y * t,
                  scale: _scale
                }
              }

              transformFn()
            }
          }
        })

        this.eventListers = {
          ...this.eventListers,
          listenerKeyDown: listenerKeyDown.bind(this, transformFn),
          listenerKeyUp: listenerKeyUp.bind(this)
        }

        window.addEventListener('keydown', this.eventListers.listenerKeyDown)
        window.addEventListener('keyup', this.eventListers.listenerKeyUp)
      }
    }
  }

  async getRIH() {
    const { range = {} as MapRange, rootCode, showMultistage } = this.options.mapConfig as MapConfig,
      adcode = range.adcode?.value,
      rootcode = rootCode?.value

    // 获取到下钻数组
    function findRIH(treeData, adcode) {
      try {
        if (treeData.length == 0) return
        for (let i = 0; i < treeData.length; i++) {
          const dataItem = treeData[i]
          if (dataItem.adcode == adcode) {
            return [{ name: dataItem.name, adcode: dataItem.adcode }]
          } else {
            if (dataItem.districts) {
              const res = findRIH(dataItem.districts, adcode)
              if (res !== undefined) {
                return res.concat({ name: dataItem.name, adcode: dataItem.adcode })
              }
            }
          }
        }
      } catch (error) {
        console.warn(error)
      }
    }

    try {
      if (rootcode != adcode && range?.source === 'system' && !showMultistage) {
        if (adcode != '' && adcode != 'Execute Expression Error') {
          const cityUrl =
            (process.env.NODE_ENV !== 'production' ? 'HappyServer' : '..') +
            '/lczCommon/matrix/third/amap/district.json'
          const cityInfo: any = await this.getData(cityUrl),
            RIH = (findRIH(cityInfo.districts || [], adcode) || []).reverse(),
            findRootadcodeIndex = RIH.findIndex(v => v.adcode == rootcode)

          if (findRootadcodeIndex != -1 && findRootadcodeIndex < RIH.length && RIH.length) {
            this.RIH = RIH.slice(findRootadcodeIndex)
            this.level = this.RIH.length - 1
            this.level = this.RIH.length - 1

            this.updataMapPath()
          }
        }
      }
    } catch (error) {
      console.warn(error)
    }
  }

  setProjectionPath() {
    const center = d3.geo.centroid(this.mapData)
    let projection = d3.geo
      .mercator()
      .center(center)
      .translate([this.width / 2, this.height / 2]) //设置缩放因子
    let path = d3.geo.path().projection(projection)
    const bounds = path.bounds(this.mapData)
    const hscale = (120 * this.width) / (bounds[1][0] - bounds[0][0])
    const vscale = (120 * this.height) / (bounds[1][1] - bounds[0][1])
    const scale = hscale < vscale ? hscale : vscale
    const offset = [this.width - (bounds[0][0] + bounds[1][0]) / 2, this.height - (bounds[0][1] + bounds[1][1]) / 2]

    projection = d3.geo.mercator().center(center).scale(scale).translate(offset)
    path = path.projection(projection)
    return { center, projection, path }
  }

  getData(url: string, code = '') {
    const key = code || url
    return new Promise((resolve, reject) => {
      if (this.mapCache.has(key)) {
        let result = this.mapCache.get(key)
        result = this.displayQundaoFn(result, key)
        resolve(result)
      } else {
        fetch(url)
          .then(request => request.json())
          .then(res => {
            const result = this.displayQundaoFn(res, code)
            this.mapCache.set(key, result)
            resolve(result)
          })
          .catch(error => reject(error))
      }
    })
  }

  displayQundaoFn(result: any, code: string) {
    if (code != '100000') return result
    const tenLineAndArchipelagoDisplay = this.options.mapConfig?.southChinaSea?.displayType || 'mosaic'

    switch (tenLineAndArchipelagoDisplay) {
      case 'mosaic':
        if (this.hideQundaoTenLine) {
          const cChinaData = this.mapCache.get('100000_complete') // 完整json
          this.mapCache.set('100000', cChinaData)
          this.hideQundaoTenLine = false
          return cChinaData
        }
        break
      case 'smallPicture':
        if (!this.hideQundaoTenLine) {
          this.mapCache.set('100000_complete', result)
          const cloneRes = cloneDeep(result)
          const sdxIndex = cloneRes.features.findIndex(v => v.properties.adchar === 'JD')
          const haiNanIndex = cloneRes.features.findIndex(v => v.properties.name === '海南省')
          cloneRes.features.splice(sdxIndex, 1)[0]
          const hainanData = cloneRes.features[haiNanIndex].geometry.coordinates
          cloneRes.features[haiNanIndex].geometry.coordinates = [hainanData[0]]
          this.hideQundaoTenLine = true
          this.mapCache.set('100000', cloneRes) // 删减后的json
          return cloneRes
        }
        break
    }
    return result
  }

  multistageAreNameDestroy() {
    for (const key in this.multistageAreNameGroup) {
      const group = this.multistageAreNameGroup[key]
      group && group.remove()
      delete this.multistageAreNameGroup[key]
    }
  }

  // 上钻的事件
  async upperDrilling() {
    if (this.level !== 0) {
      const cCode = this.RIH[this.level - 1].adcode + ''
      this.mapData = await this.getData(`${this._base}${cCode}.json`, cCode)
      this.RIH.splice(this.level, 1)
      this.level = this.level - 1
      this.mapData && this.draw.call(this, 'drill')
      this.isLeaf = true
      const lastRIH = this.RIH[this.RIH.length - 1]
      const drollParam: DrollParam = {
        adcode: lastRIH.adcode,
        name: lastRIH.name,
        level: this.level + 1
      }
      // 触发上钻事件
      this.options.drollEvents && this.options.drollEvents.onDrollUp && this.options.drollEvents.onDrollUp(drollParam)

      this.updataMapPath()
    }
  }

  updataMapPath() {
    this.options.setState?.setMappath && this.options.setState.setMappath([...this.RIH])
  }

  destroy() {
    try {
      this.mapSvgGroup.remove(), (this.mapSvgGroup = null)
      this.baseMapGroup.remove(), (this.baseMapGroup = null)
      this.sideLineGroup.remove(), (this.sideLineGroup = null)
      this.backGroundlinearGradient && this.backGroundlinearGradient.remove(), (this.backGroundlinearGradient = null)
      this.lineMaskGroup.remove(), (this.lineMaskGroup = null)
      this.areaNameGroup.remove(), (this.areaNameGroup = null)
      this.multistageGroup && (this.multistageGroup.remove(), (this.multistageGroup = null))
      this.segmentedRegionalHeatGroup.remove(), (this.segmentedRegionalHeatGroup = null)
      this.sandianGroup.remove(), (this.sandianGroup = null)
      this.d3Container.remove(), (this.d3Container = null)
      this.mapSvg.remove(), (this.mapSvg = null)

      this.multistageAreNameDestroy()

      window.removeEventListener('keydown', this.eventListers?.listenerKeyDown)
      window.removeEventListener('keyup', this.eventListers?.listenerKeyUp)

      this.projection = null
      this.path = null
      this.mapData = null
      this.multistageData = null
      this.mapCache.clear()
      // @ts-ignore
      this.options = this.el = this.mapCache = this.RIH = this.multistageAreNameGroup = this.scaleData = this.eventListers = null
      // @ts-ignore
      this.updata = this.getMapInfo = this.draw = this.drawAreaName = this.drawBgConfig = this.setProjectionPath = this.getData = this.destroy = this.getRIH = null
    } catch (error) {
      console.error(error)
    }
  }
}
