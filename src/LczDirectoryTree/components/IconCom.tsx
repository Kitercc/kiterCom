import React, { memo } from 'react'
import IconCon from '../../common/IconCon'
import { defaultParentNode, defaultChildNode } from '../common/defaultValue'
import { IconConfig } from '../type'

interface IconComProps {
  type: 'stowed' | 'expand' | 'child'
  iconConfig: IconConfig
}

export default memo(function IconCom(props: IconComProps) {
  const { type, iconConfig } = props
  const { width = 16, height = 16, parentNode = defaultParentNode, childNode = defaultChildNode } = iconConfig

  switch (type) {
    case 'stowed':
    case 'expand': {
      const { display = true, parentNodeType = 'system' } = parentNode
      if (!display) return null

      if (parentNodeType === 'system') {
        return (
          <span
            className={`lcz-icon-iconEle-${type} iconfont lcz-com-icon-${parentNode[type]?.iconValue}`}
            style={{ fontSize: width }}
          />
        )
      }

      return <span className={`lcz-img-iconEle-${type}`} style={{ width, height }} />
    }
    case 'child': {
      const { display = true, nodeType = 'system', iconValue = '&#845715;|1' } = childNode
      if (!display) return null
      if (nodeType === 'system') {
        return (
          <IconCon
            className={`lcz-icon-iconEle-${type}`}
            oldFamily='lcz-system-icon'
            style={{ fontSize: width }}
            iconValue={iconValue}
          />
        )
      }

      return <span className={`lcz-img-iconEle-${type}`} style={{ width, height }} />
    }
  }

  return null
})
