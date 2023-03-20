/* eslint-disable @typescript-eslint/no-explicit-any */

export function composeEventHandlers<E>(
  theirsHandler?: (event: E) => boolean | void,
  oursHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  function handleEvent(event: E) {
    const shouldPrevent = theirsHandler?.(event)

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler?.(event)
    }
  }

  return handleEvent
}

type WhenMouseHandler = (e: PointerEvent) => any

export function whenMouse(handler: WhenMouseHandler): WhenMouseHandler {
  return (e: PointerEvent) => (e.pointerType === 'mouse' ? handler(e) : undefined)
}
