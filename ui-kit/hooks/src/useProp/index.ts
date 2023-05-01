/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, type ComputedRef, getCurrentInstance } from 'vue'

export function useProp<T>(name: string): ComputedRef<T | undefined> {
  const vm = getCurrentInstance()

  return computed(() => (vm?.proxy?.$props as any)?.[name])
}
