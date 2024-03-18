import { useEffect, useRef } from 'react'

export default function useUpdate(effect: React.EffectCallback, deps: any = []) {
  const isfirst = useRef(true)

  useEffect(() => {
    let result: any = null
    if (!isfirst.current) {
      result = effect()
    } else {
      isfirst.current = false
    }
    return () => {
      result && result()
    }
  }, deps)
}
