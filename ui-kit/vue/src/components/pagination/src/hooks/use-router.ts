import type { Router } from '@ui/hooks/use-router-link'
import { getCurrentInstance } from 'vue'

export function useRouter() {
  const instance = getCurrentInstance()!

  const router = instance.appContext.config.globalProperties.$router as Router

  return {
    router,
  }
}
