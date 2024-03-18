import { StyleInterval } from '../../LczSubwayLine/type/child'

export type Style = { minw: number; maxw: number; shadow: string; bgc: string }

export interface LczSubwayRipplesProps {
  id: string
  repName: string
  styleIntervalItem: StyleInterval
  className: string
  dataItem: any
}
