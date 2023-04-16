<script lang="ts" setup>
import { EVENT_CODE, TypeComponents, TypeComponentsMap } from '@nado/ui-kit-constants'
import { useEventListener, useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { computed, type CSSProperties, onMounted, ref, watch } from 'vue'

import { NBadge, type NBadgeProps } from '../../badge'
import { useGlobalComponentSettings } from '../../config-provider'
import { NIcon } from '../../icon'
import { getLastOffset, getOffsetOrSpace } from './instance'
import { nMessageEmits, nMessageProps } from './message.model'

const props = defineProps(nMessageProps)

defineEmits(nMessageEmits)

const { Close } = TypeComponents

const { ns, zIndex } = useGlobalComponentSettings('message')
const { currentZIndex, nextZIndex } = zIndex

const messageRef = ref<HTMLDivElement>()
const visible = ref(false)
const height = ref(0)

let stopTimer: (() => void) | undefined = undefined

const badgeAppearance = computed<NBadgeProps['appearance']>(() =>
  props.appearance ? (props.appearance === 'danger' ? 'danger' : props.appearance) : 'info',
)
const typeClass = computed(() => {
  const { appearance } = props

  return [ns.e('icon'), ns.eType('icon', 'appearance', appearance, !!(appearance && TypeComponentsMap[appearance]))]
})
const iconComponent = computed(() => props.icon || TypeComponentsMap[props.appearance] || '')

const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value)
const bottom = computed((): number => height.value + offset.value)

const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: currentZIndex.value,
}))

function startTimer() {
  if (props.duration === 0) {
    return
  }

  ;({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, props.duration))
}

function clearTimer() {
  stopTimer?.()
}

function close() {
  visible.value = false
}

function keydown(event: KeyboardEvent) {
  if (event.code === EVENT_CODE.esc) {
    // press esc to close the message
    close()
  }
}

onMounted(() => {
  startTimer()
  nextZIndex()
  visible.value = true
})

watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  },
)

useEventListener(document, 'keydown', keydown)

useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height
})

defineExpose({
  visible,
  bottom,
  close,
})
</script>

<script lang="ts">
export default {
  name: 'NMessage',
}
</script>

<template>
  <transition :name="ns.b('fade')" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[
        ns.b(),
        ns.type('appearance', appearance, !!(appearance && !icon)),
        ns.is('center', center),
        ns.is('closable', showClose),
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <NBadge v-if="repeatNum > 1" :value="repeatNum" :appearance="badgeAppearance" :class="ns.e('badge')" />
      <NIcon v-if="iconComponent" :class="[typeClass]">
        <component :is="iconComponent" />
      </NIcon>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">
          {{ message }}
        </p>
        <!-- Caution here, message could've been compromised, never use user's input as message -->
        <p v-else :class="ns.e('content')" v-html="message" />
      </slot>
      <button v-if="showClose" :class="ns.e('close-btn')" type="button" @click.stop="close">
        <NIcon>
          <Close />
        </NIcon>
      </button>
    </div>
  </transition>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-message/index.css');
</style>
