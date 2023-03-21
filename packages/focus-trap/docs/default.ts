import { createFocusTrap } from '../src'

export default () => {
  const container = document.querySelector('#default')!

  const focusTrap = createFocusTrap('#default', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector<HTMLElement>('#activate-default')!.addEventListener('click', () => {
    focusTrap.activate()
  })
  document.querySelector<HTMLElement>('#deactivate-default')!.addEventListener('click', () => {
    focusTrap.deactivate()
  })
}
