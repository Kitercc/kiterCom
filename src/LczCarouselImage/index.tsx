import React, { memo, useMemo, useEffect, useRef, useState, CSSProperties } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination, EffectFade, Lazy, EffectFlip, EffectCube, EffectCoverflow } from 'swiper'
import SwiperClass from 'swiper/types/swiper-class'
import LczComCon from '../common/LczComCon'
import {
  defaultGlobalConfig,
  defaultAnimationConfig,
  defaultPagerConfig,
  defaultCustomPage
} from './common/defaultValue'
import { CarouseImageWrapper } from './style'
import { CarouselImageProps, DataMap } from './type'
import { carouselActive } from '../common/util'

SwiperCore.use([EffectFlip, EffectCoverflow, EffectCube, Autoplay, Pagination, EffectFade, Lazy])

export default memo(function LczCarouselImage(props: CarouselImageProps) {
  const {
    globalConfig = defaultGlobalConfig,
    animationConfig = defaultAnimationConfig,
    pagerConfig = defaultPagerConfig,
    customPage = defaultCustomPage,
    data = [],
    onClick,
    w = 360,
    h = 210,
    onMouseenter,
    onMouseleave
  } = props

  const {
    display: carouselDis = true,
    autoplaySpeed = 3,
    position = 'before',
    moveStay = true
  } = animationConfig.carouselConfig
  const { type = 'index', index = { value: 0 }, defaultId = { value: 1 } } = globalConfig
  const { carouseEffect = 'scroll', switchSpeed = 500, mode = 'horizontal' } = animationConfig
  // hooks
  // @ts-ignore
  const [swiper, setSwiper] = useState<SwiperClass>(null)
  const [load, setLoad] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [newImgArray, setNewImgArray] = useState<any[]>([])
  const timer = useRef<any>(null)
  const timer1 = useRef<any>(null)

  const currentIndexMemo = useMemo(() => {
    const _index = carouselActive(data, type, index, defaultId)
    setCurrentIndex(_index)
    return _index
  }, [JSON.stringify(data), JSON.stringify(index), JSON.stringify(defaultId), JSON.stringify(customPage), type])

  const current = useRef<number>(currentIndexMemo)

  useEffect(() => {
    const _arr: any[] = []
    data.map(item => {
      _arr.push(getImgUrl(item))
    })
    setNewImgArray(_arr)
  }, [JSON.stringify(data), JSON.stringify(customPage.imgSeries)])

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

  useEffect(() => {
    setLoad(false)
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setLoad(true)
    }, 500)
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [w, h, JSON.stringify(animationConfig), pagerConfig.display])

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
    onMouseenter && onMouseenter(newImgArray[currentIndex], currentIndex)
    carouselDis && moveStay && swiper?.autoplay && swiper.autoplay.stop()
  }

  function wrapperMouseleave() {
    onMouseleave && onMouseleave(newImgArray[currentIndex], currentIndex)
    carouselDis && moveStay && swiper?.autoplay && swiper.autoplay.start()
  }
  function wrapperClick(sw: SwiperClass) {
    onClick && onClick(newImgArray[sw.realIndex], sw.realIndex)
  }

  const imgFill = useMemo(() => {
    const { fillStyle } = customPage
    const imgFillStyle: CSSProperties = {
      backgroundSize: '100% 100%'
    }
    switch (fillStyle) {
      case 'adaptive':
        imgFillStyle.backgroundSize = 'contain'
        imgFillStyle.backgroundPosition = 'center'
        break
      case 'beFill':
        imgFillStyle.backgroundSize = 'cover'
        break
      case 'stretchFill':
        imgFillStyle.backgroundSize = '100% 100%'
        break
      case 'noStretch':
        imgFillStyle.backgroundSize = 'auto'
        break
      case 'center':
        imgFillStyle.backgroundSize = 'auto'
        imgFillStyle.backgroundPosition = 'center'
        break
    }
    return imgFillStyle
  }, [JSON.stringify(customPage)])

  function getImgUrl(item: DataMap) {
    const { url, id } = item
    const { imgSeries } = customPage
    if (url) return item
    if (!imgSeries || imgSeries.length <= 0) return { id, url: '' }
    const findArr = imgSeries.filter(page => page.id == id)
    if (findArr.length <= 0) return { id, url: '' }
    const _findItem = findArr[findArr.length - 1]
    if (!_findItem.url) return { id, url: '' }
    return _findItem
  }

  const getContainer = () => {
    if (!data || data.length <= 0) return null
    return newImgArray.map((item, i) => {
      return (
        <SwiperSlide key={i}>
          {item.url && (
            <span className='carousel-img' style={{ ...imgFill, backgroundImage: `url(${item.url})` }}></span>
          )}
        </SwiperSlide>
      )
    })
  }

  // const reverseDirection = position === 'after' ? true : false

  const pagerSetting = {
    clickable: true,
    renderBullet: (_, className) => {
      return '<span class=" swiper-no-swiping ' + className + '"></span>'
    }
  }
  const swiperAutoplay = {
    delay: autoplaySpeed * 1000,
    disableOnInteraction: false,
    stopOnLastSlide: true,
    reverseDirection: position === 'after' ? true : false
  }
  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <CarouseImageWrapper
        w={w}
        h={h}
        pagerConfig={pagerConfig}
        mode={mode}
        className='lcz-carouse-image-wrapper'
        ref={wrapperRef}>
        {load && (
          <Swiper
            className={`${pointerEvents ? 'disable' : ''}`}
            autoplay={carouselDis ? { ...swiperAutoplay } : false}
            pagination={pagerConfig.display ? pagerSetting : false}
            loop={true}
            direction={mode}
            speed={switchSpeed}
            loopedSlides={Math.ceil(data.length / 2)}
            initialSlide={currentIndexMemo}
            // @ts-ignore
            effect={carouseEffect}
            fadeEffect={{ crossFade: true }}
            lazy
            width={w}
            height={h}
            style={{ width: w, height: h }}
            onClick={wrapperClick}
            onInit={(sw: SwiperClass) => setSwiper(sw)}>
            {getContainer()}
          </Swiper>
        )}
      </CarouseImageWrapper>
    </LczComCon>
  )
})
