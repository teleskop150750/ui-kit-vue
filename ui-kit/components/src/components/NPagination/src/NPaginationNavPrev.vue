<script setup lang="ts">
import { useLocale } from '@nado/ui-kit-hooks'
import { computed } from 'vue'

import { useRoute, useRouteLocation } from './hooks'
import Button from './NPaginationNavButton.vue'
import { paginationNavPrevEmits, paginationPrevProps } from './NPaginationNavPrev.model'

const props = defineProps(paginationPrevProps)
const emit = defineEmits(paginationNavPrevEmits)

const { t } = useLocale()
const { route } = useRoute(props)

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
