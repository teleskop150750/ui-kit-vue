import { withInstall, withNoopInstall } from '@ui/utils'

import { Table } from './src/table'
import Td from './src/td.vue'
import Th from './src/th.vue'

export const NTableV2 = withInstall(Table, {
  NTh: Th,
  NTd: Td,
})

export const NTd = withNoopInstall(Td)
export const NTh = withNoopInstall(Th)

export * from './src/table.model'
export * from './src/types'
