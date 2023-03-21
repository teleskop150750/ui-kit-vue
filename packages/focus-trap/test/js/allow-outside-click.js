import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#allowoutsideclick')
  const trigger = document.querySelector('#activate-allowoutsideclick')
  let active = false
  let allowOutsideClick = true

  function initialize() {
    return createFocusTrap('#allowoutsideclick', {
      allowOutsideClick,
      escapeDeactivates: false,
      onActivate: () => container.classList.add('is-active'),
      onDeactivate: () => container.classList.remove('is-active'),
    })
  }

  let focusTrap = initialize()

  function activate() {
    focusTrap.activate()
    active = true
  }

  function deactivate() {
    focusTrap.deactivate()
    active = false
  }

  trigger.addEventListener('click', () => {
    if (active) {
      deactivate()
    } else {
      activate()
    }
  })

  document.querySelector('#deactivate-allowoutsideclick').addEventListener('click', deactivate)

  document.querySelector('#select-allowoutsideclick').addEventListener('change', (event) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    allowOutsideClick = {
      boolean: true,
      function(e) {
        if (e.target === trigger) {
          return true
        }
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    }[event.target.value]

    focusTrap = initialize()
  })
}
