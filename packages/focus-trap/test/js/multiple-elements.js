import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#multipleelements')
  const selectors = ['#multipleelements-1', '#multipleelements-3']

  const focusTrap = createFocusTrap(selectors, {
    clickOutsideDeactivates: true,
    onActivate() {
      container.classList.add('is-active')
      selectors.forEach((selector) => {
        document.querySelector(selector).className = 'is-active-nested'
      })
    },
    onDeactivate() {
      container.classList.remove('is-active')
      selectors.forEach((selector) => {
        // eslint-disable-next-line unicorn/no-null
        document.querySelector(selector).className = null
      })
    },
  })

  document.querySelector('#activate-multipleelements').addEventListener('click', () => {
    focusTrap.activate()
  })

  document.querySelector('#deactivate-multipleelements').addEventListener('click', () => {
    focusTrap.deactivate()
  })
}
