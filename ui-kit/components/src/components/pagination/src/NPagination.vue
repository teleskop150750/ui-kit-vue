<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { computed } from 'vue'

import { usePagination } from './hooks'
import NPaginationNav from './NPaginationNav.vue'
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

const { pageSizeBridge, pageCountBridge, currentPageBridge, changeCurrentPage } = usePaginationPage()

function handleClickNav(val: number) {
  changeCurrentPage(val)
}

function handlePrevClick(val: number) {
  emit('prevClick', val)
}

function handleNextClick(val: number) {
  emit('nextClick', val)
}
</script>

<script lang="ts">
export default {
  name: 'NPagination',
}
</script>

<template>
  <div v-if="canShowPagination" :class="ns.b()">
    <NPaginationNav
      :class="ns.e('pager')"
      :query-type="queryType"
      :page-number-or-offset-query-param-name="pageNumberOrOffsetQueryParamName"
      :page-size-query-param-name="pageSizeQueryParamName"
      :current-page="currentPageBridge"
      :page-size="pageSizeBridge"
      :page-count="pageCountBridge"
      :pager-count="pagerCount"
      :disabled="disabled"
      :prev-text="prevText"
      :prev-icon="prevIcon"
      :next-text="nextText"
      :next-icon="nextIcon"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      @click="handleClickNav"
    />
  </div>
</template>
