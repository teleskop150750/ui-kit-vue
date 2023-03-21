import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#escape-deactivates')
  const escapeDeactivatesOption = document.querySelector('#escape-deactivates-option')

  const focusTrap = createFocusTrap('#escape-deactivates', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    escapeDeactivates: () => escapeDeactivatesOption.checked,

    // allow clicking on the checkbox or its label since it's outside the trap
    allowOutsideClick: (e) => e.target === escapeDeactivatesOption || e.target === escapeDeactivatesOption.parentNode,
  })

  document.querySelector('#activate-escape-deactivates').addEventListener('click', focusTrap.activate)
  document.querySelector('#deactivate-escape-deactivates').addEventListener('click', focusTrap.deactivate)
}
