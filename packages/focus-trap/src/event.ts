import type { FocusableElement } from '@nado/tabbable'

export function isEscapeEvent(evt: KeyboardEvent) {
  return evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === 27
}

export function isTabEvent(evt: KeyboardEvent) {
  return evt.key === 'Tab' || evt.keyCode === 9
}

// checks for TAB by default
export function isKeyForward(evt: KeyboardEvent) {
  return isTabEvent(evt) && !evt.shiftKey
}

// checks for SHIFT+TAB by default
export function isKeyBackward(evt: KeyboardEvent) {
  return isTabEvent(evt) && evt.shiftKey
}

export function getActualTarget(event: Event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  const response =
    (event.target as HTMLElement).shadowRoot && typeof event.composedPath === 'function'
      ? event.composedPath()[0]
      : event.target!

  return response as FocusableElement
}
