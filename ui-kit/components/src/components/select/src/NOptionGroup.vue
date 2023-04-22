<script lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { isArray } from '@nado/ui-kit-utils'
import {
  defineComponent,
  getCurrentInstance,
  inject,
  isVNode,
  onMounted,
  provide,
  reactive,
  type Ref,
  ref,
  toRaw,
  toRefs,
  type VNode,
  watch,
} from 'vue'

import { optionGroupProps } from './option-group.model'
import { SELECT_GROUP_INJECTION_KEY, SELECT_INJECTION_KEY, type SelectOptionProxy } from './token'

export default defineComponent({
  name: 'NOptionGroup',
  componentName: 'NOptionGroup',

  props: {
    ...optionGroupProps,
  },
  setup(props) {
    const ns = useNamespace('select')
    const visible = ref(true)
    const instance = getCurrentInstance()!
    const options: Ref<SelectOptionProxy[]> = ref([])

    provide(
      SELECT_GROUP_INJECTION_KEY,
      reactive({
        ...toRefs(props),
      }),
    )

    const selectContext = inject(SELECT_INJECTION_KEY)!

    // get all instances of options

    function flattedChildren(node: VNode) {
      const list: SelectOptionProxy[] = []

      if (isArray(node.children)) {
        node.children.forEach((child) => {
          if (
            isVNode(child) &&
            child.type &&
            (child.type as any).name === 'NOption' &&
            child.component &&
            child.component.proxy
          ) {
            list.push(child.component.proxy as unknown as SelectOptionProxy)
          } else if (isVNode(child) && child.children?.length) {
            list.push(...flattedChildren(child))
          }
        })
      }

      return list
    }

    const { groupQueryChange } = toRaw(selectContext)

    watch(
      groupQueryChange,
      () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        visible.value = options.value.some((option: any) => option.visible === true)
      },
      { flush: 'post' },
    )

    onMounted(() => {
      options.value = flattedChildren(instance.subTree)
    })

    return {
      visible,
      ns,
    }
  },
})
</script>

<template>
  <ul v-show="visible" :class="ns.se('dropdown', 'group-wrap')">
    <li :class="ns.se('dropdown', 'group-title')">{{ label }}</li>
    <li :class="ns.se('dropdown', 'group-inner')">
      <ul :class="ns.se('dropdown', 'group')">
        <slot />
      </ul>
    </li>
  </ul>
</template>
