// Types
import { getCurrentInstance } from '@nado/ui-kit-utils'
import type { VNode } from 'vue'

export function useRender(render: () => VNode): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vm = getCurrentInstance('useRender') as any

  vm.render = render
}
