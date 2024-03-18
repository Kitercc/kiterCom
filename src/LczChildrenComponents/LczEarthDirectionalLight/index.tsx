import React, { Fragment, memo, useEffect, useRef } from 'react'
import Earth from '../../LczEarth/common/earth'
import * as THREE from 'three'
import { OutDirectionalLight } from '../../LczEarth/type/child'
import { useUnMount } from '../../common/hooks'

const LczEarthDirectionalLight = memo(function LczEarthDirectionalLight({
  directionalLight,
  earth
}: {
  directionalLight: OutDirectionalLight
  earth: Earth
}) {
  const { color = '#fff', intensity = 1, position = { x: 0, y: 0, z: 0 } } = directionalLight.baseConfig || {},
    lightGroup = earth.lightGroup,
    directionalLightRef = useRef<THREE.DirectionalLight | null>(null)

  useUnMount(() => {
    directionalLightRef.current &&
      (lightGroup.remove(directionalLightRef.current), directionalLightRef.current.dispose())
    directionalLightRef.current = null
  })

  useEffect(() => {
    if (!directionalLightRef.current) {
      directionalLightRef.current = new THREE.DirectionalLight()
      lightGroup.add(directionalLightRef.current)
    }
    directionalLightRef.current.color = new THREE.Color(color)
    directionalLightRef.current.intensity = intensity
    directionalLightRef.current.position.set(position.x, position.y, position.z)
  }, [color, intensity, JSON.stringify(position)])

  return <Fragment />
})

export default LczEarthDirectionalLight
