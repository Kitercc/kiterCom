import React, { CSSProperties, memo } from 'react'
import { alignType, analysisExpression } from '../../common/util'
import { ColumnArr, NumberConfig, TargetConfig } from '../type'
import Text from './Text'
import Suffix from './Suffix'
import Number from './Number'
import Target from './Target'

type FieldComProps = {
  id: string
  dataItem: any
  customCol: ColumnArr[]
}

const FieldCom = memo((props: FieldComProps) => {
  const { dataItem, customCol = [] } = props
  if (!dataItem) return null

  const fieldContent = (col: ColumnArr, colIndex: number) => {
    const { field = '', valueType = 'text', overflow = 'ellipsis', border, suffix: suffixConfig } = col,
      itemStyle: CSSProperties = { border: 'none' }
    if (border?.display) itemStyle.border = `${border.width}px solid ${border.color}`

    if (valueType === 'text' || valueType === 'number') {
      switch (overflow) {
        case 'ellipsis': {
          itemStyle.textOverflow = 'ellipsis'
          itemStyle.overflow = 'hidden'
          break
        }
        case 'lineFeed': {
          itemStyle.wordBreak = 'break-word'
          itemStyle.whiteSpace = 'initial'
          break
        }

        default:
          break
      }
    }

    const suffix = <Suffix suffixConfig={suffixConfig} />,
      val = dataItem[field]

    switch (valueType) {
      case 'text': {
        const config = col.textConfig
        return <Text config={config || {}} val={val} style={itemStyle} suffix={suffix} />
      }
      case 'number': {
        if (val === '' || val === null) return null
        const config = col.numberConfig || ({} as NumberConfig)
        return <Number config={config} val={val} style={itemStyle} suffix={suffix} />
      }
      case 'target': {
        if (val === '' || val === null) return null
        const config = col.targetConfig || ({} as TargetConfig),
          base = analysisExpression(config.baseValue || '', dataItem, props.id, {
            name: 'targetConfig.baseValue',
            pathArr: [`customCol[${colIndex}]`]
          })
        return (
          <Target config={config} val={val} style={itemStyle} suffixConfig={suffixConfig} suffix={suffix} base={base} />
        )
      }

      default:
        break
    }
    return <></>
  }

  return (
    <>
      {customCol.map((col, colIndex) => (
        <div
          className='filed-item'
          key={colIndex}
          style={{ width: col.colWidth, paddingLeft: col.xOffset, justifyContent: alignType[col.alignType] }}>
          {fieldContent(col, colIndex)}
        </div>
      ))}
    </>
  )
})

FieldCom.displayName = 'FieldCom'
export default FieldCom
