import { useLocale } from '@nado/ui-kit-hooks'
import { debugWarn, isEqual, isNil } from '@nado/ui-kit-utils'
import { computed, getCurrentInstance, ref, type SetupContext, watch } from 'vue'

import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_COUNT, DEFAULT_PAGE_SIZE } from '../constants'
import type { NPaginationEmits, NPaginationProps } from '../pagination.model'
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
      if (isNil(props.total) && isNil(props.pageCount)) {
        return false
      }

      if (!isNil(props.currentPage) && !hasCurrentPageListener) {
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

    const innerPageSize = ref(getInitPageSize())

    const innerCurrentPage = ref(getInitCurrentPage())

    const pageSizeBridge = computed({
      get() {
        return isNil(props.pageSize) ? innerPageSize.value : props.pageSize
      },
      set(v: number) {
        if (isNil(props.pageSize)) {
          innerPageSize.value = v
        }

        emit('update:page-size', v)
      },
    })

    const pageCountBridge = computed<number>(() => {
      if (!isNil(props.pageCount)) {
        return props.pageCount
      }

      if (!isNil(props.total)) {
        return Math.max(1, Math.ceil(props.total / pageSizeBridge.value))
      }

      return DEFAULT_PAGE_COUNT
    })

    const currentPageBridge = computed<number>({
      get() {
        return isNil(props.currentPage) ? innerCurrentPage.value : props.currentPage
      },
      set(v) {
        let newCurrentPage = v

        if (v < 1) {
          newCurrentPage = 1
        } else if (v > pageCountBridge.value) {
          newCurrentPage = pageCountBridge.value
        }

        if (isNil(props.currentPage)) {
          innerCurrentPage.value = newCurrentPage
        }

        emit('update:current-page', newCurrentPage)
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
      {
        immediate: true,
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
      {
        immediate: true,
      },
    )

    watch(pageCountBridge, (val) => {
      if (currentPageBridge.value > val) {
        currentPageBridge.value = val
      }
    })

    watch(
      () => props.pageSize,
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

    changeCurrentPage(innerCurrentPage.value)
    changePageSize(innerPageSize.value)

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

      const location = makeLocation(currentPageBridge.value, val)

      if (!location) {
        return
      }

      router.push(location)
    }

    function getInitPageSize() {
      if (props.defaultPageSize !== undefined) {
        return props.defaultPageSize
      }

      if (pageSizeQueryVal.value !== undefined) {
        return pageSizeQueryVal.value
      }

      if (props.pageSize !== undefined) {
        return props.pageSize
      }

      return DEFAULT_PAGE_SIZE
    }

    function getInitCurrentPage() {
      if (props.defaultCurrentPage !== undefined) {
        return props.defaultCurrentPage
      }

      if (pageNumberQueryVal.value !== undefined) {
        return pageNumberQueryVal.value
      }

      if (props.currentPage !== undefined) {
        return props.currentPage
      }

      return DEFAULT_CURRENT_PAGE
    }

    return {
      pageSizeBridge,
      pageCountBridge,
      currentPageBridge,
      changeCurrentPage,
    }
  }

  return {
    pageNumberOrOffsetQueryParamName,
    pageSizeQueryParamName,
    assertValidUsage,
    usePaginationPage,
  }
}
