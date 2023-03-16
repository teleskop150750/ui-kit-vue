/* eslint-disable @typescript-eslint/no-explicit-any */
export const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) => val as Mutable<typeof val>
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type HTMLElementCustomized<T> = HTMLElement & T

export type Nullable<T> = T | null
export type Nillable<T> = T | undefined

export type Arrayable<T> = T | T[]
export type Awaitable<T> = Promise<T> | T
