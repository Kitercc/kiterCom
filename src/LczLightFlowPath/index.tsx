import React, { CSSProperties, memo, useEffect, useMemo, useRef } from 'react'
import { usemEffect, useSyncState } from '../common/hooks'
import LczComCon from '../common/LczComCon'
import Canvas, { CanvasRef } from './components/Canvas'
import LightFlowPath from './common/lightFlowPath'
import type { LightFlowPathProps } from './type'

const LczLightFlowPath = memo((props: LightFlowPathProps) => {
  const { w = 300, h = 150, offset, pathConfig } = props

  const [flowPathInstance, setFlowPathInstance] = useSyncState<LightFlowPath | null>(null)

  const wrapper = useRef<HTMLDivElement>(null),
    refPath = useRef<CanvasRef | null>(null),
    refFlowPath = useRef<CanvasRef | null>(null),
    upDateRef = useRef<{ first: boolean; timer: NodeJS.Timeout | null }>({
      first: true,
      timer: null
    })

  useEffect(() => {
    if (wrapper.current && refPath.current?.ctx && refFlowPath.current?.ctx) {
      const instance = new LightFlowPath({
        wrapper: wrapper.current as HTMLDivElement,
        refPathCtx: refPath.current.ctx,
        refFlowPathCtx: refFlowPath.current.ctx,
        lightPathProps: props
      })
      setFlowPathInstance(instance)
    }

    return () => flowPathInstance.current?.destory()
  }, [])

  usemEffect(() => {
    upDateRef.current.timer && clearTimeout(upDateRef.current.timer)
    upDateRef.current.timer = setTimeout(() => {
      if (flowPathInstance.current) {
        if (upDateRef.current.first) {
          upDateRef.current.first = false
          return
        }
        flowPathInstance.current.update(props)
      }
    }, 100)
  }, [props])

  const styles = useMemo(() => {
    const { scale = 1 } = pathConfig || {},
      { display, x = 0, y = 0 } = offset || {},
      wrap: CSSProperties = {
        transform: `scale(${scale})`
      },
      canvasBox: CSSProperties = {
        transform: display ? `translate(${x}px,${y}px) ` : ' '
      }

    return {
      wrap,
      canvasBox
    }
  }, [JSON.stringify(pathConfig), JSON.stringify(offset)])

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <div className='lcz-light-flow-path-wrapper' style={styles.wrap} ref={wrapper}>
        <div className='canvas-box' style={styles.canvasBox}>
          <Canvas width={w} height={h} ref={refPath} />
          <Canvas width={w} height={h} ref={refFlowPath} className='flow-canvas' />
        </div>
      </div>
    </LczComCon>
  )
})

LczLightFlowPath.displayName = 'LightFlowPath'
export default LczLightFlowPath
