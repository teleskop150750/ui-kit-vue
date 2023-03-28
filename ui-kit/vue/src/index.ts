import { installer } from './defaults'

export * from './components'
export * from './constants'
export * from './directives'
export * from './hooks'
export * from './make-installer'
export * from './tokens'
export * from './utils'

export const { install } = installer

// eslint-disable-next-line unicorn/prefer-export-from
export default installer
