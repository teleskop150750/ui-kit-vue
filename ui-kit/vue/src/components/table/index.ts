import { withInstall } from '@ui/utils'

import Table from './src/table.vue'
import { Table as Table2 } from './src/table2'

export const NTable = withInstall(Table)
export const NTable2 = withInstall(Table2)

export * from './src/table.model'
export * from './src/types'
