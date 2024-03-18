import { Tooltip } from 'antd'
import React, { memo, useMemo, useState, useRef, useEffect, CSSProperties } from 'react'
import IconCon from '../../common/IconCon'
import { configDisplayCompatible } from '../../common/util'
import { defaultIconConfig, defaultNormalIcon, defaultRemarkConfig } from '../common/defaultVal'
import { TabBarItemIconWrapper } from '../style'
import { Color, DiscountLineConfig, IconConfig, IconStyleSeries, RemarkConfig, TabsOptions } from '../type'

interface TabbarItemProps {
  item: TabsOptions
  discountLine: DiscountLineConfig
  arrangement: string
  itemTextColorMemo: {
    ordColor?: Color | undefined
    ordHoverColor?: Color | undefined
    focusColor?: Color | undefined
    focusHoverColor?: Color | undefined
  }
  remarkConfig: RemarkConfig
  iconConfig: IconConfig
  actionId: number | string
  style: CSSProperties
  className: string
  onClick: any
}
export default memo(function TabbarItem(props: TabbarItemProps) {
  const {
    item,
    discountLine,
    itemTextColorMemo,
    iconConfig = defaultIconConfig,
    actionId,
    style,
    className,
    arrangement,
    remarkConfig = defaultRemarkConfig,
    onClick
  } = props
  const {
    display: iconDis = false,
    iconPosition = 'left',
    valSpeed = 8,
    width = 16,
    height = 16,
    normalIcon = defaultNormalIcon,
    iconStyleSeries = []
  } = iconConfig

  const discountLineType = discountLine.noSelfType || discountLine.selfType,
    discountLineDis = configDisplayCompatible(discountLine, 'status')

  const [hoved, setHoved] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mouseenter', () => setHoved(true))
      ref.current.addEventListener('mouseleave', () => setHoved(false))
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', () => setHoved(true))
        ref.current.removeEventListener('mouseleave', () => setHoved(false))
      }
    }
  }, [hoved])

  const valContain = useMemo(() => {
    const { ordColor, ordHoverColor, focusColor, focusHoverColor } = itemTextColorMemo
    const textArr = item.content ? [...String(item.content)] : []
    const num = discountLine?.strNum || 2
    const arr: JSX.Element[] = []
    let str = ''
    const textClass = [...new Set([ordColor?.type, ordHoverColor?.type, focusColor?.type, focusHoverColor?.type])].join(
      ' '
    )

    if (discountLineType === 'widthAdaption' || !discountLineDis) {
      return <div className={`wrap-item ${textClass}`}>{item.content}</div>
    }

    textArr.forEach((v, i) => {
      str += v
      if ((i + 1) % num === 0) {
        arr.push(
          <div className={`wrap-item ${textClass}`} key={i}>
            {str}
          </div>
        )
        str = ''
      }
    })

    if (textArr.length % num !== 0) {
      arr.push(
        <div className={`wrap-item ${textClass}`} key={textArr.slice(-(textArr.length % num)).join('')}>
          {textArr.slice(-(textArr.length % num)).join('')}
        </div>
      )
    }
    return arr
  }, [item, discountLine, itemTextColorMemo])

  const subStyle = useMemo(() => {
    const _obj: { iconStyle: CSSProperties; valStyle: CSSProperties } = {
      iconStyle: {},
      valStyle: {}
    }
    if (!iconDis) return _obj
    switch (iconPosition) {
      case 'left':
        _obj.iconStyle.order = 1
        _obj.valStyle.order = 2
        _obj.iconStyle.marginRight = valSpeed
        break
      case 'right':
        _obj.iconStyle.order = 2
        _obj.valStyle.order = 1
        _obj.iconStyle.marginLeft = valSpeed
        break
      case 'top':
        _obj.iconStyle.order = 1
        _obj.valStyle.order = 2
        _obj.iconStyle.marginBottom = valSpeed

        break
      case 'bottom':
        _obj.iconStyle.order = 2
        _obj.valStyle.order = 1
        _obj.iconStyle.marginTop = valSpeed

        break
    }
    return _obj
  }, [iconDis, iconPosition, valSpeed])

  const iconconfig = useMemo(() => {
    const _obj: {
      icon: JSX.Element | undefined
      iconType: 'system' | 'custom'
      findIcon: IconStyleSeries | undefined
    } = {
      icon: undefined,
      iconType: 'system',
      findIcon: undefined
    }

    const findIndex = iconStyleSeries.length > 0 ? iconStyleSeries.findIndex(v => v.id == item.id) : -1
    if ((findIndex < 0 && !normalIcon.display) || !iconDis) return _obj
    const findIcon = iconStyleSeries[findIndex] || normalIcon
    _obj.findIcon = findIcon
    const { iconType, iconValue = '' } = findIcon
    _obj.iconType = iconType

    const hoverStatus = findIcon[`${iconType}Hover`]?.display && hoved
    const focusStatus = findIcon[`${iconType}Focus`]?.display
    const focusHoverStatus = findIcon[`${iconType}FocusHover`]?.display && hoved

    const _classname =
      actionId != item.id
        ? `tabs-icon-${iconType}${hoverStatus ? '-hover' : ''}`
        : `tabs-icon-${iconType}${focusStatus ? '-focus' : ''}${focusHoverStatus ? '-hover' : ''}`

    switch (iconType) {
      case 'system': {
        _obj.icon = (
          <IconCon
            className={`icon-con ${_classname}`}
            oldFamily='lcz-system-icon'
            style={{ fontSize: width, ...subStyle.iconStyle }}
            iconValue={iconValue}
          />
        )
        break
      }
      case 'custom': {
        _obj.icon = <div className={_classname} style={{ width, height, ...subStyle.iconStyle }} />
        break
      }
    }
    return _obj
  }, [
    width,
    height,
    JSON.stringify(iconStyleSeries),
    JSON.stringify(normalIcon),
    JSON.stringify(item),
    actionId,
    hoved,
    subStyle
  ])

  function _isEmpty(val) {
    return val !== null && !isNaN(val)
  }

  const remarkTetx = useMemo(() => {
    const textStyle = {
      maxHeight: _isEmpty(remarkConfig.maxHeight) ? remarkConfig.maxHeight : 'auto',
      maxWidth: _isEmpty(remarkConfig.maxWidth) ? remarkConfig.maxWidth : 'auto',
      fontFamily: remarkConfig.textStyle?.fontFamily,
      fontSize: remarkConfig.textStyle?.fontSize,
      color: remarkConfig.textStyle?.newcolor,
      fontWeight: remarkConfig.textStyle?.fontWeight,
      letterSpacing: remarkConfig.textStyle?.letterSpacing
    }
    return (
      <span className='remark-text' style={{ ...textStyle, display: 'block' }}>
        {item.remark}
      </span>
    )
  }, [item, remarkConfig])

  const remarkPadding = useMemo(() => {
    return {
      padding: `${remarkConfig.yoffset}px ${remarkConfig.xoffset}px ${remarkConfig.yoffset}px ${remarkConfig.xoffset}px`,
      borderRadius: remarkConfig.radius
    }
  }, [remarkConfig])

  return (
    <>
      {remarkConfig.display ? (
        <Tooltip
          arrowPointAtCenter={true}
          overlayInnerStyle={remarkPadding}
          overlayClassName={'lcz-tab-bar-tips'}
          autoAdjustOverflow={true}
          color={remarkConfig.bgColor}
          placement={arrangement == 'horizontal' ? remarkConfig.xPosition : remarkConfig.yPosition}
          title={remarkTetx}>
          <TabBarItemIconWrapper
            style={{ ...style }}
            className={className}
            onClick={onClick}
            iconType={iconconfig.iconType}
            findIcon={iconconfig.findIcon}
            ref={ref}>
            {iconDis && iconconfig?.icon && (
              <div className='tabs-icon' style={{ order: subStyle.iconStyle.order }}>
                {iconconfig.icon}
              </div>
            )}
            <div className='tabs-value' style={{ ...subStyle.valStyle }}>
              {valContain}
            </div>
          </TabBarItemIconWrapper>
        </Tooltip>
      ) : (
        <TabBarItemIconWrapper
          style={{ ...style }}
          className={className}
          onClick={onClick}
          iconType={iconconfig.iconType}
          findIcon={iconconfig.findIcon}
          ref={ref}>
          {iconDis && iconconfig?.icon && (
            <div className='tabs-icon' style={{ order: subStyle.iconStyle.order }}>
              {iconconfig.icon}
            </div>
          )}
          <div className='tabs-value' style={{ ...subStyle.valStyle }}>
            {valContain}
          </div>
        </TabBarItemIconWrapper>
      )}
    </>
  )
})
