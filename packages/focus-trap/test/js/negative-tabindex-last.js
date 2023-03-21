import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#negative-tabindex-last')

  const focusTrap = createFocusTrap('#negative-tabindex-last', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector('#activate-negative-tabindex-last').addEventListener('click', focusTrap.activate)
  document.querySelector('#deactivate-negative-tabindex-last').addEventListener('click', focusTrap.deactivate)
}
