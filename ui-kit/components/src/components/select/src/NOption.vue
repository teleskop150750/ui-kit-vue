<script lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { defineComponent, nextTick, onBeforeUnmount, reactive, toRefs } from 'vue'

import { type OptionSate, useOption } from './hooks'
import { optionProps } from './option.model'

export default defineComponent({
  name: 'NOption',

  props: optionProps,

  setup(props) {
    const ns = useNamespace('select')
    const state = reactive<OptionSate>({
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false,
    })

    const { proxy, currentLabel, itemSelected, isDisabled, selectContext, hoverItem } = useOption(props, state)

    const { visible, hover } = toRefs(state)

    selectContext.addOption(proxy)

    onBeforeUnmount(() => {
      const key = proxy.value
      const { selected, cachedOptions, deleteOption } = selectContext
      const selectedOptions = selectContext.props.multiple ? selected : [selected]
      const doesSelected = selectedOptions.some(
        (item: { value: string | number | boolean }) => item.value === proxy.value,
      )

      // if option is not selected, remove it from cache
      nextTick(() => {
        if (!doesSelected && cachedOptions.get(key) === proxy) {
          cachedOptions.delete(key)
        }
      })
      deleteOption(key, proxy)
    })

    function selectOptionClick() {
      if (isDisabled.value) {
        return
      }

      selectContext.handleOptionSelect(proxy, true)
    }

    return {
      ns,
      currentLabel,
      itemSelected,
      isDisabled,
      selectContext,
      hoverItem,
      visible,
      hover,
      selectOptionClick,
      states: state,
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
