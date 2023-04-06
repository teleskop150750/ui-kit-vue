export function getCssVariable(el: HTMLElement, property: string) {
  return getComputedStyle(el).getPropertyValue(property)
}
