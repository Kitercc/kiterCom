import { ColumnsProps } from './LczBorderColumns/type'
import { LczBorderRadiuProps } from './LczBorderRadiu/type'
import { RaduiRightIcon } from './LczBorderRadiuRightIcon/type'
import { RectangleProps } from './LczBorderRectangle/type'
import { GradientProps } from './LczBorderTopGradient/type'

interface ItemProps extends ColumnsProps, GradientProps, RaduiRightIcon, LczBorderRadiuProps, RectangleProps {}

export interface LczBorderProps extends ItemProps {
  borderType:
    | 'lcz-border-rectangle'
    | 'lcz-border-radiu'
    | 'lcz-border-radiu-right-icon'
    | 'lcz-border-top-gradient'
    | 'lcz-border-columns'
}

export type CompoundedLczBorder = React.MemoExoticComponent<(props: LczBorderProps) => JSX.Element> & {
  LczBorderRectangle: React.MemoExoticComponent<(props?: RectangleProps) => JSX.Element>
  LczBorderRadiu: React.MemoExoticComponent<(props?: LczBorderRadiuProps) => JSX.Element>
  LczBorderRadiuRightIcon: React.MemoExoticComponent<(props?: RaduiRightIcon) => JSX.Element>
  LczBorderTopGradient: React.MemoExoticComponent<(props?: GradientProps) => JSX.Element>
  LczBorderColumns: React.MemoExoticComponent<(props?: ColumnsProps) => JSX.Element>
}
