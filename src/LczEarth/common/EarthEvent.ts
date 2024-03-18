import * as THREE from 'three'
import Earth from './earth'

export default class EarthEvent {
  target: Earth
  __raycaster = new THREE.Raycaster()
  __mouse = new THREE.Vector2()
  mousemove_timer: NodeJS.Timeout | null = null
  mousemove_interval = 2
  initTimer: NodeJS.Timeout | null = null
  enable = true
  events?: { [key: string]: { [key: string]: () => void } }
  eventsList = {}
  constructor(options: Earth) {
    this.target = options
    this.events = options.events
    this.eventsList = {
      click: this.aboutClickEvents.bind(this, this.events['click'])
    }
  }

  initEventListeners(update = false) {
    this.initTimer && clearTimeout(this.initTimer)
    this.initTimer = setTimeout(() => {
      update && this.dispose()
      if (this.events) {
        for (const fnName in this.events) {
          if (Object.prototype.hasOwnProperty.call(this.events, fnName)) {
            if (fnName === 'dblclick' || fnName === 'click') {
              this.target.el.addEventListener(fnName, this.eventsList[fnName])
            }

            if (fnName === 'mousemove') {
              this.target.el.addEventListener(fnName, this.eventsList[fnName])
            }
          }
        }

        this.target.el.addEventListener('mouseout', this.eventsList['mouseout'])
      }
    }, 300)
  }

  aboutClickEvents(fn, event) {
    event.preventDefault()
    this.__mouse.x = ((event.offsetX || event.clientX) / this.target.el.offsetWidth) * 2 - 1
    this.__mouse.y = -((event.offsetY || event.clientY) / this.target.el.offsetHeight) * 2 + 1
    if (this.target.camera && this.target.scene && this.target.earthGroup) {
      this.__raycaster.setFromCamera(this.__mouse, this.target.camera)

      for (const fnName in fn) {
        if (Object.prototype.hasOwnProperty.call(fn, fnName)) {
          const callback = fn[fnName]
          // 散点的点击
          if (fnName.indexOf('lcz-earth-scatter-point') === 0 || fnName.indexOf('lcz-earth-title-bubble') === 0) {
            callback.call(this)
          }
        }
      }
    }
  }

  dispose() {
    if (this.events) {
      for (const fnName in this.events) {
        if (Object.prototype.hasOwnProperty.call(this.events, fnName)) {
          if (fnName === 'dblclick' || fnName === 'click') {
            this.target.el.removeEventListener(fnName, this.eventsList[fnName])
          }

          if (fnName === 'mousemove') {
            this.target.el.removeEventListener(fnName, this.eventsList[fnName])
          }
        }
      }

      this.target.el.removeEventListener('mouseout', this.eventsList['mouseout'])
    }
  }
}
