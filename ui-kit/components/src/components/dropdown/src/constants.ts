import { EVENT_CODE } from '@nado/ui-kit-constants'

export const FIRST_KEYS = [EVENT_CODE.down, EVENT_CODE.pageDown, EVENT_CODE.home]

export const LAST_KEYS = [EVENT_CODE.up, EVENT_CODE.pageUp, EVENT_CODE.end]

export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]
