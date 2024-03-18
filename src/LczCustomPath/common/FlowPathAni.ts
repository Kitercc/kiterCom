import { CustomPathProps } from '../type'
import { cloneDeep } from 'lodash'
import { defaultAnimation } from './defaultValue'
import * as TWEEN from '@tweenjs/tween.js'

type Point = {
  x: number
  y: number
  rotate: number
}
export default class FlowPathAni {
  bodyNode: any
  points: Point[]
  pathLength: number
  config: CustomPathProps
  offset = { value: 0 }
  delayTimer?: NodeJS.Timeout
  tweenInstanceArr: TWEEN.Tween<{ value: number }>[] = []
  animateId?: number

  constructor(bodyNode: CanvasRenderingContext2D, points: Point[], config: CustomPathProps) {
    this.bodyNode = bodyNode
    this.points = cloneDeep(points)
    this.config = config
    this.pathLength = this.points.length
    this.init()
  }

  init() {
    const { animation = defaultAnimation } = this.config,
      { delay = 0, reverse } = animation
    reverse && this.points.reverse()
    this.setBodyTransform(this.points[0], 1)
    if (!this.points.length || (animation?.keyframes.length || 0) <= 0) return
    this.delayTimer = setTimeout(this.start.bind(this), delay * 1000)
  }

  start() {
    const { keyframes, loop = false, interval } = this.config.animation || defaultAnimation
    this.cancelAllTweenAnimate()
    for (let index = 0; index < keyframes.length; index++) {
      const aniSpeed = {
        Linear: TWEEN.Easing.Linear.None,
        EaseIn: TWEEN.Easing.Quadratic.In,
        EaseOut: TWEEN.Easing.Quadratic.Out,
        EaseInOut: TWEEN.Easing.Quadratic.InOut
      }
      const element = keyframes[index]
      const startVal = index == 0 ? 0 : Math.round((this.pathLength - 1) * (keyframes[index - 1].translate / 100)),
        endVal = Math.round((this.pathLength - 1) * (element.translate / 100)),
        startOpacity = index == 0 ? 100 : keyframes[index - 1].opacity,
        endOpacity = element.opacity

      const tween = new TWEEN.Tween({
        value: startVal
      })
        .to({ value: endVal }, element.time * 1000)
        .easing(aniSpeed[element.easeType])
        .onUpdate(offset => {
          this.offset = offset
          this.render({ val: { startVal, endVal }, opacity: { startOpacity, endOpacity } })
        })

      this.tweenInstanceArr.push(tween)
    }

    this.animate()

    if (this.tweenInstanceArr.length) {
      this.tweenInstanceArr[0].start()

      for (let index = 0; index < this.tweenInstanceArr.length; index++) {
        const element = this.tweenInstanceArr[index]
        if (index + 1 == this.tweenInstanceArr.length && loop) {
          if (index == 0) {
            element.delay(interval * 1000).repeat(Infinity)
          } else {
            element.chain(this.tweenInstanceArr[0].delay(interval * 1000))
          }
        }
        if (index + 1 !== this.tweenInstanceArr.length) {
          element.chain(this.tweenInstanceArr[index + 1])
        }
      }
    }
  }

  cancelAllTweenAnimate() {
    this.removeAllTween()
    this.animateId && cancelAnimationFrame(this.animateId)
    this.delayTimer && clearTimeout(this.delayTimer)
  }

  removeAllTween() {
    if (this.tweenInstanceArr.length) {
      for (let index = 0; index < this.tweenInstanceArr.length; index++) {
        const element = this.tweenInstanceArr[index]
        element.stop()
        TWEEN.remove(element)
      }
      this.tweenInstanceArr = []
    }
  }

  animate() {
    TWEEN.update()
    this.animateId = requestAnimationFrame(this.animate.bind(this))
  }

  render(config: { val: { startVal: number; endVal: number }; opacity: { startOpacity: number; endOpacity: number } }) {
    const nextIndex = Math.round(this.offset.value)
    const { val, opacity } = config,
      { startVal, endVal } = val,
      { startOpacity, endOpacity } = opacity
    let pointOpacity = 0
    if (startVal == endVal || startOpacity == endOpacity) {
      pointOpacity = endOpacity
    } else {
      pointOpacity = ((nextIndex - startVal) * (startOpacity - endOpacity)) / (startVal - endVal) + startOpacity
    }
    this.setBodyTransform(this.points[nextIndex], Math.round(pointOpacity) / 100)
  }

  setBodyTransform(point: { x: number; y: number; rotate: number }, opacity: number) {
    const rotate = this.config.bodyConfig?.autoRotate ? point.rotate : 0.1
    this.bodyNode.attr(
      'style',
      `visibility:visible;opacity:${opacity};transform:translate(${point.x}px,${point.y}px) rotate(${rotate}deg);`
    )
  }

  destroy() {
    this.cancelAllTweenAnimate()
    // @ts-ignore
    this.config = this.points = null
  }
}
