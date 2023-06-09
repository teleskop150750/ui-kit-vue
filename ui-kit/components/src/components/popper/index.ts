import { withInstall } from '@nado/ui-kit-utils'

import Popper from './src/NPopper.vue'

export const ElPopper = withInstall(Popper)
export default ElPopper

export { default as ElPopperArrow } from './src/NPopperArrow.vue'
export { default as ElPopperContent } from './src/NPopperContent.vue'
export { default as ElPopperTrigger } from './src/NPopperTrigger.vue'
export * from './src/popper.model'
export * from './src/popper-arrow.model'
export * from './src/popper-content.model'
export * from './src/popper-trigger.model'
export * from './src/tokens'
export type { Options, Placement } from '@popperjs/core'
