import { isRef, type Ref, watch } from 'vue'

/**
 * This method provides dialogable components the ability to restore previously activated element before
 * the dialog gets opened
 */
export const useRestoreActive = (toggle: Ref<boolean>, initialFocus?: Ref<HTMLElement>) => {
  let previousActive: HTMLElement

  watch(
    () => toggle.value,
    (val) => {
      if (val) {
        previousActive = document.activeElement as HTMLElement

        if (isRef(initialFocus)) {
          initialFocus.value.focus?.()
        }

        return
      }

      if (process.env.NODE_ENV === 'test') {
        // eslint-disable-next-line no-useless-call
        previousActive.focus.call(previousActive)

        return
      }

      previousActive.focus()
    },
  )
}
