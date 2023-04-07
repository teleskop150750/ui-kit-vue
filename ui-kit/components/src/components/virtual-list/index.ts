import { withInstall } from '@nado/ui-kit-utils'

// import _NVirtualGrid from './src/NVirtualGrid.vue'
import VirtualList from './src/NVirtualList.vue'

// export const NVirtualGrid = withInstall(_NVirtualGrid)
export const NVirtualList = withInstall(VirtualList)
export * from './src/types'
export * from './src/virtual-list.model'
