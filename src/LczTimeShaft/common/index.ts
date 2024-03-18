import { CSSProperties } from 'react'
import { colorFunc } from '../../common/util'
import { ShaftMoveLabel, ShaftTextStyle, TimeShaftDataMap } from '../type'

const addPX = ['fontSize', 'letterSpacing']
export const setStyle = (target: HTMLElement, style: CSSProperties = {}) => {
  if (target.nodeType === 1) {
    for (const name in style) {
      let value = style[name]
      if (addPX.includes(name)) {
        value = value + 'px'
      }
      target.style[name] = value
    }
  }
}

export const filterShaftData = (data: TimeShaftDataMap[]) => {
  return data.reduce(
    (t: TimeShaftDataMap[], v: TimeShaftDataMap) => (
      !t.find(item => item.id === String(v.id)) && v.id && t.push({ id: String(v.id), text: String(v.text) }), t
    ),
    []
  ) as TimeShaftDataMap[]
}

export const getDomSzie = (style: ShaftTextStyle, text: string) => {
  const span = document.createElement('span')
  span.innerHTML = text
  setStyle(span, style)
  span.style.display = 'inline-block'
  const body = document.body
  body.appendChild(span)
  const containerHeight = span.offsetHeight
  const containerWidth = span.offsetWidth
  body.removeChild(span)

  return { containerHeight, containerWidth }
}

export const getMoveTextStyle = (
  mode: string,
  progressSize: number,
  containerHeight: number,
  containerWidth: number,
  shaftMoveLabel: ShaftMoveLabel
) => {
  const { backgroundFrame, yOffset } = shaftMoveLabel
  const cssStyle: CSSProperties = {}
  if (mode == 'horizontal') {
    cssStyle.top = -containerHeight + 'px'
    cssStyle.left = `calc(var(--progressFillWidth) - ${containerWidth / 2}px)`
    cssStyle.transform = `translate(0px, ${yOffset}px)`
  } else {
    cssStyle.top = `calc(var(--progressFillWidth) - ${containerHeight / 2}px)`
    cssStyle.left = progressSize + 'px'
    cssStyle.transform = `translate( ${yOffset}px,0px)`
  }
  if (backgroundFrame.display) {
    const { size } = backgroundFrame,
      { top, bottom, left, right } = size
    cssStyle.padding = `${top}px ${right}px ${bottom}px ${left}px`
    cssStyle.borderRadius = backgroundFrame.radius + 'px'
    if (mode == 'horizontal') {
      cssStyle.top = -(containerHeight + top + bottom) + 'px'
      cssStyle.left = `calc(var(--progressFillWidth) - ${(containerWidth + left + right) / 2}px)`
    } else {
      cssStyle.top = `calc(var(--progressFillWidth) - ${(containerHeight + left + right) / 2}px)`
    }
    if (backgroundFrame.backgroundImg) {
      cssStyle.backgroundImage = `url(${backgroundFrame.backgroundImg})`
    } else {
      cssStyle.background = colorFunc(backgroundFrame.backgroundColor).color
    }
  }

  return cssStyle
}
