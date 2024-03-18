import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { analysisExpression, arrDuplicateRemove, conversionData, getMaxOrMin } from '../../common/util'
import ChinaMap from '../../LczChina2dMap/common/chinaMap'
import { OutSanDian, SanDianDataMap } from '../../LczChina2dMap/type/child'
import ReactDOM from 'react-dom'
import SvgSandian from './SvgSandian'
import NormalSandian from './NormalSandian'
import { useSyncState } from '../../common/hooks'

type Props = {
  sandian: OutSanDian
  myMap: ChinaMap
  onChildComEvent?: (id: string, type: string, parpm: any) => void
}

const LczChina2dSign = memo(function LczChina2dSign({ sandian, myMap, onChildComEvent }: Props) {
  const { carouselConfig, ...signConfig } = sandian,
    { id, global, data = [], onClick, onChange } = signConfig,
    { reversion = false, beyondVisible = false, clickToSelect = false } = global || {}
  const { sandianGroup, uuid } = myMap

  const [currentIndex, setCurrentIndex] = useSyncState(-1),
    timer = useRef<NodeJS.Timer | null>(null)

  const dataMemo = useMemo(() => {
    const _data = conversionData(data, { lng: 'number', lat: 'number', type: 'string', value: 'num' })
      .filter(v => v.lng !== undefined && v.lat !== undefined)
      .map(v => ({
        ...v,
        id: `${v.lng}-${v.lat}`
      }))
    return arrDuplicateRemove(_data, 'id') as SanDianDataMap[]
  }, [JSON.stringify(data)])

  function setSelectIndex(i, carousel = false) {
    if ((clickToSelect || carousel) && currentIndex.current !== i) {
      onChange && onChildComEvent && onChildComEvent(id, 'onChange', dataMemo[i])
      setCurrentIndex(i)
    }
  }

  useEffect(() => {
    carouselFn()
    return cancelCarousel
  }, [dataMemo, JSON.stringify(carouselConfig)])

  function carouselFn() {
    cancelCarousel()
    const { display = false, stopCondition = '', interval = 3 } = carouselConfig || {}
    const condition =
        stopCondition !== '' && analysisExpression(stopCondition, null, id, { name: 'carouselConfig.stopCondition' }),
      dataLen = dataMemo.length

    if (!display || condition) return

    timer.current = setInterval(() => {
      let i = currentIndex.current
      i = i < 0 ? 0 : i >= dataLen - 1 ? 0 : i + 1
      setSelectIndex(i, true)
    }, interval * 1000)
  }

  function cancelCarousel() {
    timer.current && clearInterval(timer.current)
  }

  const dataRange = getMaxOrMin(dataMemo),
    sandianGNode = sandianGroup.node()

  const hanclerClick = useCallback(
    (itemData: SanDianDataMap, i: number) => {
      onClick && onChildComEvent && onChildComEvent(id, 'onClick', itemData)
      carouselFn()
      setSelectIndex(i)
    },
    [data]
  )

  if (!reversion && sandianGNode) {
    sandianGroup.attr('mask', beyondVisible ? `url(#lineMask_${uuid})` : '')
    return ReactDOM.createPortal(
      <SvgSandian
        sandian={signConfig}
        myMap={myMap}
        data={dataMemo}
        {...dataRange}
        currentIndex={currentIndex.current}
        onClick={hanclerClick}
      />,
      sandianGNode
    )
  }

  return (
    <NormalSandian
      sandian={signConfig}
      myMap={myMap}
      data={dataMemo}
      {...dataRange}
      currentIndex={currentIndex.current}
      onClick={hanclerClick}
    />
  )
})

export default LczChina2dSign
