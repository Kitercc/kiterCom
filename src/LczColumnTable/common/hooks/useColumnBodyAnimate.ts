import { isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { usemEffect, usePageHide, useSyncState } from '../../../common/hooks'
import { randomChar, setStyle } from '../../../common/util'
import { GlobalConfig, AnimateConfig } from '../../type'

type ConfigType = {
  globalConfig?: GlobalConfig
  animateConfig?: AnimateConfig
  itemWidth: number
  lineSpeed: number
  tableBodyHeight: number
  w: number
  h: number
}

type AnimateTimer = {
  carouselTimer?: NodeJS.Timer
  reductionTimer?: NodeJS.Timeout
  mouseStatus: boolean
  listWidth: number
  listHeight: number
}

export default function useColumnBodyAnimate(
  dataMemo: any[][],
  listRef: React.RefObject<HTMLDivElement>,
  { globalConfig, animateConfig, itemWidth, w, lineSpeed, tableBodyHeight }: ConfigType
) {
  const { arrangementMode, updated = false, rowNumber = 3, columnNumber = 3, lineHeight = 30 } = globalConfig || {},
    isPortrait = arrangementMode === 'portrait',
    SWITCHTIMER = (animateConfig?.switchSpeed || 0) + 100,
    itemScrollWidth = isPortrait ? itemWidth : lineHeight + lineSpeed

  const [animateReset, setAnimateReset] = useState<string>(randomChar()),
    [dataList, setDataList] = useSyncState<any[][]>([]),
    [cacheDataList, setCacheDataList] = useSyncState<any[][]>([]),
    timerStatus = useRef<AnimateTimer>({
      carouselTimer: undefined,
      reductionTimer: undefined,
      mouseStatus: false,
      listWidth: 0,
      listHeight: 0
    })

  // 页面显示隐藏触发轮播
  const clearFn = usePageHide(
    () => controlAnimateHander('start'),
    () => controlAnimateHander('stop')
  )

  // 初始化数据 和 缓存数据
  usemEffect(() => {
    const portraitIsAnimate =
      isPortrait && (timerStatus.current.listWidth <= w || itemScrollWidth * dataMemo.length <= w)
    const horizontalIsAnimate =
      !isPortrait &&
      (timerStatus.current.listHeight <= tableBodyHeight || itemScrollWidth * dataMemo.length <= tableBodyHeight)
    if (
      updated ||
      dataList.current.length === 0 ||
      dataMemo.length === 0 ||
      !animateConfig?.display ||
      (animateConfig?.display && (portraitIsAnimate || horizontalIsAnimate))
    ) {
      setDataList(dataMemo)
      setAnimateReset(randomChar())
    }

    setCacheDataList(dataMemo)
  }, [
    dataMemo,
    isPortrait,
    animateConfig?.display,
    itemScrollWidth,
    updated,
    w,
    tableBodyHeight,
    rowNumber,
    columnNumber
  ])

  useEffect(() => {
    listRef.current &&
      setStyle(listRef.current, {
        transition: 'none',
        transform: `translate${isPortrait ? 'X' : 'Y'}(0px)`
      })
  }, [animateConfig?.display, isPortrait])

  function clearTimer(flag = true) {
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

  usemEffect(() => {
    setTimeout(initAnimate)
    if (!animateConfig?.display) {
      clearFn.current && clearFn.current()
    }

    return () => {
      clearTimer()
      clearFn.current && clearFn.current()
    }
  }, [animateReset, globalConfig, animateConfig, itemScrollWidth, w, tableBodyHeight])

  function initAnimate() {
    clearTimer()

    if (!animateConfig?.display || !animateConfig?.updataNum || !listRef.current) return false

    setStyle(listRef.current, {
      transition: 'none',
      transform: 'none'
    })

    if (isPortrait) {
      timerStatus.current.listWidth = itemScrollWidth * cacheDataList.current.length
      if (timerStatus.current.listWidth <= w) return false
    } else {
      timerStatus.current.listHeight = itemScrollWidth * cacheDataList.current.length - lineSpeed
      if (timerStatus.current.listHeight <= tableBodyHeight) return false
    }

    const timeInterval = animateConfig?.timeInterval || 3,
      interval = timeInterval * 1000 + SWITCHTIMER

    timerStatus.current.carouselTimer = setInterval(() => {
      scrollUp()
    }, interval)
  }

  function scrollUp() {
    if (!listRef.current || !animateConfig?.updataNum) return
    const { updataNum = 1, switchSpeed = 500, speed = 'linear' } = animateConfig
    const dataLen = dataList.current.length,
      _updataNum = updataNum > dataLen ? dataLen : updataNum,
      listChildren = (Array.from(listRef.current.children) || []) as HTMLElement[]

    let scrollLen = isPortrait ? 0 : lineSpeed * _updataNum

    for (let i = 0; i < _updataNum; i++) {
      const elItem = listChildren[i],
        itemWidth = isPortrait ? elItem.offsetWidth : elItem.offsetHeight
      scrollLen += itemWidth
    }

    // 2. 将需要滚动的数据拼接到最后 防止露白
    const newList = [...dataList.current]
    const scrollList = newList.slice(0, _updataNum).map((item: any[]) => {
      const code = randomChar()
      return item.map(item => ({ ...item, __code: code }))
    })

    newList.push(...scrollList)
    setDataList(newList)

    // 3. 滚动
    const listAnimateSwitchtransition = switchSpeed ? `transform ${switchSpeed}ms ${speed}` : 'none'
    setStyle(listRef.current, {
      transition: listAnimateSwitchtransition,
      transform: `translate${isPortrait ? 'X' : 'Y'}(${-scrollLen}px)`
    })

    // 4.  剪切数据重置数据 和滑动距离
    // 第二步  剪切数据重置数据 和滑动距离
    timerStatus.current.reductionTimer = setTimeout(() => {
      if (listRef.current) {
        setStyle(listRef.current, {
          transition: 'none',
          transform: 'none'
        })
        let newList = [...dataList.current]
        newList.splice(0, _updataNum)
        if (!updated) {
          const cloneNewList = [...newList]
            .sort((a, b) => a[0].__index - b[0].__index)
            .map((item, i) => {
              return item.map((v, j) => {
                const cachItem = cacheDataList.current?.[i]?.[j]
                cachItem && (v.__code = cachItem.__code)
                return v
              })
            })

          if (!isEqual(cloneNewList, cacheDataList.current)) {
            const filterIndex = newList[0][0].__index
            const cacheData = [...cacheDataList.current]
            const leftData = cacheData.splice(0, filterIndex)
            newList = [...cacheData, ...leftData]
          }
        }
        setDataList(newList)
      }
    }, SWITCHTIMER - 50)
  }

  function controlAnimateHander(type: 'enter' | 'leave' | 'start' | 'stop') {
    if ((!animateConfig?.display || !animateConfig?.updataNum) && ['enter', 'leave'].includes(type)) {
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

  function onMouseEnter() {
    controlAnimateHander('enter')
  }

  function onMouseLeave(e) {
    try {
      if (animateConfig?.display && animateConfig?.updataNum) {
        if (isPortrait) {
          if (timerStatus.current.listWidth <= w) return false
        } else {
          if (timerStatus.current.listHeight <= tableBodyHeight) return false
        }

        const parentNode = listRef.current?.parentElement as HTMLDivElement

        const scrollLen: number = isPortrait ? e.target.scrollLeft : parentNode.scrollTop,
          hideLen = Math.ceil(scrollLen / itemScrollWidth),
          surplusWidth = itemScrollWidth * hideLen - scrollLen

        if (isPortrait) {
          scrollHoming(e.target, surplusWidth, () => {
            if (hideLen) {
              const newList = [...dataList.current]
              const scrollList = newList.splice(0, hideLen)
              newList.push(...scrollList)
              setDataList(newList)
            }
            setTimeout(() => {
              e.target.scrollLeft = 0
              initAnimate()
            })
          })
        } else {
          scrollHoming(parentNode, surplusWidth, () => {
            if (hideLen) {
              const newList = [...dataList.current]
              const scrollList = newList.splice(0, hideLen)
              newList.push(...scrollList)
              setDataList(newList)
            }
            setTimeout(() => {
              parentNode.scrollTop = 0
              initAnimate()
            })
          })
        }
      }
    } catch (error) {
      console.warn(error)
    }
  }

  // 偏移归位
  function scrollHoming(target: HTMLDivElement, width, fn) {
    requestAnimationFrame(() => {
      if (isPortrait) {
        const offsetLeft = target.scrollLeft + w
        if (width > 0 && offsetLeft < timerStatus.current.listWidth) {
          const len = width / 6 > 1 ? 6 : width
          target.scrollLeft += len
          width -= len
          scrollHoming(target, width, fn)
        } else {
          fn()
        }
      } else {
        const offsetTop = target.scrollTop + tableBodyHeight
        if (width > 0 && offsetTop < timerStatus.current.listHeight) {
          const len = width / 6 > 1 ? 6 : width
          target.scrollTop += len
          width -= len
          scrollHoming(target, width, fn)
        } else {
          fn()
        }
      }
    })
  }

  return { dataList, onMouseEnter, onMouseLeave }
}
