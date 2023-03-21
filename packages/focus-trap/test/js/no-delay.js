import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#no-delay')

  const focusTrap = createFocusTrap(container, {
    delayInitialFocus: false,
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
      e.preventDefault()
      focusTrap.activate()
    }
  }

  const hideContainer = () => {
    focusTrap.deactivate()
  }

  document.querySelector('#activate-no-delay').addEventListener('keydown', showContainer)
  document.querySelector('#close-button-no-delay').addEventListener('click', hideContainer)
}
