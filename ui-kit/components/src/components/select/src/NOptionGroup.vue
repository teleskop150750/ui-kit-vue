<script lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { isArray } from 'lodash-es'
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  provide,
  reactive,
  ref,
  toRaw,
  toRefs,
  watch,
} from 'vue'

import { optionGroupProps } from './option-group.model'
import { SELECT_GROUP_INJECTION_KEY, SELECT_INJECTION_KEY } from './token'

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children = ref<any>([])

    provide(
      SELECT_GROUP_INJECTION_KEY,
      reactive({
        ...toRefs(props),
      }),
    )

    const select = inject(SELECT_INJECTION_KEY)!

    // get all instances of options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattedChildren = (node: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list: any[] = []

      if (isArray(node.children)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        node.children.forEach((child: any) => {
          if (child.type && child.type.name === 'NOption' && child.component && child.component.proxy) {
            list.push(child.component.proxy)
          } else if (child.children?.length) {
            list.push(...flattedChildren(child))
          }
        })
      }

      return list
    }

    const { groupQueryChange } = toRaw(select)

    watch(
      groupQueryChange,
      () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        visible.value = children.value.some((option: any) => option.visible === true)
      },
      { flush: 'post' },
    )

    onMounted(() => {
      children.value = flattedChildren(instance.subTree)
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
