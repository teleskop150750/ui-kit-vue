<script lang="ts" setup>
import { useLocale, useNamespace } from '@nado/ui-kit-hooks'
import { NIconDArrowLeft, NIconMoreFilled } from '@nado/ui-kit-icons-vue'
import { computed } from 'vue'

import { useMoreButton, usePaginationRoute, useRouteLocation } from './hooks'
import NPaginationNavButton from './NPaginationNavButton.vue'
import { nPaginationNavMorePrevEmits, nPaginationNavMorePrevProps } from './pagination-nav-more-prev.model'

const props = defineProps(nPaginationNavMorePrevProps)
const emit = defineEmits(nPaginationNavMorePrevEmits)

const ns = useNamespace('pagination-nav')
const { t } = useLocale()
const { quickHover, quickFocus, pagerCountOffset, onMouseEnter } = useMoreButton(props)

const { paginationRoute } = usePaginationRoute(props)

const queryType = computed(() => props.queryType)
const pageNumberOrOffsetQueryParamName = computed(() => props.pageNumberOrOffsetQueryParamName)
const pageSizeQueryParamName = computed(() => props.pageSizeQueryParamName)

const { makeLocation } = useRouteLocation(paginationRoute, {
  queryType,
  pageNumberOrOffsetQueryParamName,
  pageSizeQueryParamName,
})

const newPage = computed(() => {
  let page = props.currentPage - pagerCountOffset.value

  if (page < 1) {
    page = 1
  }

  if (page > props.pageCount) {
    page = props.pageCount
  }

  return page
})

function handleClick() {
  emit('change', newPage.value)
}
</script>

<script lang="ts">
export default {
  name: 'NPaginationNavButtonMorePrev',
}
</script>

<template>
  <NPaginationNavButton
    :to="makeLocation(newPage, pageSize)"
    :disabled="disabled"
    :aria-label="t('nado.pagination.prevPages', { pager: pagerCount - 2 })"
    :icon="(quickHover || quickFocus) && !disabled ? NIconDArrowLeft : NIconMoreFilled"
    :class="[ns.m('more'), ns.m('more-prev')]"
    @mouseenter="onMouseEnter()"
    @mouseleave="quickHover = false"
    @focus="quickFocus = true"
    @blur="quickFocus = false"
    @click="handleClick"
  />
</template>
