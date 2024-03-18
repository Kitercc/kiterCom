import { useEffect, useRef } from 'react'
import { getVisibilityChangeEvent } from '../util'

/**
 * react 自定义hook 页面显示隐藏时触发
 * @param showFn 显示触发
 * @param hideFn 隐藏触发
 * @param deps 变更依赖
 * @returns 卸载事件监听函数
 */
export default function usePageHide(
  showFn?: () => void,
  hideFn?: () => void,
  deps: any = []
): React.MutableRefObject<() => void> {
  const clearFn = useRef<any>(null)

  useEffect(() => {
    const { hiddenProperty, visibilitychange } = getVisibilityChangeEvent()
    function windowHide() {
      if (!document[hiddenProperty]) {
        showFn && showFn()
      } else {
        hideFn && hideFn()
      }
    }

    document.addEventListener(visibilitychange, windowHide)

    return () => document.removeEventListener(visibilitychange, windowHide)
  }, deps)

  return clearFn
}
