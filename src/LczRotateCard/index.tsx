/* eslint-disable indent */
import React, { memo, useEffect, useState, useLayoutEffect, useMemo, useRef } from 'react'
import LczComCon from '../common/LczComCon'
import CardItem from './components/Card'

import {
  defailtGlobal,
  defaultAnimate,
  defaultArrowConfig,
  defaultCameraPosition,
  defaultCarousel,
  defaultCurrentStyle,
  defaultHoverStyle,
  defaultNormalCard,
  defaultTrackConfig
} from './common/defaultValue'
import { RotateCardProps } from './type'
import { CircularWrapper } from './style'
import Arrow from './components/Arrow'
import { conversionData, randomChar, resMobile } from '../common/util'
import { Carousel3D } from '../LczCircularTarget/common/carousel3D'

export default memo(function LczRotateCard(props: RotateCardProps) {
  const {
    h = 300,
    id = '',
    global = defailtGlobal,
    animate = defaultAnimate,
    trackConfig = defaultTrackConfig,
    cameraPosition = defaultCameraPosition,
    normalCard = defaultNormalCard,
    hoverStyle = defaultHoverStyle,
    currentStyle = defaultCurrentStyle,
    arrowConfig = defaultArrowConfig,
    cardLineContent = [],
    imgSeries = [],
    onClick,
    onChange,
    onMouseenter,
    onMouseleave,
    data = []
  } = props
  const { switchSpeed, carousel = defaultCarousel } = animate
  const { display: carouselDis = true, stopCondition = true, speed = 10, position = 1, movePause = true } = carousel
  const { radius = 800, rearNot = true, proportion = 0 } = trackConfig

  const [moveStatus, setMoveStatus] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const carouseRef = useRef<any>(null)
  const frequency = useRef<number>(0)
  const boxId = useRef<any>(randomChar())
  const isMobile = useRef<'pc' | 'mobile'>(resMobile())

  const dataMemo = useMemo(() => {
    return conversionData(data, { name: 'string', value: 'number', icon: 'string', id: 'string', link: 'string' })
  }, [data])

  const currentIndexMemo = useMemo(() => {
    const { type = 'index', index = { value: 0 }, defaultId = { value: '1' } } = global
    let _index = 0
    if (!dataMemo || dataMemo.length <= 0) return _index

    switch (type) {
      case 'index': {
        const _val = index.value
        _index = isNaN(_val) ? 0 : _val < 0 ? 0 : _val > dataMemo.length - 1 ? dataMemo.length - 1 : _val
        break
      }
      case 'id': {
        const _i = dataMemo.findIndex(item => item.id == defaultId.value)
        _index = _i >= 0 ? _i : 0
        break
      }
    }
    return _index
  }, [JSON.stringify(global), JSON.stringify(dataMemo)])

  const [currentIndex, setCurrentIndex] = useState(currentIndexMemo)

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      carouseRef.current = new Carousel3D({
        el: wrapperRef.current as HTMLDivElement,
        itemsClass: 'lcz-rotate-card-items',
        rotation: carouselDis && !stopCondition,
        direction: position,
        speed: speed * 1000,
        currentIndex: currentIndex || 0,
        radius: radius,
        cameraPosition: cameraPosition,
        proportion: rearNot ? proportion : 0,
        switchSpeed: switchSpeed,
        normalOpacity: normalCard.opacity,
        allAlongpositive: true,
        onChange: i => {
          setCurrentIndex(i)
          onChange && onChange(dataMemo[i], i)
        }
      })
    }
    return () => {
      carouseRef.current && carouseRef.current.destroy()
      carouseRef.current = null
    }
  }, [dataMemo?.length, switchSpeed, position, speed, carouselDis, rearNot, radius, proportion, JSON.stringify(cameraPosition), normalCard.opacity])

  useEffect(() => {
    setCurrentIndex(+currentIndexMemo)
    carouseRef.current && carouseRef.current.setCurrentIndex(+currentIndexMemo)
  }, [dataMemo?.length, currentIndexMemo])

  useEffect(() => {
    if (frequency.current && carouseRef.current) {
      if (carouselDis) {
        // eslint-disable-next-line no-extra-boolean-cast
        if (Boolean(stopCondition)) {
          carouseRef.current.stopRotation()
        } else {
          carouseRef.current.init()
        }
      } else {
        carouseRef.current.stopRotation()
      }
    }
    frequency.current = 1

    return () => {
      carouseRef.current && carouseRef.current.stopRotation()
    }
  }, [JSON.stringify(dataMemo), stopCondition, carouselDis])

  useEffect(() => {
    containerRef.current?.addEventListener(isMobile.current === 'pc' ? 'mouseenter' : 'touchstart', mouseenter)
    containerRef.current?.addEventListener('mouseleave', mouseleave)
    if (isMobile.current === 'mobile') document.addEventListener('click', otherHandlerClick)
    return () => {
      containerRef.current &&
        containerRef.current?.removeEventListener(isMobile.current === 'pc' ? 'mouseenter' : 'touchstart', mouseenter)
      containerRef.current && containerRef.current?.removeEventListener('mouseleave', mouseleave)
      document.removeEventListener('click', otherHandlerClick)
    }
  }, [currentIndex, isMobile.current, moveStatus])

  function mouseenter() {
    setMoveStatus(true)
    onMouseenter && onMouseenter(dataMemo[currentIndex])
    movePause && (carouseRef.current.mouseStop = true)
    movePause && carouseRef.current.stopRotation(false)
  }

  function mouseleave() {
    setMoveStatus(false)
    onMouseleave && onMouseleave(dataMemo[currentIndex])
    movePause && (carouseRef.current.mouseStop = false)
    movePause && carouseRef.current.init()
  }

  function otherHandlerClick(e: any) {
    //@ts-ignore
    const flag = $(e.target).closest(`#${boxId.current}`).length > 0
    if (isMobile.current === 'mobile' && !flag && moveStatus) {
      mouseleave()
    }
  }

  function handleClick(item, i) {
    onClick && onClick(item, i)
  }

  return (
    <LczComCon ref={containerRef} id={boxId.current} className='lcz-rotate-card-wrapper'>
      <CircularWrapper arrowConfig={arrowConfig} style={{ perspective: 120 * Math.floor(h / 100) }}>
        {arrowConfig.display && (
          <div className='lcz-rotate-card-pre'>
            <Arrow {...arrowConfig} direction='left' onClick={() => carouseRef.current.decrement()} />
          </div>
        )}
        {arrowConfig.display && (
          <div className='lcz-rotate-card-next'>
            <Arrow {...arrowConfig} direction='right' onClick={() => carouseRef.current.increment()} />
          </div>
        )}
        <div className='lcz-rotate-card-container' ref={wrapperRef}>
          {dataMemo && dataMemo.length
            ? dataMemo.map((item, index) => (
                <CardItem
                  id={id}
                  currentIndex={currentIndex}
                  cardLineContent={cardLineContent}
                  normalCard={normalCard}
                  imgSeries={imgSeries}
                  key={index}
                  index={index}
                  item={item}
                  onClick={handleClick}
                  animate={animate}
                  hoverStyle={hoverStyle}
                  currentStyle={currentStyle}
                />
              ))
            : null}
        </div>
      </CircularWrapper>
    </LczComCon>
  )
})
