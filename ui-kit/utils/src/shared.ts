import type { VNode } from 'vue'

const objectToString = Object.prototype.toString

export { isEqual } from 'lodash-es'

export function toTypeString(value: unknown) {
  return objectToString.call(value)
}

export const isClient = typeof window !== 'undefined'
export const { isArray } = Array

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMap(val: unknown): val is Map<any, any> {
  return toTypeString(val) === '[object Map]'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSet(val: unknown): val is Set<any> {
  return toTypeString(val) === '[object Set]'
}

export function isDate(val: unknown): val is Date {
  return toTypeString(val) === '[object Date]'
}

export function isRegExp(val: unknown): val is RegExp {
  return toTypeString(val) === '[object RegExp]'
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

export function isSymbol(val: unknown): val is Symbol {
  return typeof val === 'symbol'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(val: unknown): val is Record<any, any> {
  return typeof val === 'object'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise(val: unknown): val is Promise<any> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isUndefined(val: unknown): val is undefined {
  return val === undefined
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
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

export function isStringNumber(val: string): boolean {
  if (!isString(val)) {
    return false
  }

  return !Number.isNaN(Number(val))
}

export function isNil(value: unknown): value is null | undefined {
  // eslint-disable-next-line unicorn/no-null, eqeqeq, no-eq-null
  return value == null
}

export function isPropAbsent(prop: unknown): prop is null | undefined {
  return isNil(prop)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isVNode(value: any): value is VNode {
  return value ? value.__v_isVNode === true : false
}

export function NOOP() {}
