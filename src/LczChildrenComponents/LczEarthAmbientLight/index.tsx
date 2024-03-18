import React, { Fragment, memo, useEffect, useRef } from 'react'
import Earth from '../../LczEarth/common/earth'
import * as THREE from 'three'
import { OutAmbientLight } from '../../LczEarth/type/child'
import useUnMount from '../../common/hooks/useUnMount'

const LczEarthAmbientLight = memo(function LczEarthAmbientLight({
  ambientLight,
  earth
}: {
  ambientLight: OutAmbientLight
  earth: Earth
}) {
  const { color = '#fff', intensity = 1 } = ambientLight.baseConfig || {},
    lightGroup = earth.lightGroup,
    ambientLightRef = useRef<THREE.AmbientLight | null>(null)

  useUnMount(() => {
    ambientLightRef.current && (lightGroup.remove(ambientLightRef.current), ambientLightRef.current.dispose())
    ambientLightRef.current = null
  })

  useEffect(() => {
    if (!ambientLightRef.current) {
      ambientLightRef.current = new THREE.AmbientLight()
      lightGroup.add(ambientLightRef.current)
    }
    ambientLightRef.current.color = new THREE.Color(color)
    ambientLightRef.current.intensity = intensity
  }, [color, intensity])

  return <Fragment />
})

export default LczEarthAmbientLight
