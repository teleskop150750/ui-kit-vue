<script lang="ts" setup>
import { useLocale } from '@ui/hooks'
import { computed } from 'vue'

import Button from './button.vue'
import { useNavRouter } from './hooks'
import { nPaginationNavPrevEmits, nPaginationPrevProps } from './prev.model'

const props = defineProps(nPaginationPrevProps)
const emit = defineEmits(nPaginationNavPrevEmits)
const { makeLink } = useNavRouter(props)
const { t } = useLocale()

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
