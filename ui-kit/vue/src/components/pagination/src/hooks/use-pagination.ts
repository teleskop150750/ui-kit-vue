import { useLocale } from '@ui/hooks'
import { debugWarn } from '@ui/utils'
import { computed, type ComputedRef, getCurrentInstance, ref, type SetupContext, watch } from 'vue'

import type { NPaginationEmits, NPaginationProps } from '../pagination.model'
import { isAbsent } from '../utils'
import type { PageFromQuery } from './use-pagination-query'

export function usePagination(props: NPaginationProps, emit: SetupContext<NPaginationEmits>['emit']) {
  const { t } = useLocale()

  function assertValidUsage() {
    const vNodeProps = getCurrentInstance()!.vnode.props || {}

    const hasCurrentPageListener =
      'onUpdate:currentPage' in vNodeProps || 'onUpdate:current-page' in vNodeProps || 'onCurrentChange' in vNodeProps

    const isValid = computed(() => {
      if (isAbsent(props.total) && isAbsent(props.pageCount)) {
        return false
      }

      if (!isAbsent(props.currentPage) && !hasCurrentPageListener) {
        return false
      }

      return true
    })

    if (!isValid.value) {
      debugWarn('NPagination', t('nado.pagination.deprecationWarning'))
    }

    return { isValid }
  }

  function bridge(
    pageFromQuery: PageFromQuery,
    queryPageSize: ComputedRef<number | undefined>,
    queryPageNumberOrOffset: ComputedRef<number | undefined>,
  ) {
    const innerPageSize = ref((props.defaultPageSize !== undefined ? props.defaultPageSize : pageFromQuery.size) || 10)

    const innerCurrentPage = ref(
      (props.defaultCurrentPage !== undefined ? props.defaultCurrentPage : pageFromQuery.current) || 1,
    )

    const pageSizeBridge = computed({
      get() {
        return isAbsent(props.pageSize) ? innerPageSize.value : props.pageSize
      },
      set(v: number) {
        if (isAbsent(props.pageSize)) {
          innerPageSize.value = v
        }
      },
    })

    const pageCountBridge = computed<number>(() => {
      if (!isAbsent(props.pageCount)) {
        return props.pageCount
      }

      if (!isAbsent(props.total)) {
        return Math.max(1, Math.ceil(props.total / pageSizeBridge.value))
      }

      return 0
    })

    const currentPageBridge = computed<number>({
      get() {
        return isAbsent(props.currentPage) ? innerCurrentPage.value : props.currentPage
      },
      set(v) {
        let newCurrentPage = v

        if (v < 1) {
          newCurrentPage = 1
        } else if (v > pageCountBridge.value) {
          newCurrentPage = pageCountBridge.value
        }

        if (isAbsent(props.currentPage)) {
          innerCurrentPage.value = newCurrentPage
        }

        emit('update:current-page', newCurrentPage)
        emit('currentChange', newCurrentPage)
      },
    })

    watch(
      () => queryPageSize.value,
      (newValue: number | undefined, oldValue: number | undefined) => {
        if (!props.queryType) {
          return
        }

        if (newValue === oldValue) {
          return
        }

        if (!newValue) {
          return
        }

        pageSizeBridge.value = newValue
      },
    )

    watch(
      () => queryPageNumberOrOffset.value,
      (newValue: number | undefined, oldValue: number | undefined) => {
        if (!props.queryType) {
          return
        }

        if (newValue === oldValue) {
          return
        }

        if (!newValue) {
          return
        }

        if (props.queryType === 'number') {
          currentPageBridge.value = newValue

          return
        }

        if (props.queryType === 'offset') {
          currentPageBridge.value = newValue / pageSizeBridge.value
        }
      },
    )

    return {
      pageSizeBridge,
      pageCountBridge,
      currentPageBridge,
    }
  }

  return {
    assertValidUsage,
    bridge,
  }
}
