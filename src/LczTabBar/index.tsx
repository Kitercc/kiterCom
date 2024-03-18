import React, { memo, useEffect, useMemo, useState, useRef } from 'react'
import LczComCon from '../common/LczComCon'
import { checkOption, conversionData } from '../common/util'
import { getBgColor, getShadow, getTextColor } from './common'
import { TabsWrapper } from './style'
import { TabsOptions, TabsProps, Color } from './type'
import {
  defaultGlobalTextStyle,
  defaultOrdTextConfig,
  defaultOrdHoverStyle,
  defaultOrdStyleConfig,
  defaultGlideLine,
  defaultFocusHoverStyle,
  defaultFocusStyleConfig,
  defaultBoxShadow,
  defaultTabSize,
  defaultIconConfig,
  defaultIconArrowConfig,
  defaultRemarkConfig,
  defaultCarousel
} from './common/defaultVal'
import TabbarItem from './components/TabbarItem'
import Arrow from './components/Arrow'

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

const LczTabBar = memo((props: TabsProps = {}) => {
  const {
    tabCarousel = defaultCarousel,
    type = 'index',
    index = { value: 0 },
    defaultId = { value: '1' },
    tabsConfig = {},
    remarkConfig = defaultRemarkConfig,
    data = [],
    onClick,
    onChange
  } = props

  // props解构
  const {
    globalConfig = {},
    ordStyleConfig = defaultOrdStyleConfig,
    focusStyleConfig = defaultFocusStyleConfig
  } = tabsConfig

  const {
    tabType = 'ord', // 滚动 roll 普通 ord 多行 multi
    tabSize = defaultTabSize,
    ordArrangement = 'horizontal',
    rollArrangement = 'horizontal',
    spacing = 2,
    textStyle = defaultGlobalTextStyle,
    iconConfig = defaultIconConfig,
    iconArrowConfig = defaultIconArrowConfig
  } = globalConfig

  const {
    ordTextConfig = defaultOrdTextConfig,
    ordHoverStyle = defaultOrdHoverStyle,
    bgConfig,
    inShadow = defaultBoxShadow,
    outShadow = defaultBoxShadow
  } = ordStyleConfig

  const {
    focusTextConfig = defaultOrdTextConfig,
    focusHoverStyle = defaultFocusHoverStyle,
    glideLine = defaultGlideLine
  } = focusStyleConfig

  const { interval = 1000, display: carouselDisplay = false, clickInterval = 20000, stopCondition = '' } = tabCarousel

  const { rollWidthOrHeight = 100, selfAdaption = false } = tabSize
  const { noSelfDiscountLine = {}, selfDiscountLine = {} } = textStyle

  // hooks

  const dataRef = useRef<{ data: TabsOptions[]; id: any; timer: any }>({ data: [], id: 0, timer: null })

  const arrangement = useMemo(() => {
    switch (tabType) {
      case 'ord':
        return ordArrangement
      case 'roll':
        return rollArrangement
      default:
        return ordArrangement
    }
  }, [tabType, ordArrangement, rollArrangement])

  const discountLine = useMemo(() => {
    if (!selfAdaption || tabType === 'ord' || (tabType === 'roll' && rollArrangement === 'vertical')) {
      return noSelfDiscountLine
    }
    return selfDiscountLine
  }, [selfAdaption, noSelfDiscountLine, selfDiscountLine, rollArrangement, tabType])

  const dataMemo = useMemo(() => {
    let newData: TabsOptions[] = []
    if (data && data.length > 0) {
      newData = conversionData(data, { id: 'string', content: 'string', remark: 'string' })
    } else {
      newData = []
    }
    dataRef.current.data = [...newData]
    return newData
  }, [JSON.stringify(data)])

  const [actionId, setAction] = useState<any>(dataMemo[0]?.id)
  const [scrollX, SetScrollX] = useState({ x: 0, y: 0 })
  const [animate, setAnimate] = useState(true)

  const scroll = useRef(0)
  const timer: any = useRef(null)
  const clickTimer: any = useRef(null)

  const idsIndex = useRef<number>(0)
  const tabsWrapper: any = useRef(null)
  const wrapper: any = useRef(null)
  const [rightMax, setRightMax] = useState(0)
  const [bottomMax, setBottomMax] = useState(0)

  useEffect(() => {
    if (type === 'index') {
      const checkId = checkOption(dataMemo, type, index, defaultId)
      dataRef.current.id = checkId
      setAction(checkId)
    }
  }, [JSON.stringify(dataMemo), type, JSON.stringify(index)])

  useEffect(() => {
    if (type === 'id') {
      const checkId = checkOption(dataMemo, type, index, defaultId)
      dataRef.current.id = checkId
      setAction(checkId)
    }
  }, [JSON.stringify(defaultId), type, JSON.stringify(dataMemo)])

  // 鼠标滚轮事件 显示tab项
  useEffect(() => {
    scroll.current = 0
    SetScrollX({ x: 0, y: 0 })

    if (tabType === 'roll') {
      tabsWrapper.current.addEventListener('touchstart', touchstart, false)
      tabsWrapper.current.addEventListener('touchmove', touchmove, false)
      tabsWrapper.current.addEventListener('touchend', touchend, false)
    }

    return () => {
      if (tabsWrapper.current) {
        tabsWrapper.current.removeEventListener('touchstart', touchstart, false)
        tabsWrapper.current.removeEventListener('touchmove', touchmove, false)
        tabsWrapper.current.removeEventListener('touchend', touchend, false)
      }
    }
  }, [tabType, arrangement, rollWidthOrHeight])

  useEffect(() => {
    setTimeout(() => {
      if (rollArrangement == 'horizontal') {
        setRightMax(tabsWrapper.current.offsetWidth - wrapper.current.offsetWidth - 2)
      } else {
        setRightMax(tabsWrapper.current.offsetWidth - wrapper.current.offsetWidth)
      }
      setBottomMax(tabsWrapper.current.offsetHeight - wrapper.current.offsetHeight)
    }, 300)
  }, [rollArrangement])

  // 根据传递过来的值 开启轮播
  useEffect(() => {
    const ids = dataMemo.map(v => v.id)
    timer.current && clearInterval(timer.current)
    carouselDisplay && tabCarouselHandle(ids)

    // 页面隐藏清除定时器

    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
    document.addEventListener(visibilityChangeEvent, windowHide)

    return () => {
      clearInterval(timer.current)
      clearTimeout(clickTimer.current)
      document.removeEventListener(visibilityChangeEvent, windowHide)
    }
  }, [interval, carouselDisplay, stopCondition, JSON.stringify(dataMemo)])

  function windowHide() {
    clearTimeout(clickTimer.current)
    const ids = dataMemo.map(v => v.id)
    if (!document[hiddenProperty]) {
      carouselDisplay && tabCarouselHandle(ids)
    } else {
      timer.current && clearInterval(timer.current)
    }
  }

  useEffect(() => {
    const _index = dataMemo.findIndex(item => item.id === actionId)
    const index = _index >= 0 ? _index : 0
    idsIndex.current = index
  }, [actionId])

  useEffect(() => {
    if (dataRef.current.data.length) {
      dataRef.current.timer = setTimeout(() => {
        const _index = dataRef.current.data.findIndex(v => v.id === dataRef.current.id)
        _index >= 0 && onChange && onChange(dataRef.current.data[_index], _index)
      }, 100)
    }
    return () => {
      dataRef.current.timer && clearTimeout(dataRef.current.timer)
    }
  }, [dataRef.current.id])

  // function

  // 移动端手指摁下事件
  const touchstart = e => {
    setAnimate(false)
    tabsWrapper.current.tx = e.touches[0].pageX
    tabsWrapper.current.ty = e.touches[0].pageY
    document.body.style.overflow = 'hidden'
  }

  // 移动端手指移动事件
  const touchmove = e => {
    const { offsetWidth: wrapper_w, offsetHeight: wrapper_h, tx, ty } = tabsWrapper.current
    const { offsetWidth: tab_w, offsetHeight: tab_h } = wrapper.current
    const mouseX = e.touches[0].pageX
    const mouseY = e.touches[0].pageY

    // 水平滑动
    if (arrangement === 'horizontal') {
      const _stepX = mouseX - tx
      if (scroll.current >= 0 && _stepX > 0) {
        scroll.current = 0
      } else {
        if (tab_w - wrapper_w <= Math.abs(scroll.current) && _stepX < 0) {
          scroll.current = -(tab_w - wrapper_w)
        } else {
          scroll.current = scroll.current + _stepX
        }
      }
      SetScrollX({ x: scroll.current, y: 0 })
    } else if (arrangement === 'vertical') {
      // 垂直
      const _stepY = mouseY - ty
      if (scroll.current >= 0 && _stepY > 0) {
        scroll.current = 0
      } else {
        if (tab_h - wrapper_h <= Math.abs(scroll.current) && _stepY < 0) {
          scroll.current = -(tab_h - wrapper_h)
        } else {
          scroll.current = scroll.current + _stepY
        }
      }
      SetScrollX({ x: 0, y: scroll.current })
    }

    tabsWrapper.current.tx = mouseX
    tabsWrapper.current.ty = mouseY
  }

  const touchend = () => {
    setAnimate(true)
    document.body.style.overflow = 'auto'
  }

  // 开启轮播 将激活tab项显示与可视区域
  const tabCarouselHandle = ids => {
    if (stopCondition === '' || !stopCondition || stopCondition == 'Execute Expression Error') {
      timer.current = setInterval(() => {
        idsIndex.current++
        if (idsIndex.current + 1 > ids.length) {
          idsIndex.current = 0
          scroll.current = 0
          SetScrollX({ x: 0, y: 0 })
          setAction(ids[0])
        } else {
          const nodeItem = wrapper.current.children[idsIndex.current]
          const tabWrapperWidth = tabsWrapper.current.offsetWidth
          const tabWrapperHeight = tabsWrapper.current.offsetHeight
          if (arrangement === 'horizontal') {
            const offset = nodeItem.offsetLeft + nodeItem.offsetWidth
            if (offset + scroll.current >= tabWrapperWidth) {
              scroll.current = -(offset - tabWrapperWidth)
              SetScrollX({ x: scroll.current, y: 0 })
            }
          } else {
            const offsetH = nodeItem.offsetHeight + nodeItem.offsetTop
            if (offsetH + scroll.current >= tabWrapperHeight) {
              scroll.current = -(offsetH - tabWrapperHeight)
              SetScrollX({ x: 0, y: scroll.current })
            }
          }
          setAction(ids[idsIndex.current])
        }
        const param = dataMemo.filter(v => v.id === ids[idsIndex.current])[0]
        onChange && onChange(param, idsIndex.current)
      }, interval)
    } else {
      clearInterval(timer.current)
    }
  }

  // tabs 的 点击事件
  const tabsClick = (id, item, i, e) => {
    timer.current && clearInterval(timer.current)
    clickTimer.current && clearInterval(clickTimer.current)
    e.stopPropagation()
    onClick && onClick(item, i, e)

    if (carouselDisplay) {
      const Interval = clickInterval - interval > 0 ? clickInterval - interval : 50
      clickTimer.current = setTimeout(() => {
        tabCarouselHandle(dataMemo.map(v => v.id))
      }, Interval)
    }

    if (id !== actionId) {
      setAction(() => {
        onChange && onChange(item, i)
        return id
      })
    }

    // 点击不完全显示的tab项 将该项完全显示于可视区域
    const offset = e.target.offsetLeft + e.target.offsetWidth
    const tabWrapperWidth = tabsWrapper.current.offsetWidth - 2
    const tabWrapperHeight = tabsWrapper.current.offsetHeight
    const offsetH = e.target.offsetHeight + e.target.offsetTop

    if (offset + scroll.current >= tabWrapperWidth && tabType === 'roll' && arrangement === 'horizontal') {
      if (rollWidthOrHeight >= tabWrapperWidth) return
      // 触碰到最右边
      if ((Math.abs(scroll.current) === tabWrapperWidth, offset) && i !== dataMemo.length - 1) {
        scroll.current += -e.target.offsetWidth - spacing
        SetScrollX({ x: scroll.current, y: 0 })
        return
      } else if (i === dataMemo.length - 1) {
        scroll.current = -offset + tabWrapperWidth
        SetScrollX({ x: scroll.current, y: 0 })
      }
      // // 开启滚动 并且排列方式为水平
    } else if (offset + scroll.current <= e.target.offsetWidth && tabType === 'roll' && arrangement === 'horizontal') {
      if (rollWidthOrHeight >= tabWrapperWidth) return
      if (i === 0) {
        scroll.current = 0
        SetScrollX({ x: scroll.current, y: 0 })
        return
      } else {
        scroll.current = scroll.current + e.target.offsetWidth + spacing
        SetScrollX({ x: scroll.current, y: 0 })
      }
    }
    // 开启滚动 并且排列方式为垂直
    if (offsetH + scroll.current >= tabWrapperHeight && tabType === 'roll' && arrangement === 'vertical') {
      if (rollWidthOrHeight >= tabWrapperHeight) return
      if (i === dataMemo.length - 1) {
        scroll.current = -offsetH + tabWrapperHeight
      } else {
        scroll.current += -e.target.offsetHeight - spacing
      }
      SetScrollX({ x: 0, y: scroll.current })
      return
    } else if (offsetH + scroll.current <= e.target.offsetHeight && tabType === 'roll' && arrangement === 'vertical') {
      if (rollWidthOrHeight >= tabWrapperHeight) return
      if (i === 0) {
        scroll.current = 0
        SetScrollX({ x: 0, y: scroll.current })
      } else {
        scroll.current = scroll.current + e.target.offsetHeight + spacing
        SetScrollX({ x: 0, y: scroll.current })
      }
    }
  }

  //箭头的点击
  const arrowClick = (type: string) => {
    timer.current && clearInterval(timer.current)
    clickTimer.current && clearInterval(clickTimer.current)
    if (carouselDisplay) {
      const Interval = clickInterval - interval > 0 ? clickInterval - interval : 50
      clickTimer.current = setTimeout(() => {
        tabCarouselHandle(dataMemo.map(v => v.id))
      }, Interval)
    }

    if (!selfAdaption) {
      if (iconArrowConfig.scrollWay == 'toDistance') {
        arrowToDistance(type)
      } else {
        arrowToNumber(type)
      }
    } else {
      arrowToDistance(type)
    }
  }

  //点击箭头按距离移动
  const arrowToDistance = (type: string) => {
    if (type == 'left') {
      scroll.current += iconArrowConfig?.scrollDistance || 102
      if (scroll.current >= 0) scroll.current = 0
      SetScrollX({ x: scroll.current, y: 0 })
    }
    if (type == 'right') {
      scroll.current += -(iconArrowConfig?.scrollDistance || 102)
      if (scroll.current <= rightMax) scroll.current = rightMax
      SetScrollX({ x: scroll.current, y: 0 })
    }
    if (type == 'top') {
      scroll.current += iconArrowConfig?.scrollDistance || 102
      if (scroll.current >= 0) scroll.current = 0
      SetScrollX({ x: 0, y: scroll.current })
    }
    if (type == 'bottom') {
      scroll.current += -(iconArrowConfig?.scrollDistance || 102)
      if (scroll.current <= bottomMax) scroll.current = bottomMax
      SetScrollX({ x: 0, y: scroll.current })
    }
  }

  //点击箭头按数量移动
  const arrowToNumber = (type: string) => {
    const scrollNumber = iconArrowConfig?.scrollNumber || 1,
      itemWidth = (wrapper.current.offsetWidth + 2) / dataMemo.length,
      itemHeight = wrapper.current.offsetHeight / dataMemo.length
    if (type == 'left') {
      scroll.current += scrollNumber * itemWidth
      if (scroll.current >= 0) scroll.current = 0
      SetScrollX({ x: scroll.current, y: 0 })
    }
    if (type == 'right') {
      scroll.current += -scrollNumber * itemWidth
      if (scroll.current <= rightMax) scroll.current = rightMax
      SetScrollX({ x: scroll.current, y: 0 })
    }
    if (type == 'top') {
      scroll.current += scrollNumber * itemHeight
      if (scroll.current >= 0) scroll.current = 0
      SetScrollX({ x: 0, y: scroll.current })
    }
    if (type == 'bottom') {
      scroll.current += -scrollNumber * itemHeight
      if (scroll.current <= bottomMax) scroll.current = bottomMax
      SetScrollX({ x: 0, y: scroll.current })
    }
  }

  // 处理文字颜色
  const itemTextColorMemo = useMemo(() => {
    const _obj: {
      ordColor?: Color
      ordHoverColor?: Color
      focusColor?: Color
      focusHoverColor?: Color
    } = {}
    _obj.ordColor = getTextColor(ordTextConfig.newcolor)
    _obj.ordHoverColor = getTextColor(ordHoverStyle.ordTextHover?.newcolor)
    _obj.focusColor = getTextColor(focusTextConfig?.newcolor)
    _obj.focusHoverColor = getTextColor(focusHoverStyle.focusTextHover?.newcolor)
    return _obj
  }, [
    JSON.stringify(ordTextConfig.newcolor),
    JSON.stringify(ordHoverStyle.ordTextHover?.newcolor),
    JSON.stringify(focusTextConfig?.newcolor),
    JSON.stringify(focusHoverStyle.focusTextHover?.newcolor)
  ])

  // 处理背景颜色
  const itemBgcolorMemo = useMemo(() => {
    const _obj: { ordBgStyle: string; hoverBgStyle: string; focusBgColor: string; focusHoverBgColor: string } = {
      ordBgStyle: '',
      hoverBgStyle: '',
      focusBgColor: '',
      focusHoverBgColor: ''
    }

    _obj.ordBgStyle = getBgColor(bgConfig, 'ordtype')
    _obj.hoverBgStyle = getBgColor(ordHoverStyle.Hoverbackground, 'ordHovertype')
    _obj.focusBgColor = getBgColor(focusStyleConfig.focusBg, 'focustype')
    _obj.focusHoverBgColor = getBgColor(focusHoverStyle.focusHoverBg, 'focusHovertype')

    return _obj
  }, [
    JSON.stringify(bgConfig),
    JSON.stringify(ordHoverStyle.Hoverbackground),
    JSON.stringify(focusStyleConfig.focusBg),
    JSON.stringify(focusHoverStyle.focusHoverBg)
  ])

  const itemShadowMemo = useMemo(() => {
    return {
      ord: getShadow(outShadow, inShadow).boxShadow,
      focus: getShadow(focusStyleConfig.outShadow, focusStyleConfig.inShadow).boxShadow
    }
  }, [JSON.stringify(outShadow), JSON.stringify(inShadow), JSON.stringify(focusStyleConfig)])

  return (
    <LczComCon className='lcz-tabbar-container' style={{ overflow: 'initial', position: 'relative' }}>
      <div className='tabs-arrow-box'>
        {iconArrowConfig.display && tabType == 'roll' && (
          <div className='lcz-tabs-page-prev'>
            <Arrow
              {...iconArrowConfig}
              direction={rollArrangement === 'horizontal' ? 'left' : 'top'}
              isDisabled={scrollX.x >= 0 && scrollX.y >= 0}
              onClick={value => arrowClick(value)}
            />
          </div>
        )}
        {iconArrowConfig.display && tabType == 'roll' && (
          <div className='lcz-tabs-page-next'>
            <Arrow
              {...iconArrowConfig}
              direction={rollArrangement === 'horizontal' ? 'right' : 'bottom'}
              isDisabled={scrollX.x <= rightMax && scrollX.y <= bottomMax}
              onClick={value => arrowClick(value)}
            />
          </div>
        )}
      </div>
      <TabsWrapper
        className='tabs-wrapper'
        focusStyleConfig={focusStyleConfig}
        globalConfig={globalConfig}
        ordStyleConfig={ordStyleConfig}
        itemBgcolorMemo={itemBgcolorMemo}
        itemTextColorMemo={itemTextColorMemo}
        len={dataMemo.length}
        discountLine={discountLine}
        arrangement={arrangement}
        focusTextConfig={focusTextConfig}
        glideLine={glideLine}
        iconConfig={iconConfig}
        focusShadow={itemShadowMemo.focus}
        ref={tabsWrapper}>
        <div
          className='wrapper-box'
          style={{
            transform: `translate(${scrollX.x}px,${scrollX.y}px)`,
            transition: animate ? 'transform .3s' : 'none'
          }}
          ref={wrapper}>
          {dataMemo.map((v, i) => (
            <TabbarItem
              key={i}
              item={v}
              style={{
                fontFamily: textStyle.fontFamily,
                letterSpacing: textStyle.letterSpacing,
                boxShadow: itemShadowMemo.ord
              }}
              arrangement={arrangement}
              remarkConfig={remarkConfig}
              className={`tabs-items ${v.id === actionId ? 'tabs-action' : ''}`}
              actionId={actionId}
              discountLine={discountLine}
              itemTextColorMemo={itemTextColorMemo}
              iconConfig={iconConfig}
              onClick={e => tabsClick(v.id, v, i, e)}
            />
          ))}
        </div>
      </TabsWrapper>
    </LczComCon>
  )
})

LczTabBar.displayName = 'LczTabBar'

export default LczTabBar
