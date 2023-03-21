/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, set } from 'lodash-es'
import type { Entries } from 'type-fest'

import type { Arrayable } from './typescript'

export const keysOf = <T extends object>(arr: T) => Object.keys(arr) as Array<keyof T>

export const entriesOf = <T extends object>(arr: T) => Object.entries(arr) as Entries<T>

export { hasOwn } from '@vue/shared'

export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any,
): { value: T } => ({
  get value() {
    return get(obj, path, defaultValue)
  },
  set value(val: any) {
    set(obj, path, val)
  },
})

export { clone as cloneObject } from 'lodash-es'
