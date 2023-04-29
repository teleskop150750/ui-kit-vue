<script setup lang="ts">
import { EVENT_CODE } from '@nado/ui-kit-constants'
import { useId, useLocale, useNamespace } from '@nado/ui-kit-hooks'
import { NIconArrowDown } from '@nado/ui-kit-icons-vue'
import { addUnit, isArray } from '@nado/ui-kit-utils'
import { computed, type ComputedRef, type CSSProperties, onBeforeUnmount, provide, ref, toRef, unref, watch } from 'vue'

import { NButton, NButtonGroup } from '../../button'
import { useFormSize } from '../../form'
import { NIcon } from '../../icon'
import { NOnlyChild } from '../../only-child'
import { NRovingFocusGroup } from '../../roving-focus-group'
import { NScrollbar, type NScrollbarInstance } from '../../scrollbar'
import { NTooltip, type NTooltipInstance } from '../../tooltip'
import { dropdownEmits, dropdownProps, NCollection } from './dropdown.model'
import { DROPDOWN_INJECTION_KEY } from './tokens'

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmits)
const ns = useNamespace('dropdown')
const { t } = useLocale()

const triggeringElementRef = ref()
const popperRef = ref<NTooltipInstance>()
const contentRef = ref<HTMLElement>()
const scrollbarRef = ref<NScrollbarInstance>()
const currentTabId = ref<string>()
const isUsingKeyboard = ref(false)
const triggerKeys = [EVENT_CODE.enter, EVENT_CODE.space, EVENT_CODE.down]

const dropdownSize = useFormSize()

const wrapStyle = computed<CSSProperties>(() => ({
  maxHeight: addUnit(props.maxHeight),
}))

const defaultTriggerId = useId().value
const triggerId = computed<string>(() => props.id || defaultTriggerId)

// The goal of this code is to focus on the tooltip triggering element when it is hovered.
// This is a temporary fix for where closing the dropdown through pointerleave event focuses on a
// completely different element. For a permanent solution, remove all calls to any "element.focus()"
// that are triggered through pointer enter/leave events.
watch(
  [triggeringElementRef, toRef(props, 'trigger')],
  ([triggeringElement, trigger], [prevTriggeringElement]) => {
    const triggerArray = isArray(trigger) ? trigger : [trigger]

    if (prevTriggeringElement?.$el?.removeEventListener) {
      prevTriggeringElement.$el.removeEventListener('pointerenter', onAutofocusTriggerEnter)
    }

    if (triggeringElement?.$el?.removeEventListener) {
      triggeringElement.$el.removeEventListener('pointerenter', onAutofocusTriggerEnter)
    }

    if (triggeringElement?.$el?.addEventListener && triggerArray.includes('hover')) {
      triggeringElement.$el.addEventListener('pointerenter', onAutofocusTriggerEnter)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (triggeringElementRef.value?.$el?.removeEventListener) {
    triggeringElementRef.value.$el.removeEventListener('pointerenter', onAutofocusTriggerEnter)
  }
})

function handleClick() {
  handleClose()
}

function handleClose() {
  popperRef.value?.delayClose()
}

function handleOpen() {
  popperRef.value?.delayOpen()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function commandHandler(...args: any[]) {
  emit('command', ...args)
}

function onAutofocusTriggerEnter() {
  triggeringElementRef.value?.$el?.focus()
}

function onItemEnter() {
  // NOOP for now
}

function onItemLeave() {
  const contentEl = unref(contentRef)

  contentEl?.focus()
  currentTabId.value = undefined
}

function handleCurrentTabIdChange(id: string) {
  currentTabId.value = id
}

function handleEntryFocus(e: Event) {
  if (!isUsingKeyboard.value) {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
}

function handleBeforeShowTooltip() {
  emit('visibleChange', true)
}

function handleShowTooltip(event?: Event) {
  if (event?.type === 'keydown') {
    contentRef.value?.focus()
  }

  emit('show', event)
}

function handleHideTooltip(event?: Event) {
  emit('hide', event)
}

function handleBeforeHideTooltip() {
  emit('visibleChange', false)
}

provide(DROPDOWN_INJECTION_KEY, {
  contentRef,
  role: computed(() => props.role),
  triggerId,
  isUsingKeyboard,
  onItemEnter,
  onItemLeave,
  dropdownSize,
  handleClick,
  commandHandler,
  hideOnClick: toRef(props, 'hideOnClick')! as ComputedRef<boolean>,
})

function handlerMainButtonClick(event: MouseEvent) {
  emit('click', event)
}

defineExpose({
  handleOpen,
  handleClose,
})
</script>

<script lang="ts">
export default {
  name: 'ElDropdown',
}
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', disabled)]">
    <NTooltip
      ref="popperRef"
      :role="role"
      :effect="effect"
      :fallback-placements="['bottom', 'top']"
      :popper-options="popperOptions"
      :gpu-acceleration="false"
      :hide-after="trigger === 'hover' ? hideTimeout : 0"
      :manual-mode="true"
      :placement="placement"
      :popper-class="[ns.e('popper'), popperClass]"
      :trigger="trigger"
      :trigger-keys="triggerKeys"
      :trigger-target-el="contentRef!"
      :show-after="trigger === 'hover' ? showTimeout : 0"
      :stop-popper-mouse-event="false"
      :virtual-ref="triggeringElementRef"
      :is-virtual-triggering="splitButton"
      :disabled="disabled"
      :transition="`${ns.namespace}-zoom-in-top`"
      :teleported="teleported"
      pure
      persistent
      @before-show="handleBeforeShowTooltip"
      @show="handleShowTooltip"
      @before-hide="handleBeforeHideTooltip"
      @hide="handleHideTooltip"
    >
      <template #content>
        <NScrollbar ref="scrollbarRef" :wrap-style="wrapStyle" tag="div" :view-class="ns.e('list')">
          <NRovingFocusGroup
            :loop="loop"
            :current-tab-id="currentTabId"
            orientation="horizontal"
            @current-tab-id-change="handleCurrentTabIdChange"
            @entry-focus="handleEntryFocus"
          >
            <NCollection>
              <slot name="dropdown" />
            </NCollection>
          </NRovingFocusGroup>
        </NScrollbar>
      </template>
      <template v-if="!splitButton" #default>
        <NOnlyChild :id="triggerId" ref="triggeringElementRef" role="button" :tabindex="tabindex">
          <slot name="default" />
        </NOnlyChild>
      </template>
    </NTooltip>
    <template v-if="splitButton">
      <NButtonGroup>
        <NButton
          v-bind="buttonProps"
          :size="dropdownSize"
          appearance="danger"
          :disabled="disabled"
          :tabindex="tabindex"
          @click="handlerMainButtonClick"
        >
          <slot name="default" />
        </NButton>
        <NButton
          :id="triggerId"
          ref="triggeringElementRef"
          v-bind="buttonProps"
          role="button"
          :size="dropdownSize"
          appearance="danger"
          :class="ns.e('caret-button')"
          :disabled="disabled"
          :tabindex="tabindex"
          :aria-label="t('el.dropdown.toggleDropdown')"
        >
          <NIcon :class="ns.e('icon')"><NIconArrowDown /></NIcon>
        </NButton>
      </NButtonGroup>
    </template>
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-dropdown/n-dropdown/index.css');
</style>
