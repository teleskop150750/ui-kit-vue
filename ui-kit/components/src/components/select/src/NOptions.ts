/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArray, isFunction, isString } from '@nado/ui-kit-utils'
import { type Component, defineComponent, type VNode, type VNodeNormalizedChildren } from 'vue'

export const NOptions = defineComponent({
  name: 'NOptions',
  emits: ['update-options'],
  setup(_, { slots, emit }) {
    let cachedOptions: any[] = []

    function isSameOptions(a: any[], b: any[]) {
      if (a.length !== b.length) {
        return false
      }

      for (const [index] of a.entries()) {
        // eslint-disable-next-line eqeqeq
        if (a[index] != b[index]) {
          return false
        }
      }

      return true
    }

    return () => {
      const children = slots.default?.()
      const filteredOptions: any[] = []

      function filterOptions(options?: VNodeNormalizedChildren) {
        if (!isArray(options)) {
          return
        }

        ;(options as VNode[]).forEach((item) => {
          const name = ((item?.type || {}) as Component)?.name

          if (name === 'NOptionGroup') {
            filterOptions(
              !isString(item.children) && !Array.isArray(item.children) && isFunction(item.children?.default)
                ? item.children?.default()
                : item.children,
            )
          } else if (name === 'NOption') {
            filteredOptions.push(item.props?.label)
          } else if (Array.isArray(item.children)) {
            filterOptions(item.children)
          }
        })
      }

      if (children && children.length > 0) {
        filterOptions(children![0]?.children)
      }

      if (!isSameOptions(filteredOptions, cachedOptions)) {
        cachedOptions = filteredOptions
        emit('update-options', filteredOptions)
      }

      return children
    }
  },
})
