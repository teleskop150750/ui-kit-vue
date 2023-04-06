import { installer } from './defaults'

export * from './make-installer'
export * from '@nado/ui-kit-components'
export * from '@nado/ui-kit-constants'
export * from '@nado/ui-kit-directives'
export * from '@nado/ui-kit-hooks'

export const { install } = installer

// eslint-disable-next-line unicorn/prefer-export-from
export default installer
