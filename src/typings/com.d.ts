type ExpValue<T = string> = { value: T }

type HandlerEvent<T> = (item: T) => void
type onChildComEvent<T = any> = (id: string, type: string, param: T) => void

type Boundary = {
  display: boolean
  color: string
  width?: number
}

type TextStyle = {
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: string
  letterSpacing?: number
  lineHeight?: number
  italic?: boolean
}
