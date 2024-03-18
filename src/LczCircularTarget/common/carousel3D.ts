interface Carousel3DProps {
  el: HTMLElement // 容器dom
  itemsClass: string // 子元素类名
  rotation: boolean // 是否轮播
  speed: number // 轮播间隔
  direction: 1 | -1 // 1 顺时针 -1 逆时针
  currentIndex: number // 当前选中项
  radius: number // 圆形指标半径
  switchSpeed: number // 切换速度
  proportion: number // 后方留白比例
  cameraPosition?: { x: number; y: number; z: number } // 相机位置
  normalOpacity: number // 元素默认透明度
  allAlongpositive: boolean // 指标始终朝正
  onChange?: (i: number) => void
}

export class Carousel3D {
  options: Carousel3DProps
  el: any
  rotation: boolean
  speed: number
  itemsClass: string
  currentIndex: number
  switchSpeed: number
  items: any[]
  itemsLen: number
  currentNode: any
  deviation: number
  mainStyleRotateY: number
  cameraPosition: { x: number; y: number; z: number }
  allAlongpositive: boolean
  position: 1 | -1
  timer: any
  mainTimer: any
  animate: boolean
  mouseStop: boolean

  constructor(options: Carousel3DProps) {
    this.options = options
    this.el = options.el // 父节点
    this.rotation = options.rotation // 是否轮播
    this.speed = options.speed // 轮播间隔
    this.itemsClass = options.itemsClass // item 的class
    this.currentIndex = options.currentIndex // 当前对象
    this.switchSpeed = options.switchSpeed
    this.items = this.el.querySelectorAll(`.${this.itemsClass}`)
    this.cameraPosition = options.cameraPosition || { x: 0, y: 10, z: 1000 }
    this.allAlongpositive = options.allAlongpositive
    this.itemsLen = this.items.length
    this.currentNode = this.items[this.currentIndex]
    this.deviation = 360 / this.itemsLen
    this.mainStyleRotateY = this.deviation * this.currentIndex * -1 - this.cameraPosition.x
    this.position = 1
    this.animate = false
    this.mouseStop = false
    this.timer = {}

    this.init(false)
  }

  init(animate = true, isLast = false) {
    try {
      this.stopRotation(false)
      if (this.itemsLen <= 0) return

      this.setStyle(this.el, {
        transform: `translateZ(${-this.cameraPosition.z}px) rotateX(${-this.cameraPosition.y}deg) rotateY(${
          this.mainStyleRotateY
        }deg)`,
        transition: `transform ${animate ? this.switchSpeed / 1000 : 0}s`
      })

      Array.from(this.items).forEach((node, i) => {
        const _deg = this.deviation * i
        this.setStyle(node, {
          transform: `
          translate(-50%,-50%) rotateX(0deg) rotateY(${_deg}deg) translateZ(${this.options.radius}px) rotateX(0deg)
          rotateY(${-this.mainStyleRotateY - _deg}deg) rotateX(${this.allAlongpositive ? this.cameraPosition.y : 0}deg)
              `,
          transition: `all ${animate ? this.switchSpeed / 1000 : 0}s `,
          removeClassName: 'current'
        })
      })
      this.items[this.currentIndex].classList.add('current')

      this.setShowVal()

      if (this.itemsLen > 0) {
        for (let _i = 0; _i < this.itemsLen; _i++) {
          const node = this.items[_i]
          node.onclick = ({ target }) => {
            // @ts-ignore
            const current = $(target).closest(`.${this.itemsClass}`)[0]
            const i = current.getAttribute('data-index')
            if (this.currentIndex === +i) return
            this.showDeviation(+i)
          }
        }
      }

      let _speed = !isLast ? this.speed : this.speed - this.switchSpeed
      _speed = _speed > 0 ? _speed : this.switchSpeed

      if (this.rotation && !this.mouseStop) {
        this.timer.carousel = setTimeout(() => {
          this.options.direction === 1 ? this.increment() : this.decrement()
        }, _speed)
      }
    } catch (error) {
      console.log(error)
    }
  }

  showDeviation(i) {
    this.mainTimer && clearTimeout(this.mainTimer)
    this.mainTimer = setTimeout(() => {
      try {
        if (this.animate) return false
        this.animate = true
        this.discernPosition(i)
        this.items[this.currentIndex].classList.remove('current')
        if (Math.abs(this.currentIndex - i) === 1 || Math.abs(this.currentIndex - i) === this.itemsLen - 1) {
          this.mainStyleRotateY += this.deviation * this.position * -1
        } else {
          const middleVal = Math.floor(this.itemsLen / 2)
          if (Math.abs(i - this.currentIndex) > middleVal) {
            let _i = 0
            if (i > this.currentIndex) {
              _i = this.itemsLen - i + this.currentIndex
            } else {
              _i = this.itemsLen - this.currentIndex + i
            }
            this.mainStyleRotateY += this.deviation * _i * this.position * -1
          } else {
            this.mainStyleRotateY += this.deviation * Math.abs(i - this.currentIndex) * this.position * -1
          }
        }

        if (this.mainStyleRotateY > 0) {
          if (this.mainStyleRotateY / (360 - this.cameraPosition.x) >= 1) {
            this.timer.timer1 = setTimeout(() => {
              this.mainStyleRotateY = (this.mainStyleRotateY % (360 - this.cameraPosition.x)) - this.cameraPosition.x
              this.init(false, true)
            }, this.switchSpeed)
          }
        } else {
          if (Math.abs(this.mainStyleRotateY) / (360 + this.cameraPosition.x) >= 1) {
            this.timer.timer2 = setTimeout(() => {
              this.mainStyleRotateY = (this.mainStyleRotateY % (360 + this.cameraPosition.x)) - this.cameraPosition.x
              this.init(false, true)
            }, this.switchSpeed)
          }
        }

        this.currentIndex = Number(i)

        this.items[this.currentIndex].classList.add('current')
        this.init()
        this.options.onChange && this.options.onChange(this.currentIndex)
        this.timer.animate = setTimeout(() => {
          this.animate = false
        }, this.switchSpeed)
      } catch (error) {
        console.log(error)
      }
    }, 100)
  }

  increment() {
    this.showDeviation(this.currentIndex >= this.itemsLen - 1 ? 0 : this.currentIndex + 1)
  }

  decrement() {
    this.showDeviation(this.currentIndex <= 0 ? this.itemsLen - 1 : this.currentIndex - 1)
  }

  setCurrentIndex(index) {
    const _i = index >= this.itemsLen - 1 ? this.itemsLen - 1 : index <= 0 ? 0 : index
    this.showDeviation(_i)
  }

  stopRotation(flag = true) {
    if (this.timer) {
      if (flag) {
        for (const time in this.timer) {
          if (time === 'animate') continue
          this.timer[time] && clearTimeout(this.timer[time])
        }
      } else {
        clearTimeout(this.timer.carousel)
      }
    }
  }

  // 设置样式
  setStyle(element, elementStyle) {
    for (const key in elementStyle) {
      if (key === 'addClassName') {
        element.classList.add(elementStyle[key])
      } else if (key === 'removeClassName') {
        element.classList.remove(elementStyle[key])
      } else {
        element.style[key] = elementStyle[key]
      }
    }
  }

  discernPosition(i, flag = true) {
    const middleVal = Math.floor(this.itemsLen / 2)

    if (this.currentIndex < i && this.currentIndex + middleVal >= i) {
      // right
      flag && (this.position = 1)
      return 1
    } else if (this.currentIndex - i > middleVal) {
      // left
      flag && (this.position = 1)
      return 1
    } else {
      flag && (this.position = -1)
      return -1
    }
  }

  setShowVal() {
    try {
      this.items.forEach(node => {
        this.setStyle(node, {
          opacity: this.options.normalOpacity,
          removeClassName: 'hidden'
        })
      })

      if (this.options.proportion === 0) return

      const _ratio = Math.floor(this.itemsLen * (this.options.proportion / 100))
      const middleVal = Math.floor(this.itemsLen / 2)
      let middleIndex

      if (this.itemsLen % 2 === 0) {
        if (this.currentIndex >= middleVal) {
          middleIndex = this.currentIndex - middleVal
        } else {
          middleIndex = middleVal + this.currentIndex
        }

        this.items.forEach((node, i) => {
          if (middleIndex === 0) {
            if (i <= _ratio || i >= this.itemsLen - _ratio) {
              this.setStyle(node, {
                opacity: 0,
                addClassName: 'hidden'
              })
            } else {
              this.setStyle(node, {
                opacity: this.options.normalOpacity,
                removeClassName: 'hidden'
              })
            }
            return
          }

          if (middleIndex === this.itemsLen - 1) {
            if (i < _ratio || i >= this.itemsLen - _ratio - 1) {
              this.setStyle(node, {
                opacity: 0,
                addClassName: 'hidden'
              })
            } else {
              this.setStyle(node, {
                opacity: this.options.normalOpacity,
                removeClassName: 'hidden'
              })
            }
            return
          }

          if (middleIndex + _ratio >= this.itemsLen) {
            if (i >= middleIndex - _ratio || i <= middleIndex + _ratio - this.itemsLen) {
              this.setStyle(node, {
                opacity: 0,
                addClassName: 'hidden'
              })
            } else {
              this.setStyle(node, {
                opacity: this.options.normalOpacity,
                removeClassName: 'hidden'
              })
            }
            return
          }

          if (middleIndex - _ratio <= 0) {
            if (i <= middleIndex + _ratio || i >= this.itemsLen + middleIndex - _ratio) {
              this.setStyle(node, {
                opacity: 0,
                addClassName: 'hidden'
              })
            } else {
              this.setStyle(node, {
                opacity: this.options.normalOpacity,
                removeClassName: 'hidden'
              })
            }
            return
          }

          if (i >= middleIndex - _ratio && i <= middleIndex + _ratio) {
            this.setStyle(node, {
              opacity: 0,
              addClassName: 'hidden'
            })
          } else {
            this.setStyle(node, {
              opacity: this.options.normalOpacity,
              removeClassName: 'hidden'
            })
          }
        })
      } else {
        if (this.currentIndex < middleVal) {
          middleIndex = [middleVal + this.currentIndex, middleVal + 1 + this.currentIndex]
        } else if (this.currentIndex === middleVal) {
          middleIndex = [0, this.items.length - 1]
        } else {
          middleIndex = [this.currentIndex - middleVal, this.currentIndex - middleVal - 1]
        }
        const [min, max] = middleIndex.sort((a, b) => a - b)

        this.items.forEach((node, i) => {
          if (min === 0 && max === this.itemsLen - 1) {
            if (i <= _ratio || i >= this.itemsLen - 1 - _ratio) {
              this.setStyle(node, {
                opacity: 0,
                addClassName: 'hidden'
              })
            } else {
              this.setStyle(node, {
                opacity: this.options.normalOpacity,
                removeClassName: 'hidden'
              })
            }
            return
          }

          if (min - _ratio <= 0 && max + _ratio < this.itemsLen) {
            if (i <= min || i >= this.itemsLen + min - _ratio || i <= max + _ratio) {
              this.setStyle(node, {
                opacity: 0,
                addClassName: 'hidden'
              })
            } else {
              this.setStyle(node, {
                opacity: this.options.normalOpacity,
                removeClassName: 'hidden'
              })
            }
            return
          }

          if (max + _ratio >= this.itemsLen && min - _ratio > 0) {
            if (i >= max || i <= max + _ratio - this.itemsLen || (i <= min && i >= min - _ratio)) {
              this.setStyle(node, {
                opacity: 0,
                addClassName: 'hidden'
              })
            } else {
              this.setStyle(node, {
                opacity: this.options.normalOpacity,
                removeClassName: 'hidden'
              })
            }

            return
          }

          if (i >= min - _ratio && i <= max + _ratio) {
            this.setStyle(node, {
              opacity: 0,
              addClassName: 'hidden'
            })
          } else {
            this.setStyle(node, {
              opacity: this.options.normalOpacity,
              removeClassName: 'hidden'
            })
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  destroy() {
    this.stopRotation()
    // @ts-ignore
    ;(this.options = null), (this.el = null), (this.rotation = null)
    // @ts-ignore
    ;(this.speed = null), (this.itemsClass = null), (this.currentIndex = null)
    // @ts-ignore
    ;(this.switchSpeed = null), (this.items = null), (this.itemsLen = null)
    // @ts-ignore
    ;(this.currentNode = null), (this.deviation = null), (this.mainStyleRotateY = null)
    // @ts-ignore
    ;(this.cameraPosition = null), (this.allAlongpositive = null), (this.position = null)
    // @ts-ignore
    ;(this.timer = null), (this.animate = false), (this.mouseStop = null)
  }
}
