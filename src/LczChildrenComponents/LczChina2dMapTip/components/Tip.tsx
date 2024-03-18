import React, { memo, useMemo, cloneElement, CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import { getColorObj } from '../../../common/util'
import { FreeStyle, PromptBoxStyle, LineContent } from '../../../LczChina2dMap/type/child'
import { getTipFreePosition } from '../common'
import TipItem from './TipItem'

interface TipProps {
  wrapper?: HTMLElement
  id: string
  w: number
  h: number
  reversion: boolean
  itemData: any
  projectionPath: {
    center: any
    projection: any
    path: any
  }
  promptBox: PromptBoxStyle
  size?: {
    width: number
    height: number
  }
  lineContent: LineContent[]
  promptBoxHandlerEvent: (type: 'mouseenter' | 'mouseleave', param: any) => void
}

export default memo(function Tip(props: TipProps) {
  const {
    id,
    reversion = false,
    wrapper,
    itemData,
    projectionPath,
    promptBox,
    lineContent = [],
    size = { width: 188, height: 145 },
    w,
    h,
    promptBoxHandlerEvent
  } = props
  const { lat, lng } = itemData

  const { fixed, fixedSeat, fixedPadd, fixedBgConfig, fixedBorder } = promptBox

  const styleMemo = useMemo(() => {
    let _seat: any = {}
    let padd: any = {}
    let bg: any = {}
    let border: any = {}
    const _obj: CSSProperties = { width: size?.width, height: size?.height }
    if (fixed) {
      _seat = fixedSeat
      padd = fixedPadd
      bg = fixedBgConfig
      border = fixedBorder
    } else {
      const [x, y] = projectionPath.projection([lng, lat])
      const { left, top, type } = getTipFreePosition({ width: w, height: h }, size, { x, y })
      const config = promptBox?.[type] as FreeStyle
      _seat.x = left + (config?.seat?.x || 0)
      _seat.y = top + (config?.seat?.y || 0)
      padd = config.padd
      bg = config.bgConfig
      border = config.border
    }

    _obj.left = _seat?.x
    _obj.top = _seat?.y
    _obj.padding = `${padd?.t}px ${padd?.r}px ${padd?.b}px ${padd?.l}px`
    border?.display && (_obj.border = `${border.width}px solid ${border.color}`)
    if (bg?.color) {
      const { color, colorType } = getColorObj(bg?.color)
      colorType === 'single' ? (_obj.backgroundColor = color) : (_obj.background = `linear-gradient(${color})`)
    }
    bg?.imgUrl && (_obj.backgroundImage = `url(${bg?.imgUrl})`)
    return _obj
  }, [JSON.stringify(itemData), JSON.stringify(promptBox), JSON.stringify(size), projectionPath])

  const Container = useMemo(() => {
    if (!lineContent.length) return null
    return lineContent.map((item, i) => (
      <TipItem key={i} id={id} expPathArr={[`lineContent[${i}]`]} itemData={itemData} item={item} />
    ))
  }, [JSON.stringify(lineContent), JSON.stringify(itemData)])

  const Jsx = (
    <div
      className='lcz-china-map-tip'
      style={styleMemo}
      onMouseEnter={() => promptBoxHandlerEvent('mouseenter', itemData)}
      onMouseLeave={() => promptBoxHandlerEvent('mouseleave', itemData)}>
      <ul>{Container}</ul>
    </div>
  )

  if (fixed && wrapper) {
    return ReactDOM.createPortal(Jsx, wrapper)
  }

  return <>{cloneElement(Jsx, { className: `lcz-china-map-tip no-fixed ${reversion ? 'reversion' : ''}` })}</>
})
