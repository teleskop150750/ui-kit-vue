import { type ComponentSize, componentSizes } from '@ui/constants'

export function isValidComponentSize(val: string): val is ComponentSize | '' {
  return ['', ...componentSizes].includes(val)
}
