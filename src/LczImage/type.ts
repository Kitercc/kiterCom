import { CSSProperties } from 'react'
import { FilterConfig } from '../LczVideo/type'

export interface FillColor {
  display: boolean
  color?: any
}

export interface ImageConfig {
  type?: string // 图片类型 bitmap 位图  vector 矢量图
  url?: string //  图片地址
  fillColor?: FillColor // 矢量图 填充颜色
  repeat?: string // 图片重复
  radius?: number // 圆角
  mixBlendMode?: CSSProperties['mixBlendMode']
  opacity: number
  rotate?: Rotate
}

export interface Rotate {
  display: boolean
  rotateX: number
  rotateY: number
  rotateZ: number
}
export interface Scale {
  display: boolean
  scaleX: number
  scaleY: number
}

export interface Translate {
  display: boolean
  translateX: number
  translateY: number
}
export interface KeyFrame {
  duration: number
  opacity: number
  rotate?: Rotate
  scale?: Scale
  translate?: Translate
}

export interface AnimationConfig {
  display: boolean
  delayed: number //延时
  loop: boolean //循环
  interval: number //间隔
  animationType: 'opacity' | 'scale' | 'clockwise' | 'anticlockwise' | 'backrotation' | 'custom' // 透明度、缩放、顺时针旋转、逆时针旋转、回旋转、自定义
  // 非自定义
  duration?: number //动画时长
  speed?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' // 匀速 慢快慢 低速开始 低速结束 低速开始和结束
  // 自定义
  keyFrame?: KeyFrame[]
}

export interface LczImageProps {
  imgconfig?: ImageConfig
  animation?: AnimationConfig
  filter?: FilterConfig
  data?: any
  onClick?: any // 单击
}
