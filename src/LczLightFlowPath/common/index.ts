import * as d3 from 'd3'

export const sysSvgUrl = {
  'straight-line':
    (process.env.NODE_ENV !== 'production' ? 'HappyServer/' : '../') +
    'lczCommon/matrix/images/component/lcz-light-flow-path/straight-line.svg',
  band:
    (process.env.NODE_ENV !== 'production' ? 'HappyServer/' : '../') +
    'lczCommon/matrix/images/component/lcz-light-flow-path/band.svg'
}

export function getSvgProps(node: Element) {
  const children: any = []
  if (node.children) {
    const child = Array.from(node.children)
    child.forEach(cNode => children.push(getSvgProps(cNode)))
  }

  const attrs = Array.from(node.attributes),
    props = {}
  attrs.forEach(item => {
    const { name, value } = item
    props[name] = value
  })

  return { name: node.tagName, props, children }
}

export function renderSvg(svgEl, wrapper) {
  if (!svgEl) return
  const svgProps = getSvgProps(svgEl)
  const svg = d3.select(wrapper).append('svg')

  const appendProps = (target, props) => {
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        target.attr(key, props[key])
      }
    }
  }

  const appendChild = (target: any, child: any[]) => {
    child.forEach(item => {
      const { name, props, children } = item
      const t = target.append(name)
      appendProps(t, props)
      appendChild(t, children)
    })
  }

  appendProps(svg, svgProps.props)
  appendChild(svg, svgProps.children)

  return svg[0][0]
}

type PNODE = SVGPathElement | SVGRectElement | SVGLineElement | SVGCircleElement

export function getPNode(svg?: SVGSVGElement) {
  if (!svg) return null
  const tagName = ['path', 'rect', 'line', 'circle']

  for (let i = 0; i < tagName.length; i++) {
    const name = tagName[i],
      node = svg.getElementsByTagName(name)[0] as PNODE
    if (node) return node
  }

  return null
}
