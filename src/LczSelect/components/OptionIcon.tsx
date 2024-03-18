import React, { CSSProperties, memo } from 'react'
import IconCon from '../../common/IconCon'
import { getColorObj } from '../../common/util'
import { IconSeries, SelectIcon } from '../type'

interface OptionsProps {
  selectIcon: SelectIcon
  iconConfig: IconSeries
}

export default memo(function OptionIcon(props: OptionsProps) {
  const { selectIcon, iconConfig } = props
  const { width, height, contSpacing } = selectIcon

  if (iconConfig.iconType === 'system') {
    const { iconValue, normalColor } = iconConfig
    let className = ''
    const style: CSSProperties = {
      fontSize: width,
      marginRight: contSpacing
    }
    const { color, colorType } = getColorObj(normalColor)

    if (colorType !== 'single') {
      className = ' gradient '
      style.backgroundImage = `linear-gradient(${color})`
    } else {
      style.color = color
    }

    return <IconCon oldFamily='lcz-system-icon' className={className} style={style} iconValue={iconValue} />
  }

  const style: CSSProperties = {
    width,
    height,
    backgroundImage: `url(${iconConfig.normalImgUrl})`,
    marginRight: contSpacing
  }

  !iconConfig.normalImgUrl && (style.display = 'none')

  return <div className='lcz-custom-select-icon' style={style} />
})
