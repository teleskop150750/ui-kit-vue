// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSelectableInput(node: any): node is HTMLInputElement {
  return (
    typeof node.tagName === 'string' &&
    node.tagName.toLowerCase() === 'input' &&
    typeof (node as HTMLInputElement).select === 'function'
  )
}
