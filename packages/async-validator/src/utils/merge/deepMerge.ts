export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  if (!source) {
    return target
  }

  for (const s in source) {
    if (Object.hasOwn(source, s)) {
      const value = source[s]

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(target as Record<string, any>)[s] =
        typeof value === 'object' && typeof target[s] === 'object'
          ? {
              ...target[s],
              ...value,
            }
          : value
    }
  }

  return target
}
