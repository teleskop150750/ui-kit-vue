import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#global-trap-stack')
  const counter = container.querySelector('.counter')

  window.__trapStack = []

  const updateCounter = () => {
    counter.innerHTML = window.__trapStack.length
  }

  const focusTrap = createFocusTrap('#global-trap-stack', {
    trapStack: window.__trapStack,
    onPostActivate: () => {
      container.classList.add('is-active')
      updateCounter()
    },
    onPostDeactivate: () => {
      container.classList.remove('is-active')
      updateCounter()
    },
  })

  updateCounter()

  document.querySelector('#activate-global-trap-stack').addEventListener('click', focusTrap.activate)
  document.querySelector('#deactivate-global-trap-stack').addEventListener('click', focusTrap.deactivate)
}
