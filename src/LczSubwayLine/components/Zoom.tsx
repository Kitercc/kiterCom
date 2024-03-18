import React, { memo } from 'react'
import { Slider } from 'antd'
import { ManualZoom } from '../type'

interface ZoomProps {
  zoomVal: number
  manualZoom: ManualZoom
  handleZoom: (val: number) => void
}

export default memo(function Zoom({ handleZoom, zoomVal, manualZoom }: ZoomProps) {
  function handleChange(code: string) {
    switch (code) {
      case 'increase': {
        let _val = zoomVal + 0.1
        _val = _val >= 5 ? 5 : _val

        handleZoom(_val)
        break
      }
      case 'decrease': {
        let _val = zoomVal - 0.1
        _val = _val <= 0.5 ? 0.5 : _val
        handleZoom(_val)
        break
      }

      default:
        break
    }
  }

  return (
    <div className='zoom-wrapper'>
      <button className='zoom-increase' onClick={() => handleChange('increase')}>
        +
      </button>
      <Slider
        vertical={manualZoom.arrangementMode === 'level'}
        value={zoomVal}
        min={0.5}
        max={5}
        step={0.1}
        onChange={val => handleZoom(val)}
      />
      <button className='zoom-decrease' onClick={() => handleChange('decrease')}>
        -
      </button>
    </div>
  )
})
