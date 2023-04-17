<script setup lang="ts">
import { useLocale, useNamespace } from '@nado/ui-kit-hooks'
import { NIconClose } from '@nado/ui-kit-icons-vue'
import { addUnit } from '@nado/ui-kit-utils'
import { computed, ref } from 'vue'

import { useDialog } from '../../dialog'
import { NIcon } from '../../icon'
import { NOverlay } from '../../overlay'
import { drawerEmits, drawerProps } from './drawer.model'

const props = defineProps(drawerProps)

defineEmits(drawerEmits)
const drawerRef = ref<HTMLElement>()
const focusStartRef = ref<HTMLElement>()
const ns = useNamespace('drawer')
const { t } = useLocale()

const isHorizontal = computed(() => props.direction === 'rtl' || props.direction === 'ltr')
const drawerSize = computed(() => addUnit(props.size))
const { visible, rendered, titleId, afterEnter, bodyId, handleClose, afterLeave, beforeLeave, onModalClick } =
  useDialog(props, drawerRef)
</script>

<script lang="ts">
export default {
  name: 'NDrawer',
  inheritAttrs: false,
}
</script>

<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition :name="ns.b('fade')" @after-enter="afterEnter" @after-leave="afterLeave" @before-leave="beforeLeave">
      <NOverlay v-show="visible" :mask="modal" :overlay-class="modalClass" :z-index="zIndex" @click="onModalClick">
        <div
          ref="drawerRef"
          aria-modal="true"
          :aria-label="title || undefined"
          :aria-labelledby="!title ? titleId : undefined"
          :aria-describedby="bodyId"
          v-bind="$attrs"
          :class="[ns.b(), direction, ns.is('open', visible), customClass]"
          :style="isHorizontal ? `width: ${drawerSize}` : `height: ${drawerSize}`"
          role="dialog"
          @click.stop
        >
          <span ref="focusStartRef" :class="ns.e('sr-focus')" tabindex="-1" />
          <header v-if="withHeader" :class="ns.e('header')">
            <slot
              v-if="!$slots.title"
              name="header"
              :close="handleClose"
              :title-id="titleId"
              :title-class="ns.e('title')"
            >
              <span v-if="!$slots.title" :id="titleId" role="heading" :class="ns.e('title')">
                {{ title }}
              </span>
            </slot>
            <slot v-else name="title">
              <!-- DEPRECATED SLOT -->
            </slot>
            <button
              v-if="showClose"
              :aria-label="t('nado.drawer.close')"
              :class="ns.e('close-btn')"
              type="button"
              @click="handleClose"
            >
              <NIcon :class="ns.e('close')"><NIconClose /></NIcon>
            </button>
          </header>
          <template v-if="rendered">
            <div :id="bodyId" :class="ns.e('body')">
              <slot />
            </div>
          </template>
          <div v-if="$slots.footer" :class="ns.e('footer')">
            <slot name="footer" />
          </div>
        </div>
      </NOverlay>
    </transition>
  </teleport>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-drawer/index.css');
</style>
