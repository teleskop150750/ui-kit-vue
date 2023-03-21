import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#tif')
  const focusable = document.querySelector('#tif-hide-focusable')

  const focusTrap = createFocusTrap(container, {
    fallbackFocus: container,
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector('#activate-tif').addEventListener('click', focusTrap.activate)

  document.querySelector('#deactivate-tif').addEventListener('click', focusTrap.deactivate)

  document.querySelector('#tif-show-focusable').addEventListener('click', () => {
    focusable.style.display = 'block'
  })

  document.querySelector('#tif-hide-focusable').addEventListener('click', () => {
    focusable.style.display = 'none'
  })
}
