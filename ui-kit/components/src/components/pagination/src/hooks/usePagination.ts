import { useLocale } from '@nado/ui-kit-hooks'
import { debugWarn, isEqual } from '@nado/ui-kit-utils'
import { computed, getCurrentInstance, ref, type SetupContext, watch } from 'vue'

import type { NPaginationEmits, NPaginationProps } from '../pagination.model'
import { isAbsent } from '../utils'
import { usePaginationQuery } from './usePaginationQuery'
import { usePaginationRoute } from './usePaginationRoute'
import { useRouteLocation } from './useRouteLocation'
import { useRouter } from './useRouter'

export function usePagination(props: NPaginationProps, emit: SetupContext<NPaginationEmits>['emit']) {
  const { paginationRoute } = usePaginationRoute(props)

  const { queryType, pageNumberOrOffsetQueryParamName, pageSizeQueryParamName, getPageInQuery } = usePaginationQuery(
    paginationRoute,
    props,
  )

  const { makeLocation } = useRouteLocation(paginationRoute, {
    queryType,
    pageNumberOrOffsetQueryParamName,
    pageSizeQueryParamName,
  })

  const { router } = useRouter()
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

  function usePaginationPage() {
    const { pageNumberQueryVal, pageSizeQueryVal, pageNumberOrOffsetQueryVal } = getPageInQuery()

    const innerPageSize = ref(
      (props.defaultPageSize !== undefined ? props.defaultPageSize : pageSizeQueryVal.value) || 10,
    )

    const innerCurrentPage = ref(
      (props.defaultCurrentPage !== undefined ? props.defaultCurrentPage : pageNumberQueryVal.value) || 1,
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
      () => pageSizeQueryVal.value,
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
      () => pageNumberOrOffsetQueryVal.value,
      (newValue: number | undefined, oldValue: number | undefined) => {
        if (!props.queryType) {
          return
        }

        if (newValue === oldValue) {
          return
        }

        if (newValue === undefined || newValue === null) {
          return
        }

        if (props.queryType === 'number') {
          currentPageBridge.value = newValue

          return
        }

        if (props.queryType === 'offset') {
          const newPage = newValue === 0 ? 1 : newValue / pageSizeBridge.value + 1

          currentPageBridge.value = newPage
        }
      },
    )

    watch(pageCountBridge, (val) => {
      if (currentPageBridge.value > val) {
        currentPageBridge.value = val
      }
    })

    watch(
      () => pageSizeBridge.value,
      (newVal, oldVal) => {
        if (isEqual(newVal, oldVal)) {
          return
        }

        if (newVal === undefined) {
          return
        }

        changePageSize(newVal)
      },
    )

    watch(currentPageBridge, (newVal, oldVal) => {
      if (isEqual(newVal, oldVal)) {
        return
      }

      changeCurrentPage(newVal)
    })

    if (currentPageBridge.value > pageCountBridge.value) {
      currentPageBridge.value = pageCountBridge.value
    }

    if (currentPageBridge.value < 1) {
      currentPageBridge.value = 1
    }

    function changeCurrentPage(val: number) {
      if (!paginationRoute.value) {
        currentPageBridge.value = val

        return
      }

      const location = makeLocation(val, pageSizeBridge.value)

      if (!location) {
        return
      }

      router.push(location)
    }

    function changePageSize(val: number) {
      if (!paginationRoute.value) {
        pageSizeBridge.value = val

        return
      }

      const link = makeLocation(currentPageBridge.value, val)

      if (!link) {
        return
      }

      router.push(link)
    }

    function changeHandleSize(val: number) {
      pageSizeBridge.value = val
    }

    return {
      pageSizeBridge,
      pageCountBridge,
      currentPageBridge,
      changeCurrentPage,
      changeHandleSize,
    }
  }

  return {
    pageNumberOrOffsetQueryParamName,
    pageSizeQueryParamName,
    assertValidUsage,
    usePaginationPage,
  }
}
