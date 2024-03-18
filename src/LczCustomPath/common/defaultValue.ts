const defaultPathConfig = {
  type: 'system', //"system" | "custom"
  systemUrl: 'band', //"straight-line" | "band"
  customType: 'path', //"file" | "path"
  customFileUrl: 'https://pic1.zhimg.com/v2-74c3201a88baadda98612a2006f9e510_l.jpg?source=1940ef5c',
  customPath:
    'M52 120.778239 120.272643 120.778239 136.434304 164 152.595966 74.4784689 168.757627 194.114833 184.919289 81.891547 201.080951 164 217.242612 37.9585327 233.404274 228 249.565935 22 265.727597 202.816587 281.889258 93.9681021 298.05092 147.684211 314.212582 125 398 125',
  scale: 1,
  lineWidth: 1,
  lineType: 'solid', //'solid' | 'dashed'
  color: '#ff0000'
}

const defaultBodyConfig = {
  bodyType: 'circle', // 'circle' | 'rect' | 'img'
  circleRadius: 10,
  circleColor: '',
  rectWidth: 10,
  rectHeight: 10,
  rectColor: '',
  img: 'https://pic1.zhimg.com/v2-74c3201a88baadda98612a2006f9e510_l.jpg?source=1940ef5c',
  imgWidth: 10,
  imgHeight: 10,
  autoRotate: true
}

const defaultAnimation = {
  reverse: false,
  loop: false,
  delay: 0,
  interval: 0,
  keyframes: [
    {
      easeType: 'Linear', // 'Linear' | 'EaseIn' | 'EaseOut' | 'EaseInOut'
      time: 2,
      opacity: 100,
      translate: 20
    }
  ]
}

export { defaultPathConfig, defaultAnimation, defaultBodyConfig }
