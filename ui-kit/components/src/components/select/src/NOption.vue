<script lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { defineComponent, getCurrentInstance, nextTick, onBeforeUnmount, reactive, toRefs } from 'vue'

import { optionProps } from './option.model'
import type { SelectOptionProxy } from './token'
import { useOption } from './useOption'

export default defineComponent({
  name: 'NOption',
  componentName: 'NOption',

  props: {
    ...optionProps,
  },

  setup(props) {
    const ns = useNamespace('select')
    const states = reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false,
    })

    const { currentLabel, itemSelected, isDisabled, select, hoverItem } = useOption(props, states)

    const { visible, hover } = toRefs(states)

    const vm = getCurrentInstance()!.proxy!

    select.onOptionCreate(vm as unknown as SelectOptionProxy)

    onBeforeUnmount(() => {
      const key = (vm as unknown as SelectOptionProxy).value
      const { selected } = select
      const selectedOptions = select.props.multiple ? selected : [selected]
      const doesSelected = selectedOptions.some(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.value === (vm as unknown as SelectOptionProxy).value,
      )

      // if option is not selected, remove it from cache
      nextTick(() => {
        // eslint-disable-next-line unicorn/consistent-destructuring
        if (select.cachedOptions.get(key) === vm && !doesSelected) {
          // eslint-disable-next-line unicorn/consistent-destructuring
          select.cachedOptions.delete(key)
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      select.onOptionDestroy(key, vm as any)
    })

    function selectOptionClick() {
      if (props.disabled !== true && states.groupDisabled !== true) {
        select.handleOptionSelect(vm, true)
      }
    }

    return {
      ns,
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      visible,
      hover,
      selectOptionClick,
      states,
    }
  },
})
</script>

<template>
  <li
    v-show="visible"
    :class="[
      ns.se('dropdown', 'item'),
      ns.seIs('dropdown', 'item', 'disabled', isDisabled),
      ns.seIs('dropdown', 'item', 'selected', itemSelected),
      ns.seIs('dropdown', 'item', 'hover', hover),
    ]"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>
