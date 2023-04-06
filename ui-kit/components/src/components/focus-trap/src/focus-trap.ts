import { createFocusTrap, type FocusTrap as FocusTrapI, type FocusTrapOptions } from '@nado/focus-trap'
import type { Nillable } from '@nado/ui-kit-utils'
import {
  cloneVNode,
  Comment,
  type ComponentPublicInstance,
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

import { focusTrapEmits, focusTrapProps } from './focus-trap.model'

export const FocusTrap = defineComponent({
  props: focusTrapProps,

  emits: focusTrapEmits,

  setup(props, { slots, emit }) {
    let trap: Nillable<FocusTrapI>

    const wrapperEl = ref<Nillable<HTMLElement | ComponentPublicInstance>>()

    const el = computed<Nillable<HTMLElement>>(() => {
      const innerElement = wrapperEl.value

      return innerElement && (innerElement instanceof HTMLElement ? innerElement : innerElement.$el)
    })

    const ensureTrap = () => {
      if (trap) {
        return trap
      }

      const options: FocusTrapOptions = {
        escapeDeactivates: props.escapeDeactivates,
        allowOutsideClick: props.allowOutsideClick,
        returnFocusOnDeactivate: props.returnFocusOnDeactivate,
        clickOutsideDeactivates: props.clickOutsideDeactivates,
        onActivate: () => {
          emit('update:active', true)
          emit('activate')
        },
        onDeactivate: () => {
          emit('update:active', false)
          emit('deactivate')
        },
        onPostActivate: () => emit('postActivate'),
        onPostDeactivate: () => emit('postDeactivate'),
        fallbackFocus: props.fallbackFocus,
        tabbableOptions: props.tabbableOptions,
        delayInitialFocus: props.delayInitialFocus,
      }

      if (props.initialFocus) {
        options.initialFocus = props.initialFocus
      }

      trap = createFocusTrap(el.value as HTMLElement, options)

      return trap
    }

    onMounted(() => {
      watch(
        () => props.active,
        (active) => {
          if (active && el.value) {
            // has no effect if already activated
            ensureTrap()!.activate()
          } else if (trap) {
            trap.deactivate()

            // this allows v-if blocks to work by invalidating the trap
            // and forcing a new one to be created
            if (!el.value || el.value.nodeType === Node.COMMENT_NODE) {
              trap = undefined
            }
          }
        },
        { immediate: true, flush: 'post' },
      )
    })

    onUnmounted(() => {
      if (trap) {
        trap.deactivate()
      }

      trap = undefined
    })

    return {
      activate() {
        ensureTrap().activate()
      },
      deactivate() {
        trap && trap.deactivate()
      },
      renderImpl() {
        if (!slots.default) {
          return undefined
        }

        const vNodes = slots.default().filter((vNode) => vNode.type !== Comment)

        if (!vNodes || vNodes.length === 0 || vNodes.length > 1) {
          console.error('[focus-trap-vue]: FocusTrap requires exactly one child.')

          return vNodes
        }

        return cloneVNode(vNodes[0]!, { ref: wrapperEl })
      },
    }
  },

  render() {
    return this.renderImpl()
  },
})
