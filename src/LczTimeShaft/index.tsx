import React, { memo, useRef, useState } from 'react'
import { usemEffect } from '../common/hooks'
import LczComCon from '../common/LczComCon'
import { filterShaftData } from './common'
import { defaultControllerConfig, defaultShaftGlobalConfig } from './common/defaultValue'
import BottomTextLabel from './components/BottomTextLabel'
import MoveTextLabel from './components/MoveTextLabel'
import { ShaftWrapper } from './style'
import { TimeShaftDataMap, TimeShaftProps } from './type'

export default memo(function LczTimeShaft(props: TimeShaftProps) {
  const {
      shaftGlobalConfig = defaultShaftGlobalConfig,
      controllerConfig = defaultControllerConfig,
      data = [],
      onClick,
      onChange
    } = props,
    { mode, labelSpace, shaftTextLabel, shaftMoveLabel, timeShaftMain } = shaftGlobalConfig,
    { progressCursor, loopPlay, autoPlay, duration } = controllerConfig

  const timeFill = useRef<any>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const fillStep = useRef<number>(0)
  const moveTextRef = useRef<any>(null)
  const progressWidth = useRef<number>(0)
  const dataWrapRef = useRef<TimeShaftDataMap[]>([])
  const [dataWrap, setDataWarp] = useState<TimeShaftDataMap[]>([])
  const [btnStatus, setBtnStatus] = useState<boolean>(false)
  const upDateRef = useRef<NodeJS.Timeout | null>(null)
  const timeRef = useRef<NodeJS.Timeout | null>(null)

  usemEffect(() => {
    timeRef.current && clearTimeout(timeRef.current)
    upDateRef.current && clearTimeout(upDateRef.current)
    upDateRef.current = setTimeout(() => {
      if (data.length) {
        const filterData = filterShaftData(data)
        setDataWarp(filterData)
        dataWrapRef.current = filterData
        progressWidth.current = (filterData.length - 1) * labelSpace
        const index = filterData.findIndex(v => v.id == controllerConfig.active.value)
        if (controllerConfig.active.value && index !== -1 && progressRef.current) {
          fillStep.current = labelSpace * index
          progressRef.current.style.setProperty('--progressFillWidth', labelSpace * index + 'px')
          moveTextRef.current && moveTextRef.current.setMoveTextData(filterData[index])
          onChange && onChange(filterData[index])
        } else {
          moveTextRef.current && moveTextRef.current.setMoveTextData(filterData[0])
          onChange && onChange(filterData[0])
        }
        if (autoPlay) {
          barrageAnimateforBtn()
        }
      } else {
        setDataWarp([])
      }
    }, 100)
    return () => {
      cancelAnimate()
      fillStep.current = 0
      progressRef.current && progressRef.current.style.setProperty('--progressFillWidth', 0 + 'px')
    }
  }, [props])

  function getCurrentData(currentWidth: number) {
    let currentItemIndex = 0
    if (currentWidth !== 0) currentItemIndex = Math.floor(currentWidth / labelSpace)
    return dataWrapRef.current[currentItemIndex]
  }

  function barrageAnimateforBtn() {
    setBtnStatus(true)
    barrageAnimate()
  }

  function barrageAnimate() {
    move()
    if (fillStep.current < progressWidth.current) {
      timeFill.current = requestAnimationFrame(function () {
        barrageAnimate()
      })
    } else {
      timeRef.current && clearTimeout(timeRef.current)
      timeRef.current = setTimeout(() => {
        fillStep.current = 0
        progressRef.current && progressRef.current.style.setProperty('--progressFillWidth', 0 + 'px')
        if (loopPlay) {
          barrageAnimate()
        } else {
          cancelAnimate()
        }
        if (shaftMoveLabel.display) {
          moveTextRef.current.setMoveTextData(dataWrapRef.current[0])
        }
        onChange && onChange(dataWrapRef.current[0])
      }, 200)
    }
  }

  function move() {
    if (progressRef.current && progressWidth.current && duration) {
      const speed = progressWidth.current / ((duration * 1000) / 17)
      const nextStep = fillStep.current + speed
      const lastStep = fillStep.current
      fillStep.current = nextStep
      progressRef.current.style.setProperty('--progressFillWidth', nextStep + 'px')
      const _lastData = getCurrentData(lastStep)
      const _data = getCurrentData(nextStep)
      if (shaftMoveLabel.display) {
        moveTextRef.current.setMoveTextData(_data)
      }
      _data.id !== _lastData.id && onChange && onChange(_data)
    }
  }

  function cancelAnimate() {
    setBtnStatus(false)
    timeFill.current && cancelAnimationFrame(timeFill.current)
  }

  function warpEvent(data: TimeShaftDataMap) {
    onClick && onClick(data)
    onChange && onChange(data)
  }

  function onProgressClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    cancelAnimate()
    if (progressRef.current) {
      const { x, y, width, height } = progressRef.current.getBoundingClientRect()
      const scale = mode == 'horizontal' ? width / progressWidth.current : height / progressWidth.current
      const clickX = Math.round(Math.max(e.pageX - x, 0) / scale)
      const clickY = Math.round(Math.max(e.pageY - y, 0) / scale)
      const translateDistance = mode == 'horizontal' ? clickX : clickY
      fillStep.current = translateDistance
      progressRef.current.style.setProperty('--progressFillWidth', translateDistance + 'px')
      const _data = getCurrentData(translateDistance)
      moveTextRef.current.setMoveTextData(_data)
      warpEvent(_data)

      if (autoPlay) {
        setTimeout(() => {
          barrageAnimateforBtn()
        }, 100)
      }
    }
  }

  const progressStyle: any = { '--signSize': progressCursor.size.width / 2 + 'px' }

  function onItemClick(index: number, data: TimeShaftDataMap) {
    cancelAnimate()
    const currentWidth = index * labelSpace
    fillStep.current = currentWidth
    if (progressRef.current) {
      progressRef.current.style.setProperty('--progressFillWidth', currentWidth + 'px')
    }
    moveTextRef.current.setMoveTextData(data)
    warpEvent(data)
  }

  function onBtnClick(status: boolean) {
    if (status) {
      cancelAnimate()
    } else {
      barrageAnimateforBtn()
    }
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      {dataWrap.length ? (
        <ShaftWrapper
          className='time-shaft-wrapper'
          shaftGlobalConfig={shaftGlobalConfig}
          controllerConfig={controllerConfig}
          progressWidth={(dataWrap.length - 1) * labelSpace}
          btnStatus={btnStatus}>
          <div className='time-shaft-playbtn' onClick={() => onBtnClick(btnStatus)}></div>
          <div
            className='time-shaft-progress'
            ref={progressRef}
            style={progressStyle}
            onClick={e => onProgressClick(e)}>
            {shaftMoveLabel.display && (
              <MoveTextLabel
                ref={ref => {
                  moveTextRef.current = ref
                }}
                progressSize={timeShaftMain.height}
                mode={mode}
                shaftMoveLabel={shaftMoveLabel}
              />
            )}
            <div className='time-shaft-fill' />
            <div className='time-shaft-cursor-img' />
            <div className='time-shaft-bottom-text'>
              {shaftTextLabel.display &&
                dataWrap.map((item, index) => (
                  <BottomTextLabel
                    key={item.id}
                    mode={mode}
                    labelSpace={labelSpace}
                    index={index}
                    data={item}
                    shaftTextLabel={shaftTextLabel}
                    onItemClick={onItemClick}
                  />
                ))}
            </div>
          </div>
        </ShaftWrapper>
      ) : null}
    </LczComCon>
  )
})
