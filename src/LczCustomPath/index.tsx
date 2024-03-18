import React, { CSSProperties, memo, useEffect, useMemo, useRef } from 'react'
import { usemEffect, useSyncState } from '../common/hooks'
import LczComCon from '../common/LczComCon'
import { randomChar } from '../common/util'
import { getLinerColor } from './common'
import CustomPath from './common/CustomPath'
import Svg, { SvgRef } from './common/Svg'
import type { CustomPathProps } from './type'

const LczCustomPath = memo((props: CustomPathProps) => {
  const { w = 300, h = 150, offset, pathConfig, bodyConfig } = props
  const [flowPathInstance, setFlowPathInstance] = useSyncState<CustomPath | null>(null)
  const gradientColorId = useRef<string>(randomChar())
  const wrapper = useRef<HTMLDivElement>(null),
    refPath = useRef<SvgRef | null>(null),
    upDateRef = useRef<{ first: boolean; timer: NodeJS.Timeout | null }>({
      first: true,
      timer: null
    })

  useEffect(() => {
    if (wrapper.current && refPath.current?.svgNode) {
      const instance = new CustomPath({
        wrapper: wrapper.current as HTMLDivElement,
        refSvgNode: refPath.current.svgNode,
        customPathProps: props,
        gradientColorId: gradientColorId.current
      })
      setFlowPathInstance(instance)
    }
    return () => {
      flowPathInstance.current?.destory()
    }
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
    const { display, x = 0, y = 0 } = offset || {},
      svgBox: CSSProperties = {
        transform: display ? `translate(${x}px,${y}px) ` : ' '
      }

    return {
      svgBox
    }
  }, [JSON.stringify(pathConfig), JSON.stringify(offset)])

  const linerColor = useMemo(() => {
    let color = undefined
    switch (bodyConfig?.bodyType) {
      case 'circle':
        color = bodyConfig.circleColor
        break
      case 'rect':
        color = bodyConfig.rectColor
        break
    }
    return getLinerColor(color)
  }, [JSON.stringify(bodyConfig)])

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <div className='lcz-custom-path-wrapper' ref={wrapper}>
        <div className='svg-box' style={styles.svgBox}>
          <Svg width={w} height={h} ref={refPath}>
            {linerColor && (
              <defs>
                <linearGradient
                  id={gradientColorId.current}
                  x1={linerColor.range[0]}
                  x2={linerColor.range[1]}
                  y1={linerColor.range[2]}
                  y2={linerColor.range[3]}>
                  {linerColor.colorsArr.map((item, index) => (
                    <stop key={index} offset={item.offset} stopColor={item.color} />
                  ))}
                </linearGradient>
              </defs>
            )}
          </Svg>
        </div>
      </div>
    </LczComCon>
  )
})

LczCustomPath.displayName = 'LczCustomPath'
export default LczCustomPath
