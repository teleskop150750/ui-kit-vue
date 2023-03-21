import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#setreturnfocus')

  const focusTrap = createFocusTrap('#setreturnfocus', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    setReturnFocus: '#overwritten-element',
  })

  document.querySelector('#activate-setreturnfocus').addEventListener('click', focusTrap.activate)

  document.querySelector('#deactivate-setreturnfocus').addEventListener('click', focusTrap.deactivate)
}
