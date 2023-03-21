import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#negative-tabindex')

  const focusTrap = createFocusTrap('#negative-tabindex', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector('#activate-negative-tabindex').addEventListener('click', focusTrap.activate)
  document.querySelector('#deactivate-negative-tabindex').addEventListener('click', focusTrap.deactivate)
}
