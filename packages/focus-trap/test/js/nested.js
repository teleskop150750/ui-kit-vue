import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#nested')
  const nested = document.querySelector('#nested-nested')

  const primaryFocusTrap = createFocusTrap('#nested', {
    onDeactivate: () => {
      container.style.display = 'none'
    },
  })

  const nestedFocusTrap = createFocusTrap('#nested-nested', {
    onDeactivate() {
      nested.style.display = 'none'
      primaryFocusTrap.unpause()
    },
  })

  document.querySelector('#activate-nested').addEventListener('click', () => {
    container.style.display = 'block'
    primaryFocusTrap.activate()
  })

  document.querySelector('#deactivate-nested').addEventListener('click', primaryFocusTrap.deactivate)

  document.querySelector('#nested-activate-nested').addEventListener('click', () => {
    nested.style.display = 'block'
    nestedFocusTrap.activate()
  })

  document.querySelector('#nested-deactivate-nested').addEventListener('click', nestedFocusTrap.deactivate)
}
