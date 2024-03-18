import React, { useState } from 'react'
import { LczMultilineText } from '../index'

export const T_MultilineText = () => {
  const config = {
    textStyle: {
      fontFamily: 'Microsoft YaHei',
      fontSize: 14,
      color: '#c22727',
      fontWeight: 400,
      letterSpacing: 0
    },
    alignType: 'left',
    textIndent: 38,
    lineHeight: 32,
    roll: true,
    duration: 10000
  }

  const data = [
    {
      text:
        '商业智能和低代码开发平台的用户需求广泛，<br/>市场空间巨大，且会越来越受欢迎；\n乐创者经过长期的技术积累<br   />和功能完善，对开发人员所设置的门槛很低，\n不仅满足最终用户的个性化需求，更加重要的是让合作伙伴都能够具备开发能力；乐创者志在成为商业智能和低代码开发平台国产软件中的佼佼者，需要与合作伙伴共赢和共同成长，则势必要给予合作伙伴更多的尊重，给予合作伙伴更加广阔的盈利空间，以及提供更加及时、有效的技术服务支撑。'
    }
  ]

  const [flag, setFlag] = useState(true)

  return (
    <div style={{ width: 300, height: 250 }}>
      <button onClick={() => setFlag(!flag)}>CHANGE</button>
      {flag && <LczMultilineText {...config} data={data} w={300} h={250} />}
    </div>
  )
}
