<script setup lang="ts">
import { CHANGE_EVENT } from '@nado/ui-kit-constants'
import { useNamespace } from '@nado/ui-kit-hooks'
import { provide, type Ref, ref, watch } from 'vue'

import { stepsEmits, stepsProps } from './NSteps.model'
import { STEPS_INJECTION_KEY } from './tokens'
import { type StepItemState } from './types'

const props = defineProps(stepsProps)

const emit = defineEmits(stepsEmits)

const ns = useNamespace('steps')

const steps: Ref<StepItemState[]> = ref([])

watch(steps, () => {
  steps.value.forEach((instance: StepItemState, index: number) => {
    instance.setIndex(index)
  })
})

provide(STEPS_INJECTION_KEY, {
  props,
  steps,
})

watch(
  () => props.active,
  (newVal: number, oldVal: number) => {
    emit(CHANGE_EVENT, newVal, oldVal)
  },
)
</script>

<script lang="ts">
export default {
  name: 'NSteps',
}
</script>

<template>
  <div :class="[ns.b(), simple ? ns.is('simple') : ns.is(direction)]">
    <slot />
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-steps/n-steps/index.css');
</style>
