import React, { memo, useEffect, useMemo, useState, useRef } from 'react'

import LczComCon from '../common/LczComCon'
import { TabsWrapper } from './style'

import { TextStyle, GlobalTextStyle, TabsOptions, TabsProps, GlideLine, OrdStyleConfig, FocusStyleConfog } from './type'

const LczTabs = memo((props: TabsProps = {}) => {
  const defalutOption: TabsOptions[] = [
    { id: 1, content: '标签一' },
    { id: 2, content: '标签二' },
    { id: 3, content: '标签三' }
  ]
  const defaultTextStyle: GlobalTextStyle = { fontFamily: 'Microsoft YaHei', letterSpacing: 0 }

  const defaultOrdTextConfig: TextStyle = {
    fontFamily: 'Microsoft YaHei',
    fontSize: 20,
    color: '#fff',
    fontWeight: 400
  }
  const defaultOrdStyleConfig: OrdStyleConfig = {
    ordTextConfig: defaultOrdTextConfig,
    backgroundColor: 'rgba(255,255,255,0)',
    borderColor: '#3F464E',
    borderWidth: 1,
    borderRadius: 0,
    ordTextHover: defaultOrdTextConfig,
    HoverbackgroundColor: 'rgba(255,255,255,0)',
    HoverborderColor: '#3d99fc',
    HoverborderWidth: 2
  }
  const defaultGlideLine: GlideLine = { display: false, bgColor: '#3d99fc', width: 2 }

  const defaultFocusStyleConfig: FocusStyleConfog = {
    focusTextConfig: defaultOrdTextConfig,
    focusBgColor: 'rgba(61, 153, 252, .2)',
    focusBorderColor: 'rgba(61, 153, 252)',
    focusBorderWidth: 2,
    focusBorderRadius: 0,
    focusTextHover: defaultOrdTextConfig,
    focusHoverBgColor: 'rgba(61, 153, 252, .2)',
    focusHoverBorderColor: 'rgba(61, 153, 252)',
    focusHoverBorderWidth: 2,
    glideLine: defaultGlideLine
  }

  const {
    tabCarousel = {},
    defaultValue = 1,
    defaultData = defalutOption,
    tabsConfig = {},
    data = [],
    onClick,
    onChange,
    onDataChange
  } = props

  // props解构
  const {
    globalConfig = {},
    ordStyleConfig = defaultOrdStyleConfig,
    focusStyleConfig = defaultFocusStyleConfig
  } = tabsConfig

  const {
    tabType = 'ord',
    rollWidthOrHeight = 100,
    arrangement = 'horizontal',
    spacing = 2,
    tabBgColor = 'rgba(255,255,255,0)',
    alignType = 'center',
    textStyle = defaultTextStyle
  } = globalConfig

  const { ordTextConfig = defaultOrdTextConfig, ordTextHover = defaultOrdTextConfig } = ordStyleConfig

  const {
    focusTextConfig = defaultTextStyle,
    focusTextHover = defaultTextStyle,
    glideLine = defaultGlideLine
  } = focusStyleConfig

  const { interval = 1000, isOpen = false } = tabCarousel

  // hooks

  const dataMemo = useMemo(() => {
    let newData: TabsOptions[] = []
    if (data && data.length > 0) {
      newData = data
    } else {
      newData = defaultData
    }
    onDataChange && onDataChange(newData)
    return newData
  }, [data, defaultData])

  const [actionId, setAction] = useState(defaultValue || dataMemo[0].id)
  const [scrollX, SetScrollX] = useState({ x: 0, y: 0 })

  const scroll = useRef(0)
  const timer: any = useRef(0)

  const idsIndex: any = useRef(null)
  const tabsWrapper: any = useRef(null)
  const wrapper: any = useRef(null)
  const tabItems: any = useRef([])

  useEffect(() => {
    setAction(defaultValue)
  }, [defaultValue])

  // 鼠标滚轮事件 显示tab项
  useEffect(() => {
    scroll.current = 0
    SetScrollX({ x: 0, y: 0 })
    // tabsWrapper.current.addEventListener('mouseover', e => {
    //   window.onmousewheel = scrollFunc
    //   e.stopPropagation()
    //   document.addEventListener('DOMMouseScroll', scrollFunc)
    // })
    // tabsWrapper.current.addEventListener('mouseout', e => {
    //   window.onmousewheel = null
    //   e.stopPropagation()
    //   document.removeEventListener('DOMMouseScroll', scrollFunc)
    // })
  }, [tabType, arrangement, rollWidthOrHeight])

  // 根据传递过来的值 开启轮播
  useEffect(() => {
    const ids = dataMemo.map(v => v.id)
    clearInterval(timer.current)
    isOpen && tabCarouselHandle(ids)
    return () => {
      clearInterval(timer.current)
    }
  }, [interval, actionId, isOpen])

  // function

  // 开启轮播 将激活tab项显示与可视区域
  const tabCarouselHandle = ids => {
    timer.current = setInterval(() => {
      idsIndex.current = ids.indexOf(actionId)
      if (actionId === ids[ids.length - 1]) {
        scroll.current = 0
        SetScrollX({ x: 0, y: 0 })
        setAction(ids[0])
      } else {
        idsIndex.current++
        const nodeItem = tabItems.current[idsIndex.current]
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
    }, interval)
  }

  // 滚轮事件 将tabs 显示与可视区域
  // const scrollFunc = function (e) {
  //   e = e || window.event
  //   const maxX = wrapper.current.offsetWidth - tabsWrapper.current.offsetWidth

  //   const maxY = wrapper.current.offsetHeight - tabsWrapper.current.offsetHeight
  //   if (e.wheelDelta > 0) {
  //     if (tabType === 'roll' && arrangement === 'horizontal' && scroll.current < 0) {
  //       scroll.current += 10
  //       SetScrollX({ x: scroll.current, y: 0 })
  //     } else if (tabType === 'roll' && arrangement === 'vertical' && scroll.current < 0) {
  //       scroll.current += 10
  //       SetScrollX({ x: 0, y: scroll.current })
  //     }
  //   } else {
  //     if (tabType === 'roll' && arrangement === 'horizontal' && -scroll.current < maxX) {
  //       scroll.current -= 10
  //       SetScrollX({ x: scroll.current, y: 0 })
  //     } else if (tabType === 'roll' && arrangement === 'vertical' && -scroll.current < maxY) {
  //       scroll.current -= 10
  //       SetScrollX({ x: 0, y: scroll.current })
  //     }
  //   }
  // }

  // tabs 的 点击事件
  const tabsClick = (id, i, e) => {
    e.stopPropagation()
    onClick && onClick(id, e)
    if (id !== actionId) {
      setAction(() => {
        clearInterval(timer.current)
        isOpen && tabCarouselHandle(dataMemo.map(v => v.id))
        onChange && onChange(id, e)
        return id
      })
    }

    // 点击不完全显示的tab项 将该项完全显示于可视区域
    const offset = e.target.offsetLeft + e.target.offsetWidth
    const tabWrapperWidth = tabsWrapper.current.offsetWidth
    const tabWrapperHeight = tabsWrapper.current.offsetHeight
    const offsetH = e.target.offsetHeight + e.target.offsetTop
    // 开启滚动 并且排列方式为水平
    if (offset + scroll.current >= tabWrapperWidth && tabType === 'roll' && arrangement === 'horizontal') {
      scroll.current = -(offset - tabWrapperWidth)
      SetScrollX({ x: scroll.current, y: 0 })
      return
    } else {
      if (Math.ceil(-scroll.current / e.target.offsetWidth) === i + 1) {
        scroll.current = -e.target.offsetLeft
        SetScrollX({ x: scroll.current, y: 0 })
        return
      }
    }
    // 开启滚动 并且排列方式为垂直
    if (offsetH + scroll.current >= tabWrapperHeight && tabType === 'roll' && arrangement === 'vertical') {
      scroll.current = -(offsetH - tabWrapperHeight)
      SetScrollX({ x: 0, y: scroll.current })
      return
    } else {
      if (Math.ceil(-scroll.current / e.target.offsetHeight) === i + 1) {
        scroll.current = -e.target.offsetTop
        SetScrollX({ x: 0, y: scroll.current })
        return
      }
    }
  }

  return (
    <LczComCon>
      <TabsWrapper
        className='tabs-wrapper'
        focusTextHover={focusTextHover}
        focusStyleConfig={focusStyleConfig}
        ordStyleConfig={ordStyleConfig}
        ordTextHover={ordTextHover}
        tabType={tabType}
        len={dataMemo.length}
        rollWidthOrHeight={rollWidthOrHeight}
        spacing={spacing}
        arrangement={arrangement}
        tabBgColor={tabBgColor}
        alignType={alignType}
        ordTextConfig={ordTextConfig}
        focusTextConfig={focusTextConfig}
        glideLine={glideLine}
        ref={tabsWrapper}>
        <div className='wrapper-box' style={{ transform: `translate(${scrollX.x}px,${scrollX.y}px)` }} ref={wrapper}>
          {dataMemo.map((v, i) => (
            <div
              ref={node => tabItems.current.length < 5 && tabItems.current.push(node)}
              style={{ ...textStyle }}
              className={`tabs-items ${v.id === actionId ? 'tabs-action' : ''}`}
              key={v.id}
              onClick={e => tabsClick(v.id, i, e)}>
              {v.content}
            </div>
          ))}
        </div>
      </TabsWrapper>
    </LczComCon>
  )
})

LczTabs.displayName = 'LczTabs'

export default LczTabs
