<script lang="tsx">
import { useNamespace, useSameTarget } from '@nado/ui-kit-hooks'
import { PatchFlags } from '@nado/ui-kit-utils'
import { createVNode, type CSSProperties, defineComponent, h, renderSlot } from 'vue'

import { overlayEmits, overlayProps } from './overlay.model'

export default defineComponent({
  name: 'NOverlay',

  props: overlayProps,
  emits: overlayEmits,

  setup(props, { slots, emit }) {
    // No reactivity on this prop because when its rendering with a global
    // component, this will be a constant flag.
    const ns = useNamespace('overlay')

    const onMaskClick = (e: MouseEvent) => {
      emit('click', e)
    }

    const { onClick, onMousedown, onMouseup } = useSameTarget(onMaskClick)

    // init here
    return () =>
      // when the vnode meets the same structure but with different change trigger
      // it will not automatically update, thus we simply use h function to manage updating
      props.mask
        ? createVNode(
            'div',
            {
              class: [ns.b(), props.overlayClass],
              style: {
                zIndex: props.zIndex,
              },
              onClick,
              onMousedown,
              onMouseup,
            },
            [renderSlot(slots, 'default')],
            // eslint-disable-next-line no-bitwise
            PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS,
            ['onClick', 'onMouseup', 'onMousedown'],
          )
        : h(
            'div',
            {
              class: props.overlayClass,
              style: {
                zIndex: props.zIndex,
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              } as CSSProperties,
            },
            [renderSlot(slots, 'default')],
          )
  },
})
</script>

<style>
@import url('@nado/ui-kit-theme/src/components/n-overlay/index.css');
</style>
