import * as echarts from 'echarts/core'
import { RotationAnimate } from '../LczChartLine/LczBasicArea/type'
export class ChartCarousel {
  chart: echarts.ECharts
  carouselAnimation: RotationAnimate
  timer?: NodeJS.Timer
  mouselEvent: {
    hideAnimate: any
    initAnimate: any
  }
  el: HTMLElement
  constructor(chart: echarts.ECharts, carouselAnimation: RotationAnimate) {
    this.chart = chart
    this.carouselAnimation = carouselAnimation
    this.el = chart.getDom()
    this.mouselEvent = {
      hideAnimate: this.hideAnimate.bind(this, true),
      initAnimate: this.initAnimate.bind(this, undefined)
    }

    this.initAnimate()
    this.el.addEventListener('mouseenter', this.mouselEvent.hideAnimate)
    this.el.addEventListener('mouseleave', this.mouselEvent.initAnimate)
  }

  initAnimate(carouselAnimation?: RotationAnimate, tooltip?: boolean) {
    carouselAnimation && (this.carouselAnimation = carouselAnimation)
    this.hideAnimate()
    const { display, showNumer = 4, updateNumber = 1, interval = 3 } = this.carouselAnimation,
      _interval = (interval || 3) * 1000,
      options: any = this.chart.getOption()

    let maxLen = 0
    options.series.forEach(item => {
      maxLen < item.data.length && (maxLen = item.data.length)
    })
    if (!display || maxLen <= showNumer) return false

    try {
      this.timer = setInterval(() => {
        const options: any = this.chart.getOption()
        const startValue = options.dataZoom[0].startValue + updateNumber
        const endValue = options.dataZoom[0].endValue + updateNumber
        if (options.dataZoom[0].endValue == options.xAxis[0].data.length - 1) {
          this.chart.dispatchAction({
            type: 'dataZoom',
            startValue: 0,
            endValue: showNumer - 1
          })
          tooltip &&
            this.chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: showNumer - 1
            })
        } else {
          this.chart.dispatchAction({
            type: 'dataZoom',
            startValue,
            endValue
          })
          tooltip &&
            this.chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: endValue
            })
        }
      }, _interval)
    } catch (error) {
      console.warn(error)
    }
  }

  hideAnimate(flay = true) {
    this.timer && clearInterval(this.timer)
    flay &&
      this.chart.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: false
      })
  }

  destroy() {
    this.el.removeEventListener('mouseenter', this.mouselEvent.hideAnimate)
    this.el.removeEventListener('mouseleave', this.mouselEvent.initAnimate)
    this.hideAnimate()

    // @ts-ignore
    this.el = this.chart = this.mouselEvent = this.carouselAnimation = null
  }
}
