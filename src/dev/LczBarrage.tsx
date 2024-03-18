import React, { memo, useState } from 'react'
import { LczBarrage } from '../'
import { BarrageProps } from '../LczBarrage/type'

export const T_LczBarrage = memo(function T_LczBarrage() {
  const config: BarrageProps = {
    maxBarrageNums: 60,
    rowNums: 3,
    timeInterval: 400,
    speed: 2,
    loop: true,
    hoverStop: false,
    barrageStyle: {
      fontSize: 16,
      barrageTextStyle: [
        {
          textStyle: {
            fontFamily: 'Microsoft Yahei',
            color: 'rgba(68,106,255,1)',
            fontWeight: 'normal',
            letterSpacing: 0
          },
          ShadowConfig: {
            display: false,
            color: 'rgba(0,0,0,0.50)',
            xOffset: 0,
            yOffset: 2,
            vague: 4
          }
        },
        {
          textStyle: {
            fontFamily: 'Microsoft Yahei',
            color: 'rgba(77,254,255,1)',
            fontWeight: 'normal',
            letterSpacing: 0
          },
          ShadowConfig: {
            display: false,
            color: 'rgba(0,0,0,0.50)',
            xOffset: 0,
            yOffset: 2,
            vague: 4
          }
        },
        {
          textStyle: {
            fontFamily: 'Microsoft Yahei',
            color: 'rgba(255,246,127,1)',
            fontWeight: 'normal',
            letterSpacing: 0
          },
          ShadowConfig: {
            display: false,
            color: 'rgba(0,0,0,0.50)',
            xOffset: 0,
            yOffset: 2,
            vague: 4
          }
        }
      ]
    }
  }
  // const oldData = [
  //   { text: 'Easy[V]' },
  //   { text: '让数据价值看得见' },
  //   { text: '让数据内容用得着' },
  //   { text: '看见数字化的无限可能' },
  //   { text: '易知微数字孪生可视化' },
  //   { text: '映射万千物理世界' },
  //   { text: '数字孪生，对物理世界的感知与管理' },
  //   { text: '可视化的原则是准确清晰️又美观' },
  //   { text: 'EasyV' },
  //   { text: '数字孪生可视化搭建平台' },
  //   { text: '体现数据之美' }
  // ]
  const oldData: any = [
    {
      text: '湘湖'
    },
    {
      text: '滨康路'
    },
    {
      text: '西兴'
    },
    {
      text: '滨河路'
    },
    {
      text: '江陵路'
    },
    {
      text: '近江'
    },
    {
      text: '婺江路'
    },
    {
      text: '城站'
    },
    {
      text: '定安路'
    },
    {
      text: '龙翔桥'
    },
    {
      text: '凤起路'
    },
    {
      text: '武林广场'
    },
    {
      text: '西湖文化广场'
    },
    {
      text: '打铁关'
    },
    {
      text: '闸弄口'
    },
    {
      text: '火车东站'
    },
    {
      text: '七堡'
    },
    {
      text: '九堡'
    },
    {
      text: '客运中心'
    },
    {
      text: '下沙西'
    },
    {
      text: '金沙湖'
    },
    {
      text: '高沙路'
    },
    {
      text: '文海南路'
    },
    {
      text: '云水'
    },
    {
      text: '下沙江滨'
    },
    {
      text: '杭州大会展中心'
    },
    {
      text: '南阳'
    },
    {
      text: '向阳路'
    },
    {
      text: '萧山国际机场'
    },
    {
      text: '朝阳'
    },
    {
      text: '曹家桥'
    },
    {
      text: '潘水'
    },
    {
      text: '人民路'
    },
    {
      text: '杭发厂'
    },
    {
      text: '人民广场'
    },
    {
      text: '建设一路'
    },
    {
      text: '建设三路'
    },
    {
      text: '振宁路'
    },
    {
      text: '飞虹路'
    },
    {
      text: '盈丰路'
    },
    {
      text: '钱江世纪城'
    },
    {
      text: '钱江路'
    },
    {
      text: '庆春广场'
    },
    {
      text: '庆菱路'
    },
    {
      text: '建国北路'
    },
    {
      text: '凤起路'
    },
    {
      text: '武林门'
    },
    {
      text: '沈塘桥'
    },
    {
      text: '下宁桥'
    },
    {
      text: '学院路'
    },
    {
      text: '古翠路'
    },
    {
      text: '丰潭路'
    },
    {
      text: '文新'
    },
    {
      text: '三墩'
    },
    {
      text: '墩祥街'
    },
    {
      text: '金家渡'
    },
    {
      text: '白洋'
    },
    {
      text: '杜甫村'
    },
    {
      text: '良渚'
    },
    {
      text: '天安门'
    }
  ]

  const [comData, setComData] = useState(oldData)
  const [status, setStatus] = useState(true)
  const aa = () => {
    // const aa = [
    //   { text: 'Easy[V]' },
    //   { text: '让数据价值看得见' },
    //   { text: '让数据内容用得着' },
    //   { text: '看见数字化的无限可能' },
    //   { text: '易知微数字孪生可视化' },
    //   { text: '映射万千物理世界' },
    //   { text: '数字孪生，对物理世界的感知与管理' },
    //   { text: '可视化的原则是准确清晰️又美观' },
    //   { text: 'EasyV' },
    //   { text: '数字孪生可视化搭建平台' },
    //   { text: '体现数据之美' }
    // ]

    const aa: any = [
      {
        text: '湘湖'
      },
      {
        text: '滨康路'
      },
      {
        text: '西兴'
      },
      {
        text: '滨河路'
      },
      {
        text: '江陵路'
      },
      {
        text: '近江'
      },
      {
        text: '婺江路'
      },
      {
        text: '城站'
      },
      {
        text: '定安路'
      },
      {
        text: '龙翔桥'
      },
      {
        text: '凤起路'
      },
      {
        text: '武林广场'
      },
      {
        text: '西湖文化广场'
      },
      {
        text: '打铁关'
      },
      {
        text: '闸弄口'
      },
      {
        text: '火车东站'
      },
      {
        text: '七堡'
      },
      {
        text: '九堡'
      },
      {
        text: '客运中心'
      },
      {
        text: '下沙西'
      },
      {
        text: '金沙湖'
      },
      {
        text: '高沙路'
      },
      {
        text: '文海南路'
      },
      {
        text: '云水'
      },
      {
        text: '下沙江滨'
      },
      {
        text: '杭州大会展中心'
      },
      {
        text: '南阳'
      },
      {
        text: '向阳路'
      },
      {
        text: '萧山国际机场'
      },
      {
        text: '朝阳'
      },
      {
        text: '曹家桥'
      },
      {
        text: '潘水'
      },
      {
        text: '人民路'
      },
      {
        text: '杭发厂'
      },
      {
        text: '人民广场'
      },
      {
        text: '建设一路'
      },
      {
        text: '建设三路'
      },
      {
        text: '振宁路'
      },
      {
        text: '飞虹路'
      },
      {
        text: '盈丰路'
      },
      {
        text: '钱江世纪城'
      },
      {
        text: '钱江路'
      },
      {
        text: '庆春广场'
      },
      {
        text: '庆菱路'
      },
      {
        text: '建国北路'
      },
      {
        text: '凤起路'
      },
      {
        text: '武林门'
      },
      {
        text: '沈塘桥'
      },
      {
        text: '下宁桥'
      },
      {
        text: '学院路'
      },
      {
        text: '古翠路'
      },
      {
        text: '丰潭路'
      },
      {
        text: '文新'
      },
      {
        text: '三墩'
      },
      {
        text: '墩祥街'
      },
      {
        text: '金家渡'
      },
      {
        text: '白洋'
      },
      {
        text: '杜甫村'
      },
      {
        text: '良渚'
      },
      {
        text: '天安门'
      }
    ]

    // for (let i = 0; i < 5; i++) {
    //   const a = { text: `这是${Math.round(Math.random() * 100)}` }
    //   aa.push(a)
    // }

    // setComData(aa)
    setStatus(!status)
  }

  return (
    <>
      <button onClick={aa}>帅</button>
      <div style={{ width: 600, height: 400, margin: '0 auto', display: `${status ? 'block' : 'none'}` }}>
        <LczBarrage
          w={600}
          h={400}
          {...config}
          data={comData}
          design={false}
          onClick={data => {
            console.log(data)
          }}
        />
      </div>
    </>
  )
})
