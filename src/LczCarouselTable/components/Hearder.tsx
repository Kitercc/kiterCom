import React, { memo, CSSProperties, Fragment } from 'react'
import { getColorObj } from '../../common/util'
import { ColumnArr, HeaderConfig, SerialCol } from '../type'

interface HearderProps {
  header: HeaderConfig
  itemWidth: string | number
  serialCol: SerialCol
  serialColStyle: CSSProperties
  customCol: ColumnArr[]
  getColStyle: any
}

export default memo(function Hearder(props: HearderProps) {
  const { header, itemWidth, serialCol, serialColStyle, customCol, getColStyle } = props

  const getHeaderBgColor = (() => {
    const { colorType, color } = getColorObj(header?.bgColor?.color)
    if (colorType === 'gradient') {
      return `linear-gradient(${color} ) no-repeat 0 0`
    }
    return color
  })()

  return (
    <Fragment>
      <div
        className='table-header'
        style={{
          ...header.headerStyle,
          height: header.height,
          lineHeight: `${header.height}px`,
          background: getHeaderBgColor,
          width: itemWidth
        }}>
        <div className='header-inner' style={{ transform: `translateX(${serialCol.colSpac}px)` }}>
          {serialCol.display && (
            <div
              className='header-serial'
              style={{ ...serialColStyle, ...header.headerStyle, textAlign: serialColStyle.textAlign }}>
              {serialCol.headerTitle}
            </div>
          )}
          {customCol?.map((v, i) => {
            return (
              <div
                style={{
                  ...getColStyle(customCol, i, 'heard')
                }}
                key={i + v.field}
                className='header-item'>
                <span
                  style={{
                    position: 'relative',
                    top: getColStyle(customCol, i, 'heard').x + 'px',
                    left: getColStyle(customCol, i, 'heard').y + 'px'
                  }}>
                  {v.colName}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Fragment>
  )
})
