import React, { useRef } from 'react'
import { isEqual } from 'lodash'

export default function usemEffect(
  effect: () => void,
  deps: any = [],
  effectName: 'useEffect' | 'useLayoutEffect' = 'useEffect'
) {
  const ref = useRef<any>(null),
    clearCn = useRef<any>(null),
    effectFn = React[effectName]

  effectFn(() => {
    try {
      if (!isEqual(deps, ref.current)) {
        clearCn.current && clearCn.current()
        clearCn.current = effect && effect()
        ref.current = deps
      }
    } catch (error) {
      console.warn(error)
    }
  }, deps)

  effectFn(() => {
    return () => clearCn.current && clearCn.current()
  }, [])
}
