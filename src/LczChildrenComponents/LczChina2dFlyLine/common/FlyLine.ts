/* eslint-disable indent */
import * as d3 from 'd3'
import { myiterator } from '../../../common/util'
import ChinaMap from '../../../LczChina2dMap/common/chinaMap'
import { Boundary } from '../../../LczChina2dMap/type'
import { FlyLineStyle, LineConfig, OutFlyLine, ToGround } from '../../../LczChina2dMap/type/child'
import { setProjectionPath } from '../../LczChina2dMapTip/common'
import { defaultFlight } from './defaultValue'
import { drawLine, DrawLine, toground } from './index'

interface FlyLineProps {
  Map: ChinaMap
  wrapper: HTMLDivElement
}

export default class FlyLine {
  Map: ChinaMap
  projection: any
  pointsArr: any[]
  wrapper: HTMLDivElement
  canvasWrapper: d3
  flyLineArray: DrawLine[]
  config: OutFlyLine
  contexts: { base: any; line: any }
  nowTime: number
  preTime: number
  animationId: any
  width: number
  height: number
  constructor(options: FlyLineProps) {
    this.Map = options.Map
    this.wrapper = options.wrapper
    this.pointsArr = []
    this.canvasWrapper = null
    this.flyLineArray = []
    this.contexts = { base: null, line: null }
    this.config = {} as OutFlyLine
    this.nowTime = 0
    this.preTime = 0
    this.width = 0
    this.height = 0
  }

  drawTrajectory(wrapper, mapConfig: ChinaMap, config: OutFlyLine, { w, h }) {
    this.width = w
    this.height = h
    this.wrapper = wrapper
    this.removeFlyLine()
    const { projection } = setProjectionPath(mapConfig.mapData, w, h)
    this.projection = projection
    this.Map = mapConfig

    this.contexts = { base: null, line: null }

    this.config = config

    if (!config.data?.length) return false

    this.canvasWrapper = d3.select(this.wrapper)

    const { flight = defaultFlight, lineConfig = {}, toGround, data = [] } = config,
      pointsArr: any[] = [],
      { baseline = {} as Boundary, flyLine = {} } = lineConfig as LineConfig

    const base = this.canvasWrapper
      .append('canvas')
      .attr('width', w)
      .attr('height', h)
      .style({ width: `${w}px`, height: `${h}px` })

    const line = this.canvasWrapper
      .append('canvas')
      .attr('width', w)
      .attr('height', h)
      .style({ width: `${w}px`, height: `${h}px` })
    this.contexts.base = base.node().getContext('2d')
    this.contexts.base.lineCap = 'round'

    this.contexts.line = line.node().getContext('2d')
    this.contexts.line.lineCap = 'round'

    const filterData = data.filter(
      ({ fromlat, fromlng, tolat, tolng }) =>
        `${fromlat}${fromlng}` !== `${tolat}${tolng}` &&
        !isNaN(+fromlat) &&
        !isNaN(+fromlng) &&
        !isNaN(+tolat) &&
        !isNaN(+tolng)
    )

    filterData.forEach(v => {
      const { fromlat, fromlng, tolat, tolng } = v
      const from = projection([fromlng, fromlat])
      const to = projection([tolng, tolat])

      const { points, distance } = this.createFlyLinePathPoints(from, to, flight.smooth, flight.radian)
      pointsArr.push(points)

      const { colors, len = 1, width = 6 } = flyLine as FlyLineStyle
      const baseW = baseline?.width || 3

      const _drews = new DrawLine({
        points,
        distance,
        startColor: colors?.startColor,
        endColor: colors?.endColor,
        ratio: len,
        width,
        backgroundLineWidth: baseW,
        step: flight.smooth,
        speed: flight.speed,
        start: 0,
        ctx: this.contexts,
        bang: new toground({
          options: toGround as ToGround,
          coord: to
        }),
        backgroundLine: baseline,
        pointIndex: flight.randomStart ? Math.ceil(-Math.random() * points.length) : 0
      })

      this.flyLineArray.push(_drews)
    })

    this.drawBack(base, pointsArr)
    this.animate()
  }

  animate(n = 0) {
    this.preTime = this.nowTime
    this.nowTime = n
    this.animationId = requestAnimationFrame(a => this.animate(a))
    this.nowTime && this.flyAction(this.nowTime, this.preTime)
  }

  flyAction(now, pre) {
    if (this.contexts?.line) {
      this.contexts.line.clearRect(0, 0, this.width, this.height)
      this.flyLineArray = this.flyLineArray.filter(e => {
        return 'remove' !== e.state
      })

      const its: any = myiterator(this.flyLineArray)?.its && myiterator(this.flyLineArray)?.its()

      if (its) {
        try {
          for (let it = its.next(); it.value; it = its.next()) {
            it?.value?.updata && it.value.updata(now, pre)
          }
        } catch (error) {
          console.error(error)
        }
      }
    } else {
      this.destroy && this.destroy()
    }
  }

  drawBack(base: d3, pointsArr: any[]) {
    if (base.node()) {
      const baseline = this.config.lineConfig?.baseline
      const _base = this.contexts.base
      pointsArr.forEach(p => {
        _base.strokeStyle = baseline?.display ? baseline.color : 'rgba(0,0,0,0)'
        _base.fillStyle = baseline?.display ? baseline.color : 'rgba(0,0,0,0)'
        _base.lineWidth = baseline?.display ? baseline.width : 0
        drawLine(_base, p)
        _base.stroke()
      })
    }
  }

  createFlyLinePathPoints(from, to, smooth, radian) {
    const arr: any[] = [],
      controlPoint = this.getControlPoint(from, to, radian),
      control = controlPoint.control,
      distance = controlPoint.distance
    for (let u = 0; u <= smooth; u++) {
      arr.push(this.getBezier2Point(from, to, control, u / smooth))
    }
    return {
      points: arr,
      distance: distance
    }
  }

  getControlPoint(from, to, radian) {
    // 获取到贝塞尔曲线的控制点
    let diff = [to[0] - from[0], to[1] - from[1]]
    const a = [(to[0] + from[0]) / 2, (to[1] + from[1]) / 2],
      //坐标的差值
      distance = Math.sqrt(diff[0] * diff[0] + diff[1] * diff[1]),
      r = [
        (diff = [diff[0] / distance, diff[1] / distance])[0] < 0 ? -diff[1] : diff[1],
        diff[0] < 0 ? diff[0] : -diff[0]
      ]
    return {
      control: [(r[0] * distance) / radian + a[0], (r[1] * distance) / radian + a[1]],
      distance
    }
  }

  getBezier2Point(from, to, control, branch) {
    return [
      (1 - branch) * (1 - branch) * from[0] + 2 * branch * (1 - branch) * control[0] + branch * branch * to[0],
      (1 - branch) * (1 - branch) * from[1] + 2 * branch * (1 - branch) * control[1] + branch * branch * to[1]
    ]
  }

  removeFlyLine() {
    this.canvasWrapper && this.canvasWrapper.selectAll('canvas').remove()
    this.canvasWrapper = null
    this.flyLineArray = []
    cancelAnimationFrame(this.animationId)
  }

  destroy() {
    this.removeFlyLine()
    // @ts-ignore
    this.Map = null
    // @ts-ignore
    ;(this.projection = null), (this.pointsArr = null), (this.wrapper = null)
    // @ts-ignore
    ;(this.canvasWrapper = null), (this.flyLineArray = null), (this.config = null)
    // @ts-ignore
    ;(this.contexts = null), (this.nowTime = null), (this.preTime = null)
    // @ts-ignore
    ;(this.animationId = null), (this.width = null), (this.height = null)
  }
}
