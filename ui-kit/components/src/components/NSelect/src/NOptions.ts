import { isArray, isFunction, isString } from '@nado/ui-kit-utils'
import { type Component, defineComponent, type VNode } from 'vue'

import { optionsEmits } from './NOptions.model'

export const NOptions = defineComponent({
  name: 'NOptions',
  emits: optionsEmits,
  setup(_, { slots, emit }) {
    let cachedOptions: Array<string | number> = []

    const filteredOptions: Array<string | number> = []

    function isSameOptions(a: Array<string | number>, b: Array<string | number>) {
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

    function filterOptions(options?: VNode[]) {
      if (!isArray(options)) {
        return
      }

      options.forEach((item) => {
        const name = ((item?.type || {}) as Component)?.name

        if (name === 'NOptionGroup') {
          filterOptions(
            !isString(item.children) && !isArray(item.children) && isFunction(item.children?.default)
              ? item.children?.default()
              : item.children,
          )
        } else if (isArray(item.children)) {
          filterOptions(item.children as VNode[])
        } else if (name === 'NOption') {
          filteredOptions.push(item.props?.label)
        }
      })
    }

    return () => {
      const slotData = slots.default?.()

      if (slotData && slotData.length > 0) {
        filterOptions(slotData![0]?.children as VNode[])
      }

      if (!isSameOptions(filteredOptions, cachedOptions)) {
        cachedOptions = filteredOptions
        emit('updateOptions', filteredOptions)
      }

      return slotData
    }
  },
})
