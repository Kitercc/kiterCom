import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import LczComCon from '../common/LczComCon'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ScrollPageWrapper } from './style'
import { DataMap, ScrollProps } from './type'
import 'swiper/swiper-bundle.css'
import { defaultGlobal, defaultCarousel, defaultpager } from './common/defaultValue'
import SwiperClass from 'swiper/types/swiper-class'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper'
import { CSSProperties } from 'styled-components'
import { defaultArrowConfig } from '../LczCircularTarget/common/defaultValue'
import Arrow from '../LczCircularTarget/components/Arrow'
import { randomChar, resMobile } from '../common/util'
SwiperCore.use([Autoplay, Pagination, Navigation])

export default memo(function LczScrollPage(props: ScrollProps) {
  const {
    id: comId = '',
    w = 480,
    h = 270,
    global = defaultGlobal,
    carousel = defaultCarousel,
    pagerConfig = defaultpager,
    arrowConfig = defaultArrowConfig,
    customPage = [],
    data = [],
    onMouseenter,
    onMouseleave,
    onChange
  } = props

  const { pageNum, mode, unselected, animate = defaultGlobal.animate } = global
  const { switchEffect = 'slide', switchSpeed } = animate
  const { display: carouselDis = true, speed = 1500, position = 'after', moveStay = true } = carousel

  // @ts-ignore
  const [swiper, setSwiper] = useState<SwiperClass>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [load, setLoad] = useState<boolean>(true)
  const [pointerEvents, setPointerEvents] = useState(false)
  const [moveStatus, setMoveStatus] = useState<boolean>(false)
  const [dataList, setDataList] = useState<(DataMap | null)[]>([])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const boxId = useRef<any>(randomChar('lcz-scroll-page'))
  const isMobile = useRef<'pc' | 'mobile'>(resMobile())
  const timer = useRef<any>(null)
  const timer1 = useRef<any>(null)
  const timer2 = useRef<any>(null)

  const swiperWrapper = useRef<{ [key: number]: HTMLIFrameElement }>({})

  const currentIndexMemo = useMemo(() => {
    let _index = 0
    const { type = 'index', index = { value: 0 }, defaultId = { value: '1' } } = global
    switch (type) {
      case 'index': {
        const _val = index.value
        _index = isNaN(_val) ? 0 : _val < 0 ? 0 : _val > data.length - 1 ? data.length - 1 : _val
        break
      }
      case 'id': {
        const _i = data.findIndex(item => item.id == defaultId.value)
        _index = _i >= 0 ? _i : 0
        break
      }
    }
    setCurrentIndex(_index)
    return _index
  }, [JSON.stringify(global)])

  const current = useRef<number>(currentIndexMemo)

  const swiperStyleMemo = useMemo(() => {
    const _styleObj: CSSProperties = {}
    switch (mode) {
      case 'horizontal':
        _styleObj.width = pageNum * w
        _styleObj.height = h
        _styleObj.transform = `translateX(${(-w * (pageNum - 1)) / 2}px)`
        break
      case 'vertical':
        _styleObj.width = w
        _styleObj.height = pageNum * h
        _styleObj.transform = `translateY(${(-h * (pageNum - 1)) / 2}px)`
    }
    return _styleObj
  }, [mode, pageNum, w, h])

  useEffect(() => {
    setLoad(false)
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setLoad(true)
    }, 200)
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [w, h, pageNum, mode, JSON.stringify(unselected), JSON.stringify(animate), JSON.stringify(carousel)])

  useEffect(() => {
    wrapperRef.current?.addEventListener(isMobile.current === 'pc' ? 'mouseenter' : 'touchstart', wrapperMouseenter)
    wrapperRef.current?.addEventListener('mouseleave', wrapperMouseleave)

    if (isMobile.current === 'mobile') document.addEventListener('click', otherHandlerClick)

    return () => {
      wrapperRef.current &&
        wrapperRef.current?.removeEventListener(
          isMobile.current === 'pc' ? 'mouseenter' : 'touchstart',
          wrapperMouseenter
        )
      wrapperRef.current && wrapperRef.current?.removeEventListener('mouseleave', wrapperMouseleave)
      document.removeEventListener('click', otherHandlerClick)
    }
  }, [swiper, currentIndex, isMobile.current, moveStatus])

  useEffect(() => {
    const pointerEvents = wrapperRef.current?.parentElement
      ? window.getComputedStyle(wrapperRef.current.parentElement, null).pointerEvents
      : 'auto'

    if (pointerEvents === 'none') {
      setPointerEvents(true)
    } else {
      setPointerEvents(false)
    }
  }, [])

  useEffect(() => {
    clearTimeout(timer1.current)
    if (swiper && !swiper.destroyed) {
      const _middleVal = Math.floor(data.length / 2)
      if (current.current - currentIndexMemo > 0 && current.current - currentIndexMemo > _middleVal) {
        swiper.slideToLoop(data.length + currentIndexMemo)
        timer1.current = setTimeout(() => {
          swiper.slideToLoop(currentIndexMemo, 0, false)
        }, switchSpeed)
      } else if (current.current - currentIndexMemo < 0 && currentIndexMemo - current.current > _middleVal) {
        swiper.slideToLoop(currentIndexMemo - data.length)
        timer1.current = setTimeout(() => {
          swiper.slideToLoop(currentIndexMemo, 0, false)
        }, switchSpeed)
      } else {
        swiper.slideToLoop(currentIndexMemo)
      }
      current.current = currentIndexMemo
    }

    return () => {
      clearTimeout(timer1.current)
    }
  }, [swiper, w, h, currentIndexMemo, switchSpeed])

  function wrapperMouseenter() {
    setMoveStatus(true)
    onMouseenter && onMouseenter(data[currentIndex])
    carouselDis && moveStay && swiper.autoplay.stop()
  }

  function wrapperMouseleave() {
    setMoveStatus(false)
    onMouseleave && onMouseleave(data[currentIndex])
    carouselDis && moveStay && swiper.autoplay.start()
  }

  function otherHandlerClick(e) {
    // @ts-ignore
    const flag = $(e.target).closest(`#${boxId.current}`).length > 0
    if (isMobile.current === 'mobile' && !flag && moveStatus) {
      wrapperMouseleave()
    }
  }

  function onSlideChange(sw: SwiperClass) {
    const _index = sw.realIndex
    if (isNaN(_index) || !data) return
    clearTimeout(timer2.current)
    timer2.current = setTimeout(() => {
      setCurrentIndex(_index)
      onChange && onChange(data[_index], _index)
    }, 100)
  }

  function getIframeUrl(item: DataMap) {
    const { url, id } = item
    if (url) return url
    if (!customPage || customPage.length <= 0) return undefined
    const findArr = customPage.filter(page => page.id == id)
    if (findArr.length <= 0) return undefined
    const _findItem = findArr[findArr.length - 1]
    if (!_findItem.contain.link) return undefined
    try {
      // @ts-ignore
      return window.handleFileLinkUrl(_findItem.contain.link, comId)
    } catch (error) {
      return undefined
    }
  }

  function setRef(ref: HTMLIFrameElement | null, i: number) {
    if (ref && !swiperWrapper.current[i]) {
      swiperWrapper.current[i] = ref
    }
  }

  function getStatus(item: DataMap | null, i: number) {
    if (!item) return false
    const len = data.length,
      num = (pageNum - 1) / 2
    if (swiperWrapper.current[i]) return true
    if (getIframeUrl(item)) {
      if (currentIndex === 0) {
        if (len - i <= num || i <= num) return true
      } else if (currentIndex === len - 1) {
        if (i < num || currentIndex - i <= num) return true
      } else {
        if (Math.abs(i - currentIndex) <= num) return true
      }
    }
    return false
  }

  useEffect(() => {
    ;(async () => {
      if (!data || data.length <= 0) return setDataList([])

      let list: Promise<DataMap | null>[] = []
      if (data.length >= pageNum) {
        list = data.map(async item => ({ ...item, url: await getIframeUrl(item) }))
      } else {
        list = new Array(pageNum).fill(null).map(async (_, i) => {
          const _item = data[i]
          return _item ? { ..._item, url: await getIframeUrl(_item) } : null
        })
      }
      Promise.all(list).then(res => setDataList(res))
    })()
  }, [JSON.stringify(data), JSON.stringify(customPage), pageNum])

  const getContainer = () => {
    return dataList.map((item, i) => {
      const status = getStatus(item, i)
      return (
        <SwiperSlide className={`${i === currentIndex ? 'lcz-scroll-active-page' : ''}`} key={i}>
          {status && (
            <iframe ref={ref => setRef(ref, i)} key={item?.url} src={item?.url} style={{ border: 'none' }}></iframe>
          )}
        </SwiperSlide>
      )
    })
  }

  const loopedSlides = pageNum >= data.length ? Math.ceil(pageNum / 2) : Math.floor(data.length / 2),
    reverseDirection = position === 'after' ? false : true
  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <ScrollPageWrapper
        w={w}
        h={h}
        global={global}
        unselected={unselected}
        animate={animate}
        pagerConfig={pagerConfig}
        arrowConfig={arrowConfig}
        ref={wrapperRef}
        id={boxId.current}
        className='lcz-scroll-page-wrapper'>
        <>
          {arrowConfig.display && (
            <div className='lcz-scroll-page-prev'>
              <Arrow
                {...arrowConfig}
                showType='all'
                direction={mode === 'horizontal' ? 'left' : 'top'}
                onClick={() => swiper && swiper.slidePrev()}
              />
            </div>
          )}
          {arrowConfig.display && (
            <div className='lcz-scroll-page-next'>
              <Arrow
                {...arrowConfig}
                showType='all'
                direction={mode === 'horizontal' ? 'right' : 'bottom'}
                onClick={() => swiper && swiper.slideNext()}
              />
            </div>
          )}
        </>

        {load && (
          <Swiper
            className={`${pointerEvents ? 'disable' : ''}`}
            autoplay={carouselDis ? { delay: speed * 1000, disableOnInteraction: false, reverseDirection } : false}
            pagination={pagerConfig.display ? { clickable: true } : false}
            navigation={false}
            speed={switchSpeed}
            effect={switchEffect}
            style={swiperStyleMemo}
            slidesPerView={pageNum}
            spaceBetween={0}
            direction={mode}
            centeredSlides
            slideToClickedSlide
            loop
            loopedSlides={loopedSlides}
            initialSlide={currentIndexMemo}
            onSlideChange={onSlideChange}
            onInit={(sw: SwiperClass) => setSwiper(sw)}>
            {getContainer()}
          </Swiper>
        )}
      </ScrollPageWrapper>
    </LczComCon>
  )
})
