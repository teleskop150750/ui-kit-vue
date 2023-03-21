import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#inert')

  const focusTrap = createFocusTrap('#inert', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector('#activate-inert').addEventListener('click', focusTrap.activate)
  document.querySelector('#deactivate-inert').addEventListener('click', focusTrap.deactivate)
}
