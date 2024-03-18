import React, { memo, CSSProperties } from 'react'
import IconCon from '../../common/IconCon'
import { numberForMat } from '../../LczCarouselTable/common'
import { defaultNumberFormat } from '../../LczCarouselTable/common/defaultValue'
import { DataMap, MarkStyle, NumberStyle, StateCategory } from '../type'

interface IconProps {
  itemStateCategory: StateCategory
  markStyle: MarkStyle
}

const IconBox = memo((props: IconProps) => {
  const { itemStateCategory, markStyle } = props
  const { width = 20, height = 20, radius = 0, rotate = 0 } = markStyle
  const { markType, iconValue, iconColor, imgUrl } = itemStateCategory

  return (
    <div className='icon-box' style={{ transform: `rotate(${rotate}deg)` }}>
      {markType === 'system' ? (
        <IconCon
          className='icon-con'
          oldFamily='lcz-system-state-card-icon'
          style={{ color: iconColor, fontSize: Math.min(width, height) }}
          iconValue={iconValue}
        />
      ) : (
        imgUrl && (
          <div
            className='bg-image'
            style={{ width, height, borderRadius: radius, backgroundImage: `url(${imgUrl})` }}
          />
        )
      )}
    </div>
  )
})

IconBox.displayName = 'IconBox'

interface StateItemProps {
  itemData: DataMap
  markStyle: MarkStyle
  style: { text: CSSProperties; num: CSSProperties; numSuffix: CSSProperties }
  numberStyle: NumberStyle
  onClick: any
  getItemStateCategory: (item: DataMap) => StateCategory
  getNumberSectionStyle: (val: number) => React.CSSProperties
}

const StateItem = memo(
  ({
    itemData,
    markStyle,
    style,
    numberStyle,
    onClick,
    getItemStateCategory,
    getNumberSectionStyle
  }: StateItemProps) => {
    const val = itemData.value !== '' ? Number(itemData.value) : NaN,
      suffix = numberStyle.suffix,
      numformat = numberStyle.numberFormat || defaultNumberFormat,
      sectionStyle = getNumberSectionStyle(val)

    return (
      <li
        onClick={e => {
          e.stopPropagation()
          onClick && onClick(itemData)
        }}>
        <IconBox itemStateCategory={getItemStateCategory(itemData)} markStyle={markStyle} />
        <span className='lcz-state-card-text' style={style.text}>
          {itemData.name}
        </span>
        {numberStyle.display && (
          <div className='lcz-state-card-num-con' style={style.num}>
            {!isNaN(val) && (
              <span className='lcz-state-card-num' style={sectionStyle}>
                {numberForMat(val, numformat)}
              </span>
            )}
            {suffix?.display && (
              <span className='lcz-state-card-num-suffix' style={style.numSuffix}>
                {suffix.content}
              </span>
            )}
          </div>
        )}
      </li>
    )
  }
)

StateItem.displayName = 'StateItem'

export default StateItem
