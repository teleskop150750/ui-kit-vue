import { Z_INDEX } from '@ui/constants'
import { computed, ref } from 'vue'

import { useGlobalConfig } from '../use-global-config'

const zIndex = ref(0)

export const useZIndex = () => {
  const initialZIndex = useGlobalConfig('zIndex', Z_INDEX)
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value)

  const nextZIndex = () => {
    zIndex.value += 1

    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  }
}
