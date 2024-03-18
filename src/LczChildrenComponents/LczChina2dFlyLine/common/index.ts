import { Boundary } from '../../../LczChina2dMap/type'
import { ToGround } from '../../../LczChina2dMap/type/child'

interface ToGroundProps {
  options: ToGround
  coord: any[]
}

export class toground {
  op: ToGroundProps
  toGroundOp: ToGround
  enabled: boolean
  addCircleTime: number
  times: number
  data: any[]
  constructor(op: ToGroundProps) {
    this.op = op
    this.toGroundOp = op.options
    this.enabled = this.toGroundOp.display
    this.addCircleTime = 0
    this.times = op.options.times || 1
    this.data = []
  }

  reset() {
    this.times = this.op.options.times
    this.addCircleTime = 0
    this.data = []
    this.enabled = this.toGroundOp.display
  }

  draw(ctx: CanvasRenderingContext2D, now: number) {
    const config = this.op,
      option = config.options,
      coord = config.coord,
      stroke = option.stroke || { display: true, color: 'rgba(255,159,0, 1)', width: 1 },
      startRadius = option.startRadius,
      haloRadius = option.haloRadius,
      time = option.time,
      stepTime = option.stepTime,
      totalRadius = startRadius + haloRadius,
      [x, y] = coord,
      { start, end } = this.calculate(startRadius, totalRadius)

    if (this.addCircleTime === 0 || now - this.addCircleTime >= 1000 * stepTime) {
      this.addCircleTime = now
      this.addCircle()
    }
    this.data.forEach((v, i) => {
      const fillOpacity = v.fillOpacity,
        rgba = v.rgba
      let startTime = v.startTime
      startTime === 0 && (startTime = v.startTime = now)
      let deep = (now - startTime) / (1e3 * time)
      deep > 1 && ((deep = 1), this.data.splice(i, 1))

      const r = startRadius + deep * haloRadius

      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI, !1)
      ctx.fillStyle = rgba
      stroke.display && (ctx.lineWidth = stroke.width)
      stroke.display && (ctx.strokeStyle = stroke.color)
      ctx.globalAlpha = fillOpacity
      stroke.display && ctx.stroke()
      ctx.fill()
      totalRadius >= r && (v.fillOpacity = start * r + end)
      ctx.restore()
    })
    0 === this.times && 0 === this.data.length && (this.enabled = false)
  }

  addCircle() {
    if (this.times) {
      const option = this.op.options,
        stroke = option.stroke,
        color = option.color
      this.data.push({
        stroke: stroke,
        rgba: color,
        startTime: 0,
        fillOpacity: 1
      })
      this.times--
    }
  }

  calculate(start, total) {
    const radiu = 1 / (start - total)
    return {
      start: radiu,
      end: 1 - start * radiu
    }
  }

  isAnimateEnd() {
    return this.enabled
  }
}

interface DrawLineProps {
  points: any[]
  distance: number
  startColor: string
  endColor: string
  ratio: number
  width: number
  backgroundLineWidth: number
  step: number
  speed: number
  start: number
  ctx: {
    base: any
    line: any
  }
  bang: toground
  backgroundLine: Boundary
  pointIndex: number
}

export class DrawLine {
  state: string // 状态
  points: any[] // 标点数组
  pointLength: number // 标点的长度
  unitStep: number // 速度
  startColor: string
  endColor: string
  ratio: number
  lineWidth: number
  ctx: { base: any; line: any }
  curveLength: number
  totalLength: number // 单条线的长度
  pointIndex: number //
  bang: toground
  backgroundLine: Boundary
  backgroundLineWidth: number
  destroy: () => void
  updata: (now: number, pre: number) => void

  constructor(options: DrawLineProps) {
    this.state = 'current'
    this.points = options.points
    this.pointLength = this.points.length
    this.unitStep = options.speed
    this.startColor = options.startColor
    this.endColor = options.endColor
    this.ratio = options.ratio
    this.lineWidth = options.width
    this.ctx = options.ctx
    this.curveLength = this.ratio * options.step
    this.totalLength = this.pointLength > this.curveLength ? 2 * this.pointLength : this.pointLength + this.curveLength
    this.pointIndex = options.pointIndex
    this.bang = options.bang
    this.backgroundLine = options.backgroundLine
    this.backgroundLineWidth = options.backgroundLineWidth

    this.updata = function (now) {
      if (this.pointIndex >= this.totalLength) {
        this.bang.isAnimateEnd()
          ? this.bang.draw(this.ctx.line, now)
          : (this.bang.reset(), (this.pointIndex = 0), 'needRemove' === this.state && (this.state = 'remove'))
      } else {
        this.pointIndex = this.pointIndex + this.unitStep
        const t = geLen(this.pointIndex, this.pointLength, this.curveLength),
          a = geLen(this.pointIndex + this.curveLength, this.pointLength, this.curveLength),
          _points = this.points.slice(t, a)

        if (_points.length > 0) {
          const p0 = _points[0],
            [x, y] = p0,
            pintlast = _points[_points.length - 1],
            [xlast, ylast] = pintlast,
            linearGradient = this.ctx.line.createLinearGradient(x, y, xlast, ylast)
          linearGradient.addColorStop(1, this.startColor)
          linearGradient.addColorStop(0, this.endColor)
          drawLine(this.ctx.line, _points)
          this.ctx.line.strokeStyle = linearGradient
          this.ctx.line.lineWidth = this.lineWidth
          this.ctx.line.stroke()
          this.ctx.line.strokeStyle = this.backgroundLine.color
          this.ctx.line.fillStyle = this.backgroundLine.color
          this.ctx.line.beginPath()
          this.ctx.line.arc(xlast, ylast, this.backgroundLineWidth, 0, 2 * Math.PI)
          this.ctx.line.fill()
        }
      }
    }

    this.destroy = function () {
      // @ts-ignore
      ;(this.state = null), (this.points = null), (this.pointLength = null)
      // @ts-ignore
      ;(this.unitStep = null), (this.startColor = null), (this.endColor = null)
      // @ts-ignore
      ;(this.ratio = null), (this.lineWidth = null), (this.ctx = null)
      // @ts-ignore
      ;(this.curveLength = null), (this.totalLength = null), (this.pointIndex = null)
      // @ts-ignore
      ;(this.bang = null), (this.backgroundLine = null), (this.backgroundLineWidth = null)
    }
  }
}

// 解析rgba
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function rgbaNum(rgba) {
  const _ogj = { 0: 'r', 1: 'g', 2: 'b', 3: 'opacity' }
  const val = rgba.match(/(\d(\.\d+)?)+/g),
    target = {}
  val.forEach((v, i) => {
    target[_ogj[i]] = v
  })
  return target
}

// 飞线开始的
function geLen(index, len, tlen) {
  const _l = index - tlen
  return _l < 0 ? 0 : _l >= len ? len - 1 : _l
}

export const drawLine = (target: CanvasRenderingContext2D, points: any[]) => {
  const pLen = points.length
  target.beginPath()
  const p0 = points[0],
    x = p0[0],
    y = p0[1]
  target.moveTo(x, y)
  for (let o = 1; o < pLen; o++) {
    const p = points[o],
      _x = p[0],
      _y = p[1]
    target.lineTo(_x, _y)
  }
}
