<script lang="ts" setup>
import { useLocale } from '@nado/ui-kit-hooks'
import { computed } from 'vue'

import { usePaginationRoute, useRouteLocation } from './hooks'
import Button from './NPaginationNavButton.vue'
import { nPaginationNavPrevEmits, nPaginationPrevProps } from './pagination-nav-prev.model'

const props = defineProps(nPaginationPrevProps)
const emit = defineEmits(nPaginationNavPrevEmits)

const { t } = useLocale()
const { paginationRoute: route } = usePaginationRoute(props)

const queryType = computed(() => props.queryType)
const pageNumberOrOffsetQueryParamName = computed(() => props.pageNumberOrOffsetQueryParamName)
const pageSizeQueryParamName = computed(() => props.pageSizeQueryParamName)

const { makeLocation } = useRouteLocation(route, {
  queryType,
  pageNumberOrOffsetQueryParamName,
  pageSizeQueryParamName,
})

const internalDisabled = computed(() => props.disabled || props.currentPage <= 1)

const newPage = computed(() => props.currentPage - 1)

function handleClick() {
  emit('change', newPage.value)
}
</script>

<script lang="ts">
export default {
  name: 'NPaginationNavButtonPrev',
}
</script>

<template>
  <div>
    <Button
      :to="makeLocation(newPage, pageSize)"
      :disabled="internalDisabled"
      :aria-label="prevText || t('nado.pagination.next')"
      :icon="!prevText ? prevIcon : undefined"
      :label="prevText ? prevText : undefined"
      @click="handleClick"
    />
  </div>
</template>
