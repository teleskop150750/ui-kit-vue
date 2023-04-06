const formatRegExp = /%[%djs]/g

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function format(template: ((...args: any[]) => string) | string, ...args: any[]): string {
  let i = 0
  const len = args.length

  if (typeof template === 'function') {
    return template(...args)
  }

  const str = template.replaceAll(formatRegExp, (x) => {
    if (x === '%%') {
      return '%'
    }

    if (i >= len) {
      return x
    }

    switch (x) {
      case '%s': {
        const result = String(args[i])

        i += 1

        return result
      }
      case '%d': {
        const result = Number(args[i]) as unknown as string

        i += 1

        return result
      }
      case '%j': {
        try {
          const result = JSON.stringify(args[i])

          i += 1

          return result
        } catch {
          return '[Circular]'
        }
      }
      default: {
        return x
      }
    }
  })

  return str
}
