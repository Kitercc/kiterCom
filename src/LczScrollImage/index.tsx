import React, { memo, useMemo, useEffect, useRef, useState, CSSProperties } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination, Navigation, Lazy } from 'swiper'
import SwiperClass from 'swiper/types/swiper-class'
import LczComCon from '../common/LczComCon'
import { ScrollImageProps, DataMap } from './type'
import { Image } from 'antd'
import { conversionData } from '../common/util'
import {
  defaultAnimationConfig,
  defaultGlobalConfig,
  defaultImgArrowConfig,
  defaultScrollImageConfig
} from './common/defaultValue'
import { ScrollImageWrapper } from './style'
import { usemEffect, usemMemo } from '../common/hooks'
import Arrow from '../LczCircularTarget/components/Arrow'

SwiperCore.use([Autoplay, Pagination, Navigation, Lazy])

export default memo(function LczScrollImage(props: ScrollImageProps) {
  const {
    global = defaultGlobalConfig,
    imgConfig = defaultScrollImageConfig,
    animationConfig = defaultAnimationConfig,
    arrowConfig = defaultImgArrowConfig,
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
    } = animationConfig.carouselConfig,
    { clickCenter = true, switchSpeed = 1000, scrollNums = 'oneItem' } = animationConfig

  const wrapperRef = useRef<HTMLDivElement>(null)
  const timer = useRef<any>(null)
  // @ts-ignore
  const [swiper, setSwiper] = useState<SwiperClass>(null)
  const [load, setLoad] = useState<boolean>(true)
  const [newImgArray, setNewImgArray] = useState<any[]>([])

  usemEffect(() => {
    const _arr: any[] = []
    const conData = conversionData(data, { id: 'string', url: 'string' })
    conData.map(item => {
      _arr.push(getImgUrl(item, imgConfig.imgSeries))
    })

    setNewImgArray(_arr)
  }, [data, imgConfig.imgSeries, global.imgNums])

  usemEffect(() => {
    setLoad(false)
    timer.current = setTimeout(() => {
      setLoad(true)
    }, 500)
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [w, h, animationConfig, global, data, imgConfig])

  function getImgUrl(item: DataMap, imgSeries: DataMap[]) {
    const { url, id } = item
    if (url) return item
    if (!imgSeries || imgSeries.length <= 0) return { id, url: '' }
    const findArr = imgSeries.filter(page => page.id == id.split('$')[0])
    if (findArr.length <= 0) return { id, url: '' }
    const _findItem = findArr[findArr.length - 1]
    if (!_findItem.url) return { id, url: '' }
    return _findItem
  }

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

  const swiperAutoplay = {
    delay: autoplaySpeed * 1000,
    disableOnInteraction: false,
    reverseDirection: position === 'before' ? true : false
  }
  const slideNums = Math.min(global.imgNums, data.length)

  useEffect(() => {
    wrapperRef.current?.addEventListener('mouseenter', wrapperMouseenter)
    wrapperRef.current?.addEventListener('mouseleave', wrapperMouseleave)

    return () => {
      wrapperRef.current && wrapperRef.current?.removeEventListener('mouseenter', wrapperMouseenter)
      wrapperRef.current && wrapperRef.current?.removeEventListener('mouseleave', wrapperMouseleave)
    }
  }, [swiper])

  // functions
  function wrapperMouseenter() {
    carouselDis && moveStay && swiper?.autoplay && swiper.autoplay.stop()
  }

  function wrapperMouseleave() {
    carouselDis && moveStay && swiper?.autoplay && swiper.autoplay.start()
  }

  function onImgEvent(item: DataMap, type: string) {
    switch (type) {
      case 'click':
        onClick && onClick({ ...item })
        break
      case 'mouseEnter':
        onMouseenter && onMouseenter({ ...item })
        break
      case 'mouseLeave':
        onMouseleave && onMouseleave({ ...item })
        break
    }
  }

  const getContainer = () => {
    if (!data || data.length <= 0) return null
    return newImgArray.map((item, i) => {
      return (
        <SwiperSlide key={i + item.id}>
          {item.url && (
            <div
              onClick={() => onImgEvent(item, 'click')}
              onMouseEnter={() => onImgEvent(item, 'mouseEnter')}
              onMouseLeave={() => onImgEvent(item, 'mouseLeave')}
              className='scroll-img'
              style={{ ...imgFill, backgroundImage: `url(${item.url})` }}>
              {imgConfig.clickPreview && !pointerEvents && (
                <Image style={{ height: '100%', width: '100%' }} src={item.url} alt='' />
              )}
            </div>
          )}
        </SwiperSlide>
      )
    })
  }

  const imgFill = usemMemo(() => {
    const { fillStyle } = imgConfig
    const imgFillStyle: CSSProperties = {
      backgroundSize: '100% 100%',
      backgroundColor: imgConfig.bgColor
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
  }, [imgConfig.fillStyle, imgConfig.bgColor, global])

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <ScrollImageWrapper
        global={global}
        arrowConfig={arrowConfig}
        className='lcz-scroll-image-wrapper'
        ref={wrapperRef}>
        <>
          {arrowConfig.display && (
            <div className='lcz-scroll-page-prev'>
              <Arrow
                {...arrowConfig}
                direction={global.mode === 'horizontal' ? 'left' : 'top'}
                onClick={() => swiper && swiper.slidePrev()}
              />
            </div>
          )}
          {arrowConfig.display && (
            <div className='lcz-scroll-page-next'>
              <Arrow
                {...arrowConfig}
                direction={global.mode === 'horizontal' ? 'right' : 'bottom'}
                onClick={() => swiper && swiper.slideNext()}
              />
            </div>
          )}
        </>
        {load && (
          <Swiper
            className={`${pointerEvents ? 'disable' : ''}`}
            autoplay={carouselDis ? { ...swiperAutoplay } : false}
            pagination={false}
            navigation={false}
            loop={true}
            speed={switchSpeed}
            slidesPerView={slideNums}
            slidesPerGroup={scrollNums == 'oneItem' ? 1 : slideNums}
            loopFillGroupWithBlank={true}
            spaceBetween={global.gap}
            direction={global.mode}
            centeredSlides={scrollNums == 'oneItem' ? clickCenter : false}
            slideToClickedSlide={scrollNums == 'oneItem' ? clickCenter : false}
            allowTouchMove={false}
            style={{ width: w, height: h }}
            onInit={(sw: SwiperClass) => setSwiper(sw)}>
            {getContainer()}
          </Swiper>
        )}
      </ScrollImageWrapper>
    </LczComCon>
  )
})
