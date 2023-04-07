import { getCurrentInstance } from 'vue'

import type { Router } from '../../../config-provider'

export function useRouter() {
  const instance = getCurrentInstance()!

  const router = instance.appContext.config.globalProperties.$router as Router

  return {
    router,
  }
}
