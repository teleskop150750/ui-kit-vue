import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#delay')
  const focusTrap = createFocusTrap(container, {
    onActivate() {
      container.style.opacity = '1'
      container.classList.add('is-active')
    },
    onDeactivate() {
      container.style.opacity = '0.2'
      container.classList.remove('is-active')
    },
  })

  const showContainer = (e) => {
    if (e.keyCode === 13) {
      focusTrap.activate()
    }
  }

  const hideContainer = () => {
    focusTrap.deactivate()
  }

  document.querySelector('#activate-delay').addEventListener('keydown', showContainer)
  document.querySelector('#close-button-delay').addEventListener('click', hideContainer)
}
