import { inject } from 'vue'

import { DROPDOWN_INJECTION_KEY } from '../tokens'

export function useDropdown() {
  const dropdownContext = inject(DROPDOWN_INJECTION_KEY)!

  return {
    dropdownContext,
  }
}
