import type { CSSProperties } from 'vue'

import type { NThumbProps } from './thumb.model'

export const GAP = 3

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
} as const

export function renderThumbStyle({
  move,
  size,
  bar,
}: Pick<NThumbProps, 'move' | 'size'> & {
  bar: (typeof BAR_MAP)[keyof typeof BAR_MAP]
}): CSSProperties {
  return {
    [bar.size]: size,
    transform: `translate${bar.axis}(${move}%)`,
  }
}
