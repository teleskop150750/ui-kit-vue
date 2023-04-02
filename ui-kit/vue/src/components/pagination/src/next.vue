<script lang="ts" setup>
import { useLocale } from '@ui/hooks'
import { computed } from 'vue'

import Button from './button.vue'
import { usePaginationRoute, useRouteLocation } from './hooks'
import { nPaginationNavNextEmits, nPaginationNavNextProps } from './next.model'

const props = defineProps(nPaginationNavNextProps)
const emit = defineEmits(nPaginationNavNextEmits)

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

const internalDisabled = computed(
  () => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0,
)

const newPage = computed(() => props.currentPage + 1)

function handleClick() {
  emit('change', newPage.value)
}
</script>

<script lang="ts">
export default {
  name: 'NPaginationNavButtonNext',
}
</script>

<template>
  <Button
    :to="makeLocation(newPage, pageSize)!"
    :disabled="internalDisabled!"
    :aria-label="nextText || t('nado.pagination.next')!"
    :icon="!nextText ? nextIcon : undefined"
    :label="nextText ? nextText : ''"
    @click="handleClick"
  />
</template>
