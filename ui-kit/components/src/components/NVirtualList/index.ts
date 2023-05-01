import { withInstall } from '@nado/ui-kit-utils'

// import _NVirtualGrid from './src/NVirtualGrid.vue'
import VirtualList from './src/NVirtualList.vue'

// export const NVirtualGrid = withInstall(_NVirtualGrid)
export const NVirtualList = withInstall(VirtualList)
export * from './src/NVirtualList.model'
export * from './src/NVirtualScrollbar.model'
export * from './src/types'
