import type { Ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mutable<T extends readonly any[] | Record<string, unknown>>(val: T) {
  return val as Mutable<typeof val>
}

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type HTMLElementCustomized<T> = HTMLElement & T

export type Nullable<T> = T | null
export type Nillable<T> = T | undefined

export type Arrayable<T> = T | T[]
export type Awaitable<T> = Promise<T> | T

export type MaybeRef<T> = T | Ref<T>
