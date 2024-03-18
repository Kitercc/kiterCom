import React, { useMemo, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

const PreviewBarrageItem = forwardRef((props: any, ref: any) => {
  const {
    w: containerW,
    data,
    rowIndex,
    barrageItemHeight,
    speed,
    rowSortNums,
    barrageStyle,
    dataWidthArrRef,
    rowLastStart,
    rowLoopStart,
    barrageClick,
    removeWaitItem
  } = props

  const itemWidth = dataWidthArrRef[data.text]

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
    barrageAnimate,
    cancelAnimate,
    barrageStart,
    barrageStop,
    data,
    rowSortNums,
    rowIndex,
    moveState: moveState.current
  }))

  function barrageAnimate() {
    if (itemRef.current) {
      move()
      if (Math.abs(step.current) < itemWidth + containerW) {
        moveState.current.current = true
        timer.current = requestAnimationFrame(function () {
          barrageAnimate()
        })
      } else {
        step.current = 0
        itemRef.current.style.transform = 'translateX(' + 0 + 'px)'
        itemRef.current.style.webkitTransform = 'translateX(' + 0 + 'px)'
        cancelAnimate()
        removeWaitItem(data)
        rowLoopStart(data.id, rowIndex)
      }

      if (!moveState.current.last && Math.abs(step.current) > itemWidth) {
        rowLastStart(data.id, rowIndex, {
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
    rowSortNums === 1 && barrageAnimate()
    return () => {
      cancelAnimate()
    }
  }, [rowSortNums])

  function barrageStop() {
    timer.current && cancelAnimationFrame(timer.current)
  }
  function barrageStart() {
    moveState.current.current && barrageAnimate()
  }
  return (
    <div className='barrage-item' ref={itemRef} style={itemStyle}>
      <span onClick={() => barrageClick(data.text)}>{data.text}</span>
    </div>
  )
})

PreviewBarrageItem.displayName = 'previewBarrageItem'
export default PreviewBarrageItem
