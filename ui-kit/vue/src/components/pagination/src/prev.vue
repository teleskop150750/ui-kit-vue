<script lang="ts" setup>
import { useLocale } from '@ui/hooks'
import { computed } from 'vue'

import Button from './button.vue'
import { usePaginationRoute, useRoute } from './hooks'
import { nPaginationNavPrevEmits, nPaginationPrevProps } from './prev.model'

const props = defineProps(nPaginationPrevProps)
const emit = defineEmits(nPaginationNavPrevEmits)

const { t } = useLocale()
const { routeNav: route } = usePaginationRoute(props)

const queryType = computed(() => props.queryType)
const pageNumberOrOffsetQueryParamName = computed(() => props.pageNumberOrOffsetQueryParamName)
const pageSizeQueryParamName = computed(() => props.pageSizeQueryParamName)

const { makeLink } = useRoute(route, {
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
      :to="makeLink(newPage, pageSize)"
      :disabled="internalDisabled"
      :aria-label="prevText || t('nado.pagination.next')"
      :icon="!prevText ? prevIcon : undefined"
      :label="prevText ? prevText : undefined"
      mode="outline"
      @click="handleClick"
    />
  </div>
</template>
