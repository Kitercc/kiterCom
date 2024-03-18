import React from 'react'
import { LczTimer } from '../index'
import { TimerProps } from '../LczTimer/type'
const colorStr = {
  selected: 'gradient',
  single: 'rgba(255,0,0,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: 'rgba(255,255,255,1)'
      },
      {
        begins: 0,
        value: 'rgba(255,0,0,1)'
      }
    ]
  }
}
export const T_Timer = () => {
  const config: TimerProps = {
    iconConfig: {
      iconStatus: true,
      iconStyle: 'linearrect',
      yOffset: 0,
      iconSize: 20,
      iconColor: '#3d99fc'
    },
    timerConfig: {
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 0,
        letterSpacing: 0
      },
      interval: 1,
      format: {
        date: { display: true, forMat: 'Monday' },
        time: { display: true, forMat: 'hh:mm:ss A' }
      }
    },
    horizon: 'left'
  }

  const data = [
    {
      value: '12112'
    }
  ]

  const [show, setShow] = React.useState(true)
  return (
    <div style={{ width: 420, height: 100 }}>
      <button onClick={e => setShow(!show)}>CHANGE</button>
      {show && <LczTimer {...config} data={data} />}
    </div>
  )
}
