import { useNamespace } from '@nado/ui-kit-hooks'
import type { Nillable } from '@nado/ui-kit-utils'
import { computed } from '@vue/reactivity'
import { throttle } from 'lodash-es'
import { type ComputedRef, ref, type SetupContext } from 'vue'

import type { NTableEmits } from '../table.model'
import type { NTableColumnInner } from '../types'

interface Column {
  readonly index: number
  newIndex: number
  width: number
  center: number
  distance: number
  isCurrent: boolean
  isMoved: boolean
  isPrev: boolean
  isAfter: boolean
}

export function useTableColumnOrder(
  tableColumnList: ComputedRef<NTableColumnInner[]>,
  emit: SetupContext<NTableEmits>['emit'],
) {
  const nsTable = useNamespace('table')
  const nsTh = useNamespace('th')
  const thMoveClasses = nsTh.is('move')!
  const tdMoveClasses = nsTable.eIs('td', 'move')!
  const isMove = ref(false)
  const isDisableThClick = ref(false)
  let clientX = 0
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

  function handleColumnDown(event: MouseEvent) {
    const th = event.currentTarget as HTMLTableCellElement

    table.value = th.closest('table')!

    clientX = event.clientX
    currentColumnIndex = getColumnIndex(table.value, th)

    if (currentColumnIndex < 0) {
      return
    }

    const columnSizeList = getColumnsSizeList(table.value)

    columnList.value = getColumnList(columnSizeList, currentColumnIndex)

    rangeDistance = getRangeDistance(columnSizeList, currentColumnIndex)

    currentColumnCellList = getColumnCellList(table.value, currentColumnIndex)
    addClassesToCurrentColumn(currentColumnCellList)

    document.addEventListener('pointermove', handleColumnMove)
    document.addEventListener('pointerup', handleColumnUp, { once: true })
  }

  function processMove(event: PointerEvent) {
    isMove.value = true
    isDisableThClick.value = true

    const distance = Math.max(Math.min(Math.round(event.clientX - clientX), rangeDistance.max), rangeDistance.min)

    processMoveColumn(distance)

    columnList.value.forEach((el) => {
      if (el.isCurrent) {
        transformCurrentColumn(distance)
      } else {
        transformMovedColumn(el)
      }
    })
  }

  const processMoveThrottle = throttle(processMove, 10)

  function handleColumnMove(event: PointerEvent) {
    processMoveThrottle(event)
  }

  function handleColumnUp(event: MouseEvent) {
    isMove.value = false
    removeClassesToCurrentColumn(currentColumnCellList)
    updateColumnOrders(columnList.value)
    removeTransformColumns(columnList.value)
    document.removeEventListener('pointermove', handleColumnMove)
    document.addEventListener('click', handleColumnClick, { once: true })

    table.value = undefined
    columnList.value = []
    clientX = 0
    currentColumnIndex -= 1
    rangeDistance = {
      min: 0,
      max: 0,
    }
    clientX = event.clientX
    currentColumnCellList = []
  }

  function handleColumnClick() {
    isDisableThClick.value = false
  }

  function updateColumnOrders(payload: Array<{ index: number; newIndex: number }>) {
    payload.filter((el) => el.index !== el.newIndex)

    if (!payload) {
      return
    }

    const newList = [...tableColumnList.value]
    const newListCopy = [...tableColumnList.value]

    payload.forEach((el) => {
      newList[el.newIndex] = newListCopy[el.index]!
    })

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
      ? prevColumnList.value.findLast((el) => el.isMoved)
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

  function transformCurrentColumn(distance: number) {
    transformColumn(currentColumnCellList, distance)
  }

  function transformMovedColumn(column: Column) {
    if (!table.value) {
      return
    }

    const distance = getDistanceMovedColumn(column)
    const cellList = getColumnCellList(table.value, column.index)

    transformColumn(cellList, distance)
  }

  function transformColumn(cellList: HTMLTableCellElement[], distance: number) {
    cellList.forEach((cell) => {
      if (distance === 0) {
        cell.removeAttribute('style')
      } else {
        cell.style.transform = `translateX(${distance}px)`
      }
    })
  }

  function removeTransformColumns(cols: Column[]) {
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

  function addClassesToCurrentColumn(cellList: HTMLTableCellElement[]) {
    cellList.forEach((cell) => {
      if (cell.tagName === 'TD') {
        cell.classList.add(tdMoveClasses)
      } else {
        cell.classList.add(thMoveClasses)
      }
    })
  }

  function removeClassesToCurrentColumn(cellList: HTMLTableCellElement[]) {
    cellList.forEach((cell) => {
      if (cell.tagName === 'TD') {
        cell.classList.remove(tdMoveClasses)
      } else {
        cell.classList.remove(thMoveClasses)
      }
    })
  }

  return {
    isMove,
    isDisableThClick,
    handleColumnDown,
  }
}

function getRangeDistance(columnList: ColumnSize[], currentColumnIndex: number) {
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

interface ColumnSize {
  index: number
  width: number
  center: number
}

function getColumnsSizeList(table: HTMLTableElement): ColumnSize[] {
  if (!table.tHead || !table.tHead.rows[0]) {
    return []
  }

  return [...table.tHead.rows[0].cells].map((el, idx) => ({
    index: idx,
    width: el.offsetWidth,
    center: Math.round(el.offsetWidth / 2),
  }))
}

function getColumnList(columnList: ColumnSize[], currentColumnIndex: number) {
  const before: Column[] = []
  const after: Column[] = []
  const current: Column = {
    ...columnList[currentColumnIndex]!,
    newIndex: currentColumnIndex,
    distance: 0,
    isCurrent: true,
    isMoved: false,
    isPrev: false,
    isAfter: false,
  }

  for (let index = currentColumnIndex - 1; index >= 0; index--) {
    const element = columnList[index]!

    before.push(getDistanceToColumn(element, before, true))
  }

  for (let index = currentColumnIndex + 1; index < columnList.length; index++) {
    const element = columnList[index]!

    after.push(getDistanceToColumn(element, after, false))
  }

  return [...before, current, ...after]
}

function getDistanceToColumn(column: ColumnSize, prevColumns: Column[], isPrev = true): Column {
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
    isCurrent: false,
    isMoved: false,
    isPrev,
    isAfter: !isPrev,
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
