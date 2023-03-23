import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#sibling-first')
  const second = document.querySelector('#sibling-second')

  const firstFocusTrap = createFocusTrap('#sibling-first', {
    onDeactivate: () => container.classList.remove('is-active'),
  })

  const secondFocusTrap = createFocusTrap('#sibling-second', {
    onDeactivate() {
      second.style.display = 'none'
      second.classList.remove('is-active')
    },
  })

  document.querySelector('#activate-first-sibling').addEventListener('click', () => {
    container.classList.add('is-active')
    firstFocusTrap.activate()
  })

  document.querySelector('#deactivate-first-sibling').addEventListener('click', firstFocusTrap.deactivate)

  document.querySelector('#activate-second-sibling').addEventListener('click', () => {
    second.style.display = 'block'
    second.className = 'trap is-active-nested'
    secondFocusTrap.activate()
  })

  document.querySelector('#deactivate-second-sibling').addEventListener('click', secondFocusTrap.deactivate)
}
