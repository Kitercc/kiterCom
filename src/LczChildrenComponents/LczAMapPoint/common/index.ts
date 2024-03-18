import { PointDataMap, PointGlobal, PointIconConfig } from '../../../LczAMap/type/child'
import { iconStyle } from '../style'

export function loadMarkers(
  map: any,
  data: PointDataMap[],
  {
    dataStyleds,
    pointsId,
    globalConfig,
    fn
  }: {
    dataStyleds: iconStyle[]
    pointsId: string
    globalConfig: PointGlobal
    fn?: (param: any, type: 'click' | 'mouseover' | 'mouseout') => void
  }
): any {
  const markers: any[] = []

  data.forEach((item, i) => {
    const style = dataStyleds[i],
      className = `${pointsId}-${style.type}`,
      width = style.imageStyle?.width || 0,
      height = style.imageStyle?.height || 0,
      mark = new AMap.Marker({
        position: new AMap.LngLat(item.lng, item.lat),
        content: `<div class="${className}"><div class="content"></div></div>`,
        zIndex: globalConfig.level || 100,
        zooms: [globalConfig?.viewRange?.min || 2, globalConfig?.viewRange?.max || 30],
        extData: item,
        offset: new AMap.Pixel(-width / 2, -height / 2)
      })

    mark.on('click', param => {
      fn && fn(param, 'click')
    })

    mark.on('mouseover', param => {
      fn && fn(param, 'mouseover')
    })

    mark.on('mouseout', param => {
      fn && fn(param, 'mouseout')
    })

    markers.push(mark)
  })

  markers.length > 0 && map.add(markers)

  return markers
}

interface PointCarouselProps {
  carousel: {
    display: boolean
    speed: number
  }
  markerPoints: any[]
  id: string
  focusIcon: PointIconConfig
  callback: (point: any) => void
}

export class PointCarousel {
  option: PointCarouselProps
  id: string
  timer: NodeJS.Timer | null
  currentIndex: number
  markerPoints: any[]
  len: number
  lastIndex: number
  pointInfo: { offset: any; content: '' }[]
  focusIcon: PointIconConfig
  constructor(option: PointCarouselProps) {
    this.option = option
    this.focusIcon = option.focusIcon
    this.markerPoints = option.markerPoints
    this.len = option.markerPoints.length
    this.timer = null
    this.currentIndex = 0
    this.id = option.id
    this.lastIndex = -1
    this.pointInfo = option.markerPoints.map(v => ({ offset: v.getOffset(), content: v.getContent() }))
  }

  upDataConfig(option: PointCarouselProps) {
    this.currentIndex = 0
    this.lastIndex = -1
    this.option = option
    this.focusIcon = option.focusIcon
    this.markerPoints = option.markerPoints
    this.len = option.markerPoints.length
    this.id = option.id
    this.pointInfo = option.markerPoints.map(v => ({ offset: v.getOffset(), content: v.getContent() }))
    this.clear()
    this.running()
  }

  running(_speed?: number) {
    this.clear(false)
    const speed = _speed || this.option.carousel.speed * 1000
    this.timer = setTimeout(() => {
      this.activePoint()

      if (this.currentIndex < this.len - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }

      this.running(speed)
    }, speed)
  }

  activePoint() {
    if (this.lastIndex >= 0) {
      const lastIndex = this.lastIndex,
        info = this.pointInfo[lastIndex]

      this.markerPoints[lastIndex].setContent(info.content)
      this.markerPoints[lastIndex].setOffset(info.offset)
    }
    const activeClassName = `${this.id}-active`,
      width = this.focusIcon.imageStyle?.width || 0,
      height = this.focusIcon.imageStyle?.height || 0

    this.option.callback({ target: this.markerPoints[this.currentIndex] })
    this.markerPoints[this.currentIndex].setContent(`<div class="${activeClassName}"><div class="content"></div></div>`)
    this.markerPoints[this.currentIndex].setOffset(new AMap.Pixel(-width / 2, -height / 2))
    this.lastIndex = this.currentIndex
  }

  clear(flag = true) {
    this.timer && clearTimeout(this.timer)
    flag &&
      this.markerPoints.forEach((item, i) => {
        const info = this.pointInfo[i]
        item.setContent(info.content)
        item.setOffset(info.offset)
      })
  }

  destroy() {
    this.clear(false)

    //@ts-ignore
    this.markerPoints = this.pointInfo = this.option = null
  }
}
