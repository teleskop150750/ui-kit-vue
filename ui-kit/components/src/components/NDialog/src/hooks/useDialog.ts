import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { namespace, useFocusTrap, useId, useLockScreen, useZIndex } from '@nado/ui-kit-hooks'
import { addUnit, isClient } from '@nado/ui-kit-utils'
import { useTimeoutFn } from '@vueuse/core'
import {
  computed,
  type CSSProperties,
  getCurrentInstance,
  nextTick,
  onMounted,
  type Ref,
  ref,
  type SetupContext,
  watch,
} from 'vue'

import type { DialogEmits, DialogProps } from '../NDialog.model'

export const useDialog = (props: DialogProps, targetRef: Ref<HTMLElement | undefined>) => {
  const instance = getCurrentInstance()!
  const emit = instance.emit as SetupContext<DialogEmits>['emit']
  const { nextZIndex } = useZIndex()

  const { activate, deactivate } = useFocusTrap(targetRef, {
    onDeactivate: handleClose,
    allowOutsideClick: true,
  })

  let lastPosition = ''
  const titleId = useId()
  const bodyId = useId()
  const visible = ref(false)
  const closed = ref(false)
  const rendered = ref(false) // when desctroyOnClose is true, we initialize it as false vise versa
  const zIndex = ref(props.zIndex || nextZIndex())

  let openTimer: (() => void) | undefined = undefined
  let closeTimer: (() => void) | undefined = undefined

  const style = computed<CSSProperties>(() => {
    const result: CSSProperties = {}
    const varPrefix = `--${namespace}-dialog` as const

    if (!props.fullscreen) {
      if (props.top) {
        result[`${varPrefix}-margin-top`] = props.top
      }

      if (props.width) {
        result[`${varPrefix}-width`] = addUnit(props.width)
      }
    }

    return result
  })

  const overlayDialogStyle = computed<CSSProperties>(() => {
    if (props.alignCenter) {
      return { display: 'flex' }
    }

    return {}
  })

  function afterEnter() {
    activate()
    emit('opened')
  }

  function beforeLeave() {
    deactivate()
    emit('close')
  }

  function afterLeave() {
    emit('closed')
    emit(UPDATE_MODEL_EVENT, false)

    if (props.destroyOnClose) {
      rendered.value = false
    }
  }

  function open() {
    closeTimer?.()
    openTimer?.()

    if (props.openDelay && props.openDelay > 0) {
      ;({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay))
    } else {
      doOpen()
    }
  }

  function close() {
    openTimer?.()
    closeTimer?.()

    if (props.closeDelay && props.closeDelay > 0) {
      ;({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay))
    } else {
      doClose()
    }
  }

  function handleClose() {
    function hide(shouldCancel?: boolean) {
      if (shouldCancel) {
        return
      }

      closed.value = true
      visible.value = false
    }

    if (props.beforeClose) {
      props.beforeClose(hide)
    } else {
      close()
    }
  }

  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose()
    }
  }

  function doOpen() {
    if (!isClient) {
      return
    }

    visible.value = true
  }

  function doClose() {
    visible.value = false
  }

  if (props.lockScroll) {
    useLockScreen(visible)
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        closed.value = false
        open()
        rendered.value = true // enables lazy rendering
        // eslint-disable-next-line no-plusplus
        zIndex.value = props.zIndex ? zIndex.value++ : nextZIndex()
        // this.$el.addEventListener('scroll', this.updatePopper)
        nextTick(() => {
          emit('open')

          if (targetRef.value) {
            targetRef.value.scrollTop = 0
          }
        })
      } else {
        // this.$el.removeEventListener('scroll', this.updatePopper
        // eslint-disable-next-line no-lonely-if
        if (visible.value) {
          close()
        }
      }
    },
  )

  watch(
    () => props.fullscreen,
    (val) => {
      if (!targetRef.value) {
        return
      }

      if (val) {
        lastPosition = targetRef.value.style.transform
        targetRef.value.style.transform = ''
      } else {
        targetRef.value.style.transform = lastPosition
      }
    },
  )

  onMounted(() => {
    if (props.modelValue) {
      visible.value = true
      rendered.value = true // enables lazy rendering
      open()
    }
  })

  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    titleId,
    bodyId,
    closed,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex,
  }
}
