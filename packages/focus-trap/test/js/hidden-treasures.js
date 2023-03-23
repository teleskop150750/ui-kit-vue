import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#ht')
  const more = document.querySelector('#ht-more')

  const focusTrap = createFocusTrap(container, {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  })

  document.querySelector('#activate-ht').addEventListener('click', focusTrap.activate)

  document.querySelector('#ht-show-more').addEventListener('click', () => {
    more.style.display = 'block'
  })

  document.querySelector('#ht-show-less').addEventListener('click', () => {
    more.style.display = 'none'
  })
}
