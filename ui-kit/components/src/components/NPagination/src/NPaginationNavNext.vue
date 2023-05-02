<script setup lang="ts">
import { useLocale } from '@nado/ui-kit-hooks'
import { computed } from 'vue'

import { useRoute, useRouteLocation } from './hooks'
import Button from './NPaginationNavButton.vue'
import { paginationNavNextEmits, paginationNavNextProps } from './NPaginationNavNext.model'

const props = defineProps(paginationNavNextProps)
const emit = defineEmits(paginationNavNextEmits)

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
