import React, { CSSProperties, Fragment, memo, useMemo, useRef } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { useSyncState, usePageHide, usemEffect } from '../common/hooks'
import LczComCon from '../common/LczComCon'
import { alignType, findChildCom, getChildCompArr, getColorObj, randomChar, setStyle } from '../common/util'
import Arrow from '../LczCarouselIframe/components/Arrow'
import Pager from '../LczStateCard/components/Pager'
import { AnimateTimer } from '../LczStateCard/type'
import { formatCardListData } from './common'
import CardItem from './components/CardItem'
import { LczCardListWrapper } from './style'
import { CardListProps } from './type'
import { OutCardContainer } from './type/child'

export default memo(function LczCardList(props: CardListProps) {
  const { w = 0, h = 0, globalConfig, cardStyle, childComponents = [], data = [], onClick } = props,
    {
      arrangementMode = 'portrait',
      horizontalNumber = 3,
      portraitNumber = 3,
      overflow = 'hidden',
      horiOverflow = 'left',
      portOverflow = 'top',
      horiSpeed = 0,
      portSpeed = 0,
      animateConfig
    } = globalConfig || {},
    { animate, pager, arrowConfig } = animateConfig || {},
    cardIsAnimate = overflow === 'animate'

  const [cardData, setCardData] = useSyncState<any[][]>([]),
    [currentIndex, setCurrentIndex] = useSyncState<number>(0),
    listRef = useRef<HTMLDivElement>(null),
    timerStatus = useRef<AnimateTimer>({ carouselTimer: undefined, reductionTimer: undefined, mouseStatus: false }),
    scrollInfo = useRef({ scrollW: 0, updataLen: 0 })

  // 页面显示隐藏触发轮播
  const clearFn = usePageHide(
    () => controlAnimateHander('start'),
    () => controlAnimateHander('stop')
  )

  // 容器子组件
  const cardContainer = useMemo(() => {
    return getChildCompArr(childComponents, 'lcz-card-list-container') as OutCardContainer[]
  }, [findChildCom(childComponents, 'lcz-card-list-container')])

  // 卡片常量
  const cardConstants = useMemo(() => {
    const isPortrait = arrangementMode === 'portrait', // 是否是纵向
      xGap = isPortrait ? horiSpeed : portSpeed, // 列表水平间隔
      yGap = isPortrait ? portSpeed : horiSpeed, // 列表垂直间隔
      showNum = isPortrait ? horizontalNumber : portraitNumber,
      SWITCHTIMER = (animate?.switchSpeed || 0) + 100, // 动画复原时间
      startAgained = !animate?.display || animate?.animatConnect === 'startAgain'

    const { scrollItemLen, updataNum } = (() => {
      const dataLen = formatCardListData(data, isPortrait, horizontalNumber, portraitNumber).length,
        { updataNum = 1 } = animate || {},
        _updataNum = !startAgained ? (updataNum > dataLen ? dataLen : updataNum) : 1,
        width = (w - horiSpeed * (horizontalNumber - 1)) / horizontalNumber,
        height = (h - portSpeed * (portraitNumber - 1)) / portraitNumber

      let scrollLen = _updataNum * xGap
      for (let i = 0; i < _updataNum; i++) {
        const itemWidth = isPortrait ? width : height
        scrollLen += Number(itemWidth || 0)
      }
      return { scrollItemLen: scrollLen, updataNum: _updataNum }
    })()

    return { isPortrait, xGap, yGap, showNum, SWITCHTIMER, startAgained, scrollItemLen, updataNum }
  }, [
    w,
    h,
    arrangementMode,
    horiSpeed,
    portSpeed,
    horizontalNumber,
    portraitNumber,
    JSON.stringify(animate),
    JSON.stringify(data)
  ])

  // 处理数据
  const initDataList = useMemo(() => {
    const _data = formatCardListData(data, cardConstants.isPortrait, horizontalNumber, portraitNumber)
    return _data
  }, [JSON.stringify(data), cardConstants.isPortrait, horizontalNumber, portraitNumber])

  // 卡片列表样式
  const styles = useMemo(() => {
    const { background, backgroundImage = '', border, radius = 0 } = cardStyle || {},
      { yGap, isPortrait } = cardConstants

    const ul: CSSProperties = { gap: yGap, justifyContent: alignType[isPortrait ? portOverflow : horiOverflow] }
    const li: CSSProperties = {
      width: (w - horiSpeed * (horizontalNumber - 1)) / horizontalNumber,
      height: (h - portSpeed * (portraitNumber - 1)) / portraitNumber,
      borderRadius: radius
    }

    const cardBg = getColorObj(background)
    cardBg.colorType === 'single'
      ? (li.backgroundColor = cardBg.color)
      : (li.backgroundImage = `linear-gradient(${cardBg.color})`)

    if (backgroundImage) li.backgroundImage = `url(${backgroundImage})`

    if (border?.display) li.border = `${border.width}px solid ${border.color}`

    return { ul, li }
  }, [
    JSON.stringify(cardConstants),
    w,
    h,
    horizontalNumber,
    portraitNumber,
    overflow,
    horiOverflow,
    portOverflow,
    JSON.stringify(cardStyle)
  ])

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

  // 页面隐藏暂停动画
  usemEffect(() => {
    setCardData(initDataList)
    syncPagerCurrentIndex({ i: 0 })
    setTimeout(initAnimate)

    if (!cardIsAnimate || !animate?.display) {
      clearFn.current && clearFn.current()
    }

    return () => {
      clearTimer()
      clearFn.current && clearFn.current()
    }
  }, [w, h, initDataList, pager?.display, overflow, animate, cardConstants])

  // 初始化动画
  function initAnimate() {
    clearTimer()

    if (
      !cardIsAnimate ||
      !animate?.display ||
      Boolean(animate?.stopCondition) ||
      !animate?.updataNum ||
      !listRef.current
    )
      return false

    upDateListTransition('none')

    switch (arrangementMode) {
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

  // 上滑操作
  function scrollUp() {
    if (!listRef.current || !animate?.updataNum) return
    // 1. 计算滚动长度
    const { startAgained, showNum, scrollItemLen, updataNum } = cardConstants,
      dataLen = initDataList.length
    if (!startAgained) {
      // 首尾衔接 将需要滚动的数据拼接到最后 防止露白
      const newList = [...cardData.current]
      const scrollList = newList.slice(0, updataNum).map((item: any[]) => {
        const code = randomChar()
        return item.map(item => ({ ...item, __code: code }))
      })

      newList.push(...scrollList)
      setCardData(newList)
    }

    // 3. 滚动
    let transitioned = true,
      scrollWidth = scrollItemLen
    if (startAgained) {
      // 从头开始计算滚动距离
      if (scrollInfo.current.updataLen < dataLen - showNum) {
        scrollInfo.current.scrollW += scrollItemLen
        scrollInfo.current.updataLen += updataNum
      } else {
        transitioned = false
        scrollInfo.current.scrollW = 0
        scrollInfo.current.updataLen = 0
      }
      scrollWidth = scrollInfo.current.scrollW
    }

    upDateListTransition(-scrollWidth, transitioned)

    // 第二步  剪切数据重置数据 和滑动距离
    timerStatus.current.reductionTimer = setTimeout(() => {
      if (!listRef.current) return
      if (!startAgained) {
        upDateListTransition('none')
        const newList = [...cardData.current]
        newList.splice(0, updataNum)
        // 让数据同步进入 ReactDom.unstable_batchedUpdates 中 可减少一次渲染
        syncPagerCurrentIndex({ newData: newList, fn: () => setCardData(newList) })
      } else {
        upDateListTransition('not')
        syncPagerCurrentIndex()
      }
    }, cardConstants.SWITCHTIMER - 50)
  }

  function upDateListTransition(len: number | 'none' | 'not', isTransition = false, fn?: any) {
    const { isPortrait } = cardConstants,
      { switchSpeed = 500, speed = 'linear' } = animate || {}
    let transform = 'none',
      transition = 'none'
    if (typeof len === 'number') {
      transform = `translate${isPortrait ? 'X' : 'Y'}(${len}px)`
    }
    if (isTransition) {
      transition = switchSpeed ? `transform ${switchSpeed}ms ${speed}` : 'none'
    }

    const styles: any = { transform, transition }
    if (len === 'not') delete styles.transform

    listRef.current && setStyle(listRef.current, styles)
    fn && (transition !== 'none' ? setTimeout(fn, switchSpeed) : fn())
  }

  // 切换分页下标
  function syncPagerCurrentIndex({ newData, i, fn }: { newData?: any[][]; i?: number; fn?: any } = {}) {
    const data = newData || cardData.current,
      dataLen = data.length
    if (!dataLen) return false

    let index: number
    if (!cardConstants.startAgained) {
      if (i === undefined) index = data[0][0].__index || 0
    } else {
      index = scrollInfo.current.updataLen
    }
    if (typeof i === 'number') index = i

    // 将setState 放在这里 可以减少state 更新次数
    unstable_batchedUpdates(() => {
      fn && fn()
      pager?.display && setCurrentIndex(index)
    })
  }

  function controlAnimateHander(type: 'enter' | 'leave' | 'start' | 'stop') {
    if ((!cardIsAnimate || !animate?.display || !animate?.updataNum) && ['enter', 'leave'].includes(type)) {
      timerStatus.current.mouseStatus = false
      return false
    }
    const { isPortrait, xGap, startAgained } = cardConstants

    switch (type) {
      case 'enter':
      case 'stop': {
        clearTimer(false)
        if (type === 'enter') {
          timerStatus.current.mouseStatus = true
          if (startAgained && listRef.current?.parentElement) {
            const $list = $(listRef.current.parentElement)

            upDateListTransition(0, false, () => {
              $list[isPortrait ? 'scrollLeft' : 'scrollTop'](scrollInfo.current.scrollW)
              scrollInfo.current.scrollW = 0
            })
          }
        }
        break
      }
      case 'leave':
      case 'start': {
        if (type === 'leave') {
          timerStatus.current.mouseStatus = false
          if (listRef.current?.parentElement) {
            const $list = $(listRef.current?.parentElement)
            const width = isPortrait ? $list.scrollLeft() : $list.scrollTop()
            const itemWidth = Number(isPortrait ? styles.li.width : styles.li.height) + xGap
            const len = Math.ceil((width - 1) / itemWidth)

            if (len > 0) {
              if (!startAgained) {
                const hideData = cardData.current.slice(0, len).map((item: any[]) => {
                  const code = randomChar()
                  return item.map(item => ({ ...item, __code: code }))
                })
                const newData = [...cardData.current, ...hideData]
                setCardData(newData)

                $list.animate({ [isPortrait ? 'scrollLeft' : 'scrollTop']: len * itemWidth }, 200, function () {
                  $list[isPortrait ? 'scrollLeft' : 'scrollTop'](0)
                  newData.splice(0, len)
                  syncPagerCurrentIndex({
                    newData,
                    fn: () => {
                      setCardData([...newData])
                    }
                  })
                  initAnimate()
                  return true
                })
              } else {
                const scrollLen = itemWidth * len
                scrollInfo.current = {
                  scrollW: scrollLen,
                  updataLen: len
                }
                $list[isPortrait ? 'scrollLeft' : 'scrollTop'](len * itemWidth)
                setTimeout(() => {
                  $list[isPortrait ? 'scrollLeft' : 'scrollTop'](0)
                  upDateListTransition(-scrollLen)
                  syncPagerCurrentIndex({ i: len })
                })
              }
            }
          }
        }

        initAnimate()
        break
      }
    }
  }

  function pagerHandlerClick(i: number) {
    if (i === currentIndex.current) return false
    clearTimer()

    const { scrollItemLen, startAgained, isPortrait } = cardConstants
    let nowData
    if (!startAgained) {
      nowData = [...initDataList]
      const hideList = nowData.splice(0, i)
      nowData.push(...hideList)
    } else {
      scrollInfo.current = {
        scrollW: scrollItemLen * i,
        updataLen: i
      }
      listRef.current?.parentElement &&
        $(listRef.current?.parentElement)[isPortrait ? 'scrollLeft' : 'scrollTop'](scrollItemLen * i)
    }

    // 让数据同步进入 ReactDom.unstable_batchedUpdates 中 可减少一次渲染
    syncPagerCurrentIndex({ newData: nowData, i, fn: () => !startAgained && setCardData(nowData) })

    !timerStatus.current.mouseStatus && initAnimate()
  }

  const pagerLen = (() => {
    let len = initDataList.length
    if (cardConstants.startAgained) len = initDataList.length - (cardConstants.showNum - 1)
    return len
  })()

  function arrowHandlerClick(type: 'prev' | 'next') {
    let i
    switch (type) {
      case 'prev': {
        i = currentIndex.current === 0 ? pagerLen - 1 : currentIndex.current - 1
        break
      }
      case 'next': {
        i = currentIndex.current === pagerLen - 1 ? 0 : currentIndex.current + 1
        break
      }
    }

    pagerHandlerClick(i)
    setCurrentIndex(i)
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <LczCardListWrapper
        isPortrait={cardConstants.isPortrait}
        arrowConfig={arrowConfig}
        overflow={overflow}
        style={{ width: w, height: h }}
        className='lcz-card-list'
        onMouseEnter={controlAnimateHander.bind(null, 'enter')}
        onMouseLeave={controlAnimateHander.bind(null, 'leave')}>
        <div className='card-container'>
          <div className='card-container-ul-box' style={{ gap: cardConstants.xGap }} ref={listRef}>
            {cardData.current.map((list: any[]) => (
              <ul key={list?.[0].__code} className='lcz-card-list-ul' style={styles.ul}>
                {list.map((item, j) => (
                  <CardItem key={j} itemData={item} style={styles.li} cardContainer={cardContainer} onClick={onClick} />
                ))}
              </ul>
            ))}
          </div>
        </div>
        {cardIsAnimate && pager?.display && initDataList.length > cardConstants.showNum && (
          <Pager
            len={pagerLen}
            pager={pager}
            arrangementMode={arrangementMode}
            currentIndex={currentIndex.current}
            onClick={pagerHandlerClick}
          />
        )}

        {cardIsAnimate && arrowConfig?.display ? (
          <Fragment>
            <div className='lcz-card-list-prev'>
              <Arrow
                {...arrowConfig}
                direction={cardConstants.isPortrait ? 'left' : 'top'}
                onClick={arrowHandlerClick.bind(null, 'prev')}
              />
            </div>
            <div className='lcz-card-list-next'>
              <Arrow
                {...arrowConfig}
                direction={cardConstants.isPortrait ? 'right' : 'bottom'}
                onClick={arrowHandlerClick.bind(null, 'next')}
              />
            </div>
          </Fragment>
        ) : null}
      </LczCardListWrapper>
    </LczComCon>
  )
})
