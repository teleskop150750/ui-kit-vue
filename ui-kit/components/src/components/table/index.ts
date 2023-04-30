import { withInstall, withNoopInstall } from '@nado/ui-kit-utils'

import Table from './src/NTable.vue'
import Td from './src/NTd.vue'
import Th from './src/NTh.vue'

export const NTable = withInstall(Table, {
  NTh: Th,
  NTd: Td,
})

export const NTd = withNoopInstall(Td)
export const NTh = withNoopInstall(Th)

export * from './src/table.model'
export * from './src/types'
