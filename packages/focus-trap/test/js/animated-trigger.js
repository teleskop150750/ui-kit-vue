import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#animated-trigger')
  const trigger = document.querySelector('#activate-animated-trigger')
  const deactivatedFlag = document.querySelector('#animated-trigger-trap-deactivated')
  const returnFocusCheckbox = document.querySelector('#animated-trigger-returnfocus')

  const focusTrap = createFocusTrap('#animated-trigger', {
    // Called before focus is sent
    onActivate: () => {
      container.classList.add('is-active')
      trigger.classList.add('is-triggered')
      deactivatedFlag.classList.add('is-hidden')
    },
    onDeactivate: () => {
      container.classList.remove('is-active')
      trigger.classList.remove('is-triggered')
    },
    // There is a delay between when the class is removed
    // and when the trigger is focusable
    checkCanReturnFocus: (triggerButton) =>
      new Promise((resolve) => {
        const interval = setInterval(() => {
          if (getComputedStyle(triggerButton).visibility !== 'hidden') {
            resolve()
            clearInterval(interval)
          }
        }, 5)
      }),
    // Called after focus is sent to the trigger button
    onPostDeactivate: () => {
      deactivatedFlag.classList.remove('is-hidden')
    },
  })

  document.querySelector('#activate-animated-trigger').addEventListener('click', focusTrap.activate)

  document.querySelector('#deactivate-animated-trigger').addEventListener('click', () => {
    focusTrap.deactivate({
      returnFocus: returnFocusCheckbox.checked,
    })
  })
}
