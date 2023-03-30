import { isArray, isObject, isString } from '@vue/shared'
import { isNil } from 'lodash-es'

export { isArray, isDate, isFunction, isObject, isPromise, isString, isSymbol } from '@vue/shared'
export { isBoolean, isNumber } from '@vueuse/core'
export { isEqual, isNil } from 'lodash-es'
export { isVNode } from 'vue'

export function isUndefined(val: unknown): val is undefined {
  return val === undefined
}

export function isEmpty(val: unknown) {
  return (!val && val !== 0) || (isArray(val) && val.length === 0) || (isObject(val) && Object.keys(val).length === 0)
}

export function isElement(element: unknown): element is Element {
  if (Element === undefined) {
    return false
  }

  return element instanceof Element
}

export function isPropAbsent(prop: unknown): prop is null | undefined {
  return isNil(prop)
}

export function isStringNumber(val: string): boolean {
  if (!isString(val)) {
    return false
  }

  return !Number.isNaN(Number(val))
}
