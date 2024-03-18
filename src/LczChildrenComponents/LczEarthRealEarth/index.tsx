import React, { Fragment, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useUnMount } from '../../common/hooks'
import { formatColor } from '../../Lcz3dAreaMap/common'
import Earth from '../../LczEarth/common/earth'
import { OutRealEarth } from '../../LczEarth/type/child'

const LczEarthRealEarth = memo(function LczEarthRealEarth({
  realEarth,
  earth
}: {
  realEarth: OutRealEarth
  earth: Earth
}) {
  const { color = 'transparent', texture } = realEarth.baseConfig || {}

  const cacheRef = useRef<{
    texture?: string
    color?: string
    material?: THREE.MeshPhysicalMaterial
    realEarth?: THREE.Mesh
  }>({})

  useUnMount(() => {
    cacheRef.current.material?.dispose()
    cacheRef.current.realEarth && earth.earthGroup && earth.earthGroup.remove(cacheRef.current.realEarth)
  })

  useEffect(() => {
    ;(async () => {
      await getMaterial()
      if (!cacheRef.current.realEarth && cacheRef.current.material) {
        const earthGeometry = new THREE.SphereGeometry(100, 128, 128)
        const earthMesh = new THREE.Mesh(earthGeometry, cacheRef.current.material)
        earth.earthGroup.add(earthMesh)
        cacheRef.current.realEarth = earthMesh
      }
    })()
  }, [color, texture])

  async function getMaterial() {
    const colors = formatColor(color)
    const material =
      cacheRef.current.material ||
      new THREE.MeshPhysicalMaterial({
        transparent: true,
        color: colors.color,
        opacity: colors.opacity
      })

    if (cacheRef.current.texture !== texture) {
      let _texture: any = null
      if (texture) _texture = await earth.textureLoad.load(texture)
      material.map = _texture
    }
    material.color = colors.color
    material.opacity = colors.opacity
    material.needsUpdate = true
    cacheRef.current = { material, color, texture }
  }

  return <Fragment />
})

export default LczEarthRealEarth
