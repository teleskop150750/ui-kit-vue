import { createFocusTrap } from '../../dist/index.mjs'

export default () => {
  const container = document.querySelector('#multipleelements-multipletraps')
  let isTrap1Active = false
  let isTrap2Active = false

  const onActivateTrap = () => {
    container.classList.add('is-active')
  }

  const onDeactivateTrap = () => {
    if (!isTrap1Active && !isTrap2Active) {
      container.classList.remove('is-active')
    }
  }

  const allowOutsideClick = (e) => e.target.className === 'enable-outside'

  const setActive = (selectors, isActive = true) => {
    selectors.forEach((selector) => {
      // eslint-disable-next-line unicorn/no-null
      document.querySelector(selector).className = isActive ? 'is-active-nested' : null
    })
  }

  const trap1Selectors = ['#multipleelements-multipletraps-1', '#multipleelements-multipletraps-3']

  const trap2Selectors = ['#multipleelements-multipletraps-2', '#multipleelements-multipletraps-4']

  const focusTrap1 = createFocusTrap(trap1Selectors, {
    onActivate() {
      onActivateTrap()

      if (isTrap2Active) {
        setActive(trap2Selectors, false)
      }

      setActive(trap1Selectors)
      isTrap1Active = true
    },
    onDeactivate() {
      setActive(trap1Selectors, false)

      if (isTrap2Active) {
        setActive(trap2Selectors)
      }

      isTrap1Active = false
      onDeactivateTrap()
    },
    allowOutsideClick,
  })

  const focusTrap2 = createFocusTrap(trap2Selectors, {
    onActivate() {
      onActivateTrap()

      if (isTrap1Active) {
        setActive(trap1Selectors, false)
      }

      setActive(trap2Selectors)
      isTrap2Active = true
    },
    onDeactivate() {
      setActive(trap2Selectors, false)

      if (isTrap1Active) {
        setActive(trap1Selectors)
      }

      isTrap2Active = false
      onDeactivateTrap()
    },
    allowOutsideClick,
  })

  document.querySelector('#activate-multipleelements-multipletraps-1').addEventListener('click', () => {
    focusTrap1.activate()
  })

  document.querySelector('#deactivate-multipleelements-multipletraps-1').addEventListener('click', () => {
    focusTrap1.deactivate()
  })

  document.querySelector('#activate-multipleelements-multipletraps-2').addEventListener('click', () => {
    focusTrap2.activate()
  })

  document.querySelector('#deactivate-multipleelements-multipletraps-2').addEventListener('click', () => {
    focusTrap2.deactivate()
  })
}
