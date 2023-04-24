<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue'

import NOption from '../../src/NOption.vue'
import NOptionGroup from '../../src/NOptionGroup.vue'
import NSelect from '../../src/NSelect.vue'

// const props = defineProps({

// })

// const value = ref(props.multiple ? [] : '')

export default defineComponent({
  components: {
    NOption,
    NSelect,
    NOptionGroup,
  },
  props: {
    options: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as PropType<any>,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    multipleLimit: {
      type: Number,
      default: undefined,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    defaultFirstOption: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    collapseTags: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-prop-types
    popperClass: {
      default: undefined,
    },
    // eslint-disable-next-line vue/require-prop-types
    automaticDropdown: {
      default: undefined,
    },
    fitInputWidth: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    filterMethod: {
      type: Function,
      default: undefined,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    remoteMethod: {
      type: Function,
      default: undefined,
    },
    size: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: String as PropType<any>,
      default: 'default',
    },
  },
  setup(props) {
    const value = ref(props.multiple ? [] : '')

    return {
      value,
    }
  },
})
</script>

<template>
  <NSelect
    ref="select"
    v-model="value"
    :multiple="multiple"
    :multiple-limit="multipleLimit"
    :popper-class="popperClass"
    :clearable="clearable"
    :default-first-option="defaultFirstOption"
    :filterable="filterable"
    :collapse-tags="collapseTags"
    :allow-create="allowCreate"
    :filter-method="filterMethod"
    :remote="remote"
    :loading="loading"
    :remote-method="remoteMethod"
    :automatic-dropdown="automaticDropdown"
    :size="size"
    :fit-input-width="fitInputWidth"
  >
    <NOptionGroup v-for="group in options" :key="group.label" :disabled="group.disabled" :label="group.label">
      <NOption v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
    </NOptionGroup>
  </NSelect>
</template>
