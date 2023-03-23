import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#input-activation')

  const focusTrap = createFocusTrap(container, {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector('#focused-input8').addEventListener('input', focusTrap.activate)

  document.querySelector('#deactivate-input-activation').addEventListener('click', focusTrap.deactivate)
}
