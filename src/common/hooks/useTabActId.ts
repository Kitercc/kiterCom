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
  const { data, valueType, index, id, fillIndex = 0, callback } = props
  const [currId, setCurrId] = useSyncState<number>(0)

  usemEffect(
    () => {
      if (valueType === 'index') {
        let i = numberIsEmpty(index?.value) ? Number(index?.value) : fillIndex
        i = String(i) !== 'Execute Expression Error' && i >= 0 && i <= data.length - 1 ? i : fillIndex
        selectId(i)
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
        selectId(i)
      }
    },
    [data, valueType, id],
    'useLayoutEffect'
  )

  function selectId(i: number) {
    const id = data[i] && data[i].id
    setCurrId(id)
    callback && callback(id)
  }

  return [currId, setCurrId]
}
