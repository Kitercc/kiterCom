import React, { memo } from 'react'
import { LczScrollImage } from '../index'
import { ScrollImageProps } from '../LczScrollImage/type'

export const T_LczScrollImage = memo(function T_LczScrollImage() {
  const config: ScrollImageProps = {
    global: {
      mode: 'horizontal', // 'horizontal' | 'vertical'
      imgNums: 5,
      gap: 12
    },
    imgConfig: {
      clickPreview: false,
      bgColor: '#FFFFFF',
      fillStyle: 'stretchFill', //自适应 adaptive 充满 beFill 居中 center 拉伸充满 stretchFill 不拉伸 noStretch
      imgSeries: [
        {
          id: 1,
          url: 'https://img1.baidu.com/it/u=69066105,14995406&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
        },
        {
          id: 2,
          url: '//www.runoob.com/wp-content/uploads/2016/04/trolltunga.jpg'
        },
        {
          id: 3,
          url: 'http://static.runoob.com/images/demo/demo1.jpg'
        },
        {
          id: 4,
          url: 'https://www.runoob.com/images/klematis.jpg'
        },
        {
          id: 5,
          url: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
        },
        {
          id: 6,
          url:
            'https://img2.baidu.com/it/u=2936117222,3860513461&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1659718800&t=b5215dfec442cb163ab2d18b76f3a79c'
        },
        {
          id: 7,
          url: 'https://img0.baidu.com/it/u=969374509,2448098962&fm=253&fmt=auto&app=138&f=JPEG?w=613&h=468'
        },
        {
          id: 8,
          url: 'https://img2.baidu.com/it/u=3552829606,2177371575&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
        },
        {
          id: 9,
          url: 'https://img2.baidu.com/it/u=4109745906,2129869185&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
        },
        {
          id: 10,
          url: 'https://img2.baidu.com/it/u=1764030039,4041249275&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=401'
        }
      ]
    },
    animationConfig: {
      clickCenter: true, //false true
      switchSpeed: 1000,
      scrollNums: 'onePage', //'oneItem' | 'onePage'
      carouselConfig: {
        display: false,
        autoplaySpeed: 1,
        position: 'after', //"before" | "after"
        moveStay: true
      }
    },
    arrowConfig: {
      display: true,
      spacing: -10,
      yOffset: 0,
      showType: 'all',
      arrowIconType: 'system',
      iconValue: 'zuo1',
      iconSize: 56,
      iconColor: {
        selected: 'gradient',
        single: '#99F6FF',
        gradient: {
          gradualAngle: 90,
          colors: [
            {
              begins: 0,
              value: '#f70c03'
            },
            {
              begins: 0,
              value: '#08D7FC'
            }
          ]
        }
      },
      imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      imgWidth: 56,
      imgHeight: 56
    }
  }
  const data = [
    // {
    //   id: 1,
    //   url: 'HappyServer/lczCommon/matrix/images/component/lcz-carousel-imgcarouselImg1.png'
    // },
    // {
    //   id: 2,
    //   url: 'HappyServer/lczCommon/matrix/images/component/lcz-carousel-imgcarouselImg2.png'
    // },
    // {
    //   id: 3,
    //   url: 'HappyServer/lczCommon/matrix/images/component/lcz-carousel-imgcarouselImg3.png'
    // }

    // [
    //   {
    //     "id": 1,
    //     "url": "https://www.runoob.com/images/klematis.jpg"
    //   },
    //   {
    //     "id": 2,
    //     "url": "https://www.runoob.com/wp-content/uploads/2016/04/trolltunga.jpg"
    //   },
    //   {
    //     "id": 3,
    //     "url": "http://static.runoob.com/images/demo/demo1.jpg"
    //   },
    //   {
    //     "id": 4,
    //     "url": "https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp"
    //   }
    // ]

    {
      id: 1,
      url: ''
    },
    {
      id: 2,
      url: ''
    },
    {
      id: 3,
      url: ''
    },
    {
      id: 4,
      url: ''
    },
    {
      id: 5,
      url: ''
    },
    {
      id: 6,
      url: ''
    },
    {
      id: 7,
      url: ''
    },
    {
      id: 8,
      url: ''
    },
    {
      id: 9,
      url: ''
    },
    {
      id: 10,
      url: ''
    }
  ]

  return (
    <div style={{ width: 900, height: 320, margin: '0px auto' }}>
      <LczScrollImage
        w={900}
        h={320}
        {...config}
        data={data}
        onClick={a => console.log(a, 'click')}
        onMouseenter={a => console.log(a, 'onMouseenter')}
        onMouseleave={a => console.log(a, 'onMouseleave')}
      />
    </div>
  )
})
