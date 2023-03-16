export const listenOptions = {
  hasPassive: false,
  passiveCapture: true,
  notPassiveCapture: true,
}

export function stop(evt: Event) {
  evt.stopPropagation()
}

export function prevent(evt: Event) {
  evt.cancelable !== false && evt.preventDefault()
}

export function stopAndPrevent(evt: Event) {
  evt.cancelable !== false && evt.preventDefault()
  evt.stopPropagation()
}
