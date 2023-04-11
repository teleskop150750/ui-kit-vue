import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective, useNamespace } from '@nado/ui-kit-hooks'
import { debugWarn, isObject, NOOP } from '@nado/ui-kit-utils'
import { cloneVNode, Comment, defineComponent, Fragment, inject, type Ref, Text, type VNode, withDirectives } from 'vue'

const NAME = 'NOnlyChild'

export const NOnlyChild = defineComponent({
  name: NAME,
  setup(_, { slots, attrs }) {
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY)
    const forwardRefDirective = useForwardRefDirective(forwardRefInjection?.setForwardRef ?? NOOP)

    return () => {
      const defaultSlot = slots.default?.(attrs)

      if (!defaultSlot) {
        return undefined
      }

      if (defaultSlot.length > 1) {
        debugWarn(NAME, 'requires exact only one valid child.')

        return undefined
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot)

      if (!firstLegitNode) {
        debugWarn(NAME, 'no valid child node found')

        return undefined
      }

      return withDirectives(cloneVNode(firstLegitNode!, attrs), [[forwardRefDirective]])
    }
  },
})

function findFirstLegitChild(node: VNode[] | undefined): VNode | undefined {
  if (!node) {
    return undefined
  }

  const children = node as VNode[]

  for (const child of children) {
    /**
     * when user uses h(Fragment, [text]) to render plain string,
     * this switch case just cannot handle, when the value is primitives
     * we should just return the wrapped string
     */
    if (isObject(child)) {
      switch (child.type) {
        case Comment: {
          // eslint-disable-next-line no-continue
          continue
        }
        case Text:
        case 'svg': {
          return wrapTextContent(child)
        }
        case Fragment: {
          return findFirstLegitChild(child.children as VNode[])
        }
        default: {
          return child
        }
      }
    }

    return wrapTextContent(child)
  }

  return undefined
}

function wrapTextContent(s: string | VNode) {
  const ns = useNamespace('only-child')

  return <span class={ns.e('content')}>{s}</span>
}

export interface OnlyChildExpose {
  forwardRef: Ref<HTMLElement>
}
