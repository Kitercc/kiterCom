import React, { memo, useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination, EffectFade, Lazy, EffectFlip, EffectCube, EffectCoverflow } from 'swiper'
import SwiperClass from 'swiper/types/swiper-class'
import LczComCon from '../common/LczComCon'
import { LczVideoStream } from '../index'
import { CarouselVideoSteamProps, DataMap } from './type'
import {
  defaultAnimationConfig,
  defaultCarouselConfig,
  defaultGlobalConfig,
  defaultPagerConfig
} from './common/defaultValue'
import { carouselActive, conversionData } from '../common/util'
import { CarouselVideoSteamWrapper } from './style'

SwiperCore.use([EffectFlip, EffectCoverflow, EffectCube, Autoplay, Pagination, EffectFade, Lazy])

export default memo(function LczCarouselVideoStream(props: CarouselVideoSteamProps) {
  const {
    w = 400,
    h = 400,
    globalConfig = defaultGlobalConfig,
    animationConfig = defaultAnimationConfig,
    pagerConfig = defaultPagerConfig,
    data = [],
    onChange
  } = props
  const {
    type = 'index',
    index = { value: 0 },
    defaultId = { value: 1 },
    videoConfig = defaultGlobalConfig.videoConfig
  } = globalConfig
  const {
    carouseEffect = 'scroll',
    switchSpeed = 500,
    mode = 'horizontal',
    carouselConfig = defaultCarouselConfig
  } = animationConfig

  const { display: carouselDis = true, autoplaySpeed = 3, position = 'before', moveStay = true } = carouselConfig

  // @ts-ignore
  const [swiper, setSwiper] = useState<SwiperClass>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [load, setLoad] = useState<boolean>(true)
  const TIMER = useRef<any>({})
  const wrapperRef = useRef<HTMLDivElement>(null)

  const dataMemo = useMemo(() => {
    return conversionData(data, { id: 'string', url: 'string', title: 'string' })
  }, [data])

  const currentIndexMemo = useMemo(() => {
    const i = carouselActive(dataMemo, type, index, defaultId)
    setCurrentIndex(i)
    return i
  }, [JSON.stringify(dataMemo), type, JSON.stringify(index), JSON.stringify(defaultId)])

  const current = useRef<number>(currentIndexMemo)

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

  // 改变选中项首尾衔接
  useEffect(() => {
    if (swiper) {
      TIMER.current.indexChangeTimer && clearTimeout(TIMER.current.indexChangeTimer)
      if (swiper && !swiper.destroyed) {
        const _middleVal = Math.floor(data.length / 2)
        if (
          (current.current < currentIndexMemo && currentIndexMemo - current.current <= _middleVal) ||
          (current.current > currentIndexMemo && current.current - currentIndexMemo <= _middleVal)
        ) {
          swiper.slideToLoop(currentIndexMemo)
        } else if (current.current - currentIndexMemo > 0 && current.current - currentIndexMemo > _middleVal) {
          swiper.slideToLoop(data.length + currentIndexMemo)
          TIMER.current.indexChangeTimer = setTimeout(() => {
            swiper.slideToLoop(currentIndexMemo, 0, false)
          }, switchSpeed)
        } else if (current.current - currentIndexMemo < 0 && currentIndexMemo - current.current > _middleVal) {
          swiper.slideToLoop(currentIndexMemo - data.length)
          TIMER.current.indexChangeTimer = setTimeout(() => {
            swiper.slideToLoop(currentIndexMemo, 0, false)
          }, switchSpeed)
        }
        current.current = currentIndexMemo
      }
    }
  }, [swiper, currentIndexMemo, switchSpeed])

  useEffect(() => {
    setLoad(false)
    TIMER.current.loadTimer && clearTimeout(TIMER.current.loadTimer)
    TIMER.current.loadTimer = setTimeout(() => {
      setLoad(true)
    }, 200)
    return () => {
      TIMER.current.loadTimer && clearTimeout(TIMER.current.loadTimer)
    }
  }, [w, h, mode, carouseEffect, switchSpeed, JSON.stringify(carouselConfig)])

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
    carouselDis && moveStay && swiper.autoplay.stop()
  }

  function wrapperMouseleave() {
    carouselDis && moveStay && swiper.autoplay.start()
  }

  const getVideoSteamContain = useCallback(
    (item: DataMap, index: number) => {
      const url = item.url

      const videoRef = ref => {
        const video = ref?.videoRef
        if (video) {
          if (currentIndex === index) {
            ref.type === 'hls' && video.startLoad()
          } else {
            ref.type === 'hls' && video.stopLoad()
          }
        }
      }

      const steamConfig = Object.assign({}, videoConfig, { w, h, path: url })

      return <SwiperSlide key={index}>{url && <LczVideoStream ref={videoRef} {...steamConfig} />}</SwiperSlide>
    },
    [JSON.stringify(data), w, h, JSON.stringify(videoConfig), currentIndex]
  )

  function onSlideChange(sw: SwiperClass) {
    TIMER.current.slideTimer && clearTimeout(TIMER.current.slideTimer)
    TIMER.current.slideTimer = setTimeout(() => {
      setCurrentIndex(sw.realIndex)
      if (dataMemo[sw.realIndex]) {
        onChange && onChange(dataMemo[sw.realIndex])
      }
    }, 300)
  }

  const reverseDirection = position === 'after' ? false : true

  const pagerSetting = {
    clickable: true,
    renderBullet: (_, className) => {
      return '<span class=" swiper-no-swiping ' + className + '"></span>'
    }
  }

  return (
    <LczComCon>
      <CarouselVideoSteamWrapper
        mode={mode}
        pagerConfig={pagerConfig}
        className='lcz-carousel-video-stream'
        ref={wrapperRef}>
        {load && (
          <Swiper
            className={`${pointerEvents ? 'disable' : ''}`}
            style={{ width: w, height: h }}
            autoplay={
              carouselDis
                ? { delay: autoplaySpeed * 1000, disableOnInteraction: false, stopOnLastSlide: true, reverseDirection }
                : false
            }
            pagination={pagerConfig.display ? pagerSetting : false}
            loop
            speed={switchSpeed}
            loopedSlides={Math.ceil(data.length / 2)}
            direction={mode}
            initialSlide={currentIndexMemo}
            //@ts-ignore
            effect={carouseEffect}
            fadeEffect={{ crossFade: true }}
            flipEffect={{ limitRotation: false }}
            cubeEffect={{ shadowScale: 1 }}
            lazy
            onSlideChange={onSlideChange}
            onInit={(sw: SwiperClass) => setSwiper(sw)}>
            {dataMemo?.length && dataMemo.map((item, i) => getVideoSteamContain(item, i))}
          </Swiper>
        )}
      </CarouselVideoSteamWrapper>
    </LczComCon>
  )
})
