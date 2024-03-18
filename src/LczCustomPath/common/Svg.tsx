import React, { forwardRef, useRef, useImperativeHandle } from 'react'

type Props = {
  width: number
  height: number
  children: React.ReactNode
}
export type SvgRef = {
  svgNode?: SVGSVGElement
}

const Svg = forwardRef<SvgRef, Props>(function Canvas({ children }, ref) {
  const svg = useRef<SVGSVGElement>(null)

  useImperativeHandle(ref, () => ({
    svgNode: svg.current || undefined
  }))

  return (
    <svg style={{ overflow: 'visible' }} ref={svg}>
      {children}
    </svg>
  )
})

export default Svg
