import { addUnit } from '@ui/utils'
import { type ComputedRef, onBeforeUnmount, onMounted, type Ref, watchEffect } from 'vue'

export function useDraggable(
  targetRef: Ref<HTMLElement | undefined>,
  dragRef: Ref<HTMLElement | undefined>,
  draggable: ComputedRef<boolean>,
) {
  let transform = {
    offsetX: 0,
    offsetY: 0,
  }

  function onMousedown(e: MouseEvent) {
    const downX = e.clientX
    const downY = e.clientY
    const { offsetX, offsetY } = transform

    const targetRect = targetRef.value!.getBoundingClientRect()
    const targetLeft = targetRect.left
    const targetTop = targetRect.top
    const targetWidth = targetRect.width
    const targetHeight = targetRect.height

    const { clientWidth } = document.documentElement
    const { clientHeight } = document.documentElement

    const minLeft = -targetLeft + offsetX
    const minTop = -targetTop + offsetY
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
    const maxTop = clientHeight - targetTop - targetHeight + offsetY

    function onMousemove(evt: MouseEvent) {
      const moveX = Math.min(Math.max(offsetX + evt.clientX - downX, minLeft), maxLeft)
      const moveY = Math.min(Math.max(offsetY + evt.clientY - downY, minTop), maxTop)

      transform = {
        offsetX: moveX,
        offsetY: moveY,
      }
      targetRef.value!.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`
    }

    function onMouseup() {
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  function onDraggable() {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener('mousedown', onMousedown)
    }
  }

  function offDraggable() {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener('mousedown', onMousedown)
    }
  }

  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        onDraggable()
      } else {
        offDraggable()
      }
    })
  })

  onBeforeUnmount(() => {
    offDraggable()
  })
}
