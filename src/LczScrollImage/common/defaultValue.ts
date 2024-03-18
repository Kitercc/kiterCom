import { ArrowConfig } from '../../LczCircularTarget/type'
import { AnimationConfig, ScrollImageConfig, ScrollImageGlobal } from '../type'

const defaultGlobalConfig: ScrollImageGlobal = {
  mode: 'horizontal', // 'horizontal' | 'vertical'
  imgNums: 5,
  gap: 12
}

const defaultScrollImageConfig: ScrollImageConfig = {
  clickPreview: true,
  bgColor: '#FFFFFF',
  fillStyle: 'stretchFill', //自适应 adaptive 充满 beFill 拉伸充满 stretchFill 不拉伸 noStretch
  imgSeries: []
}

const defaultAnimationConfig: AnimationConfig = {
  clickCenter: false,
  switchSpeed: 1000,
  scrollNums: 'oneItem',
  carouselConfig: {
    display: true,
    autoplaySpeed: 3,
    position: 'after',
    moveStay: true
  }
}

const defaultImgArrowConfig: ArrowConfig = {
  display: false,
  spacing: 20,
  yOffset: 0,
  showType: 'all',

  arrowIconType: 'custom',
  iconValue: '',
  iconSize: 56,
  iconColor: {
    selected: 'single',
    single: '#99F6FF',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: '#99F6FF'
        },
        {
          begins: 0,
          value: '#08D7FC'
        }
      ]
    }
  },
  imgUrl: '',
  imgWidth: 56,
  imgHeight: 56
}
export { defaultGlobalConfig, defaultAnimationConfig, defaultScrollImageConfig, defaultImgArrowConfig }
