import { useRef, useState, MutableRefObject } from 'react'
import { debounce, DebouncedFunc } from 'lodash'

/**
 * react 自定义hook
 * @param initState 初始化数据
 * @param wait 防抖时间
 * @returns setState: (state) => void
 */
export default function useSyncState<T>(
  initState: T,
  wait = 0
): [MutableRefObject<T>, DebouncedFunc<(state: T) => void> | ((state: T) => void)] {
  const startRef = useRef<T>(initState),
    [, forceUpdate] = useState<any>(null)

  let setState = (state: T) => {
    if (!Object.is(state, startRef.current)) {
      startRef.current = state
      forceUpdate({})
    }
  }

  if (wait > 0) {
    setState = debounce(setState, wait)
  }

  return [startRef, setState]
}
