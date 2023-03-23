import { createFocusTrap } from '../../dist/index.js'

export default () => {
  const container = document.querySelector('#iene')
  const activateTrigger = document.querySelector('#activate-iene')
  const deactivateTrigger = document.querySelector('#deactivate-iene')
  const select = document.querySelector('#select-iene')

  const initialize = ({ initialFocus = '#focused-input' }) =>
    createFocusTrap(container, {
      onActivate: () => container.classList.add('is-active'),
      onDeactivate: () => container.classList.remove('is-active'),
      initialFocus,
      escapeDeactivates: false,
    })

  let focusTrap = initialize({ initialFocus: select.value })

  activateTrigger.addEventListener('click', () => focusTrap.activate())
  deactivateTrigger.addEventListener('click', () => focusTrap.deactivate())

  select.addEventListener('change', (event) => {
    let initialFocus = event.target.value

    if (initialFocus === 'false') {
      initialFocus = false
    } else if (initialFocus === 'function-false') {
      initialFocus = () => false
    }
    // else, assume it's a selector

    focusTrap = initialize({
      initialFocus,
    })
  })
}
