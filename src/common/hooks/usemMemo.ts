import { useRef } from 'react'
import { isEqual } from 'lodash'

export default function usemMemo<T, F>(fn?: () => T, deps?: F[]): T {
  const ref = useRef<T>({} as T),
    preDeps = useRef<F[]>([])

  if (!isEqual(deps, preDeps.current)) {
    ref.current = fn ? fn() : ({} as T)
    preDeps.current = deps || []
  }
  return ref.current
}
