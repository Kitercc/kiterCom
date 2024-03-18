import React, { memo, useMemo } from 'react'
import { CSSProperties } from 'styled-components'
import Serial from './Serial'
import { alignType, analysisExpression, configDisplayCompatible, getColorObj } from '../../common/util'
import { CarouselConfig, ChangeHandler, ColumnArr, GlobalConfig, LineConfig, SerialCol, SeriesStyle } from '../type'

interface CarousItemProps {
  id: string
  animated: boolean
  showType: 'fixedHeight' | 'adaptiveContent'
  lineconfig: LineConfig
  item: any
  columnHeight: number
  serialCol: SerialCol
  serialColStyle: any
  customCol?: ColumnArr[]
  globalConfig: GlobalConfig
  getColmunStyle: any
  getColStyle: any
  getContentValue: any
  seriesStyle: SeriesStyle[]
  carousel: CarouselConfig
  onClick?: ChangeHandler
}
export default memo(function CarousItems(props: CarousItemProps) {
  const {
    id,
    animated = false,
    showType = 'fixedHeight',
    lineconfig,
    item,
    columnHeight,
    serialCol,
    serialColStyle,
    customCol,
    getColmunStyle,
    getColStyle,
    globalConfig,
    getContentValue,
    seriesStyle = [],
    carousel,
    onClick
  } = props

  const { speed = 'linear', fixedBg, duration = 800, animateMode = 'one', animationEffect = 'bottomUp' } = carousel

  const { inintNumber, serialStyleList = [] } = serialCol

  const seriesStyleMemo = useMemo(() => {
    const styleObj: CSSProperties = {}
    let fontStyle: CSSProperties = {}

    if (showType === 'fixedHeight' && animateMode === 'all' && animationEffect === 'flop') {
      styleObj.transition = `transform ${duration / 2}ms ${speed}`
    }

    if (fixedBg) return { styleObj, fontStyle }

    const findArr: SeriesStyle[] = seriesStyle.filter((it: SeriesStyle, i) =>
      analysisExpression(it.condition, item, id, {
        name: 'seriesStyle[].condition',
        pathArr: [`seriesStyle[${i}]`]
      })
    )

    if (findArr.length === 0) return { styleObj, fontStyle }
    const _newSeriesStyle: SeriesStyle = findArr[findArr.length - 1]

    const { seriesLineStyle, seriesTextStyle } = _newSeriesStyle

    if (seriesLineStyle.display) {
      const { border, bgConfig } = seriesLineStyle

      const borderDis = configDisplayCompatible(border, 'borderd')
      if (border && borderDis) {
        const { borderWidth, borderColor } = border
        styleObj.border = `${borderWidth}px solid ${borderColor}`
      }

      if (bgConfig.display) {
        const { color: _color, opacity, radius } = bgConfig
        styleObj.opacity = opacity / 100
        styleObj.borderRadius = radius + 'px'
        const { colorType, color } = getColorObj(_color)

        if (colorType === 'gradient') {
          styleObj.background = `linear-gradient(${color} ) no-repeat 0 0`
        } else {
          styleObj.background = color
        }
      }
    }

    if (seriesTextStyle.display) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { display, ...textStyle } = seriesTextStyle
      fontStyle = { ...textStyle }
    }

    return { styleObj, fontStyle }
  }, [showType, JSON.stringify(seriesStyle), animateMode, animationEffect, duration, speed, fixedBg])

  const lineStyle = useMemo(() => {
    const { background, borderRadius, opacity, ...otherStyle } = getColmunStyle(item._id - inintNumber),
      liStyle: CSSProperties = {},
      containerStyle: CSSProperties = otherStyle

    switch (showType) {
      case 'fixedHeight': {
        if (!carousel.fixedBg) {
          liStyle.background = background
          liStyle.borderRadius = borderRadius
        }
        liStyle.opacity = opacity
        break
      }
      case 'adaptiveContent': {
        liStyle.background = background
        liStyle.borderRadius = borderRadius
        liStyle.opacity = opacity
        break
      }
    }
    return { liStyle, containerStyle }
  }, [showType, serialCol.colSpac, carousel.fixedBg, inintNumber, item._id, JSON.stringify(lineconfig)])

  const itemClickHandler = () => {
    onClick && onClick(item)
  }

  const height = showType === 'fixedHeight' ? columnHeight : 'initial'

  return (
    <li
      key={item.code}
      className='table-colmun'
      onClick={itemClickHandler}
      style={{
        ...lineStyle.liStyle,
        marginBottom: `${lineconfig.lineSpeed}px`,
        height,
        transform: `rotateX(${animated ? 90 : 0}deg)`,
        ...seriesStyleMemo.styleObj
      }}>
      <div
        className='colmun-inner'
        style={{
          ...lineStyle.containerStyle,
          padding: showType === 'fixedHeight' ? '0' : `${lineconfig.yPadding}px 0`
        }}>
        {serialCol.display && (
          <Serial
            serialColStyle={serialColStyle}
            seriesStyleMemo={seriesStyleMemo}
            item={item}
            inintNumber={inintNumber}
            serialStyleList={serialStyleList}
          />
        )}

        {customCol?.map((colItem, colIndex) => {
          const colStyle = getColStyle(customCol, colIndex, 'item'),
            Contain = item[colItem.field]
              ? getContentValue(colItem, item, seriesStyleMemo.fontStyle, { expPathArr: [`customCol[${colIndex}]`] })
              : '-'
          return (
            <div
              key={colIndex}
              style={{
                ...colStyle,
                letterSpacing: globalConfig.textSpacing,
                ...colItem.textStyle,
                ...seriesStyleMemo.fontStyle
              }}
              className='table-item'>
              <span
                className='da-flex'
                style={{
                  position: 'relative',
                  top: colStyle.x,
                  left: colStyle.y,
                  alignItems: alignType[colStyle.align],
                  textAlign: colStyle.align
                }}>
                {Contain}
              </span>
            </div>
          )
        })}
      </div>
    </li>
  )
})
