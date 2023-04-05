import { definePropType, isNumber } from '@ui/utils'
import { computed } from 'vue'

import type { NTableProps } from '../table.model'
import type { NTableColumn, NTableColumnMap } from '../types'

export const useTableColumnProps = {
  visibleColumns: {
    type: definePropType<string[]>(Array),
    default: undefined,
  },
}

export function useTableColumn(props: NTableProps) {
  const cols = computed<NTableColumn[]>(() => {
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
      ? cols.value.filter((col) => col.required === true || visibleColumns.includes(col.name) === true)
      : cols.value
  })

  const computedCols = computed<NTableColumn[]>(() =>
    visibleColumnList.value.map((col) => {
      const align = col.align || 'right'

      return {
        ...col,
        align,
      }
    }),
  )

  const computedColsMap = computed<NTableColumnMap>(() => {
    const names: Record<NTableColumn['name'], NTableColumn> = {}

    computedCols.value.forEach((col) => {
      names[col.name] = col
    })

    return names
  })

  return {
    cols,
    computedCols,
    computedColsMap,
  }
}
