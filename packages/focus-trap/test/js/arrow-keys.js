import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#arrow-keys')

  const focusTrap = createFocusTrap('#arrow-keys', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    isKeyForward: (event) => event.key === 'k',
    isKeyBackward: (event) => event.key === 'j',
  })

  document.querySelector('#activate-arrow-keys').addEventListener('click', focusTrap.activate)
  document.querySelector('#deactivate-arrow-keys').addEventListener('click', focusTrap.deactivate)
}
