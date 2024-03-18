import * as d3 from 'd3'

export const findGeoJson = (data: any[], address: string) => {
  return data.filter(v => (v.properties.adcode || v.properties.code) == address)
}

export const setProjectionPath = function (mapData, w, h) {
  const center = d3.geo.centroid(mapData)
  let projection = d3.geo
    .mercator()
    .center(center)
    .translate([w / 2, h / 2]) //设置缩放因子
  let path = d3.geo.path().projection(projection)
  const bounds = path.bounds(mapData)
  const hscale = (120 * w) / (bounds[1][0] - bounds[0][0])
  const vscale = (120 * h) / (bounds[1][1] - bounds[0][1])
  const scale = hscale < vscale ? hscale : vscale
  const offset = [w - (bounds[0][0] + bounds[1][0]) / 2, h - (bounds[0][1] + bounds[1][1]) / 2]

  projection = d3.geo.mercator().center(center).scale(scale).translate(offset)
  path = path.projection(projection)
  return { center, projection, path }
}

export const getTipFreePosition = (
  wrapper: { width: number; height: number },
  target: { width: number; height: number },
  post: { x: number; y: number }
) => {
  const { width: w_w, height: w_h } = wrapper
  const { width: t_w, height: t_h } = target
  const { x, y } = post
  const _obj = { left: x, top: y, type: 'rightB' }

  const _speedw = x + t_w - w_w
  const _speedh = y + t_h - w_h

  if (_speedw <= 0 && _speedh <= 0) return _obj

  if (_speedw >= 0 && _speedh <= 0) {
    _obj.left = x - t_w
    _obj.type = 'leftB'
  }

  if (_speedw >= 0 && _speedh >= 0) {
    _obj.left = x - t_w
    _obj.top = y - t_h
    _obj.type = 'leftT'
  }

  if (_speedw <= 0 && _speedh >= 0) {
    _obj.top = y - t_h
    _obj.type = 'rightT'
  }
  return _obj
}
