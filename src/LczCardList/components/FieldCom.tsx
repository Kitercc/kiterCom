import React, { memo, useMemo, CSSProperties } from 'react'
import { alignType, numberIsEmpty } from '../../common/util'
import { Fields } from '../type/child'
import Text from './Text'
import Number from './Number'
import Target from './Target'
import Image from './Image'
import Tags from './Tags'
import Progress from './Progress'
import ProportionChart from './ProportionChart'
import { ValidAdditionalFieldTypes } from '../common'

type FieldComType = {
  containData: any
  field: Fields
  expPathArr: string[]
  container: { id: string; layoutMode: 'relative' | 'absolute'; contentArrangement: 'vertical' | 'level' }
}

const FieldCom = memo(({ containData, field, expPathArr, container }: FieldComType) => {
  const { fieldName, offset, position, valueStyle } = field

  const fieldStyle = useMemo(() => {
    const { layoutMode = 'relative', contentArrangement = 'level' } = container
    const style: CSSProperties = {}

    if (layoutMode === 'absolute') {
      style.position = 'absolute'
      style.top = position?.top || 0
      switch (position?.x) {
        case 'left':
          style.left = 0
          break
        case 'center':
          style.left = '50%'
          style.transform = 'translateX(-50%)'
          break
        case 'right':
          style.right = 0
          break
        default:
          style.left = position?.left || 0
          break
      }
    } else {
      style.transform = `translate${contentArrangement === 'level' ? 'Y' : 'X'}(${offset}px)`
    }

    if (numberIsEmpty(valueStyle?.width)) {
      style.width = valueStyle?.width || 0
      style.overflow = 'hidden'
    }

    style.justifyContent = alignType[valueStyle?.alignment || 'left']

    return style
  }, [JSON.stringify(container), JSON.stringify(position), offset, valueStyle?.width, valueStyle?.alignment])

  const fieldContent = useMemo(() => {
    const valueType = valueStyle?.valueType || 'text',
      value =
        field?.additionalField && ValidAdditionalFieldTypes.includes(valueType) ? undefined : containData[fieldName]
    let jsx: JSX.Element,
      flag = value !== undefined

    switch (valueType) {
      case 'text': {
        const textConfig = valueStyle?.textConfig || ({} as any)
        const textVal = !field.additionalField ? value : textConfig.content
        flag = textVal !== undefined
        jsx = (
          <Text
            textConfig={textConfig}
            containData={containData}
            id={container.id}
            expPathArr={expPathArr}
            textVal={textVal}
          />
        )
        break
      }
      case 'number': {
        const numberConfig = valueStyle?.numberConfig || ({} as any)
        jsx = (
          <Number
            value={value}
            containData={containData}
            id={container.id}
            expPathArr={expPathArr}
            numberConfig={numberConfig}
          />
        )
        break
      }
      case 'target': {
        const targetConfig = valueStyle?.targetConfig || ({} as any)
        jsx = (
          <Target
            value={value}
            targetConfig={targetConfig}
            containData={containData}
            id={container.id}
            expPathArr={expPathArr}
          />
        )
        break
      }
      case 'image': {
        const imageConfig = valueStyle?.imageConfig || ({} as any),
          imageUrl = !field.additionalField ? value : imageConfig.imageUrl
        flag = imageUrl !== undefined
        jsx = (
          <Image
            containData={containData}
            additionalField={field.additionalField}
            imageUrl={imageUrl}
            imageConfig={imageConfig}
            id={container.id}
            expPathArr={expPathArr}
          />
        )
        break
      }
      case 'tags': {
        const tagsConfig = valueStyle?.tagsConfig || ({} as any)
        jsx = (
          <Tags
            value={value}
            tagsConfig={tagsConfig}
            id={container.id}
            expPathArr={expPathArr}
            containData={containData}
          />
        )
        break
      }
      case 'progress': {
        const progressConfig = valueStyle?.progressConfig || ({} as any)
        jsx = (
          <Progress
            value={value}
            progressConfig={progressConfig}
            containData={containData}
            id={container.id}
            expPathArr={expPathArr}
          />
        )
        break
      }
      case 'proportionChart': {
        const proportionChartConfig = valueStyle?.proportionChartConfig || ({} as any)
        jsx = (
          <ProportionChart
            proportionChartConfig={proportionChartConfig}
            value={value}
            containData={containData}
            id={container.id}
            expPathArr={expPathArr}
          />
        )
        break
      }
    }
    return flag && jsx
  }, [JSON.stringify(field), JSON.stringify(containData)])

  return (
    <div style={fieldStyle} className='card-field'>
      {fieldContent}
    </div>
  )
})

FieldCom.displayName = 'FieldCom'
export default FieldCom
