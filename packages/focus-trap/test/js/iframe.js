import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#iframe')

  const focusTrap = createFocusTrap('#iframe', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector('#activate-iframe').addEventListener('click', focusTrap.activate)

  document.querySelector('#deactivate-iframe').addEventListener('click', focusTrap.deactivate)
}
