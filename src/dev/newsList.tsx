import React, { useState } from 'react'
import { LczNewsList } from '../index'
import { NewsListProps } from '../LczNewsList/type'
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
export const T_NewsList = function T_NewsList() {
  const config: NewsListProps = {
    globalConfig: {
      showType: 'fixedHeight',
      numbers: 3,
      entryInterval: 40,
      rowHeight: 128,
      speed: 16,
      singleBg: {
        display: true,
        color: colorStr,
        image: ''
      },
      border: {
        display: true,
        color: '#1fffff',
        width: 1
      },
      carousel: {
        display: false,
        timeSpeed: 4,
        carouselFactor: 'greaterThanDataLen',
        speed: 30
      }
    },
    textConfig: {
      titleConfig: {
        titleShowrownum: 1,
        titleBgColor: 'rgba(255,255,255,0)',
        titleMargin: {
          top: 10,
          right: 10,
          bottom: 14,
          left: 10
        },
        titleStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 14,
          color: '#FFFFFF',
          fontWeight: 'bold',
          letterSpacing: 0,
          italics: false,
          textAlign: 'left'
        }
      },
      splitLine: {
        display: true,
        style: 'dashed', // solid  dashed
        color: '#f50000',
        width: 2
      },
      abstract: {
        absShowrownum: 2,
        absBgColor: '#ffffff53',
        absMargin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        absStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#FFFFFF',
          fontWeight: 'normal',
          letterSpacing: 0,
          italics: false
        }
      },
      dateConfig: {
        display: true,
        format: {
          date: { display: true, forMat: 'Monday' },
          time: { display: true, forMat: 'hh:mm:ss' }
        },
        bgColor: '#6bff5dc0',
        margin: {
          t: 0,
          r: 0,
          b: 0,
          l: 0
        },
        dateStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#FFFFFF',
          fontWeight: 'normal',
          letterSpacing: 0,
          italics: false
        }
      }
    },
    drawing: {
      display: true,
      position: 'right',
      topMargin: 0,
      leftMargin: 10,
      rightMargin: 10,
      width: 82,
      height: null,
      radius: 0,
      borderColor: '#fcbf3d',
      borderWidth: 1,
      bgColor: '#1eff0033'
    },
    maskConfig: {
      display: true,
      maskHeight: 10,
      color: {
        selected: 'gradient',
        single: '#3d99fc',
        gradient: {
          gradualAngle: 0,
          colors: [
            {
              begins: 0,
              value: '#30df20'
            },
            {
              begins: 100,
              value: 'rgba(255,0,0,0)'
            }
          ]
        }
      }
    },
    pager: {
      display: true,
      position: 'bottom',
      xOffset: 0,
      yOffset: 0,
      wdith: 18,
      height: 18,
      radios: 4,
      speed: 4,
      defaultColor: '#16f7ff4b',
      activeColor: '#fc4a3d'
    }
  }

  const data = [
    {
      title: '1,中国射击队再添一金！庞伟姜冉馨10米气手枪混合团体赛夺冠',
      digest:
        '当地时间27日，中国射击选手庞伟、姜冉馨出战2020东京奥运会10米气手枪混合团体赛决赛，为中国射击队再夺一枚金牌。',
      picture: 'https://hznews.hangzhou.com.cn/chengshi/content/2021-07/29/a6ecc1e8-0347-4f03-9d11-96a7e2b27b95.jpg',
      date: '2022-6-12'
    },
    {
      title: '2,最后一战蒙古！中国三人女篮保留直通四强机会',
      digest:
        '遗憾输给最强大的美国之后，中国三人女篮在\n东京奥运会的循环赛阶段仅剩最后一场比赛，而看看对手之前比赛中的表现，中国三人女篮带着胜利。',
      picture: 'https://pic1.zhimg.com/80/v2-4af581163d11d760c7347265459d04c1_720w.jpg',
      date: '2022-6-13'
    },
    {
      title: '3,施廷懋、王涵互相给对方戴上金牌，这是跳水队冠军搭档的…',
      digest:
        '本届东京奥运会为了减少疫情风险，实行了运动员自己给自己戴奖牌的规定，但对于中国跳水来说，“仪式感”不能少。7月25日，在施廷懋/王涵',
      picture: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
      date: '2022-6-14'
    },
    {
      title: '4,中国女足第6次出征奥运！',
      digest: '北京时间7月21日16:00，中国女足将在奥运会女足小组赛首轮比赛中面对巴西女足。',
      picture: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg',
      date: '2022-6-15'
    },
    {
      title: '5,福布斯“中国科技女性榜”出炉：50位上榜者绽放“她力量”',
      digest:
        '美国《福布斯》杂志中文网近日报道称，虽然中国率先控制住疫情的蔓延并走上经济复苏之路，但新冠病毒已经对全球经济、社会造成创伤…',
      picture: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg',
      date: '2022-6-16'
    },
    {
      title: '6,福布斯“中国科技女性榜”出炉：50位上榜者绽放“她力量”',
      digest:
        '美国《福布斯》杂志中文网\n近日报道称，虽然中国率先控制住疫情的蔓延并走上经济复苏之路，但新冠病毒已经对全球经济、社会造成创伤…',
      picture: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg',
      date: '2022-6-17'
    }
  ]

  const [flag, setFlag] = useState(true)
  return (
    <div style={{ width: 400, height: 500 }}>
      <button onClick={() => setFlag(!flag)}>Change</button>
      {flag && <LczNewsList data={data} {...config} h={500} onClick={param => console.log(param)} />}
    </div>
  )
}
