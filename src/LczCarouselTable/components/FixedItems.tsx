import React, { CSSProperties, memo, useMemo } from 'react'
import { CarouselConfig, ChangeHandler, ColumnArr, GlobalConfig, LineConfig, SerialCol, SeriesStyle } from '../type'

import { alignType, analysisExpression, configDisplayCompatible, getColorObj } from '../../common/util'
import { getSerialStyle } from '../common'

interface FixedItemProps {
  id: string
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

export default memo(function FixedItems(props: FixedItemProps) {
  const {
    id,
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
    carousel,
    seriesStyle = [],
    onClick
  } = props

  const { serialStyleList = [] } = serialCol

  const { topBgColor = 'rgba(61,153,252,0.40)' } = globalConfig

  const { inintNumber } = serialCol

  const seriesStyleMemo = useMemo(() => {
    const styleObj: CSSProperties = {}
    let fontStyle: CSSProperties = {}

    if (carousel.fixedBg) return { styleObj, fontStyle }

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
  }, [JSON.stringify(seriesStyle), carousel.fixedBg])

  const itemClickHandler = () => {
    onClick && onClick(item)
  }

  const height = showType === 'fixedHeight' ? columnHeight : 'auto',
    serialStyle = getSerialStyle(item, item._id - inintNumber, serialStyleList)

  return (
    <li
      className='table-colmun'
      onClick={itemClickHandler}
      style={{
        marginBottom: `${lineconfig.lineSpeed}px`,
        height,
        background: topBgColor,
        transform: 'none',
        overflow: 'hidden'
      }}>
      <div
        className='colmun-inner'
        style={{
          ...getColmunStyle(item._id - inintNumber),
          background: 'transparent',
          ...seriesStyleMemo.styleObj,
          padding: showType === 'fixedHeight' ? '0' : `${lineconfig.yPadding}px 0`
        }}>
        {serialCol.display && (
          <div style={{ ...serialColStyle, ...seriesStyleMemo.fontStyle }} className='col-serial'>
            <div className='serial-con' style={{ width: 'min-content' }}>
              <div style={serialStyle.bgStyle} className='lcz-serial-bg' />
              <span style={serialStyle.valStyle}>{item._id}</span>
              <i
                style={{
                  ...serialStyle.valStyle,
                  color: 'transparent'
                }}>
                {item._id}
              </i>
            </div>
          </div>
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
