/* eslint-disable indent */
import { cloneDeep, isEqual } from 'lodash'
import mAMap from '../../../LczAMap/common/AMap'
import { ClusterDataMap, ClusterIcon, OutClusterLayer, SignIcon } from '../../../LczAMap/type/child'

interface ClusterLayerOptions {
  cluster: OutClusterLayer
  mAmap: mAMap
  handleClick: (item: any) => void
}

export default class ClusterLayer {
  cluster: OutClusterLayer
  mapInstance: mAMap
  lastCluster?: OutClusterLayer
  clusterLayer?: any
  selectLastParams?: { selectPoint: any; offset: any; content: string; marker: any }
  markerParam = {}
  seriesConfig: { [key: string]: SignIcon } = {}
  points: any[] = []
  handleClick: (item: any) => void
  constructor(options: ClusterLayerOptions) {
    this.cluster = options.cluster
    this.mapInstance = options.mAmap
    this.handleClick = options.handleClick
  }

  updataView(cluster: OutClusterLayer) {
    if (this.lastCluster) {
      this.cluster = cluster
    }

    if (
      !this.lastCluster ||
      !isEqual(this.cluster.globalConfig, this.lastCluster.globalConfig) ||
      !isEqual(this.cluster.clusterIconConfig, this.lastCluster.clusterIconConfig) ||
      !isEqual(this.cluster.iconConfig, this.lastCluster.iconConfig) ||
      !isEqual(this.cluster.selectIcon, this.lastCluster.selectIcon)
    ) {
      this.getMarkerParams()
    }

    this.mapInstance.map.plugin(['AMap.MarkerClusterer'], () => {
      this.renderCluster()
    })

    this.lastCluster = cloneDeep(cluster)
  }

  renderCluster() {
    if (!this.lastCluster || !isEqual(this.cluster.data, this.lastCluster.data) || !this.points.length) {
      this.points = this.generateMarkers()
    }
    const clusterConfig = this.cluster.clusterConfig

    if (!this.clusterLayer) {
      this.clusterLayer = new AMap.MarkerCluster(this.mapInstance.map, this.points, {
        gridSize: clusterConfig?.gridSize || 60,
        maxZoom: clusterConfig?.maxZoom || 18,
        renderClusterMarker: this.renderClusterMarker.bind(this),
        renderMarker: this.renderMarker.bind(this)
      })

      this.clusterLayer.on('click', this.clusterLayerHandlerClick.bind(this))
    } else {
      this.clusterLayer.setData(this.points)
      this.clusterLayer.setGridSize(clusterConfig?.gridSize || 60)
      this.clusterLayer.setMaxZoom(clusterConfig?.maxZoom || 18)
    }
  }

  generateMarkers() {
    const data = this.cluster.data || [],
      points: any[] = []

    for (let i = 0; i < data.length; i++) {
      const itemData = data[i],
        { lng, lat } = itemData,
        point = { lnglat: new AMap.LngLat(lng, lat), itemData }
      points.push(point)
    }

    return points
  }

  renderClusterMarker(context) {
    const markerNumber = context.count || 0,
      markerParam = this.markerParam['cluster'],
      style = markerParam.contentOffset(markerNumber) || {}

    context.marker.setContent(style.content || '')
    context.marker.setzIndex(markerParam.zIndex)
    style.offset && context.marker.setOffset(style.offset)
  }

  renderMarker(context) {
    const data = context.data[0].itemData
    let markerParam = this.markerParam['icon']

    if (this.selectLastParams?.selectPoint === `${data.lng}_${data.lat}`) {
      markerParam = this.markerParam['selectIcon']
      this.selectLastParams.marker = context.marker
    }

    context.marker.setContent(markerParam.content(data))
    context.marker.setOffset(markerParam.offset(data))
    context.marker.setExtData(data)
    context.marker.setzIndex(markerParam.zIndex)
  }

  clusterLayerHandlerClick(clusterEventParams) {
    const clusterData = clusterEventParams.clusterData || []

    // 点击聚合点让它散开
    if (clusterData.length > 1 || clusterData[0]._amapMarker.count > 1) {
      if (clusterData.length > 1) {
        let markers: any = clusterData.slice(0, 10).map(({ lnglat }) => {
          return new AMap.Marker({ position: lnglat })
        })

        this.mapInstance.map.setFitView(markers, false, [200, 200, 200, 200])
        markers.forEach(item => item.destroy())
        markers = null
      } else {
        const firstCluster = clusterData[0],
          data = this.cluster.data || [],
          itemData = firstCluster.itemData,
          nearbyPoint = data.filter(item => {
            const itemLng = Number(item.lng),
              itemLat = Number(item.lat),
              itemDataLng = Number(itemData.lng),
              itemDataLat = Number(itemData.lat),
              diffLng = itemLng > itemDataLng ? itemLng - itemDataLng : itemDataLng - itemLng,
              diffLat = itemLat > itemDataLat ? itemLat - itemDataLat : itemDataLat - itemLat
            return diffLng <= 0.5 && diffLat <= 0.5
          })

        if (nearbyPoint.length > 1) {
          let markers: any = nearbyPoint.slice(0, 10).map(item => {
            return new AMap.Marker({ position: new AMap.LngLat(item.lng, item.lat) })
          })
          this.mapInstance.map.setFitView(markers, false, [200, 200, 200, 200])
          markers.forEach(item => item.destroy())
          markers = null
        } else {
          const zoom = this.mapInstance.map.getZoom()
          this.mapInstance.map.setZoomAndCenter(zoom + 2, clusterData[0].lnglat)
        }
      }
    } else {
      // 点击普通点
      const marker = clusterEventParams.marker,
        data = marker.getExtData(),
        markerParam = this.markerParam['selectIcon']

      this.handleClick && this.handleClick(data)

      if (this.selectLastParams) {
        this.selectLastParams.marker.setOffset(this.selectLastParams.offset)
        this.selectLastParams.marker.setContent(this.selectLastParams.content)
      }

      this.selectLastParams = {
        selectPoint: `${data.lng}_${data.lat}`,
        offset: marker.getOffset(),
        content: marker.getContent(),
        marker: marker
      }

      marker.setOffset(markerParam.offset(data))
      marker.setContent(markerParam.content(data))
    }
  }

  getMarkerParams() {
    const { globalConfig, clusterIconConfig, iconConfig, selectIcon } = this.cluster,
      zindex = globalConfig?.zIndex || 0,
      clusterIconSeries = clusterIconConfig?.iconSeries || [],
      iconSeries = iconConfig?.iconSeries || [],
      selectSeries = selectIcon?.iconSeries || []

    this.seriesConfig = {
      normal: iconConfig || ({} as SignIcon),
      normal_selected: selectIcon || ({} as SignIcon)
    }

    if (iconSeries.length > 0) {
      iconSeries.forEach(item => {
        const condition = item.condition?.value || ''
        if (condition && !this.seriesConfig[condition]) {
          this.seriesConfig[condition] = item
        }
      })
    }

    if (selectSeries.length > 0) {
      selectSeries.forEach(item => {
        const condition = item.condition?.value || ''
        if (condition && !this.seriesConfig[condition + '_selected']) {
          this.seriesConfig[condition + '_selected'] = item
        }
      })
    }

    // 设置标记点的属性
    this.markerParam = {
      cluster: {
        zindex,
        contentOffset: val => {
          const findstyle =
              clusterIconSeries.find(item => (item.min || 0) <= val && (item.max || 0) >= val) ||
              (clusterIconConfig as ClusterIcon),
            isCustom = (findstyle.iconType || 'custom') === 'system',
            offset = new AMap.Pixel(
              -(findstyle.width || 0) / 2,
              -((isCustom ? findstyle.height : findstyle.width) || 0) / 2
            )

          return {
            content: this.getClusterMarkerContent(findstyle, val),
            offset
          }
        }
      },
      icon: {
        zindex,
        content: (data: ClusterDataMap) => {
          const type = String(data.type) || '',
            config = this.seriesConfig[type] || this.seriesConfig['normal']
          return this.getMarkerContent(config, data)
        },
        offset: (data: ClusterDataMap) => {
          const type = String(data.type) || '',
            config = this.seriesConfig[type] || this.seriesConfig['normal']
          return new AMap.Pixel(-(config?.width || 0) / 2, -(config?.height || 0) / 2)
        }
      },
      selectIcon: {
        zindex,
        content: (data: ClusterDataMap) => {
          const type = String(data.type) || '',
            config = this.seriesConfig[type + '_selected'] || this.seriesConfig['normal_selected']
          return this.getMarkerContent(config, data, true)
        },
        offset: (data: ClusterDataMap) => {
          const type = String(data.type) || '',
            config = this.seriesConfig[type + '_selected'] || this.seriesConfig['normal_selected']
          return new AMap.Pixel(-(config?.width || 0) / 2, -(config?.height || 0) / 2)
        }
      }
    }
  }

  getMarkerContent(style: SignIcon, data: ClusterDataMap, selectd = false) {
    const { width = 0, height = 0, imageUrl = '', fontConfig, globalOffset } = style,
      { display, styleFollow = false, fontStyle, offset } = fontConfig || {},
      showName = display && data.name

    let mfont, mOffset

    if (showName) {
      const style = selectd ? this.cluster.selectIcon : this.cluster.iconConfig

      mfont = styleFollow ? style?.fontConfig?.fontStyle : fontStyle
      mOffset = styleFollow ? style?.fontConfig?.offset : offset
    }

    return `<div  
            class="lcz-amap-cluster-marker text-nowrap" 
            style="
            width:${width}px;
            height:${height}px;
            background-image:url(${imageUrl});
            transform: translate(${globalOffset?.x || 0}px, ${globalOffset?.y || 0}px);
         ">
       ${
         showName
           ? `<span style="
              transform: translate(${mOffset?.x}px, ${mOffset?.y}px);  
              font-size:${mfont?.fontSize}px;
              color:${mfont?.color};
              font-family:${mfont?.fontFamily};
              font-weight:${mfont?.fontWeight};
              letter-spacing: ${mfont?.letterSpacing}px;">
          ${data.name}
          </span>`
           : ''
       }
    </div>`
  }

  getClusterMarkerContent(config: ClusterIcon, val: string) {
    const clusterIconConfig = this.cluster.clusterIconConfig,
      {
        iconType = 'custom',
        icon = 'yuan',
        iconColor,
        globalOffset,
        imageUrl,
        width = 0,
        height = 0,
        fontStyle,
        offset,
        styleFollow = false
      } = config,
      isCustom = iconType === 'custom',
      fontOffset = styleFollow ? clusterIconConfig?.offset : offset,
      mfont = styleFollow ? clusterIconConfig?.fontStyle : fontStyle

    const iconStr = !isCustom
      ? `<span class='iconfont lcz-com-icon-${icon}' style='color:${iconColor};font-size:${width}px;'/>`
      : ''

    const content = `<div class="lcz-amap-cluster-marker" style="
          width:${width}px;
          height:${isCustom ? height : width}px;
         ${isCustom ? `background-image:url(${imageUrl});` : ''}
          transform: translate(${globalOffset?.x || 0}px, ${globalOffset?.y || 0}px);
      ">
        <span style="
          transform: translate(${fontOffset?.x || 0}px, ${fontOffset?.y || 0}px);
          z-index:9;
          font-size:${mfont?.fontSize}px;
          color:${mfont?.color};
          font-family:${mfont?.fontFamily};
          font-weight:${mfont?.fontWeight};
          letter-spacing: ${mfont?.letterSpacing}px;">${val}</span>
       ${iconStr}
      </div>`

    return content
  }

  destroy() {
    this.clusterLayer.setData(null)
    this.clusterLayer.clearEvents()
    this.clusterLayer.setMap(null)

    // @ts-ignore
    this.cluster = this.mapInstance = this.clusterLayer = this.lastCluster = this.selectLastParams = null

    // @ts-ignore
    this.markerParam = this.points = this.seriesConfig = this.handleClick = null
  }
}
