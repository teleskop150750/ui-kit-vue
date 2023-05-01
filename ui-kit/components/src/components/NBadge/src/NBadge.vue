<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { isNumber } from '@nado/ui-kit-utils'
import { computed } from 'vue'

import { badgeProps } from './NBadge.model'

const props = defineProps(badgeProps)

const ns = useNamespace('badge')

const content = computed<string>(() => {
  if (props.isDot) {
    return ''
  }

  if (isNumber(props.value) && isNumber(props.max)) {
    return props.max < props.value ? `${props.max}+` : `${props.value}`
  }

  return `${props.value}`
})

defineExpose({
  /** @description badge content */
  content,
})
</script>

<script lang="ts">
export default {
  name: 'NBadge',
}
</script>

<template>
  <div :class="ns.b()">
    <slot />
    <transition :name="`${ns.namespace}-zoom-in-center`">
      <sup
        v-show="!hidden && (content || isDot)"
        :class="[
          ns.e('content'),
          ns.eType('content', 'appearance', appearance),
          ns.eIs('content', 'fixed', !!$slots.default),
          ns.eIs('content', 'dot', isDot),
        ]"
        v-text="content"
      />
    </transition>
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-badge/index.css');
</style>
