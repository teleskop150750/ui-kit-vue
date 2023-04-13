import { ref } from 'vue'

import type { NTooltipContentProps } from '../tooltip-content.model'

export function useFocusTrap(props: NTooltipContentProps) {
  const isTrapping = ref(false)

  function activate() {
    if (!props.isVirtualTriggering && props.isTrapping) {
      isTrapping.value = true
    }
  }

  function deactivate() {
    isTrapping.value = false
  }

  return {
    isTrapping,
    activate,
    deactivate,
  }
}
