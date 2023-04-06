import { type ComponentSize, componentSizes } from '@nado/ui-kit-constants'

export function isValidComponentSize(val: string): val is ComponentSize | '' {
  return ['', ...componentSizes].includes(val)
}
