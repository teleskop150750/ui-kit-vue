<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { computed, h, type VNode } from 'vue'

import { usePagination } from './hooks'
import NPaginationNav from './NPaginationNav.vue'
import NPaginationSize from './NPaginationSize.vue'
import { nPaginationEmits, nPaginationProps } from './pagination.model'

const props = defineProps(nPaginationProps)
const emit = defineEmits(nPaginationEmits)

const ns = useNamespace('pagination')
const { pageNumberOrOffsetQueryParamName, pageSizeQueryParamName, assertValidUsage, usePaginationPage } = usePagination(
  props,
  emit,
)
const { isValid } = assertValidUsage()

const canShowPagination = computed(() => isValid.value && !(props.hideOnSinglePage && pageCountBridge.value <= 1))

const { pageSizeBridge, pageCountBridge, currentPageBridge, changeCurrentPage, changeHandleSize } = usePaginationPage()

function handleClickNav(val: number) {
  changeCurrentPage(val)
}

function handlePrevClick(val: number) {
  emit('prevClick', val)
}

function handleNextClick(val: number) {
  emit('nextClick', val)
}

const Pagination = () => {
  const result: VNode[] = []

  Object.entries(props.template).forEach(([key, enable]) => {
    if (enable && key === 'size') {
      result.push(
        h(NPaginationSize, {
          pageSize: pageSizeBridge.value,
          pageSizes: props.pageSizes,
          popperClass: props.popperClass,
          disabled: props.disabled,
          size: 'default',
          onPageSizeChange: changeHandleSize,
        }),
      )
    } else if (enable && key === 'nav') {
      result.push(
        h(NPaginationNav, {
          class: ns.e('pager'),
          queryType: props.queryType,
          pageNumberOrOffsetQueryParamName: pageNumberOrOffsetQueryParamName.value,
          pageSizeQueryParamName: pageSizeQueryParamName.value,
          currentPage: currentPageBridge.value,
          pageSize: pageSizeBridge.value,
          pageCount: pageCountBridge.value,
          pagerCount: props.pagerCount,
          disabled: props.disabled,
          prevText: props.prevText,
          prevIcon: props.prevIcon,
          nextText: props.nextText,
          nextIcon: props.nextIcon,
          onPrevClick: handlePrevClick,
          onNextClick: handleNextClick,
          onClick: handleClickNav,
        }),
      )
    }
  })

  return result
}
</script>

<script lang="ts">
export default {
  name: 'NPagination',
}
</script>

<template>
  <div v-if="canShowPagination" :class="ns.b()">
    <Pagination />
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-pagination/index.css');
</style>
