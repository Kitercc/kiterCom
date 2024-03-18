import { useEffect } from 'react'

export default function useUnMount(fn: () => void, deps?: any[]) {
  deps = deps || []
  useEffect(() => fn, deps)
}
