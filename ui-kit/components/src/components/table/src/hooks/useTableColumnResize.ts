import { type ComputedRef, ref, type SetupContext } from 'vue'

import type { NTableEmits } from '../table.model'
import type { NTableColumnInner } from '../types'

export function useTableColumnResize(
  tableColumnList: ComputedRef<NTableColumnInner[]>,
  emit: SetupContext<NTableEmits>['emit'],
) {
  let currentColumnName = ''
  let initCoordX = 0
  let initColumnWidth = 0
  const isColumnResizeActive = ref(false)
  const rangeDistance = {
    min: 0,
  }

  function handleColumnResizerDown(event: PointerEvent, columnName: NTableColumnInner['name']) {
    const currentColumn = tableColumnList.value.find((el) => el.name === columnName)

    if (!currentColumn) {
      return
    }

    if (!currentColumn.isResizable) {
      return
    }

    currentColumnName = columnName
    initColumnWidth = currentColumn.width

    rangeDistance.min = currentColumn.minWidth - currentColumn.width
    initCoordX = event.clientX

    document.addEventListener('pointermove', processResize)
    document.addEventListener('pointerup', handleColumnUp, { once: true })
  }

  function handleColumnUp() {
    initCoordX = 0
    rangeDistance.min = 0
    document.removeEventListener('pointermove', processResize)
    document.addEventListener('click', handleColumnClick, { once: true })
  }

  function handleColumnClick() {
    isColumnResizeActive.value = false
  }

  function processResize(event: PointerEvent) {
    window.requestAnimationFrame(() => {
      isColumnResizeActive.value = true
      const distance = Math.max(Math.round(event.clientX - initCoordX), rangeDistance.min)

      updateTableColumnsWidth(distance)
    })
  }

  function updateTableColumnsWidth(distance: number) {
    if (!currentColumnName) {
      return
    }

    const newList = [...tableColumnList.value].map((el) => {
      if (el.name === currentColumnName) {
        return {
          ...el,
          width: initColumnWidth + distance,
        }
      }

      return el
    })

    emit('update:columns', newList)
  }

  return {
    isColumnResizeActive,
    handleColumnResizerDown,
  }
}
