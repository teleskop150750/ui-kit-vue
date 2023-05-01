import type {} from '@vitest/spy'
import { vi } from 'vitest'
import { ref } from 'vue'

export function genTooltipProvides() {
  const onOpen = vi.fn()
  const onClose = vi.fn()
  const onToggle = vi.fn()
  const onShow = vi.fn()
  const onHide = vi.fn()
  const onBeforeShow = vi.fn()
  const onBeforeHide = vi.fn()
  const id = ref('test_id')
  const open = ref(false)
  const controlled = ref(false)
  const trigger = ref('hover')

  return {
    onToggle,
    onOpen,
    onClose,
    onShow,
    onHide,
    onBeforeShow,
    onBeforeHide,
    id,
    open,
    controlled,
    trigger,
  }
}
