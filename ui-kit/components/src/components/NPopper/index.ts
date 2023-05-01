import { withInstall } from '@nado/ui-kit-utils'

import Popper from './src/NPopper.vue'

export const NPopper = withInstall(Popper)

export * from './src/NPopper.model'
export * from './src/NPopperArrow.model'
export { default as NPopperArrow } from './src/NPopperArrow.vue'
export * from './src/NPopperContent.model'
export { default as NPopperContent } from './src/NPopperContent.vue'
export * from './src/NPopperTrigger.model'
export { default as NPopperTrigger } from './src/NPopperTrigger.vue'
export * from './src/tokens'
export type { Options, Placement } from '@popperjs/core'
