import { EVENT_CODE } from '@nado/ui-kit-constants'
import { isClient } from '@nado/ui-kit-utils'
import { useEventListener } from '@vueuse/core'
import { type Ref, watch } from 'vue'

interface ModalInstance {
  handleClose: () => void
}

const modalStack: ModalInstance[] = []

function closeModal(e: KeyboardEvent) {
  if (modalStack.length === 0) {
    return
  }

  if (e.code === EVENT_CODE.esc) {
    e.stopPropagation()
    const topModal = modalStack.at(-1)!

    topModal.handleClose()
  }
}

export function useModal(instance: ModalInstance, visibleRef: Ref<boolean>) {
  watch(visibleRef, (val) => {
    if (val) {
      modalStack.push(instance)
    } else {
      modalStack.splice(modalStack.indexOf(instance), 1)
    }
  })
}

if (isClient) {
  useEventListener(document, 'keydown', closeModal)
}
