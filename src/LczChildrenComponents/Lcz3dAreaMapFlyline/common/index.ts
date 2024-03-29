export function gradientColors(start, end, steps, gamma = 1) {
  const parseColor = function (hexStr) {
    if (hexStr.length === 4) {
      return hexStr
        .substr(1)
        .split('')
        .map(function (s) {
          return 0x11 * parseInt(s, 16)
        })
    }
    return [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
      return parseInt(s, 16)
    })
  }
  const pad = function (s) {
    return s.length === 1 ? `0${s}` : s
  }
  let j
  let ms
  let me
  const output: string[] = []
  const so: any = []
  gamma = gamma || 1
  const normalize = function (channel) {
    return Math.pow(channel / 255, gamma)
  }
  start = parseColor(start).map(normalize)
  end = parseColor(end).map(normalize)
  for (let i = 0; i < steps; i++) {
    ms = i / (steps - 1)
    me = 1 - ms
    for (j = 0; j < 3; j++) {
      so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16))
    }
    output.push(`#${so.join('')}`)
  }
  return output
}
