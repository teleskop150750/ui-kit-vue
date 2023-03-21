import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#multipleelements-delete-all')
  const selectors = ['#multipleelements-delete-all-1', '#multipleelements-delete-all-2']

  const focusTrap = createFocusTrap(selectors, {
    fallbackFocus: '#deactivate-multipleelements-delete-all',
    allowOutsideClick(event) {
      return event.target.id === 'deactivate-multipleelements-delete-all'
    },
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

  document.querySelector('#activate-multipleelements-delete-all').addEventListener('click', () => {
    focusTrap.activate()
  })

  document.querySelector('#deactivate-multipleelements-delete-all').addEventListener('click', () => {
    focusTrap.deactivate()
  })

  document.querySelector('#multipleelements-delete-all-remove').addEventListener('click', (event) => {
    document.querySelector('#multipleelements-delete-all-removed-node').remove()
    event.target.remove()
  })
}
