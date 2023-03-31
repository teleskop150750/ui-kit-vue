import { definePropType, isNumber } from '@ui/utils'
import { computed } from 'vue'

import type { NTableProps } from '../table.model'
import type { NTableColumn } from '../types'

export const useTableColumnProps = {
  visibleColumns: {
    type: definePropType<string[]>(Array),
    default: undefined,
  },
}

export function useTableColumn(props: NTableProps) {
  const columnList = computed<NTableColumn[]>(() => {
    if (props.columns !== undefined) {
      return props.columns
    }

    // we infer columns from first row
    const row = props.rows[0]

    return row !== undefined
      ? Object.keys(row).map((name) => ({
          name,
          label: name.toUpperCase(),
          field: name,
          align: isNumber(row[name]) ? 'right' : 'left',
          sortable: true,
        }))
      : []
  })

  const visibleColumnList = computed<NTableColumn[]>(() => {
    const { visibleColumns } = props

    return visibleColumns !== undefined
      ? columnList.value.filter((col) => col.required === true || visibleColumns.includes(col.name) === true)
      : columnList.value
  })

  const computedColumnList = computed(() =>
    visibleColumnList.value.map((col) => {
      const align = col.align || 'right'

      return {
        ...col,
        align,
      }
    }),
  )

  const computedColsMap = computed(() => {
    const names: Record<NTableColumn['name'], NTableColumn> = {}

    computedColumnList.value.forEach((col) => {
      names[col.name] = col
    })

    return names
  })

  return {
    cols: columnList,
    computedCols: computedColumnList,
    computedColsMap,
  }
}
