<script setup lang="ts">
import { useNamespace, useSameTarget } from '@nado/ui-kit-hooks'
import { computed, provide, ref } from 'vue'

import { NOverlay } from '../../NOverlay'
import { useDialog } from './hooks'
import { dialogEmits, dialogProps } from './NDialog.model'
import NDialogContent from './NDialogContent.vue'
import { DIALOG_INJECTION_KEY } from './tokens'

const props = defineProps(dialogProps)

defineEmits(dialogEmits)

const ns = useNamespace('dialog')
const dialogRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const dialogContentRef = ref()

const {
  visible,
  titleId,
  bodyId,
  style,
  overlayDialogStyle,
  rendered,
  zIndex,
  afterEnter,
  afterLeave,
  beforeLeave,
  handleClose,
  onModalClick,
} = useDialog(props, dialogRef)

provide(DIALOG_INJECTION_KEY, {
  dialogRef,
  headerRef,
  bodyId,
  ns,
  rendered,
  style,
})

const overlayEvent = useSameTarget(onModalClick)

const draggable = computed(() => props.draggable && !props.fullscreen)

defineExpose({
  /** @description whether the dialog is visible */
  visible,
  dialogContentRef,
})
</script>

<script lang="ts">
export default {
  name: 'NDialog',
  inheritAttrs: false,
}
</script>

<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave" @before-leave="beforeLeave">
      <NOverlay v-show="visible" custom-mask-event :mask="modal" :overlay-class="modalClass" :z-index="zIndex">
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="title || undefined"
          :aria-labelledby="!title ? titleId : undefined"
          :aria-describedby="bodyId"
          :class="`${ns.namespace}-overlay-dialog`"
          :style="overlayDialogStyle"
          @click="overlayEvent.onClick"
          @mousedown="overlayEvent.onMousedown"
          @mouseup="overlayEvent.onMouseup"
        >
          <NDialogContent
            v-if="rendered"
            ref="dialogContentRef"
            v-bind="$attrs"
            :custom-class="customClass"
            :center="center"
            :align-center="alignCenter"
            :close-icon="closeIcon"
            :draggable="draggable"
            :fullscreen="fullscreen"
            :show-close="showClose"
            :title="title"
            @close="handleClose"
          >
            <template #header>
              <slot name="header" :close="handleClose" :title-id="titleId" :title-class="ns.e('title')" />
            </template>
            <slot />
            <template v-if="$slots.footer" #footer>
              <slot name="footer" />
            </template>
          </NDialogContent>
        </div>
      </NOverlay>
    </transition>
  </teleport>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-dialog/index.css');
</style>
