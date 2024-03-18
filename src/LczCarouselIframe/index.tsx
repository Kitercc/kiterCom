import React, { memo, useMemo, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination, Navigation, EffectFade, Lazy } from 'swiper'
import SwiperClass from 'swiper/types/swiper-class'
import LczComCon from '../common/LczComCon'
import { defaultCarouselConfig, defaultPagerConfig, defaultArrowsConfig } from './common/defaultValue'
import { CarouseIframeWrapper } from './style'
import { CarouseIframeProps, DataMap } from './type'
import Arrow from './components/Arrow'
import { Spin } from 'antd'
import Slide from './components/Slide'

SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade, Lazy])

export default memo(function LczCarouselIframe(props: CarouseIframeProps) {
  const {
    id: comId = '',
    carouseEffect = 'scroll',
    switchSpeed = 300,
    mode = 'horizontal',
    type = 'index',
    index = { value: 0 },
    defaultId = { value: 1 },
    carouselConfig = defaultCarouselConfig,
    pagerConfig = defaultPagerConfig,
    arrowsConfig = defaultArrowsConfig,
    customPage = [],
    w = 300,
    h = 200,
    data = [],
    onChange,
    onMouseenter,
    onMouseleave
  } = props

  const {
    display: carouselDis = true,
    autoplaySpeed = 3000,
    infinite = true,
    position = 'after',
    moveStay = true
  } = carouselConfig

  // hooks
  // @ts-ignore
  const [swiper, setSwiper] = useState<SwiperClass>(null)
  const [load, setLoad] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [dataList, setDataList] = useState<DataMap[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  const timer = useRef<any>(null)
  const timer1 = useRef<any>(null)
  const timer2 = useRef<any>(null)

  const currentIndexMemo = useMemo(() => {
    let _index = 0
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
  }, [JSON.stringify(index), JSON.stringify(defaultId), type])

  const pointerEvents = useMemo(() => {
    if (!wrapperRef.current) return true

    const pointerEvents = wrapperRef.current?.parentElement
      ? window.getComputedStyle(wrapperRef.current.parentElement, null).pointerEvents
      : 'auto'

    if (pointerEvents === 'none') {
      return true
    } else {
      return false
    }
  }, [wrapperRef.current])

  const current = useRef<number>(currentIndexMemo)

  useEffect(() => {
    if (swiper) {
      clearTimeout(timer1.current)
      if (swiper && !swiper.destroyed) {
        const _middleVal = Math.floor(data.length / 2)
        if (
          (current.current < currentIndexMemo && currentIndexMemo - current.current <= _middleVal) ||
          (current.current > currentIndexMemo && current.current - currentIndexMemo <= _middleVal)
        ) {
          swiper.slideToLoop(currentIndexMemo)
        } else if (current.current - currentIndexMemo > 0 && current.current - currentIndexMemo > _middleVal) {
          swiper.slideToLoop(data.length + currentIndexMemo)
          timer1.current = setTimeout(() => {
            swiper.slideToLoop(currentIndexMemo, 0, false)
          }, switchSpeed)
        } else if (current.current - currentIndexMemo < 0 && currentIndexMemo - current.current > _middleVal) {
          swiper.slideToLoop(currentIndexMemo - data.length)
          timer1.current = setTimeout(() => {
            swiper.slideToLoop(currentIndexMemo, 0, false)
          }, switchSpeed)
        }
        current.current = currentIndexMemo
      }

      return () => {
        clearTimeout(timer1.current)
      }
    }
  }, [swiper, currentIndexMemo, switchSpeed])

  useEffect(() => {
    setLoad(false)
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setLoad(true)
    }, 500)
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [w, h, mode, carouseEffect, switchSpeed, JSON.stringify(carouselConfig), pagerConfig.display])

  useEffect(() => {
    wrapperRef.current?.addEventListener('mouseenter', wrapperMouseenter)
    wrapperRef.current?.addEventListener('mouseleave', wrapperMouseleave)

    return () => {
      wrapperRef.current && wrapperRef.current?.removeEventListener('mouseenter', wrapperMouseenter)
      wrapperRef.current && wrapperRef.current?.removeEventListener('mouseleave', wrapperMouseleave)
    }
  }, [swiper, currentIndex])

  // functions
  function wrapperMouseenter() {
    onMouseenter && onMouseenter(data[currentIndex], currentIndex)
    carouselDis && moveStay && swiper?.autoplay && swiper.autoplay.stop()
  }

  function wrapperMouseleave() {
    onMouseleave && onMouseleave(data[currentIndex], currentIndex)
    carouselDis && moveStay && swiper?.autoplay && swiper.autoplay.start()
  }

  function onSlideChange(sw: SwiperClass) {
    clearTimeout(timer2.current)

    timer2.current = setTimeout(() => {
      setCurrentIndex(sw.realIndex)
      if (data[sw.realIndex]) onChange && onChange(data[sw.realIndex], sw.realIndex)
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

  useEffect(() => {
    ;(() => {
      let list: Promise<DataMap>[] = []
      list = data.map(async item => ({ ...item, url: await getIframeUrl(item) }))
      Promise.all(list).then(res => setDataList(res))
    })()
  }, [JSON.stringify(data), JSON.stringify(customPage)])

  const Container = useMemo(() => {
    return dataList.map((item, i) => {
      return (
        <SwiperSlide key={i}>
          <Slide w={w} h={h} item={item} currentIndex={currentIndex} i={i} />
        </SwiperSlide>
      )
    })
  }, [dataList, w, h, currentIndex])

  const loopedSlides = Math.floor(data.length / 2),
    reverseDirection = position === 'after' ? false : true

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <CarouseIframeWrapper
        w={w}
        h={h}
        pagerConfig={pagerConfig}
        arrowsConfig={arrowsConfig}
        mode={mode}
        className='lcz-carouse-iframe-wrapper'
        ref={wrapperRef}>
        <Spin style={{ width: w, height: h, maxHeight: h }} spinning={!load}>
          {load && (
            <>
              <>
                {arrowsConfig.display && (
                  <div className='lcz-scroll-page-prev'>
                    <Arrow {...arrowsConfig} direction={mode === 'horizontal' ? 'left' : 'top'} />
                  </div>
                )}
                {arrowsConfig.display && (
                  <div className='lcz-scroll-page-next'>
                    <Arrow {...arrowsConfig} direction={mode === 'horizontal' ? 'right' : 'bottom'} />
                  </div>
                )}
              </>

              <Swiper
                className={`${pointerEvents ? 'disable' : ''}`}
                autoplay={
                  carouselDis
                    ? { delay: autoplaySpeed, disableOnInteraction: false, stopOnLastSlide: true, reverseDirection }
                    : false
                }
                pagination={pagerConfig.display ? { clickable: true } : false}
                navigation={
                  arrowsConfig.display ? { nextEl: '.lcz-scroll-page-next', prevEl: '.lcz-scroll-page-prev' } : false
                }
                preventInteractionOnTransition
                loop={infinite}
                direction={mode}
                speed={switchSpeed}
                loopedSlides={loopedSlides}
                initialSlide={currentIndexMemo}
                // @ts-ignore
                effect={carouseEffect}
                lazy
                width={w}
                height={h}
                style={{ width: w, height: h }}
                onSlideChange={onSlideChange}
                onInit={(sw: SwiperClass) => setSwiper(sw)}>
                {Container}
              </Swiper>
            </>
          )}
        </Spin>
      </CarouseIframeWrapper>
    </LczComCon>
  )
})
