import { type ComponentSize, componentSizeMap } from '@nado/ui-kit-constants'

export function getComponentSize(size?: ComponentSize) {
  return componentSizeMap[size || 'default']
}
