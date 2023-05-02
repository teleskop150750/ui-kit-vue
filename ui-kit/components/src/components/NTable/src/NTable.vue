<script setup lang="tsx">
import { useLocale, useNamespace } from '@nado/ui-kit-hooks'
import { injectProp, type Nillable } from '@nado/ui-kit-utils'
import { computed, onMounted, ref, type Slot, useSlots } from 'vue'

import { NPagination } from '../../NPagination'
import { NScrollbar, type NScrollbarInstance } from '../../NScrollbar'
import { NSyncScroll, type NSyncScrollInstance } from '../../NSyncScroll'
import {
  useTableColumn,
  useTableColumnOrder,
  useTableColumnResize,
  useTableOrderSort,
  useTablePagination,
  useTableRequest,
} from './hooks'
import NColgroup from './NColgroup.vue'
import { tableEmits, tableProps } from './NTable.model'
import NTh from './NTh.vue'
import type { BodyCellScopeData, NTableColumn, NTableRow, NTableRowKey, SlotData } from './types'

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const { t } = useLocale()
const ns = useNamespace('table')
const slots = useSlots()
const { columnList, visibleColumnList, computedColsMap } = useTableColumn(props)
const { sendRequest } = useTableRequest(columnList, emit)
const { rowsStart, rowsEnd, totalRows, pageRows, setCurrentPage, setPageSize } = useTablePagination({
  sendRequest,
  props,
  emit,
})

const { handleColumnResizerDown, isColumnResizeActive } = useTableColumnResize(columnList, emit)
const { handleColumnDown, isColumnOrdering, isColumnOrderingActive } = useTableColumnOrder(
  columnList,
  visibleColumnList,
  emit,
)
const { sort } = useTableOrderSort({
  sendRequest,
  columnList,
  emit,
})

const syncScrollRef = ref<NSyncScrollInstance>()
const tableHeaderRef = ref<HTMLDivElement>()
const tableBodyScrollbarRef = ref<NScrollbarInstance>()

const isDisableClick = computed(() => isColumnOrderingActive.value || isColumnResizeActive.value)
const getRowKey = computed<(row: NTableRow) => NTableRowKey>(() =>
  typeof props.rowKey === 'function' ? props.rowKey : (row: NTableRow) => row[props.rowKey as NTableRowKey],
)

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

// Lifecycle Hooks
onMounted(() => {
  if (syncScrollRef.value && tableHeaderRef.value && tableBodyScrollbarRef.value?.wrapRef) {
    syncScrollRef.value?.addElement([tableHeaderRef.value, tableBodyScrollbarRef.value.wrapRef])
  }
})

// Components
function TableHead() {
  const rows = TableHeadTr()

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

  return <thead class={ns.e('thead')}>{rows}</thead>
}

function TableHeadTr() {
  const { header } = slots
  const headerCell = slots['header-cell']

  if (header !== undefined) {
    return [...header(getHeaderCellScope())]
  }

  const cells = visibleColumnList.value.map((col) => {
    const headerCellCol = slots[`header-cell-${col.name}`]
    const slot = headerCellCol !== undefined ? headerCellCol : headerCell
    const thScope = getHeaderNameCellScope(col)

    return slot !== undefined ? (
      slot(thScope)
    ) : (
      <NTh
        key={col.name}
        isDisableClick={isDisableClick.value}
        options={thScope}
        onOrderDown={handleColumnDown}
        onResizerDown={handleColumnResizerDown}
      >
        {col.label}
      </NTh>
    )
  })

  return (
    <tr class={ns.e('tr')}>
      {cells}
      <th class={[ns.e('th'), ns.eIs('th', 'empty')]}></th>
    </tr>
  )
}

function TableBody() {
  const { body: bodySlot } = slots

  const child = pageRows.value.map((row, rowIndex) => TableBodyTr(row, bodySlot, rowIndex))

  return <tbody class={ns.e('tbody')}>{child}</tbody>
}

function TableBodyTr(row: NTableRow, _bodySlot: Nillable<Slot>, rowIndexOnPage: number) {
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
      slot(getBodyCellScope({ key, row, rowIndexOnPage, col }))
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: Record<string, any> = { key }

  if (props.onRowClick !== undefined) {
    data.onClick = (evt: MouseEvent) => {
      emit('rowClick', evt, row, rowIndexOnPage)
    }
  }

  if (props.onRowDblclick !== undefined) {
    data.class['cursor-pointer'] = true
    data.onDblclick = (evt: MouseEvent) => {
      emit('rowDblclick', evt, row, rowIndexOnPage)
    }
  }

  if (props.onRowContextmenu !== undefined) {
    data.class['cursor-pointer'] = true
    data.onContextmenu = (evt: MouseEvent) => {
      emit('rowContextmenu', evt, row, rowIndexOnPage)
    }
  }

  return (
    <tr class={ns.e('tr')} {...data}>
      {child}
      <td class={[ns.e('td'), ns.eIs('td', 'empty')]}></td>
    </tr>
  )
}
</script>

<script lang="tsx">
export default {
  name: 'NTable',
}
</script>

<template>
  <div :class="[ns.b(), ns.is('column-ordering', isColumnOrdering)]">
    <div :class="ns.e('table-wrapper')">
      <NSyncScroll ref="syncScrollRef">
        <div ref="tableHeaderRef" :class="ns.e('table-header-wrapper')">
          <table :class="ns.e('table-header')">
            <NColgroup :columns="visibleColumnList" />
            <TableHead />
          </table>
        </div>
        <NScrollbar ref="tableBodyScrollbarRef" :class="ns.e('table-body-wrapper')" max-height="300">
          <table :class="ns.e('table-body')">
            <NColgroup :columns="visibleColumnList" />
            <TableBody />
          </table>
        </NScrollbar>
      </NSyncScroll>
    </div>
    <div :class="ns.e('footer')">
      <div :class="ns.e('pagination-wrapper')">
        <span>{{ t('nado.pagination.info', { start: rowsStart, end: rowsEnd, total: totalRows }) }}</span>
        <NPagination
          :total="totalRows"
          :page-count="pageCount"
          :default-page-size="defaultPageSize"
          :default-current-page="defaultCurrentPage"
          :pager-count="pagerCount"
          :prev-text="prevText"
          :prev-icon="prevIcon"
          :next-text="nextText"
          :next-icon="nextIcon"
          :hide-on-single-page="hideOnSinglePage"
          :current-page="currentPage"
          :page-size="pageSize"
          :query-type="queryType"
          :query-page-number="queryPageNumber"
          :query-page-size="queryPageSize"
          :query-page-offset="queryPageOffset"
          :query-page-limit="queryPageLimit"
          @update:current-page="setCurrentPage"
          @update:page-size="setPageSize"
        />
      </div>
    </div>
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-table/index.css');
</style>
