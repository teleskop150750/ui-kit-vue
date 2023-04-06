import { useNamespace } from '@nado/ui-kit-hooks'
import { injectProp, type Nillable } from '@nado/ui-kit-utils'
import { computed, defineComponent, type Slot } from 'vue'

import { useTableColumn } from './hooks'
import { nTableProps } from './table.model'
import NTh from './th.vue'
import type { BodyCellScopeData, NTableColumn, NTableRow, NTableRowKey, SlotData } from './types'

export const Table = defineComponent({
  name: 'NTable',
  props: {
    ...nTableProps,
  },

  setup(props, { slots }) {
    const ns = useNamespace('table')

    const { computedCols, computedColsMap } = useTableColumn(props)
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
        cols: computedCols.value,
        colsMap: computedColsMap.value,
        // sort,
        // rowIndex: firstRowIndex.value + data.pageIndex,
      })
    }

    function getCellValue(col: NTableColumn, row: NTableRow) {
      const val = typeof col.field === 'function' ? col.field(row) : row[col.field]

      return col.format !== undefined ? col.format(val, row) : val
    }

    function getTHead() {
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

      const child = computedCols.value.map((col) => {
        const headerCellCol = slots[`header-cell-${col.name}`]
        const slot = headerCellCol !== undefined ? headerCellCol : headerCell
        const thProps = getHeaderNameCellScope(col)

        return slot !== undefined ? (
          slot(thProps)
        ) : (
          <NTh key={col.name} col={thProps.col} cols={thProps.cols} colsMap={thProps.colsMap}>
            {col.label}
          </NTh>
        )
      })

      return <tr class={ns.e('thead-tr')}>{child}</tr>
    }

    function getHeaderCellScope() {
      return {
        cols: computedCols.value,
        colsMap: computedColsMap.value,
      }
    }

    function getHeaderNameCellScope(col: NTableColumn) {
      return { col, ...getHeaderCellScope() }
    }

    function getTBody() {
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
      const child = computedCols.value.map((col) => {
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

    return () => (
      <div class={ns.b()}>
        <table class={ns.e('table')}>
          {getTHead()}
          {getTBody()}
        </table>
      </div>
    )
  },
})
