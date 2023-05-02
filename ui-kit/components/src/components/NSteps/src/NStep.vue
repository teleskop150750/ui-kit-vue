<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { NIconCheck, NIconClose } from '@nado/ui-kit-icons-vue'
import { isNumber } from '@nado/ui-kit-utils'
import {
  computed,
  type CSSProperties,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'

import { NIcon } from '../../NIcon'
import { stepProps } from './NStep.model'
import { STEPS_INJECTION_KEY } from './tokens'

const props = defineProps(stepProps)

const ns = useNamespace('step')
const index = ref(-1)
const lineStyle = ref({})
const internalStatus = ref('')

const stepsContext = inject(STEPS_INJECTION_KEY)!

const currentInstance = getCurrentInstance()
const currentStatus = computed(() => props.status || internalStatus.value)
const prevStatus = computed(() => {
  const prevStep = stepsContext.steps.value[index.value - 1]

  return prevStep ? prevStep.currentStatus : 'wait'
})
const isCenter = computed(() => stepsContext.props.alignCenter)
const isVertical = computed(() => stepsContext.props.direction === 'vertical')
const isSimple = computed(() => stepsContext.props.simple)
const stepsCount = computed(() => stepsContext.steps.value.length)
const isLast = computed(() => stepsContext.steps.value[stepsCount.value - 1]?.uid === currentInstance?.uid)
const space = computed(() => (isSimple.value ? '' : stepsContext.props.space))

const style = computed(() => {
  const result: CSSProperties = {
    flexBasis: isNumber(space.value)
      ? `${space.value}px`
      : // eslint-disable-next-line unicorn/prefer-logical-operator-over-ternary
      space.value
      ? space.value
      : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`,
  }

  if (isVertical.value) {
    return result
  }

  if (isLast.value) {
    result.maxWidth = `${100 / stepsCount.value}%`
  }

  return result
})

const stepItemState = reactive({
  uid: computed(() => currentInstance?.uid),
  currentStatus,
  setIndex,
  calcProgress,
})

function setIndex(val: number) {
  index.value = val
}

function calcProgress(status: string) {
  const isWait = status === 'wait'
  const styles: CSSProperties = {
    transitionDelay: `${isWait ? '-' : ''}${150 * index.value}ms`,
  }
  const step = status === stepsContext.props.processStatus || isWait ? 0 : 100

  styles.borderWidth = step && !isSimple.value ? '1px' : 0
  styles[stepsContext.props.direction === 'vertical' ? 'height' : 'width'] = `${step}%`
  lineStyle.value = styles
}

function updateStatus(activeIndex: number) {
  if (activeIndex > index.value) {
    internalStatus.value = stepsContext.props.finishStatus
  } else if (activeIndex === index.value && prevStatus.value !== 'error') {
    internalStatus.value = stepsContext.props.processStatus
  } else {
    internalStatus.value = 'wait'
  }

  const prevChild = stepsContext.steps.value[index.value - 1]

  if (prevChild) {
    prevChild.calcProgress(internalStatus.value)
  }

  return props
}

stepsContext.steps.value = [...stepsContext.steps.value, stepItemState]

onMounted(() => {
  watch(
    [() => stepsContext.props.active, () => stepsContext.props.processStatus, () => stepsContext.props.finishStatus],
    ([active]) => {
      updateStatus(active)
    },
    {
      immediate: true,
    },
  )
})

onBeforeUnmount(() => {
  stepsContext.steps.value = stepsContext.steps.value.filter((instance) => instance.uid !== currentInstance?.uid)
})
</script>

<script lang="ts">
export default {
  name: 'MStep',
}
</script>

<template>
  <div
    :style="style"
    :class="[
      ns.b(),
      isSimple ? ns.is('simple') : ns.is(stepsContext.props.direction),
      ns.is('flex', isLast && !space && !isCenter),
      ns.is('center', isCenter && !isVertical && !isSimple),
      ns.type('status', currentStatus),
    ]"
  >
    <!-- icon & line -->
    <div :class="[ns.e('head')]">
      <div v-if="!isSimple" :class="ns.e('line')">
        <span :class="ns.e('line-inner')" :style="lineStyle"></span>
      </div>

      <div :class="[ns.e('icon'), ns.eIs('icon', icon || $slots.icon ? 'icon' : 'text')]">
        <slot name="icon">
          <NIcon v-if="icon" :class="ns.e('icon-inner')">
            <component :is="icon" />
          </NIcon>
          <NIcon v-else-if="currentStatus === 'success'" :class="[ns.e('icon-inner'), ns.eIs('icon-inner', 'status')]">
            <NIconCheck />
          </NIcon>
          <NIcon v-else-if="currentStatus === 'danger'" :class="[ns.e('icon-inner'), ns.eIs('icon-inner', 'status')]">
            <NIconClose />
          </NIcon>
          <div v-else-if="!isSimple" :class="ns.e('icon-inner')">
            {{ index + 1 }}
          </div>
        </slot>
      </div>
    </div>
    <!-- title & description -->
    <div :class="ns.e('main')">
      <div :class="[ns.e('title')]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="isSimple" :class="ns.e('arrow')" />
      <div v-else :class="[ns.e('description')]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-steps/n-step/index.css');
</style>
