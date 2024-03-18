import React, { useState } from 'react'
import { LczCarouselImage } from '../index'
import { CarouselImageProps } from '../LczCarouselImage/type'

export const T_LczCarouselImage = () => {
  const config: CarouselImageProps = {
    globalConfig: { type: 'index', index: { value: 0 }, defaultId: { value: 3 } },
    animationConfig: {
      carouseEffect: 'coverflow', // scroll fade flip cube coverflow
      mode: 'horizontal', //vertical horizontal
      switchSpeed: 3000,
      carouselConfig: {
        display: true,
        autoplaySpeed: 1,
        moveStay: true,
        position: 'before'
      }
    },
    pagerConfig: {
      display: true,
      width: 8,
      height: 8,
      xOffset: 0,
      yOffset: 0,
      radius: 10,
      speed: 10,
      bgColor: '#0fa7eec0',
      activeBgColor: '#0cf73f',
      horiPosition: 'bottom',
      vertPosition: 'left'
    },
    customPage: {
      fillStyle: 'stretchFill', //自适应 adaptive 充满 beFill 拉伸充满 stretchFill 不拉伸 noStretch
      imgSeries: [
        {
          id: 1,
          url: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
        },
        {
          id: 2,
          url: '//www.runoob.com/wp-content/uploads/2016/04/trolltunga.jpg'
        },
        {
          id: 3,
          url: 'http://static.runoob.com/images/demo/demo1.jpg'
        }
      ]
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
    //     "url": "//www.runoob.com/wp-content/uploads/2016/04/trolltunga.jpg"
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
    }
  ]

  const [flag, setFlag] = useState(true)
  const a = [400, 300]
  return (
    <div style={{ width: a[0], height: a[1], margin: ' 0 auto' }}>
      <button onClick={() => setFlag(!flag)}>CHANGW</button>
      {flag && (
        <LczCarouselImage
          {...config}
          w={a[0]}
          h={a[1]}
          data={data}
          onMouseenter={a => console.log(a, 111, 'move')}
          onMouseleave={a => console.log(a, 111, 'leave')}
          onClick={a => console.log(a, 111, 'click')}
        />
      )}
    </div>
  )
}
