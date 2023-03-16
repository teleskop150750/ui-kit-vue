import { type ComponentSize, componentSizeMap } from '@ui/constants'

export function getComponentSize(size?: ComponentSize) {
  return componentSizeMap[size || 'default']
}
