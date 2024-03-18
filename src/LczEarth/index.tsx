import React, { memo, useEffect, useRef, useCallback } from 'react'
import { useSyncState } from '../common/hooks'
import LczComCon from '../common/LczComCon'
import LczEarthAmbientLight from '../LczChildrenComponents/LczEarthAmbientLight'
import LczEarthAreaHeat from '../LczChildrenComponents/LczEarthAreaHeat'
import LczEarthDirectionalLight from '../LczChildrenComponents/LczEarthDirectionalLight'
import LczEarthFlyLine from '../LczChildrenComponents/LczEarthFlyLine'
import LczEarthRealEarth from '../LczChildrenComponents/LczEarthRealEarth'
import LczEarthRipples from '../LczChildrenComponents/LczEarthRipples'
import LczEarthScatterPoint from '../LczChildrenComponents/LczEarthScatterPoint'
import LczEarthTitleBubble from '../LczChildrenComponents/LczEarthTitleBubble'
import Earth from './common/earth'
import useChildComponents from './common/useChildComponents'
import { LczEarthProps } from './type'

const LczEarth = memo(function LczEarth(props: LczEarthProps) {
  const {
    w = 900,
    h = 900,
    design = false,
    cameraConfig,
    rotateConfig,
    controllerConfig,
    childComponents = [],
    onLoad,
    onChildComEvent
  } = props
  const [earthInstance, setEarthInstance] = useSyncState<Earth | null>(null)
  const wrapper = useRef<HTMLDivElement>(null)

  const {
    realEarthMemo,
    ambientLightMemo,
    directionalLightMemo,
    areaHeatMemo,
    scatterPointMemo,
    flyLineMemo,
    titleBubbleMemo,
    ripplesMemo
  } = useChildComponents(childComponents)

  useEffect(() => {
    if (earthInstance.current) {
      earthInstance.current.updataBase(w, h, { cameraConfig, rotateConfig, controllerConfig })
    }
  }, [w, h, JSON.stringify(cameraConfig), JSON.stringify(rotateConfig), JSON.stringify(controllerConfig)])

  useEffect(() => {
    if (wrapper.current) {
      const earth = new Earth({
        w,
        h,
        el: wrapper.current,
        design,
        baseConfig: { cameraConfig, rotateConfig, controllerConfig },
        onLoad
      })
      setEarthInstance(earth)
    }

    return () => {
      earthInstance.current && earthInstance.current.destroy()
    }
  }, [])

  const chindEvent = useCallback((id, type, param) => {
    onChildComEvent && onChildComEvent(id, type, param)
  }, [])

  return (
    <LczComCon>
      <div className='lcz-earth-wrapper' ref={wrapper}>
        {earthInstance.current && (
          <>
            {realEarthMemo && (
              <LczEarthRealEarth key={realEarthMemo.id} realEarth={realEarthMemo} earth={earthInstance.current} />
            )}
            {ambientLightMemo.length > 0 &&
              ambientLightMemo.map(ambientLight => (
                <LczEarthAmbientLight
                  key={ambientLight.id}
                  ambientLight={ambientLight}
                  earth={earthInstance.current as Earth}
                />
              ))}
            {directionalLightMemo.length > 0 &&
              directionalLightMemo.map(directionalLight => (
                <LczEarthDirectionalLight
                  key={directionalLight.id}
                  directionalLight={directionalLight}
                  earth={earthInstance.current as Earth}
                />
              ))}
            {areaHeatMemo.length > 0 &&
              areaHeatMemo.map(areaHeat => (
                <LczEarthAreaHeat key={areaHeat.id} areaHeat={areaHeat} earth={earthInstance.current as Earth} />
              ))}

            {scatterPointMemo.length > 0 &&
              scatterPointMemo.map(scatterPoint => (
                <LczEarthScatterPoint
                  key={scatterPoint.id}
                  scatterPoint={scatterPoint}
                  earth={earthInstance.current as Earth}
                  chindEvent={chindEvent}
                />
              ))}

            {flyLineMemo.length > 0 &&
              flyLineMemo.map(flyLine => (
                <LczEarthFlyLine key={flyLine.id} flyLine={flyLine} earth={earthInstance.current as Earth} />
              ))}

            {titleBubbleMemo.length > 0 &&
              titleBubbleMemo.map(titleBubble => (
                <LczEarthTitleBubble
                  key={titleBubble.id}
                  titleBubble={titleBubble}
                  earth={earthInstance.current as Earth}
                  chindEvent={chindEvent}
                />
              ))}

            {ripplesMemo.length > 0 &&
              ripplesMemo.map(ripples => (
                <LczEarthRipples key={ripples.id} ripples={ripples} earth={earthInstance.current as Earth} />
              ))}
          </>
        )}
      </div>
    </LczComCon>
  )
})

export default LczEarth
