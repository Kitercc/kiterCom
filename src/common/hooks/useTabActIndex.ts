import { usemEffect, useSyncState } from '.'
import { numberIsEmpty } from '../util'

type Props = {
  data: any[]
  valueType: 'index' | 'id'
  index?: ExpValue<number>
  id?: ExpValue<number | string>
  fillIndex?: number
  callback?: (index: number) => void
}

export default function useTabActIndex(props: Props): [React.MutableRefObject<number>, (state: number) => void] {
  const { data, valueType, index = { value: undefined }, id, fillIndex = 0, callback } = props
  const [currIndex, setCurrIndex] = useSyncState<number>(fillIndex)

  usemEffect(
    () => {
      if (valueType === 'index') {
        let i =
          index.value !== undefined && numberIsEmpty(index.value) && String(index.value) && index.value % 1 === 0
            ? Number(index.value)
            : fillIndex
        i = i >= 0 && i <= data.length - 1 ? i : fillIndex
        setCurrIndex(i)
        callback && callback(i)
      }
    },
    [data, valueType, index],
    'useLayoutEffect'
  )
  usemEffect(
    () => {
      if (valueType === 'id') {
        const idVal = String(id?.value)
        let i = data.findIndex(item => idVal && item.id == idVal)
        i = i >= 0 && i <= data.length - 1 ? i : fillIndex
        setCurrIndex(i)
        callback && callback(i)
      }
    },
    [data, valueType, id],
    'useLayoutEffect'
  )

  return [currIndex, setCurrIndex]
}
