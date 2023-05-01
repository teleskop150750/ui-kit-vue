<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { isEqual } from 'lodash-es'
import { computed, ref, watch } from 'vue'

import { NOption, NSelect, type SelectVModel } from '../../NSelect'
import { paginationSizeEmits, paginationSizeProps } from './NPaginationSize.model'

const props = defineProps(paginationSizeProps)

const emit = defineEmits(paginationSizeEmits)

const ns = useNamespace('pagination')
// const pagination = usePagination()
const innerPageSize = ref<number>(props.pageSize!)

watch(
  () => props.pageSizes,
  (newVal, oldVal) => {
    if (isEqual(newVal, oldVal)) {
      return
    }

    if (Array.isArray(newVal)) {
      const pageSize = newVal.includes(props.pageSize!) ? props.pageSize : props.pageSizes[0]!

      emit('pageSizeChange', pageSize)
    }
  },
)

watch(
  () => props.pageSize,
  (newVal) => {
    innerPageSize.value = newVal!
  },
)

const innerPageSizes = computed(() => props.pageSizes)

function handleChange(val: SelectVModel) {
  if (val === innerPageSize.value) {
    return
  }

  innerPageSize.value = Number(val)
  emit('pageSizeChange', Number(val))
}
</script>

<script lang="ts">
export default {
  name: 'NPaginationSizes',
}
</script>

<template>
  <div :class="ns.e('sizes')">
    <NSelect
      :model-value="innerPageSize"
      :disabled="disabled"
      :popper-class="popperClass"
      :size="size"
      :validate-event="false"
      @change="handleChange"
    >
      <NOption v-for="item in innerPageSizes" :key="item" :value="item" :label="`${item}`" />
    </NSelect>
  </div>
</template>
