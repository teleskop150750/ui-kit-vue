import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#multipleelements-delete')
  const selectors = ['#multipleelements-delete-1', '#multipleelements-delete-2']

  const focusTrap = createFocusTrap(selectors, {
    allowOutsideClick(event) {
      return event.target.id === 'deactivate-multipleelements-delete'
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

  document.querySelector('#activate-multipleelements-delete').addEventListener('click', () => {
    focusTrap.activate()
  })

  document.querySelector('#deactivate-multipleelements-delete').addEventListener('click', () => {
    focusTrap.deactivate()
  })

  document.querySelector('#multipleelements-delete-remove').addEventListener('click', () => {
    document.querySelector('#multipleelements-delete-removed-node').remove()
  })
}
