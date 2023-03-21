export type Nillable<T> = T | undefined
export type Arrayable<T> = T | Array<T>
export type FocusableElement = HTMLElement | SVGElement

export type GetShadowRoot = (element: Element) => Nillable<ShadowRoot | boolean>

export interface TabbableCheckOptions {
  displayCheck?: 'full' | 'non-zero-area' | 'none'
  getShadowRoot?: boolean | GetShadowRoot
}

export interface TabbableOptions {
  includeContainer?: boolean
}
