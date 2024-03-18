import React, { memo, useEffect, useRef, useState, useMemo, CSSProperties } from 'react'
import LczComCon from '../common/LczComCon'
import { conversionData, getColorObj, lineFeedReg, randomChar, resMobile } from '../common/util'
import {
  defaultAbstract,
  defaultCarousel,
  defaultDateConfig,
  defaultDrawing,
  defaultGlobalConfig,
  defaultMaskConfig,
  defaultpager,
  defaultSplitLine,
  defaultTextConfig,
  defaultTitle
} from './common/default'
import ListItem from './components/ListItem'
import Pager from './components/Pager'
import { NewsListWrapper } from './style'
import { NewsListProps, DataMap, TIMER } from './type'

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

export default memo(function LczNewsList(props: NewsListProps) {
  const {
    w = 480,
    h = 80,
    globalConfig = defaultGlobalConfig,
    textConfig = defaultTextConfig,
    drawing = defaultDrawing,
    maskConfig = defaultMaskConfig,
    pager = defaultpager,
    onClick,
    data = []
  } = props
  const {
    showType = 'fixedHeight',
    numbers = 1,
    entryInterval = 0,
    rowHeight = 88,
    singleBg,
    border,
    carousel = defaultCarousel
  } = globalConfig
  const {
    titleConfig = defaultTitle,
    splitLine = defaultSplitLine,
    abstract = defaultAbstract,
    dateConfig = defaultDateConfig
  } = textConfig
  const { display: carouselDis = true, timeSpeed = 5, speed: carouselSpeed = 100, carouselFactor = 'all' } = carousel

  const showPager = showType === 'fixedHeight' && pager.display

  // hooks
  const [load, setLoad] = useState<boolean>(false)
  const [newsList, setNewsList] = useState<DataMap[]>([])
  const [moveStatus, setMoveStatus] = useState<boolean>(false)
  const [ing, setIng] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0) // 指示器的激活项
  const currentIndexRef = useRef<number>(0) // 保存指示器的激活项
  const dataCurrent = useRef<DataMap[]>([])
  const listRef = useRef<HTMLUListElement>(null)
  const copelistRef = useRef<HTMLUListElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isMobile = useRef<'pc' | 'mobile'>(resMobile())
  const boxId = useRef<any>(randomChar())
  const alltimer = useRef<TIMER>({ timer: null, timerTwo: null, timerThree: null, loadTimer: null })
  const scrollY = useRef<number>(0)

  useEffect(() => {
    initData()
  }, [JSON.stringify(data), load, showType])

  // 初始化数据
  function initData() {
    const _data = conversionData(data, { title: 'string', digest: 'string', picture: 'string', date: 'string' })
    dataCurrent.current = _data.map((item, i) => {
      const itemData: DataMap = { ...item, code: randomChar(), __index: i }
      if (item.digest) {
        const digest = String(item.digest)
        itemData.digestArr = digest.split(lineFeedReg)
      }
      return itemData
    })
    setNewsList([...dataCurrent.current])
  }

  useEffect(() => {
    clearTimeout(alltimer.current.loadTimer)
    if (showType === 'highlyAdaptive') {
      setLoad(false)
      alltimer.current.loadTimer = setTimeout(() => setLoad(true), 200)
    } else {
      setLoad(true)
    }
    return () => {
      clearTimeout(alltimer.current.loadTimer)
    }
  }, [w, h, showType, drawing.display, drawing.width, JSON.stringify(titleConfig), splitLine.display, splitLine.width, JSON.stringify(abstract), JSON.stringify(dateConfig)])

  useEffect(() => {
    if (dataCurrent.current?.length && load) {
      switch (showType) {
        case 'fixedHeight': {
          listRef.current!.parentElement!.style.transform = 'translate3d(0px,0px,0px)'
          scrollY.current = 0

          carouselDis ? initScrollAnimate() : clearAnimate()
          msetCurrentIndex()
          break
        }
        case 'highlyAdaptive': {
          setTimeout(() => initHighlyAdaptive())
          break
        }
      }
    } else {
      load && showType === 'highlyAdaptive' && initHighlyAdaptive()
    }

    return () => {
      clearAnimate()
    }
  }, [JSON.stringify(data), JSON.stringify(carousel), showType, load, numbers, showPager])

  useEffect(() => {
    wrapperRef.current?.addEventListener(isMobile.current === 'pc' ? 'mouseenter' : 'touchstart', WrapperMousenter)
    wrapperRef.current?.addEventListener('mouseleave', WrapperMouseleave)
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
    document.addEventListener(visibilityChangeEvent, windowHide)
    if (isMobile.current === 'mobile') document.addEventListener('click', otherHandlerClick)

    return () => {
      document.removeEventListener(visibilityChangeEvent, windowHide)
      document.removeEventListener('click', otherHandlerClick)
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener(
          isMobile.current === 'pc' ? 'mouseenter' : 'touchstart',
          WrapperMousenter
        )
        wrapperRef.current.removeEventListener('mouseleave', WrapperMouseleave)
      }
    }
  }, [JSON.stringify(newsList), isMobile.current, moveStatus])

  const signStyle = useMemo(() => {
    const style: CSSProperties = {
      marginBottom: entryInterval
    }
    const { display = false, color: bgColor, image } = singleBg || {}

    if (display) {
      const { color, colorType } = getColorObj(bgColor)
      if (colorType === 'single') {
        style.backgroundColor = color
      } else {
        style.backgroundImage = `linear-gradient(${color})`
      }

      image && (style.backgroundImage = `url(${image})`)
    }

    if (border?.display) {
      style.border = `${border.width}px solid ${border.color}`
    }

    return style
  }, [entryInterval, JSON.stringify(singleBg), JSON.stringify(border)])

  // 鼠标移入事件
  function WrapperMousenter() {
    setMoveStatus(true)
    clearAnimate()
    if (showType === 'highlyAdaptive') {
      copelistRef.current && (copelistRef.current.style.display = 'none')
      listRef.current && (listRef.current.parentElement!.style.transform = 'translate3d(0px,0px,0px)')
      scrollY.current = 0
      setIng(false)
    } else {
      scrollUpdataData()
    }
  }
  // 鼠标移出事件
  function WrapperMouseleave() {
    try {
      const node = wrapperRef.current?.children[0] as HTMLDivElement
      setMoveStatus(false)
      if (carouselDis) {
        switch (showType) {
          case 'fixedHeight': {
            const num = node ? Math.floor(node.scrollTop / rowHeight) : 1
            const leftData = dataCurrent.current.slice(0, num)
            const rightData = dataCurrent.current.slice(num)
            dataCurrent.current = [...rightData, ...leftData]
            setNewsList(dataCurrent.current)
            initScrollAnimate()
            msetCurrentIndex()
            node && (node.scrollTop = 0)
            break
          }
          case 'highlyAdaptive': {
            setIng(false)
            const scrollTop = node ? node.scrollTop : 0
            scrollY.current = scrollTop
            node && (node.scrollTop = 0)
            listRef.current &&
              (listRef.current.parentElement!.style.transform = `translate3d(0px,-${scrollY.current}px,0px)`)

            initHighlyAdaptive()
            break
          }
        }
      }
    } catch (error) {
      console.warn(error)
      clearAnimate()
    }
  }

  // 移动端点击其他开始轮播
  function otherHandlerClick(e) {
    // @ts-ignore
    const flag = $(e.target).closest(`#${boxId.current}`).length > 0
    if (isMobile.current === 'mobile' && !flag && moveStatus) {
      WrapperMouseleave()
    }
  }

  function windowHide() {
    if (carouselDis) {
      if (!document[hiddenProperty]) {
        initScrollAnimate()
      } else {
        alltimer.current.timer && clearInterval(alltimer.current.timer)
      }
    } else {
      clearAnimate()
    }
  }

  // 高度自适应初始化
  function initHighlyAdaptive() {
    const listHeight = listRef.current?.clientHeight || 0
    if (h <= listHeight && carouselDis) {
      copelistRef.current && (copelistRef.current.style.display = 'block')
      initScrollAnimate()
    } else {
      listRef.current && (listRef.current.parentElement!.style.transform = 'translate3d(0px,0px,0px)')
      scrollY.current = 0
      copelistRef.current && ((copelistRef.current.style.display = 'none'), (copelistRef.current.innerHTML = ''))
      clearAnimate()
    }
  }

  const clearAnimate = (fn?: any) => {
    for (const key in alltimer.current) {
      alltimer.current[key] && key !== 'loadTimer' && clearInterval(alltimer.current[key])
    }
    fn && fn()
  }

  // 初始化动画
  const initScrollAnimate = () => {
    const factor = carouselFactor == 'all' ? true : data.length > numbers ? true : false
    clearAnimate()
    if (carouselDis && factor) {
      switch (showType) {
        case 'fixedHeight': {
          alltimer.current.timer = setInterval(() => {
            scrollUp()
          }, timeSpeed * 1000)
          break
        }
        case 'highlyAdaptive': {
          highlyAdaptiveSrollUp()
          break
        }
      }
    }
  }

  // 高度自适应上滑
  const highlyAdaptiveSrollUp = () => {
    clearAnimate()
    const listHeight = listRef.current ? listRef.current.clientHeight : 0
    if (h <= listHeight && carouselDis) {
      try {
        setTimeout(() => {
          listRef.current && copelistRef.current && (copelistRef.current.innerHTML = listRef.current.innerHTML)
          highlyAdaptiveScrollUpdelayed()
        })
      } catch (error) {
        console.warn(error)
      }
    }
  }

  const highlyAdaptiveScrollUpdelayed = () => {
    clearAnimate()
    try {
      if (!listRef.current || !carouselDis) return
      if (scrollY.current < listRef.current!.clientHeight) {
        setIng(true)
        scrollY.current += (carouselSpeed * 16) / 1000
        listRef.current!.parentElement!.style.transform = `translate3d(0px,-${scrollY.current}px,0px)`
        alltimer.current.timer = setTimeout(() => highlyAdaptiveScrollUpdelayed(), 16)
      } else {
        clearAnimate(() => {
          setIng(false)
          listRef.current!.parentElement!.style.transform = 'translate3d(0px,0px,0px)'
          scrollY.current = 0
          highlyAdaptiveScrollUpdelayed()
        })
      }
    } catch (error) {
      console.warn(error)
    }
  }

  // 逐条上滑
  const scrollUp = () => {
    if (!carouselDis) return

    const _firstList = dataCurrent.current.slice(0, 1).map(v => ({ ...v, code: randomChar() }))
    dataCurrent.current = [...dataCurrent.current, ..._firstList]
    setNewsList([...dataCurrent.current])
    const dataDom = listRef.current?.getElementsByClassName('list-item')[0]
    dataDom?.classList.add('hided')

    alltimer.current.timerTwo = setTimeout(() => scrollUpdataData(), 400)
  }

  // 更新数据并且同步分页器
  const scrollUpdataData = (syncCurrent = true) => {
    const dataDom = listRef.current?.getElementsByClassName('list-item')[0] as HTMLLIElement,
      classList = dataDom.className.split(' ')
    if (classList.includes('hided')) {
      dataCurrent.current = dataCurrent.current.slice(1)
      setNewsList([...dataCurrent.current])
      scrollUpdelayed()
      syncCurrent && msetCurrentIndex()
    }
  }

  // 延迟动画
  const scrollUpdelayed = () => {
    alltimer.current.timerThree = setTimeout(() => {
      const dataDom = listRef.current?.getElementsByClassName('list-item')[0]
      dataDom?.classList.remove('hided')
    }, 100)
  }

  function handlerClick(param: DataMap) {
    onClick && onClick(param)
  }

  function msetCurrentIndex() {
    if (!showPager || !dataCurrent.current.length) return false
    const firstItem = dataCurrent.current[0]
    if (firstItem && firstItem.__index === currentIndexRef.current) return false
    setCurrentIndex(firstItem.__index || 0)
    currentIndexRef.current = firstItem.__index || 0
  }

  function pagerHandlerClick(index: number) {
    if (index === currentIndex) return false
    clearAnimate()
    const dataDom = listRef.current?.getElementsByClassName('list-item')[0],
      wrapperNode = wrapperRef.current?.children?.[0] as HTMLDivElement
    dataDom?.classList.remove('hided')
    wrapperNode && (wrapperNode.scrollTop = 0)

    const newData = [...data].map((item, i) => {
      const findIndex = dataCurrent.current.findIndex(v => v.__index === i),
        findData = dataCurrent.current.splice(findIndex, 1) || []
      return findData[0] || item
    })

    const hideData = newData.splice(0, index)
    dataCurrent.current = [...newData, ...hideData]
    setNewsList([...dataCurrent.current])
    msetCurrentIndex()
    initScrollAnimate()
  }

  const wrapperH = showType === 'fixedHeight' ? (rowHeight + entryInterval) * numbers - entryInterval : '100%'

  return (
    <LczComCon className='lcz-com-con-news-list'>
      <NewsListWrapper
        ref={wrapperRef}
        globalConfig={globalConfig}
        titleConfig={titleConfig}
        splitLine={splitLine}
        abstract={abstract}
        drawing={drawing}
        maskConfig={maskConfig}
        className={`lcz-news-wrapper ${load ? 'loaded' : ''}`}
        id={boxId.current}
        style={{ width: '100%', height: wrapperH }}>
        {(load || showType === 'fixedHeight') && (
          <div
            style={{
              width: '100%',
              height: wrapperH,
              overflowY: 'scroll'
            }}>
            <div style={{ transition: ing ? 'transform 10ms' : 'none' }}>
              <ul ref={listRef}>
                {newsList.map(item => (
                  <ListItem
                    key={item.code}
                    item={item}
                    rowHeight={showType === 'fixedHeight' ? rowHeight : 'initial'}
                    drawing={drawing}
                    titleConfig={titleConfig}
                    abstract={abstract}
                    dateConfig={dateConfig}
                    style={signStyle}
                    handlerClick={handlerClick}
                  />
                ))}
              </ul>
              {showType === 'highlyAdaptive' && carouselDis && <ul ref={copelistRef}></ul>}
            </div>
          </div>
        )}
      </NewsListWrapper>
      {showPager && <Pager len={data.length} pager={pager} currentIndex={currentIndex} onClick={pagerHandlerClick} />}
    </LczComCon>
  )
})
