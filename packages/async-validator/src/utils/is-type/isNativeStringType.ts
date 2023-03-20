export function isNativeStringType(type: string) {
  return (
    type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'date' || type === 'pattern'
  )
}
