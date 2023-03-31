<script setup lang="ts">
import { useNamespace } from '@ui/hooks'
import { computed } from 'vue'

import { useTableColumn } from './hooks'
import { nTableProps } from './table.model'
import type { NTableColumn, NTableRow, NTableRowKey } from './types'

const props = defineProps(nTableProps)

const ns = useNamespace('table')
const { computedCols } = useTableColumn(props)

const getRowKey = computed<(row: NTableRow) => NTableRowKey>(() =>
  typeof props.rowKey === 'function' ? props.rowKey : (row: NTableRow) => row[props.rowKey as NTableRowKey],
)

const computedRows = computed(() => props.rows.map((row) => ({ ...row, $key: getRowKey.value(row) })))

function getCellValue(col: NTableColumn, row: NTableRow) {
  const val = typeof col.field === 'function' ? col.field(row) : row[col.field]

  return col.format !== undefined ? col.format(val, row) : val
}
</script>

<template>
  <div :class="ns">
    <div :class="ns.e('table')">
      <div :class="ns.e('tbody')">
        <slot v-if="$slots.body" name="body" />
        <template v-else>
          <template v-for="row in computedRows" :key="row.$key">
            <div :class="ns.e('tr')">
              <template v-for="col in computedCols" :key="`${row.$key}_${col.name}`">
                <slot v-if="$slots['body-cell']" name="body-cell" />
                <slot v-else-if="$slots[`body-cell-${col.name}`]" name="body-cell" />
                <div v-else :class="ns.e('td')">{{ getCellValue(col, row) }}</div>
              </template>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
