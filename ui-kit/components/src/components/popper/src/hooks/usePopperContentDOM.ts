import { useNamespace, type UsePopperReturn, useZIndex } from '@nado/ui-kit-hooks'
import { computed, type CSSProperties, ref, type StyleValue, unref } from 'vue'

import type { NPopperContentProps } from '../popper-content.model'
import type { UsePopperContentReturn } from './usePopperContent'

export const usePopperContentDOM = (
  props: NPopperContentProps,
  { attributes, styles, role }: Pick<UsePopperReturn, 'attributes' | 'styles'> & Pick<UsePopperContentReturn, 'role'>,
) => {
  const { nextZIndex } = useZIndex()
  const ns = useNamespace('popper')

  const contentAttrs = computed(() => unref(attributes).popper)
  const contentZIndex = ref<number>(props.zIndex || nextZIndex())
  const contentClass = computed(() => [
    ns.b(),
    ns.is('pure', props.pure),
    ns.type('effect', props.effect),
    props.popperClass,
  ])
  const contentStyle = computed<StyleValue[]>(() => [
    { zIndex: unref(contentZIndex) } as CSSProperties,
    props.popperStyle || {},
    unref(styles).popper as CSSProperties,
  ])
  const ariaModal = computed<string | undefined>(() => (role.value === 'dialog' ? 'false' : undefined))
  const arrowStyle = computed(() => (unref(styles).arrow || {}) as CSSProperties)

  const updateZIndex = () => {
    contentZIndex.value = props.zIndex || nextZIndex()
  }

  return {
    ariaModal,
    arrowStyle,
    contentAttrs,
    contentClass,
    contentStyle,
    contentZIndex,
    updateZIndex,
  }
}

export type UsePopperContentDOMReturn = ReturnType<typeof usePopperContentDOM>
