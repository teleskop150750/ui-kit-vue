import { useNamespace } from '@nado/ui-kit-hooks'
import { isNil, type Nillable } from '@nado/ui-kit-utils'
import { computed } from '@vue/reactivity'
import { throttle } from 'lodash-es'
import { type ComputedRef, ref, type SetupContext } from 'vue'

import type { NTableEmits } from '../table.model'
import type { NTableColumnInner } from '../types'

interface ColumnBase {
  readonly name: string
  readonly index: number
  readonly width: number
  readonly center: number
  readonly isDraggable: boolean
}

interface Column extends ColumnBase {
  newIndex: number
  readonly distance: number
  readonly isCurrent: boolean
  readonly isOrderable: boolean
  isMoved: boolean
}

export function useTableColumnOrder(
  tableColumnList: ComputedRef<NTableColumnInner[]>,
  tableVisibleColumnList: ComputedRef<NTableColumnInner[]>,
  emit: SetupContext<NTableEmits>['emit'],
) {
  const nsTable = useNamespace('table')
  const thMoveClasses = nsTable.eIs('th', 'move')!
  const tdMoveClasses = nsTable.eIs('td', 'move')!
  const thIsDraggableClasses = nsTable.eIs('th', 'orderable', true)!
  const isColumnOrdering = ref(false)
  const isColumnOrderingActive = ref(false)
  let initCoordX = 0
  let currentColumnIndex = -1
  const table = ref<Nillable<HTMLTableElement>>(undefined)
  let currentColumnCellList: HTMLTableCellElement[] = []
  const columnList = ref<Column[]>([])
  const prevColumnList = computed(() => columnList.value.filter((el) => el.distance < 0))
  const afterColumnList = computed(() => columnList.value.filter((el) => el.distance > 0))
  const distances = computed(() => columnList.value.map((el) => el.distance).sort((a, b) => a - b))
  const prevDistances = computed(() => distances.value.filter((el) => el < 0))
  const afterDistances = computed(() => distances.value.filter((el) => el > 0))

  let rangeDistance = {
    min: 0,
    max: 0,
  }

  function processMove(event: PointerEvent) {
    if (!isColumnOrdering.value) {
      addClassesToCurrentColumn(currentColumnCellList)
    }

    isColumnOrdering.value = true
    isColumnOrderingActive.value = true

    const distance = Math.max(Math.min(Math.round(event.clientX - initCoordX), rangeDistance.max), rangeDistance.min)

    processMoveColumn(distance)
    addTransformStylesForColumns(distance)
  }

  const processMoveThrottle = throttle(processMove, 10)

  function handleColumnDown(event: MouseEvent) {
    const th = event.currentTarget as HTMLTableCellElement

    table.value = th.closest('table')!

    initCoordX = event.clientX
    currentColumnIndex = getColumnIndex(table.value, th)

    if (currentColumnIndex < 0) {
      return
    }

    const allColumnList = getColumnList(table.value, currentColumnIndex)

    columnList.value = allColumnList.filter((el) => el.isOrderable)

    rangeDistance = getRangeDistance(allColumnList, currentColumnIndex)

    currentColumnCellList = getColumnCellList(table.value, currentColumnIndex)

    document.addEventListener('pointermove', processMoveThrottle)
    document.addEventListener('pointerup', handleDocumentUp, { once: true })
  }

  function handleDocumentUp() {
    isColumnOrdering.value = false
    removeClassesFromCurrentColumn(currentColumnCellList)
    updateTableColumnsOrder(columnList.value)
    removeTransformStylesFromColumns(columnList.value)
    document.removeEventListener('pointermove', processMoveThrottle)
    document.addEventListener('click', handleDocumentClick, { once: true })

    table.value = undefined
    columnList.value = []
    initCoordX = 0
    currentColumnIndex -= 1
    rangeDistance = {
      min: 0,
      max: 0,
    }
    initCoordX = 0
    currentColumnCellList = []
  }

  function handleDocumentClick() {
    isColumnOrderingActive.value = false
  }

  function updateTableColumnsOrder(payload: Array<{ index: number; newIndex: number; name: string }>) {
    const filteredPayload = payload.filter((el) => el.index !== el.newIndex && el.name !== '')

    if (!filteredPayload) {
      return
    }

    const newList = [...tableColumnList.value]
      .map((col) => {
        const foundEl = payload.find((item) => col.name === item.name)

        if (foundEl) {
          return {
            ...col,
            index: foundEl.newIndex,
          }
        }

        return col
      })
      .sort((a, b) => a.index - b.index)

    emit('update:columns', newList)
  }

  function processMoveColumn(distance: number) {
    const isPrev = distance < 0

    if (isPrev) {
      processMoveInSide(distance)
    } else {
      processMoveInSide(distance, false)
    }

    processMoveCurrentColumn(isPrev)
  }

  function processMoveInSide(distance: number, isPrev = true) {
    const foundDistance = isPrev
      ? prevDistances.value.find((el) => distance < el)
      : afterDistances.value.findLast((el) => distance > el)

    const isFoundDistance = foundDistance !== undefined

    if (isFoundDistance) {
      const foundMovedColumn = columnList.value.find((el) => el.distance === foundDistance)!

      foundMovedColumn.newIndex = foundMovedColumn.index + (isPrev ? 1 : -1)
      foundMovedColumn.isMoved = true
    }

    columnList.value = columnList.value.map((el) => {
      if (
        (isPrev && isFoundDistance && el.distance < foundDistance) ||
        (!isPrev && isFoundDistance && el.distance > foundDistance) ||
        !isFoundDistance
      ) {
        return {
          ...el,
          newIndex: el.index,
          isMoved: false,
        }
      }

      return el
    })
  }

  function processMoveCurrentColumn(isPrev: boolean) {
    const currentColumn = columnList.value.find((el) => el.isCurrent)!

    const lastMoved = isPrev
      ? prevColumnList.value.find((el) => el.isMoved)
      : afterColumnList.value.findLast((el) => el.isMoved)

    if (lastMoved !== undefined) {
      currentColumn.isMoved = true
      currentColumn.newIndex = lastMoved.index
    } else {
      currentColumn.isMoved = false
      currentColumn.newIndex = currentColumn.index
    }

    columnList.value = columnList.value.map((el) => {
      if (el.isCurrent) {
        return {
          ...currentColumn,
        }
      }

      return el
    })
  }

  // TransformStyles
  function addTransformStylesForColumns(distance: number) {
    columnList.value.forEach((el) => {
      if (el.isCurrent) {
        addTransformStylesForCurrentColumn(distance)
      } else {
        addTransformStylesForMovedColumn(el)
      }
    })
  }

  function addTransformStylesForCurrentColumn(distance: number) {
    addTransformStylesForColumn(currentColumnCellList, distance)
  }

  function addTransformStylesForMovedColumn(column: Column) {
    if (!table.value) {
      return
    }

    const distance = getDistanceMovedColumn(column)
    const cellList = getColumnCellList(table.value, column.index)

    addTransformStylesForColumn(cellList, distance)
  }

  function addTransformStylesForColumn(cellList: HTMLTableCellElement[], distance: number) {
    cellList.forEach((cell) => {
      if (distance === 0) {
        cell.removeAttribute('style')
      } else {
        cell.style.transform = `translateX(${distance}px)`
      }
    })
  }

  function removeTransformStylesFromColumns(cols: Column[]) {
    cols.forEach((col) => {
      if (!col.isMoved && !col.isCurrent) {
        return
      }

      const cells = getColumnCellList(table.value!, col.index)

      cells.forEach((cell) => {
        cell.removeAttribute('style')
      })
    })
  }

  function getDistanceMovedColumn(column: Column) {
    if (column.newIndex === column.index) {
      return 0
    }

    const direction = column.newIndex > column.index ? 1 : -1

    return columnList.value.find((el) => el.isCurrent)!.width * direction
  }

  // Classes
  function addClassesToCurrentColumn(cellList: HTMLTableCellElement[]) {
    cellList.forEach((cell) => {
      if (cell.tagName === 'TD') {
        cell.classList.add(tdMoveClasses)
      } else {
        cell.classList.add(thMoveClasses)
      }
    })
  }

  function removeClassesFromCurrentColumn(cellList: HTMLTableCellElement[]) {
    cellList.forEach((cell) => {
      if (cell.tagName === 'TD') {
        cell.classList.remove(tdMoveClasses)
      } else {
        cell.classList.remove(thMoveClasses)
      }
    })
  }

  // utils
  function getColumnList(tableEl: HTMLTableElement, index: number): Column[] {
    if (!tableEl.tHead || !tableEl.tHead.rows[0]) {
      return []
    }

    let before: Column[] = []
    let after: Column[] = []

    const columnSizeList: ColumnBase[] = [...tableEl.tHead.rows[0].cells].map((cell, idx) => {
      const col = tableVisibleColumnList.value[idx]

      return {
        name: isNil(col) ? '' : col.name,
        index: isNil(col) ? -1 : col.index,
        width: cell.offsetWidth,
        center: Math.round(cell.offsetWidth / 2),
        isDraggable: cell.classList.contains(thIsDraggableClasses),
      }
    })

    const current: Column = {
      ...columnSizeList[index]!,
      newIndex: index,
      distance: 0,
      isOrderable: true,
      isCurrent: true,
      isMoved: false,
    }

    for (let idx = index - 1; idx >= 0; idx--) {
      const element = columnSizeList[idx]!

      before.push(getDistanceToColumn(element, before, true))
    }

    for (let idx = index + 1; idx < columnSizeList.length; idx++) {
      const element = columnSizeList[idx]!

      after.push(getDistanceToColumn(element, after, false))
    }

    before = before.reverse().map((el, idx) => {
      let isOrderable = true
      const prevEl = columnSizeList[idx - 1]

      if ((!el.isDraggable && prevEl?.isDraggable === false) || prevEl === undefined) {
        isOrderable = false
      }

      return {
        ...el,
        isOrderable,
      }
    })

    after = after
      .reverse()
      .map((el, idx) => {
        let isOrderable = true
        const nextEl = columnSizeList[columnSizeList.length - idx]

        if ((!el.isDraggable && nextEl?.isDraggable === false) || nextEl === undefined) {
          isOrderable = false
        }

        return {
          ...el,
          isOrderable,
        }
      })
      .reverse()

    return [...before, current, ...after]
  }

  return {
    isColumnOrdering,
    isColumnOrderingActive,
    handleColumnDown,
  }
}

function getRangeDistance(columnList: Column[], currentColumnIndex: number) {
  let min = 0
  let max = 0

  for (let index = currentColumnIndex - 1; index >= 0; index--) {
    const element = columnList[index]!

    min -= element.width
  }

  for (let index = currentColumnIndex + 1; index < columnList.length; index++) {
    const element = columnList[index]!

    max += element.width
  }

  return {
    min,
    max,
  }
}

function getDistanceToColumn(column: ColumnBase, prevColumns: Column[], isPrev = true): Column {
  const prev = [...prevColumns]
  const direction = isPrev ? -1 : 1
  let distance = 0

  distance =
    (prev.length === 0
      ? column.center
      : prev.reduce((acc, current) => {
          acc += current.width

          return acc
        }, 0) + column.center) * direction

  return {
    ...column,
    newIndex: column.index,
    distance,
    isOrderable: true,
    isCurrent: false,
    isMoved: false,
  }
}

function getColumnIndex(table: HTMLTableElement, td: HTMLTableCellElement) {
  if (!table.tHead || !table.tHead.rows || !table.tHead.rows[0]) {
    return -1
  }

  return [...table.tHead.rows[0].cells].indexOf(td)
}

function getColumnCellList(table: HTMLTableElement, index: number) {
  const cellList: HTMLTableCellElement[] = []

  ;[...table.rows].forEach((row) => {
    const cell = row.cells[index]!

    cellList.push(cell)
  })

  return cellList
}
