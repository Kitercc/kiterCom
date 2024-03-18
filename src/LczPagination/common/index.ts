export const getValueToNumer = (value: any): number => {
  if (isNaN(value)) {
    return 0
  } else {
    return Math.floor(+value)
  }
}
