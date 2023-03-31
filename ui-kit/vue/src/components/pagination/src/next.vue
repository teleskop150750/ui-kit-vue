<script lang="ts" setup>
import { useLocale } from '@ui/hooks'
import { computed } from 'vue'

import Button from './button.vue'
import { usePaginationRoute, useRoute } from './hooks'
import { nPaginationNavNextEmits, nPaginationNavNextProps } from './next.model'

const props = defineProps(nPaginationNavNextProps)
const emit = defineEmits(nPaginationNavNextEmits)

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
    :to="makeLink(newPage, pageSize)"
    :disabled="internalDisabled"
    :aria-label="nextText || t('nado.pagination.next')"
    :icon="!nextText ? nextIcon : undefined"
    :label="nextText ? nextText : undefined"
    mode="outline"
    @click="handleClick"
  />
</template>
