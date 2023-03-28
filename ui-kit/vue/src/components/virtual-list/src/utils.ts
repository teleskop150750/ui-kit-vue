import type { Nullable } from '@ui/utils'
import type { CSSProperties } from 'vue'

import {
  BACKWARD,
  FORWARD,
  HORIZONTAL,
  LTR,
  PageKey,
  RTL,
  RTL_OFFSET_NAG,
  RTL_OFFSET_POS_ASC,
  RTL_OFFSET_POS_DESC,
} from './defaults'
import type { Direction, LayoutDirection, RTLOffsetType } from './types'

export function getScrollDir(prev: number, cur: number) {
  return prev < cur ? FORWARD : BACKWARD
}

export function getIsHorizontal(dir: string) {
  return dir === LTR || dir === RTL || dir === HORIZONTAL
}

export function isRTL(dir: Direction) {
  return dir === RTL
}

// TODO: Null
// eslint-disable-next-line unicorn/no-null
let cachedRTLResult: Nullable<RTLOffsetType> = null

export function getRTLOffsetType(recalculate = false): RTLOffsetType {
  if (cachedRTLResult === null || recalculate) {
    const outerDiv = document.createElement('div')
    const outerStyle = outerDiv.style

    outerStyle.width = '50px'
    outerStyle.height = '50px'
    outerStyle.overflow = 'scroll'
    outerStyle.direction = 'rtl'

    const innerDiv = document.createElement('div')
    const innerStyle = innerDiv.style

    innerStyle.width = '100px'
    innerStyle.height = '100px'

    outerDiv.append(innerDiv)

    document.body.append(outerDiv)

    if (outerDiv.scrollLeft > 0) {
      cachedRTLResult = RTL_OFFSET_POS_DESC
    } else {
      outerDiv.scrollLeft = 1

      cachedRTLResult = outerDiv.scrollLeft === 0 ? RTL_OFFSET_NAG : RTL_OFFSET_POS_ASC
    }

    outerDiv.remove()

    return cachedRTLResult
  }

  return cachedRTLResult
}

export function getRelativePos(evt: TouchEvent | MouseEvent, layout: LayoutDirection) {
  return 'touches' in evt ? evt.touches[0]![PageKey[layout]] : evt[PageKey[layout]]
}

interface RenderThumbStyleParams {
  bar: {
    size: 'height' | 'width'
    axis: 'X' | 'Y'
  }
  size: string
  move: number
}

export function renderThumbStyle({ move, size, bar }: RenderThumbStyleParams, layout: string) {
  const style: CSSProperties = {}
  const translate = `translate${bar.axis}(${move}px)`

  style[bar.size] = size
  style.transform = translate
  // polyfill
  ;(style as Record<string, string>).webkitTransform = translate

  if (layout === 'horizontal') {
    style.height = '100%'
  } else {
    style.width = '100%'
  }

  return style
}
