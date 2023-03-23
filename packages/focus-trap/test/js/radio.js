import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#radio')

  const focusTrap = createFocusTrap('#radio', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector('#activate-radio').addEventListener('click', focusTrap.activate)

  document.querySelector('#deactivate-radio').addEventListener('click', focusTrap.deactivate)
}
