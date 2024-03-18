import React, { useMemo, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

const DesignBarrageItem = forwardRef((props: any, ref: any) => {
  const {
    data,
    barrageItemHeight,
    barrageStyle,
    speed,
    rowIndex,
    rowSortNums,
    isRowLast,
    rowLastStart,
    rowLoopStart,
    barrageClick
  } = props

  const itemRef = useRef<any>(null)
  const step = useRef(0)
  const moveState = useRef({
    current: false,
    last: false
  })

  const timer: any = useRef(null)
  const itemStyle = useMemo(() => {
    const { fontSize, barrageTextStyle } = barrageStyle
    const randomIndex = Math.floor(Math.random() * barrageTextStyle.length)
    const _barrageStyle = barrageTextStyle[randomIndex],
      { textStyle, ShadowConfig } = _barrageStyle
    const style = {
      height: barrageItemHeight,
      left: '100%',
      top: barrageItemHeight * rowIndex,
      fontSize,
      ...textStyle
    }
    if (ShadowConfig.display) {
      style.textShadow = `${ShadowConfig.xOffset}px ${ShadowConfig.yOffset}px ${ShadowConfig.vague}px ${ShadowConfig.color}`
    }
    return style
  }, [barrageItemHeight, rowIndex, JSON.stringify(barrageStyle)])

  useImperativeHandle(ref, () => ({
    wrap: itemRef,
    cancelAnimate,
    barrageStart,
    id: data.id,
    rowSortNums,
    rowIndex,
    moveState: moveState.current
  }))

  function barrageAnimate() {
    if (itemRef.current) {
      move()
      if (Math.abs(step.current) < itemRef.current.offsetWidth + itemRef.current.offsetLeft) {
        moveState.current.current = true
        timer.current = requestAnimationFrame(function () {
          barrageAnimate()
        })
      } else {
        step.current = 0
        itemRef.current.style.transform = 'translateX(' + 0 + 'px)'
        itemRef.current.style.webkitTransform = 'translateX(' + 0 + 'px)'
        cancelAnimate()
        isRowLast && rowLoopStart(rowIndex)
      }

      if (!moveState.current.last && !isRowLast && Math.abs(step.current) > itemRef.current.offsetWidth) {
        rowLastStart(rowIndex, rowSortNums, {
          callback: () => {
            moveState.current.last = true
          }
        })
      }
    }
  }

  function cancelAnimate() {
    moveState.current.current = false
    moveState.current.last = false
    cancelAnimationFrame(timer.current)
  }

  function move() {
    const nextStep = step.current - speed
    step.current = nextStep
    itemRef.current.style.transform = 'translateX(' + nextStep + 'px)'
    itemRef.current.style.webkitTransform = 'translateX(' + nextStep + 'px)'
  }

  useEffect(() => {
    rowSortNums === 1 && barrageStart()
    return () => {
      cancelAnimate()
    }
  }, [])

  function barrageStart() {
    cancelAnimate()
    barrageAnimate()
  }
  return (
    <div className='barrage-item' ref={itemRef} style={itemStyle}>
      <span onClick={() => barrageClick(data.text)}>{data.text}</span>
    </div>
  )
})

DesignBarrageItem.displayName = 'designBarrageItem'
export default DesignBarrageItem
