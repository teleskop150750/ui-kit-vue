import { definePropType, isNumber } from '@nado/ui-kit-utils'
import { computed } from 'vue'

import type { NTableProps } from '../table.model'
import type { NTableColumn, NTableColumnInner, NTableColumnMap } from '../types'

export const useTableColumnProps = {
  visibleColumns: {
    type: definePropType<string[]>(Array),
    default: undefined,
  },
}

const DEFAULT_WIDTH = 200

export function useTableColumn(props: NTableProps) {
  const columnList = computed<NTableColumnInner[]>(() => {
    if (props.columns !== undefined) {
      return formatColumns(props.columns)
    }

    // we infer columns from first row
    const row = props.rows[0]

    if (row === undefined) {
      return []
    }

    return Object.keys(row).map((name) => ({
      name,
      label: name.toUpperCase(),
      field: name,
      width: DEFAULT_WIDTH,
      align: isNumber(row[name]) ? 'right' : 'left',
      sortOrder: '',
      minWidth: DEFAULT_WIDTH,
      isResizable: false,
      isSortable: false,
      isRequired: false,
    }))
  })

  const visibleColumnList = computed<NTableColumn[]>(() => {
    const { visibleColumns } = props

    return visibleColumns !== undefined
      ? columnList.value.filter((col) => col.isRequired === true || visibleColumns.includes(col.name) === true)
      : columnList.value
  })

  const computedColsMap = computed<NTableColumnMap>(() => {
    const names: Record<NTableColumn['name'], NTableColumn> = {}

    visibleColumnList.value.forEach((col) => {
      names[col.name] = col
    })

    return names
  })

  return {
    columnList,
    visibleColumnList,
    computedColsMap,
  }
}

function formatColumns(columns: NTableColumn[]): NTableColumnInner[] {
  return columns.map((col) => {
    const minWidth = isNumber(col.minWidth) ? col.minWidth : col.width
    const align = col.align || 'right'
    const sortOrder = col.sortOrder || ''
    const isResizable = col.isResizable || false
    const isSortable = col.isSortable || false
    const isRequired = col.isSortable || false

    return {
      ...col,
      align,
      minWidth,
      sortOrder,
      isResizable,
      isSortable,
      isRequired,
    }
  })
}
