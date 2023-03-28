import { withInstall } from '@ui/utils'

// import _NVirtualGrid from './src/NVirtualGrid.vue'
import VirtualList from './src/virtual-list.vue'

// export const NVirtualGrid = withInstall(_NVirtualGrid)
export const NVirtualList = withInstall(VirtualList)
export * from './src/types'
export * from './src/virtual-list.model'
