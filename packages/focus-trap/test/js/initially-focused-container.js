import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#ifc')

  const focusTrap = createFocusTrap('#ifc', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    initialFocus: () => document.querySelector('#ifc'),
    clickOutsideDeactivates: true,
  })

  document.querySelector('#activate-ifc').addEventListener('click', focusTrap.activate)

  document.querySelector('#deactivate-ifc').addEventListener('click', focusTrap.deactivate)
}
