import React, { CSSProperties, memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import LczComCon from '../common/LczComCon'
import { alignType, numberIsEmpty, setStyle } from '../common/util'
import { usePageHide, useSyncState } from '../common/hooks'
import { SectionStyle } from '../LczNumberFlop/type'
import { alignmentStyle, formatData } from './common'
import {
  defaultFontStyle,
  defaultGlobalConfig,
  defaultHoverFontStyle,
  defaultMaskStyle,
  defaultNumberhoverStyle,
  defaultNumberStyle
} from './common/defaultValue'
import StateItem from './components/StateItem'
import { StateCardWrapper } from './style'
import { AnimateTimer, DataMap, StateCardProps } from './type'
import Pager from './components/Pager'
import { PagerConfig } from '../LczScrollPage/type'

export default memo(function LczStateCard(props: StateCardProps) {
  const {
    w = 0,
    h = 0,
    globalConfig = defaultGlobalConfig,
    fontStyle = defaultFontStyle,
    hoverFontStyle = defaultHoverFontStyle,
    numberStyle = defaultNumberStyle,
    numberHoverStyle = defaultNumberhoverStyle,
    markStyle = defaultMaskStyle,
    stateCategory = [],
    data = [],
    onClick
  } = props
  const {
    alignmentType = 'lt',
    ArrangementMode = 'portrait',
    horizontalNumber = 3,
    portraitNumber = 3,
    overflow,
    horiSpeed = 0,
    portSpeed = 0,
    animateConfig
  } = globalConfig

  const { animate, pager = {} as PagerConfig } = animateConfig || {}

  const [dataList, setDataList] = useSyncState<DataMap[][]>([]),
    [currentIndex, setCurrentIndex] = useSyncState<number>(0),
    listRef = useRef<HTMLDivElement>(null),
    timerStatus = useRef<AnimateTimer>({ carouselTimer: undefined, reductionTimer: undefined, mouseStatus: false })

  // 页面显示隐藏触发轮播
  const clearFn = usePageHide(
    () => controlAnimateHander('start'),
    () => controlAnimateHander('stop')
  )

  // 卡片常量
  const cardConstants = useMemo(() => {
    const isPortrait = ArrangementMode === 'portrait', // 是否是纵向
      xGap = isPortrait ? horiSpeed : portSpeed, // 列表水平间隔
      yGap = isPortrait ? portSpeed : horiSpeed, // 列表垂直间隔
      SWITCHTIMER = (animate?.switchSpeed || 0) + 100 // 动画复原时间

    let positiveRotation = true // 是否正轮播

    if (isPortrait) {
      if (alignmentType === 'rt' || alignmentType === 'rb') positiveRotation = false
    } else {
      if (alignmentType === 'lb' || alignmentType === 'rb') positiveRotation = false
    }

    return { isPortrait, xGap, yGap, SWITCHTIMER, positiveRotation }
  }, [ArrangementMode, horiSpeed, portSpeed, animate?.switchSpeed, alignmentType])

  // 处理数据
  const initDataList = useMemo(() => {
    const _data = formatData<DataMap>(data, cardConstants.isPortrait, portraitNumber, horizontalNumber, {
      status: 'string',
      name: 'string'
    })

    return _data
  }, [JSON.stringify(data), cardConstants.isPortrait, horizontalNumber, portraitNumber])

  // 处理轮播动画
  useEffect(() => {
    initDataList && setDataList(initDataList)
    if (overflow === 'animate') {
      syncPagerCurrentIndex({ i: 0 })
      setTimeout(() => initAnimate())
    } else {
      clearFn.current && clearFn.current()
    }

    return () => {
      clearTimer()
      clearFn.current && clearFn.current()
    }
  }, [w, h, JSON.stringify(data), pager.display, horizontalNumber, portraitNumber, overflow, JSON.stringify(animate), cardConstants])

  const styles = useMemo(() => {
    const mfontStyle = { ...fontStyle }
    delete mfontStyle.showWidth
    delete mfontStyle.textAlign

    const wrapper: CSSProperties = {
      ...alignmentStyle[alignmentType],
      gap: cardConstants.xGap
    }
    const text: CSSProperties = { ...mfontStyle }
    const num: CSSProperties = { ...numberStyle.fontStyle }
    const numSuffix: CSSProperties = {
      ...numberStyle.suffix?.fontStyle,
      transform: `translateY(${numberStyle.suffix?.yOffset}px)`
    }

    // wrapper
    if (overflow === 'scroll') {
      wrapper.maxWidth = '100%'
      wrapper.maxHeight = '100%'
    }

    // text
    if (numberIsEmpty(fontStyle.showWidth)) {
      text.width = fontStyle.showWidth
      text.justifyContent = alignType[fontStyle.textAlign || 'left']
      text.overflow = 'hidden'
    }

    if (numberStyle.display) {
      if (numberIsEmpty(numberStyle.showWidth)) {
        num.width = numberStyle.showWidth
        num.justifyContent = alignType[numberStyle.textAlign || 'left']
        num.overflow = 'hidden'
      }
    }

    return { wrapper, text, num, numSuffix }
  }, [JSON.stringify(fontStyle), alignmentType, cardConstants.xGap, overflow, JSON.stringify(numberStyle)])

  // 获取icon状态
  const getItemStateCategory = useCallback(
    (item: DataMap) => {
      if (stateCategory.length === 0) return markStyle.normalMaskStyle
      const { status } = item
      const findArr = stateCategory.filter(v => v.state === status)
      if (findArr.length === 0) return markStyle.normalMaskStyle
      return findArr[findArr.length - 1]
    },
    [JSON.stringify(stateCategory), JSON.stringify(markStyle.normalMaskStyle)]
  )

  // 获取数值样式区间
  const getNumberSectionStyle = useCallback(
    (val: number) => {
      const sectionStyle = numberStyle.sectionStyle || [],
        css: CSSProperties = {}
      let findStyle: SectionStyle | undefined

      sectionStyle.forEach(item => {
        if (item.min <= val && item.max >= val) {
          findStyle = item
        }
      })

      if (findStyle) {
        css.fontWeight = findStyle.fontWeight
        if (findStyle.colorConfig.display) css.color = findStyle.colorConfig.color
      }

      return css
    },
    [JSON.stringify(numberStyle.sectionStyle)]
  )

  // 清空动画定时器
  const clearTimer = (flag = true) => {
    for (const key in timerStatus.current) {
      if (key === 'mouseStatus') continue
      const timerId = timerStatus.current[key]
      if (key === 'reductionTimer') {
        flag && timerId && clearInterval(timerId)
        continue
      }
      timerId && clearTimeout(timerId)
    }
  }

  // 初始化动画
  const initAnimate = () => {
    clearTimer()
    if (overflow === 'animate' && animate?.updataNum && listRef.current) {
      setStyle(listRef.current, {
        transition: 'none',
        transform: 'none'
      })

      switch (ArrangementMode) {
        case 'horizontal': {
          const listHeight = $(listRef.current).innerHeight() || 0
          if (listHeight <= h) return false
          break
        }
        case 'portrait': {
          const listWidth = $(listRef.current).innerWidth() || 0
          if (listWidth <= w) return false
          break
        }
      }
      const timeInterval = animate?.timeInterval || 3,
        interval = timeInterval * 1000 + cardConstants.SWITCHTIMER
      timerStatus.current.carouselTimer = setInterval(() => {
        scrollUp()
      }, interval)
    }
  }

  // 滑动动画
  const scrollUp = () => {
    if (!listRef.current || !animate?.updataNum) return

    // 第一步 计算滚动长度 并滚动
    const dataLen = initDataList.length,
      updataNum = animate.updataNum > dataLen ? dataLen : animate.updataNum,
      { isPortrait, xGap, positiveRotation } = cardConstants,
      listChildren = (Array.from(listRef.current.children) || []) as HTMLElement[],
      itemGap = xGap
    let scrollLen = updataNum * itemGap

    for (let i = 0; i < updataNum; i++) {
      const childIndex = positiveRotation ? i : dataLen - i - 1,
        jqItem = $(listChildren[childIndex]),
        itemWidth = isPortrait ? jqItem.innerWidth() : jqItem.innerHeight()
      scrollLen += itemWidth
    }

    const newList = [...dataList.current]
    if (positiveRotation) {
      const scrollList = newList.slice(0, updataNum)
      newList.push(...scrollList)
    } else {
      const scrollList = newList.slice(-updataNum)
      newList.unshift(...scrollList)
    }
    setDataList(newList)

    const listAnimateSwitchtransition = animate?.switchSpeed ? `transform ${animate.switchSpeed}ms linear` : 'none'
    setStyle(listRef.current, {
      transition: listAnimateSwitchtransition,
      transform: `translate${isPortrait ? 'X' : 'Y'}(${scrollLen * (positiveRotation ? -1 : 1)}px)`
    })

    // 第二步  剪切数据重置数据 和滑动距离
    timerStatus.current.reductionTimer = setTimeout(() => {
      if (listRef.current) {
        setStyle(listRef.current, {
          transition: 'none',
          transform: 'none'
        })

        const newList = [...dataList.current]
        if (positiveRotation) {
          newList.splice(0, updataNum)
        } else {
          newList.splice(-updataNum)
        }

        // 让数据同步进入 ReactDom.unstable_batchedUpdates 中 可减少一次渲染
        syncPagerCurrentIndex({ newData: newList, fn: () => setDataList(newList) })
      }
    }, cardConstants.SWITCHTIMER - 50)
  }

  function controlAnimateHander(type: 'enter' | 'leave' | 'start' | 'stop') {
    if (overflow !== 'animate' || !animate?.updataNum || !animate.movePause) {
      timerStatus.current.mouseStatus = false
      return false
    }

    switch (type) {
      case 'enter':
      case 'stop': {
        clearTimer(false)
        type === 'enter' && (timerStatus.current.mouseStatus = true)
        break
      }
      case 'leave':
      case 'start': {
        initAnimate()
        type === 'leave' && (timerStatus.current.mouseStatus = false)
        break
      }
    }
  }

  // 切换分页下标
  function syncPagerCurrentIndex({ newData, i, fn }: { newData?: DataMap[][]; i?: number; fn?: any } = {}) {
    const data = newData || dataList.current,
      dataLen = data.length

    if (!dataLen) return false
    let index: number
    if (i === undefined) {
      if (!cardConstants.positiveRotation) {
        index = data[dataLen - 1][0].__index || 0
        index = dataLen - index - 1
      } else {
        index = data[0][0].__index || 0
      }
    } else {
      index = i
    }

    // 将setState 放在这里 可以减少state 更新次数
    unstable_batchedUpdates(() => {
      fn && fn()
      pager?.display && setCurrentIndex(index)
    })
  }

  function pagerHandlerClick(index: number) {
    if (index === currentIndex.current) return false
    clearTimer()
    const nowData = [...initDataList]
    if (cardConstants.positiveRotation) {
      const hideList = nowData.splice(0, index)
      nowData.push(...hideList)
    } else {
      const hideList = nowData.splice(-index)
      nowData.unshift(...hideList)
    }

    // 让数据同步进入 ReactDom.unstable_batchedUpdates 中 可减少一次渲染
    syncPagerCurrentIndex({ newData: nowData, i: index, fn: () => setDataList(nowData) })
    !timerStatus.current.mouseStatus && initAnimate()
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <StateCardWrapper
        globalConfig={globalConfig}
        hoverFontStyle={hoverFontStyle}
        markStyle={markStyle}
        numberHoverStyle={numberHoverStyle}
        className='lcz-state-card-wrapper'
        onMouseEnter={controlAnimateHander.bind(null, 'enter')}
        onMouseLeave={controlAnimateHander.bind(null, 'leave')}>
        <div className='lcz-state-card-container'>
          <div className='lcz-state-card-ul-box' ref={listRef} style={{ ...styles.wrapper }}>
            {dataList.current.map((item, index) => {
              return (
                <ul className='lcz-state-card-item' key={index} style={{ gap: cardConstants.yGap }}>
                  {item.map((it, i) => (
                    <StateItem
                      key={i}
                      itemData={it}
                      markStyle={markStyle}
                      style={styles}
                      numberStyle={numberStyle}
                      onClick={onClick}
                      getItemStateCategory={getItemStateCategory}
                      getNumberSectionStyle={getNumberSectionStyle}
                    />
                  ))}
                </ul>
              )
            })}
          </div>
        </div>
        {overflow === 'animate' && pager?.display && initDataList.length > 0 && (
          <Pager
            len={initDataList.length}
            pager={pager}
            arrangementMode={ArrangementMode}
            currentIndex={currentIndex.current}
            positiveRotation={cardConstants.positiveRotation}
            onClick={pagerHandlerClick}
          />
        )}
      </StateCardWrapper>
    </LczComCon>
  )
})
