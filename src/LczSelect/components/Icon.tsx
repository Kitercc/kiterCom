import React, { CSSProperties, memo, ReactElement } from 'react'
import IconCon from '../../common/IconCon'
import { IconGlobalStyle } from '../style'
import { IconSeries, OptionIcon } from '../type'

interface IconProps {
  style?: CSSProperties
  _id: string
  iconConfig?: IconSeries
  optionIcon: OptionIcon
  iconTypes: React.MutableRefObject<string[]>
}

export default memo(function Icon(props: IconProps) {
  const { _id, iconTypes, iconConfig, optionIcon } = props
  const { width = 16, height = 16, occupy = false, contSpacing = 0 } = optionIcon

  const loadCss = iconConfig
    ? iconTypes.current.includes(iconConfig.type)
      ? (iconTypes.current.push(iconConfig.type), false)
      : (iconTypes.current.push(iconConfig.type), true)
    : false

  let ELEMENT: ReactElement = <></>

  if (iconConfig) {
    const { iconType = 'system', type = '', iconValue } = iconConfig
    switch (iconType) {
      case 'system':
        ELEMENT = (
          <IconCon
            className={`gradient lcz-select-system-${type} ${!iconValue ? 'disabled' : ''}`}
            oldFamily='lcz-system-icon'
            style={{ marginRight: contSpacing, fontSize: width }}
            iconValue={iconValue}
          />
        )
        break
      case 'custom': {
        ELEMENT = (
          <div
            className={['lcz-img-icon', `lcz-select-custom-${type}`].join(' ')}
            style={{ marginRight: contSpacing, width, height }}
          />
        )
        break
      }
    }
  } else if (occupy) {
    // 占位
    const firstIcon = optionIcon?.iconSeries?.[0]
    const type = firstIcon?.iconType || 'custom',
      iconValue = firstIcon?.iconValue || ''

    ELEMENT =
      type === 'custom' ? (
        <div className='lcz-occupy-icon' style={{ marginRight: contSpacing, width, height, opacity: 0 }} />
      ) : (
        <IconCon
          className='lcz-occupy-icon'
          oldFamily='lcz-system-icon'
          style={{ marginRight: contSpacing, fontSize: width, opacity: 0 }}
          iconValue={iconValue}
        />
      )
  }

  return (
    <>
      {loadCss && <IconGlobalStyle iconConfig={iconConfig} occupy={occupy} _id={_id} />}
      {ELEMENT}
    </>
  )
})
