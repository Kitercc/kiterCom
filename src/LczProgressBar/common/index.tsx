/**
 *
 * @param value 需要格式化的值
 * @param round 是否四舍五入
 * @param decimal 小数位
 * @returns 格式化后的值
 */
export const forMatNumber = (value: number, round: boolean, decimal: number) => {
  let nums: any = value
  if (round || decimal === 0) {
    nums = parseFloat(String(nums)).toFixed(decimal)
  } else {
    nums = parseFloat(((nums * Math.pow(100, decimal)) / Math.pow(100, decimal)).toString())
      .toFixed(decimal + 1)
      .slice(0, -1)
  }

  return nums
}
