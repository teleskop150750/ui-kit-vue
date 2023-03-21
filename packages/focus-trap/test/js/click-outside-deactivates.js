import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#clickoutsidedeactivates')
  const trigger = document.querySelector('#activate-clickoutsidedeactivates')
  const select = document.querySelector('#select-clickoutsidedeactivates')
  const checkbox = document.querySelector('#checkbox-clickoutsidedeactivates')

  let active = false
  let clickOutsideDeactivates = true
  let returnFocusOnDeactivate = true

  const notice = document.createElement('span')

  notice.append(document.createTextNode('-> Must click on checkbox to deactivate'))

  const initialize = () =>
    createFocusTrap('#clickoutsidedeactivates', {
      returnFocusOnDeactivate,
      clickOutsideDeactivates,
      escapeDeactivates: false,
      onActivate: () => container.classList.add('is-active'),
      onDeactivate: () => {
        active = false
        container.classList.remove('is-active')
      },
    })

  let focusTrap = initialize()

  const activate = () => {
    active = true
    focusTrap.activate()
  }

  trigger.addEventListener('click', () => {
    if (!active) {
      activate()
    }
  })

  document
    .querySelector('#select-returnfocusondeactivate-clickoutsidedeactivates')
    .addEventListener('change', (event) => {
      returnFocusOnDeactivate = event.target.value === 'true'
      focusTrap = initialize()
    })

  select.addEventListener('change', (event) => {
    clickOutsideDeactivates = {
      boolean: true, // deactivate when click on anything
      function(e) {
        // only deactivate when click on checkbox
        return e.target === checkbox
      },
    }[event.target.value]

    if (event.target.value === 'function') {
      select.parentNode.append(notice)
    } else {
      notice.remove()
    }

    focusTrap = initialize()
  })
}
