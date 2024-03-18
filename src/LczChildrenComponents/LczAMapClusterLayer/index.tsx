import { memo, useEffect, useRef } from 'react'
import mAMap from '../../LczAMap/common/AMap'
import { OutClusterLayer } from '../../LczAMap/type/child'
import ClusterLayer from './common/clusterLayer'

interface LczAMapClusterLayerProps {
  cluster: OutClusterLayer
  mAmap: mAMap
  onChildComEvent?: (id: string, type: string, parpm: any) => void
}

export default memo(function LczAMapClusterLayer({ cluster, mAmap, onChildComEvent }: LczAMapClusterLayerProps) {
  const clusterInstance = useRef<ClusterLayer | null>(null)

  useEffect(() => {
    clusterInstance.current = new ClusterLayer({ cluster, mAmap, handleClick })

    return () => {
      clusterInstance.current?.destroy()
      clusterInstance.current = null
    }
  }, [])

  function handleClick(param) {
    if (param) {
      cluster.onClick && onChildComEvent && onChildComEvent(cluster.id, 'onClick', param)
    }
  }

  useEffect(() => {
    setTimeout(() => clusterInstance.current && clusterInstance.current.updataView(cluster))
  }, [JSON.stringify(cluster)])

  return null
})
