import React, { forwardRef, useRef, useImperativeHandle, CSSProperties } from 'react'

type Props = {
  width: number
  height: number
  style?: CSSProperties
  className?: string
}
export type CanvasRef = {
  ctx?: CanvasRenderingContext2D
}

const Canvas = forwardRef<CanvasRef, Props>(function Canvas({ width, height, className = '', style }, ref) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useImperativeHandle(ref, () => ({
    ctx: canvas.current?.getContext('2d') || undefined
  }))

  return <canvas width={width} height={height} className={className} style={style} ref={canvas} />
})

export default Canvas
