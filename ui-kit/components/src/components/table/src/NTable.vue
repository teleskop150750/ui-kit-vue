<script setup lang="tsx">
import { useNamespace } from '@nado/ui-kit-hooks'
import { injectProp, type Nillable } from '@nado/ui-kit-utils'
import { computed, type Slot, useSlots } from 'vue'

import { useTableColumn, useTableColumnOrder, useTableOrderSort } from './hooks'
import NColgroup from './NColgroup.vue'
import NTh from './NTh.vue'
import { nTableEmits, nTableProps } from './table.model'
import type { BodyCellScopeData, NTableColumn, NTableRow, NTableRowKey, SlotData } from './types'

const props = defineProps(nTableProps)
const emit = defineEmits(nTableEmits)

const ns = useNamespace('table')
const slots = useSlots()

const { columnList, visibleColumnList, computedColsMap } = useTableColumn(props)
const { handleColumnDown, isMove, isDisableThClick } = useTableColumnOrder(columnList, emit)
const { sort } = useTableOrderSort(columnList, emit)
const getRowKey = computed<(row: NTableRow) => NTableRowKey>(() =>
  typeof props.rowKey === 'function' ? props.rowKey : (row: NTableRow) => row[props.rowKey as NTableRowKey],
)
const computedRows = computed(() => props.rows)

function getBodyCellScope(data: SlotData): BodyCellScopeData {
  injectBodyCommonScope(data)
  injectProp(data, 'value', () => getCellValue(data.col, data.row))

  return data
}

function injectBodyCommonScope(data: SlotData) {
  Object.assign(data, {
    cols: visibleColumnList.value,
    colsMap: computedColsMap.value,
    // sort,
    // rowIndex: firstRowIndex.value + data.pageIndex,
  })
}

function getCellValue(col: NTableColumn, row: NTableRow) {
  const val = typeof col.field === 'function' ? col.field(row) : row[col.field]

  return col.format !== undefined ? col.format(val, row) : val
}

function TableTHead() {
  const child = getTHeadTR()

  // if (props.loading === true && slots.loading === void 0) {
  //   child.push(
  //     h('tr', { class: 'q-table__progress' }, [
  //       h(
  //         'th',
  //         {
  //           class: 'relative-position',
  //           colspan: computedColspan.value,
  //         },
  //         getProgress(),
  //       ),
  //     ]),
  //   )
  // }

  return <thead class={ns.e('thead')}>{child}</thead>
}

function getTHeadTR() {
  const { header } = slots
  const headerCell = slots['header-cell']

  if (header !== undefined) {
    return [...header(getHeaderCellScope())]
  }

  const child = visibleColumnList.value.map((col) => {
    const headerCellCol = slots[`header-cell-${col.name}`]
    const slot = headerCellCol !== undefined ? headerCellCol : headerCell
    const thScope = getHeaderNameCellScope(col)

    return slot !== undefined ? (
      slot(thScope)
    ) : (
      <NTh key={col.name} isDisableClick={isDisableThClick.value} options={thScope} onPointerdown={handleColumnDown}>
        {col.label}
      </NTh>
    )
  })

  return <tr class={ns.e('tr')}>{child}</tr>
}

function getHeaderCellScope() {
  return {
    cols: visibleColumnList.value,
    colsMap: computedColsMap.value,
    sort,
  }
}

function getHeaderNameCellScope(col: NTableColumn) {
  return { col, ...getHeaderCellScope() }
}

function TableTBody() {
  const { body: bodySlot } = slots

  const child = computedRows.value.map((row, rowIndex) => getTBodyTR(row, bodySlot, rowIndex))

  return <tbody class={ns.e('tbody')}>{child}</tbody>
}

function getTBodyTR(row: NTableRow, _bodySlot: Nillable<Slot>, pageRowIndex: number) {
  const key = getRowKey.value(row)
  // const selected = isRowSelected(key)
  // if (bodySlot !== undefined) {
  //   return bodySlot(
  //     getBodyScope({
  //       key,
  //       row,
  //       pageIndex,
  //       __trClass: selected ? 'selected' : '',
  //     }),
  //   )
  // }
  const bodyCellSlot = slots['body-cell']
  const child = visibleColumnList.value.map((col) => {
    const bodyCellColSlot = slots[`body-cell-${col.name}`]
    const slot = bodyCellColSlot !== undefined ? bodyCellColSlot : bodyCellSlot

    return slot !== undefined ? (
      slot(getBodyCellScope({ key, row, pageRowIndex, col }))
    ) : (
      <td class={ns.e('td')}>{getCellValue(col, row)}</td>
    )
  })

  // if (hasSelectionMode.value === true) {
  //   const slot = slots['body-selection']
  //   const content =
  //     slot !== undefined
  //       ? slot(getBodySelectionScope({ key, row, pageIndex }))
  //       : [
  //           h(QCheckbox, {
  //             modelValue: selected,
  //             color: props.color,
  //             dark: isDark.value,
  //             dense: props.dense,
  //             'onUpdate:modelValue': (adding, evt) => {
  //               updateSelection([key], [row], adding, evt)
  //             },
  //           }),
  //         ]
  //   child.unshift(h('td', { class: 'q-table--col-auto-width' }, content))
  // }
  // const data = { key, class: { selected } }
  // if (props.onRowClick !== void 0) {
  //   data.class['cursor-pointer'] = true
  //   data.onClick = (evt) => {
  //     emit('RowClick', evt, row, pageIndex)
  //   }
  // }
  // if (props.onRowDblclick !== void 0) {
  //   data.class['cursor-pointer'] = true
  //   data.onDblclick = (evt) => {
  //     emit('RowDblclick', evt, row, pageIndex)
  //   }
  // }
  // if (props.onRowContextmenu !== void 0) {
  //   data.class['cursor-pointer'] = true
  //   data.onContextmenu = (evt) => {
  //     emit('RowContextmenu', evt, row, pageIndex)
  //   }
  // }
  return <tr class={ns.e('tr')}>{child}</tr>
}
</script>

<script lang="tsx">
export default {
  name: 'NTable',
}
</script>

<template>
  <div :class="[ns.b(), ns.is('column-move', isMove)]">
    <table :class="ns.e('table')">
      <NColgroup :columns="visibleColumnList" />
      <TableTHead />
      <TableTBody />
    </table>
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-table/n-table/index.css');
</style>
