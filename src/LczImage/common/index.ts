export const getRepectStyle = (repect: string, key: string) => {
  const keys = {
    bitmap: ['backgroundRepeat', 'backgroundSize'],
    vector: ['WebkitMaskRepeat', 'WebkitMaskSize']
  }
  let styleObj = {}
  switch (repect) {
    case 'no-repeat':
      styleObj = {
        [keys[key][0]]: 'no-repeat',
        [keys[key][1]]: '100% 100%'
      }
      break
    case 'repeat':
      styleObj = {
        [keys[key][0]]: 'repeat',
        [keys[key][1]]: 'auto'
      }
      break
    case 'repeat-x':
      styleObj = {
        [keys[key][0]]: 'repeat-x',
        [keys[key][1]]: 'auto 100%'
      }
      break
    case 'repeat-y':
      styleObj = {
        [keys[key][0]]: 'repeat-y',
        [keys[key][1]]: '100%'
      }
      break
    default:
      break
  }
  return styleObj
}
