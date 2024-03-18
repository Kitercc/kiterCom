import React, { memo, forwardRef, useImperativeHandle, useCallback, useRef, useState } from 'react'

import Text from './Text'
import Number from './Number'
import Image from './Image'
import Date from './Date'
import FixedItems from './FixedItems'
import CarousItems from './CarousItems'
import ProgressItems from './ProgressItems'
import Status from './Status'
import FixedBg from './FixedBg'

import { compareTableData, getColStyle } from '../common'
import {
  defaultCarousel,
  defaultGlobalConfig,
  defaultHeader,
  defaultLineConfig,
  defaultSerialCol
} from '../common/defaultValue'
import { getMaxSrcollSize } from '../style'
import { CarouseTableProps, ColumnArr, TextStyle, TIMER } from '../type'
import { getColorObj, randomChar, resMobile } from '../../common/util'
import { debounce } from 'lodash'
import { usemEffect, usemMemo, useSyncState } from '../../common/hooks'

interface BodyType {
  tableProps: CarouseTableProps
  itemWidth: number | '100%'
  serialColStyle: any
  boxId: string
  tablebodyheight: number
}

// 页面隐藏清除定时器
let hiddenProperty = ''
if ('hidden' in document) {
  hiddenProperty = 'hidden'
}
if ('webkitHidden' in document) {
  hiddenProperty = 'webkitHidden'
}
if ('mozHidden' in document) {
  hiddenProperty = 'mozHidden'
}

const CarouselBody = forwardRef((props: BodyType, ref) => {
  const { tableProps = {}, itemWidth, serialColStyle, boxId, tablebodyheight } = props
  const {
    w = 300,
    h = 200,
    data,
    customCol = [],
    seriesStyle = [],
    carousel = defaultCarousel,
    header = defaultHeader,
    lineconfig = defaultLineConfig,
    globalConfig = defaultGlobalConfig,
    serialCol = defaultSerialCol,
    onClick
  } = tableProps

  const {
    interval = 3,
    fixedBg,
    duration = 800,
    animateStep = 50,
    animateMode = 'one',
    animatConnect = 'headTail',
    animationEffect = 'bottomUp'
  } = carousel
  const { lineStyle = [], lineSpeed } = lineconfig
  const { showType = 'fixedHeight', horcroll, updated, topLine = 3 } = globalConfig
  const { inintNumber, serialStyleList = [], colSpac } = serialCol
  const rowsNumber = Math.floor(globalConfig.rowsNumber || 1)

  // hook
  const [carouseData, setCarouseData] = useSyncState<any[]>([])
  const [topData, setTopData] = useSyncState<any[]>([])
  const [moveStatus, setMoveStatus] = useState<boolean>(false)
  const [animated, setAnimated] = useState<boolean>(false)

  const list = useRef<HTMLUListElement>(null)
  const fixedList = useRef<HTMLUListElement>(null)
  const dataRef = useRef<any[]>([])
  const nowDataRef = useRef<any[]>([])
  const isMobile = useRef<'pc' | 'mobile'>(resMobile())
  const timer = useRef<TIMER>({} as TIMER)
  const scrollConfig = useRef<{ parentH: number; scrollH: number; scrollTop: number }>({
    parentH: 0,
    scrollH: 0,
    scrollTop: 0
  }) // 高度自适应时的向上移动

  const tabelScrollHeight = tablebodyheight - (fixedList.current?.clientHeight || 0)
  const useKeys = customCol.map(item => item.field)

  // 让父组件调用
  useImperativeHandle(ref, () => ({
    mouseLeave,
    mouseEnter
  }))

  // 内容行高度
  const columnHeight = usemMemo(() => {
    const scorollBarHeight =
      itemWidth !== '100%' && horcroll?.display && horcroll?.trackConfig?.display ? getMaxSrcollSize(horcroll) : 0
    const itemHieigh = (h || 0) - (header.display ? header.height : 0) - lineSpeed * (rowsNumber - 1) - scorollBarHeight
    return itemHieigh / rowsNumber > 0 ? itemHieigh / rowsNumber : 1
  }, [h, header, lineSpeed, rowsNumber, horcroll])

  // 获取每行的样式
  const getColmunStyle = useCallback(
    (index: number) => {
      const i = Math.abs(index) % lineStyle.length
      let itemStyle = lineStyle[i]
      let colorStr = 'transparent'

      if (itemStyle) {
        const { colorType, color } = getColorObj(itemStyle.bgColor?.color)
        if (colorType === 'gradient') {
          colorStr = `linear-gradient(${color} ) no-repeat 0 0`
        } else {
          colorStr = color
        }
      }

      itemStyle = itemStyle || { leftOffSet: 0, opacity: 100, radius: 0 }

      return {
        transform: `translateX(${itemStyle?.leftOffSet + (serialCol.display ? colSpac : 0)}px) `,
        opacity: itemStyle.opacity / 100,
        borderRadius: `${itemStyle.radius}px`,
        background: colorStr,
        width: itemWidth
      }
    },
    [w, h, lineStyle, fixedBg, colSpac, serialCol.display, itemWidth, rowsNumber, topLine]
  )

  // 获取每个字段显示的组件
  const getContentValue = useCallback(
    (colItem: ColumnArr, item, fontStyle: TextStyle, { expPathArr }) => {
      const { contentType } = colItem
      switch (contentType) {
        case 'text':
          return <Text colItem={colItem} item={item} key={item.code} fontStyle={fontStyle} />
        case 'number':
          return <Number colItem={colItem} item={item} key={item.code} fontStyle={fontStyle} />
        case 'image':
          return <Image colItem={colItem} item={item} key={item.code} fontStyle={fontStyle} />
        case 'date':
          return <Date colItem={colItem} item={item} key={item.code} fontStyle={fontStyle} />
        case 'progress':
          return (
            <ProgressItems
              colItem={colItem}
              item={item}
              key={item.code}
              data={data}
              fontStyle={fontStyle}
              id={tableProps.id || ''}
              expPathArr={expPathArr}
            />
          )
        case 'status':
          return <Status colItem={colItem} item={item} key={item.code} fontStyle={fontStyle} />
      }
      return null
    },
    [data, customCol, serialStyleList]
  )

  // 表格主体高度
  const scrollTableHeight = usemMemo(() => {
    const scorollBarHeight =
      itemWidth !== '100%' && horcroll?.display && horcroll?.trackConfig?.display ? getMaxSrcollSize(horcroll) : 0

    return h - (header.display ? header.height : 0) - (columnHeight + lineSpeed) * topLine - scorollBarHeight
  }, [itemWidth, horcroll, header, columnHeight, lineSpeed, topLine])

  usemEffect(() => {
    initCarouseData(true)
    destroyTimer('reset')
    scrollConfig.current = { parentH: 0, scrollH: 0, scrollTop: 0 }

    return () => {
      initScrollAnimate(false)
    }
  }, [w, h, showType, header, rowsNumber, topLine, updated, carousel, inintNumber, tabelScrollHeight])

  usemEffect(() => {
    nowDataRef.current = JSON.parse(JSON.stringify(data)).map((v, i) => ({
      ...v,
      _id: i + inintNumber,
      code: randomChar()
    }))

    setTopData(nowDataRef.current.slice(0, topLine))

    const scrollNum = rowsNumber - topLine
    let updata = false
    if (updated || dataRef.current.length <= scrollNum || data.length <= rowsNumber || !carousel.display) {
      initCarouseData(true)
      updata = true
    }

    destroyTimer('reset', updata)
  }, [data, topLine, updated, showType, inintNumber, rowsNumber, carousel.display, tabelScrollHeight])

  usemEffect(() => {
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
    document.addEventListener(visibilityChangeEvent, windowHide)

    if (isMobile.current === 'mobile') {
      list.current?.addEventListener('touchstart', mouseEnter)
      document.addEventListener('click', otherHandlerClick)
    }

    return () => {
      document.removeEventListener(visibilityChangeEvent, windowHide)
      if (list.current && isMobile.current === 'mobile') {
        list.current.removeEventListener('touchstart', mouseEnter)
        document.removeEventListener('click', otherHandlerClick)
      }
    }
  }, [data, isMobile.current, carousel.display, tabelScrollHeight])

  function mouseEnter() {
    setMoveStatus(true)
    if (carousel.display) {
      destroyTimer()
      switch (showType) {
        case 'fixedHeight': {
          if (animateMode === 'one') {
            const dataDom = list.current?.getElementsByClassName('table-colmun')[0]
            dataDom?.classList.remove('clearnOpacityAnimation')
          }
          const obj = {}
          dataRef.current = dataRef.current.reduce((cur, next) => {
            obj[next._id] ? null : (obj[next._id] = true && cur.push(next))
            return cur
          }, [])
          setCarouseData(dataRef.current)
          break
        }
        case 'adaptiveContent': {
          const parent = list.current?.parentNode as HTMLDivElement
          parent.scrollTop = scrollConfig.current.scrollTop
          // @ts-ignore
          list.current?.style.transform = 'translateY(0px)'
          break
        }
      }
    }
  }

  function mouseLeave() {
    setMoveStatus(false)
    const parent = list.current?.parentNode as HTMLDivElement
    const scrollTop: number = +parent.scrollTop
    if (carousel.display) {
      switch (showType) {
        case 'fixedHeight': {
          const num = Math.ceil(scrollTop / (columnHeight + lineSpeed))
          const boxSrollY = scrollTop % (columnHeight + lineSpeed)
          const _listTOP = boxSrollY === 0 ? 0 : columnHeight + lineSpeed - boxSrollY
          if (list.current) {
            list.current.style.transform = `translateY(-${_listTOP}px)`
            setAnimated(true)
          }
          setTimeout(() => {
            const spliceArr = dataRef.current.splice(0, num).map(v => ({ ...v, code: randomChar() }))
            dataRef.current = [...dataRef.current, ...spliceArr]
            setCarouseData(dataRef.current)
            destroyTimer('reset')
            parent.scrollTop = 0
            initScrollAnimate()
          }, 600)
          break
        }
        case 'adaptiveContent': {
          scrollConfig.current.scrollTop = scrollTop
          // @ts-ignore
          list.current?.style.transform = `translateY(-${scrollConfig.current.scrollTop}px)`
          parent.scrollTop = 0
          initScrollAnimate()
          break
        }
      }
    }
  }

  function otherHandlerClick(e) {
    const flag = $(e.target).closest(`#${boxId}`).length > 0
    if (isMobile.current === 'mobile' && !flag && moveStatus) {
      mouseLeave()
    }
  }

  function windowHide() {
    if (!document[hiddenProperty]) {
      initScrollAnimate && initScrollAnimate()
    } else {
      destroyTimer('timer')
    }
  }

  // 初始化数据
  const initCarouseData = debounce((flag?: boolean) => {
    dataRef.current = JSON.parse(JSON.stringify(data))
      .map((v, i) => {
        return { ...v, _id: i + inintNumber, code: randomChar() }
      })
      .slice(topLine)

    flag && setCarouseData(dataRef.current)

    initScrollAnimate()
  }, 50)

  // 初始化动画
  const initScrollAnimate = (flag = true) => {
    destroyTimer()
    try {
      setAnimated(false)
      const liseCurrentHeight = list.current?.clientHeight || 0
      switch (showType) {
        case 'fixedHeight': {
          destroyTimer('reset')
          if (carousel.display && flag && data.length > rowsNumber && topLine < rowsNumber) {
            timer.current.timer = setInterval(() => {
              scrollUp()
            }, interval * 1000 + duration)
          }
          break
        }
        case 'adaptiveContent': {
          if (carousel.display && flag) {
            timer.current.timer = setInterval(() => {
              const listH = liseCurrentHeight - tabelScrollHeight
              scrollConfig.current.parentH = tabelScrollHeight
              scrollConfig.current.scrollH = liseCurrentHeight

              if (listH > 0) {
                adaptiveContentScrollUp()
              } else {
                destroyTimer()
              }
            }, interval * 1000 + duration)
          }

          break
        }
      }
    } catch (error) {
      return error
    }
  }

  const adaptiveContentScrollUp = () => {
    if (!carousel.display) return
    const diffHeight = scrollConfig.current.scrollH - scrollConfig.current.parentH

    if (diffHeight !== scrollConfig.current.scrollTop) {
      setAnimated(true)
      if (diffHeight - scrollConfig.current.scrollTop > animateStep) {
        scrollConfig.current.scrollTop += animateStep
      } else {
        scrollConfig.current.scrollTop = diffHeight
      }
    } else {
      scrollConfig.current.scrollTop = 0
    }

    // @ts-ignore
    list.current?.style.transform = `translateY(-${scrollConfig.current.scrollTop}px)`

    timer.current.timerTwo = setTimeout(() => {
      setAnimated(false)

      if (!updated) {
        // 处理动画执行完毕是否更新数据
        const nCarouseData = nowDataRef.current.slice(topLine)
        if (compareTableData(nCarouseData, carouseData.current, useKeys)) setCarouseData(nCarouseData)
      }
    }, duration)
  }

  const scrollUp = () => {
    if (!carousel.display) return
    const copeData = dataRef.current
      .slice(0, animateMode === 'all' ? rowsNumber - topLine : 1)
      .map(v => ({ ...v, code: randomChar() }))

    if (animateMode === 'one' && animatConnect === 'startAgain') {
      if (copeData[0]._id - topLine - inintNumber >= data.length - rowsNumber) {
        initCarouseData(true)
      }
    }
    dataRef.current = [...dataRef.current, ...copeData]
    ;(animateMode === 'all' || animatConnect === 'startAgain') && setCarouseData(dataRef.current)

    if (animateMode === 'one') {
      const dataDom = list.current?.getElementsByClassName('table-colmun')[0]
      dataDom?.classList.add('clearnOpacityAnimation')
    }

    const height = (columnHeight + lineSpeed) * (animateMode === 'all' ? rowsNumber - topLine : 1)

    timer.current.timerTwo = setTimeout(() => {
      if (list.current) {
        setAnimated(true)
        if (animateMode === 'one' || (animateMode === 'all' && animationEffect === 'bottomUp')) {
          list.current.style.transform = `translateY(-${height}px)`
        }
      }
      scrollUpdelayed()
    }, 100)
  }

  const scrollUpdelayed = () => {
    const time =
      showType === 'fixedHeight' && animateMode === 'all' && animationEffect === 'flop' ? duration / 2 : duration
    timer.current.timerThree = setTimeout(() => {
      dataRef.current = dataRef.current.slice(animateMode === 'all' ? rowsNumber - topLine : 1)

      if (!updated) {
        // 处理动画执行完毕是否更新数据
        const len = dataRef.current.length + topLine

        if (len === nowDataRef.current.length) {
          dataRef.current = dataRef.current.map(item => {
            const nowData = nowDataRef.current.filter(da => da._id === item._id)[0]
            return { ...nowData, code: item.code }
          })
        } else {
          const topId = dataRef.current[0]._id
          const data = nowDataRef.current.slice(topLine)
          const leftData = data.filter(da => da._id < topId)
          const rightData = data.filter(da => da._id >= topId)
          dataRef.current = rightData.concat(leftData)
        }
      }

      if (animateMode === 'one') {
        const dataDom = list.current?.getElementsByClassName('table-colmun')[0]
        dataDom?.classList.remove('clearnOpacityAnimation')
      }
      setCarouseData(dataRef.current)
      destroyTimer('reset')
    }, time)
  }

  const destroyTimer = (type?: string, updata = true) => {
    if (type === 'reset' && updata) {
      if (list.current) {
        setAnimated(false)
        list.current.style.transform = 'translateY(0px)'
      }
      return false
    }
    if (type) {
      timer.current[type] && clearTimeout(timer.current[type])
      timer.current[type] && clearInterval(timer.current[type])
    } else {
      for (const key in timer.current) {
        timer.current[key] && clearTimeout(timer.current[key])
        timer.current[key] && clearInterval(timer.current[key])
      }
    }
  }

  const listAnimated =
    animated &&
    carousel.display &&
    (showType === 'adaptiveContent' || animateMode === 'one' || animationEffect === 'bottomUp')

  const itemAnimated = animated && showType === 'fixedHeight' && animateMode === 'all' && animationEffect === 'flop'

  return (
    <div className='table-body' style={{ width: itemWidth }}>
      <ul className='fixed-content' ref={fixedList}>
        {topData.current.map(item => {
          return (
            <FixedItems
              key={item.code}
              id={tableProps.id || ''}
              showType={showType}
              carousel={carousel}
              getColmunStyle={getColmunStyle}
              getColStyle={getColStyle}
              serialCol={serialCol}
              serialColStyle={serialColStyle}
              customCol={customCol}
              lineconfig={lineconfig}
              item={item}
              columnHeight={columnHeight}
              globalConfig={globalConfig}
              seriesStyle={seriesStyle}
              getContentValue={getContentValue}
              onClick={onClick}
            />
          )
        })}
      </ul>
      <div
        className='carouse-box'
        style={{
          width: itemWidth,
          height: showType === 'fixedHeight' ? scrollTableHeight : 'initial',
          flex: showType === 'fixedHeight' ? 'none' : 1
        }}>
        {carousel.fixedBg && showType === 'fixedHeight' && (
          <FixedBg
            globalConfig={globalConfig}
            topLine={topLine}
            columnHeight={columnHeight}
            getColmunStyle={getColmunStyle}
            lineSpeed={lineSpeed}
          />
        )}
        <div
          className='carouse-box-inner'
          style={{
            width: itemWidth,
            height: showType === 'fixedHeight' ? scrollTableHeight : '100%',
            maxHeight: tabelScrollHeight,
            overflowY: 'auto'
          }}>
          <ul ref={list} className={`carous-content ${listAnimated ? 'animate' : ''}`}>
            {carouseData.current.map(item => {
              return (
                item && (
                  <CarousItems
                    key={item.code}
                    id={tableProps.id || ''}
                    animated={itemAnimated}
                    showType={showType}
                    getColmunStyle={getColmunStyle}
                    getColStyle={getColStyle}
                    serialCol={serialCol}
                    serialColStyle={serialColStyle}
                    seriesStyle={seriesStyle}
                    customCol={customCol}
                    lineconfig={lineconfig}
                    item={item}
                    carousel={carousel}
                    columnHeight={columnHeight}
                    globalConfig={globalConfig}
                    getContentValue={getContentValue}
                    onClick={onClick}
                  />
                )
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
})

CarouselBody.displayName = 'CarouselBody'

export default memo(CarouselBody)
