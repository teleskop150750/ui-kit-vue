import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#default')

  const focusTrap = createFocusTrap('#default', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector('#activate-default').addEventListener('click', () => {
    focusTrap.activate()
  })
  document.querySelector('#deactivate-default').addEventListener('click', () => {
    focusTrap.deactivate()
  })
}
