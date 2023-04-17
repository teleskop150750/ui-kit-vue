<script setup lang="ts">
import { CloseComponents } from '@nado/ui-kit-constants'
import { useDraggable, useLocale } from '@nado/ui-kit-hooks'
import { composeRefs } from '@nado/ui-kit-utils'
import { computed, inject } from 'vue'

import { NIcon } from '../../icon'
import { dialogContentEmits, dialogContentProps } from './dialog-content.model'
import { DIALOG_INJECTION_KEY } from './tokens'

const props = defineProps(dialogContentProps)

defineEmits(dialogContentEmits)
const { t } = useLocale()
const { Close } = CloseComponents

const { dialogRef, headerRef, bodyId, ns, style } = inject(DIALOG_INJECTION_KEY)!

const composedDialogRef = composeRefs(dialogRef)

const draggable = computed(() => props.draggable)

useDraggable(dialogRef, headerRef, draggable)
</script>

<script lang="ts">
export default {
  name: 'NDialogContent',
}
</script>

<template>
  <div
    :ref="composedDialogRef"
    :class="[
      ns.b(),
      ns.is('fullscreen', fullscreen),
      ns.is('draggable', draggable),
      ns.is('align-center', alignCenter),
      ns.m('center', !!center),
      customClass,
    ]"
    :style="style"
    tabindex="-1"
  >
    <header ref="headerRef" :class="ns.e('header')">
      <slot name="header">
        <span role="heading" :class="ns.e('title')">
          {{ title }}
        </span>
      </slot>
      <button
        v-if="showClose"
        :aria-label="t('el.dialog.close')"
        :class="ns.e('header-btn')"
        type="button"
        @click="$emit('close')"
      >
        <NIcon :class="ns.e('close')">
          <component :is="closeIcon || Close" />
        </NIcon>
      </button>
    </header>
    <div :id="bodyId" :class="ns.e('body')">
      <slot />
    </div>
    <footer v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </footer>
  </div>
</template>
