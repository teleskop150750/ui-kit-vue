import { useNamespace } from '@ui/hooks'
import { injectProp, type Nillable } from '@ui/utils'
import { computed, defineComponent, type Slot } from 'vue'

import { useTableColumn } from './hooks'
import { nTableProps } from './table.model'
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

    function getTBody() {
      const { body: bodySlot } = slots

      const child = computedRows.value.map((row, rowIndex) => getTBodyTR(row, bodySlot, rowIndex))

      return <tbody class={ns.e('tbody')}>{child}</tbody>
    }

    return () => (
      <div class={ns.b()}>
        <div>1</div>
        <table class={ns.e('table')}>{getTBody()}</table>
      </div>
    )
  },
})
