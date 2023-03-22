<script setup lang="ts">
import { NIconCalendar, NIconSearch } from '@nado/ui-kit-icons-vue'
import { type ComponentSize, NButton, NInput, type NInputProps } from '@nado/ui-kit-vue'
import { computed, ref } from 'vue'

import { initThemeClasses } from '@/utils'

initThemeClasses()

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
const input5 = ref('')
const input6 = ref('')
const input7 = ref('')
const input8 = ref('')
const input9 = ref('')
const input10 = ref('')
const input11 = ref('')
const input12 = ref('')
const textarea = ref('')
const textarea1 = ref('')
const textarea2 = ref('')
const text = ref('')
const isDisabled = ref(true)
const isClearable = ref(true)
const showPassword = ref(true)
const isAutoSize = ref(true)
const withIcon = ref('attributes')
const rows = ref(2)
const autoSizeConfig = ref({ minRows: 2, maxRows: 4 })
const size = ref<ComponentSize>('default')
const maxlength = ref(10)
const inputSizeList: Record<'label' & 'value', NInputProps['size']>[] = [
  {
    label: 'large',
    value: 'large',
  },
  {
    label: 'default',
    value: 'default',
  },
  {
    label: 'small',
    value: 'small',
  },
]
const withIconList: Array<{ label: string; value: string }> = [
  {
    label: 'use slot',
    value: 'slot',
  },
  {
    label: 'use attributes',
    value: 'attributes',
  },
]

const useSlot = computed(() => withIcon.value === 'slot')
</script>

<template>
  <Story title="Form/Input" icon="iconoir:input-field" auto-props-disabled>
    <Variant title="Basic Usage"> <NInput v-model="input1" placeholder="Please input" /> </Variant>Progress
    <Variant title="Disabled">
      <NInput v-model="input2" :disabled="isDisabled" placeholder="Please input" />
      <template #controls>
        <HstCheckbox v-model="isDisabled" title="Disabled" />
      </template>
    </Variant>
    <Variant title="Clearable">
      <NInput v-model="input3" :clearable="isClearable" placeholder="Please input" />
      <template #controls>
        <HstCheckbox v-model="isClearable" title="Clearable" />
      </template>
    </Variant>
    <Variant title="Formatter">
      <NInput
        v-model="input4"
        placeholder="Please input"
        :formatter="(value:string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="(value:string) => value.replace(/\$\s?|(,*)/g, '')"
      />
    </Variant>
    <Variant title="Password box">
      <NInput v-model="input5" type="password" placeholder="Please input password" :show-password="showPassword" />
      <template #controls>
        <HstCheckbox v-model="showPassword" title="ShowPassword" />
      </template>
    </Variant>
    <Variant title="Input with icon">
      <template v-if="useSlot">
        <NInput v-model="input6" placeholder="Pick a date">
          <template #suffix>
            <NIconCalendar />
          </template>
        </NInput>
        <NInput v-model="input7" class="mt-4" placeholder="Type something">
          <template #prefix>
            <NIconSearch />
          </template>
        </NInput>
      </template>
      <template v-else>
        <NInput v-model="input6" placeholder="Pick a date" :suffix-icon="NIconCalendar" />
        <NInput v-model="input7" class="mt-4" placeholder="Type something" :prefix-icon="NIconSearch" />
      </template>
      <template #controls>
        <HstSelect v-model="withIcon" title="With Icon" :options="withIconList" />
      </template>
    </Variant>
    <Variant title="Textarea">
      <NInput v-model="textarea" :rows="rows" type="textarea" placeholder="Please input" />
      <template #controls>
        <HstNumber v-model="rows" title="Rows" />
      </template>
    </Variant>
    <Variant title="Autosize Textarea">
      <NInput v-model="textarea1" autosize type="textarea" placeholder="Please input" />
      <div style="margin: 20px 0" />
      <NInput v-model="textarea2" :autosize="autoSizeConfig" type="textarea" placeholder="Please input" />
      <template #controls>
        <HstCheckbox v-model="isAutoSize" title="AutoSize" />
        <HstNumber v-model="autoSizeConfig.minRows" title="minRows" />
        <HstNumber v-model="autoSizeConfig.maxRows" title="maxRows" />
      </template>
    </Variant>
    <Variant title="Mixed input">
      <div>
        <NInput v-model="input8" placeholder="Please input">
          <template #prepend> Http:// </template>
        </NInput>
      </div>
      <div class="mt-4">
        <NInput v-model="input9" placeholder="Please input">
          <template #append> .com </template>
        </NInput>
      </div>
      <div class="mt-4">
        <NInput v-model="input10" placeholder="Please input" class="input-with-select">
          <template #append>
            <NButton :icon="NIconSearch" />
          </template>
        </NInput>
      </div>
      <div class="mt-4">
        <NInput v-model="input11" placeholder="Please input" class="input-with-select">
          <template #prepend>
            <NButton :icon="NIconSearch" />
          </template>
        </NInput>
      </div>
    </Variant>
    <Variant title="Sizes">
      <NInput v-model="input12" :size="size" placeholder="Please Input" />
      <template #controls>
        <HstSelect v-model="size" title="Size" :options="inputSizeList" />
      </template>
    </Variant>
    <Variant title="Limit length">
      <NInput v-model="text" :maxlength="maxlength" placeholder="Please input" show-word-limit type="text" />
      <div style="margin: 20px 0" />
      <NInput v-model="textarea" :maxlength="maxlength" placeholder="Please input" show-word-limit type="textarea" />
      <template #controls>
        <HstNumber v-model="maxlength" title="Limit length" />
      </template>
    </Variant>
  </Story>
</template>

<style>
.mt-4 {
  margin-top: 4px;
}

.histoire-generic-render-story {
  width: 500px;
  padding: 2rem;
}
</style>

<docs lang="md">
## Basic usage

Input is a controlled component, it **always shows Vue binding value**.

Under normal circumstances, `input` event should be handled. Its handler should update component's binding value (or use `v-model`). Otherwise, input box's value will not change.

Do not support `v-model` modifiers.

## Disabled

Disable the Input with the `disabled` attribute.

## Clearable

Make the Input clearable with the `clearable` attribute.

## Formatter

Display value within it's situation with `formatter`, and we usually use `parser` at the same time.

## Password box

Make a toggle-able password Input with the `show-password` attribute.

## Input with icon

Add an icon to indicate input type.

To add icons in Input, you can simply use `prefix-icon` and `suffix-icon` attributes. Also, the `prefix` and `suffix` named slots works as well.

## Textarea

Resizable for entering multiple lines of text information. Add attribute `type="textarea"` to change `input` into native `textarea`.

Control the height by setting the `rows` prop.

## Autosize Textarea

Setting the `autosize` prop for a textarea type of Input makes the height to automatically adjust based on the content. An options object can be provided to `autosize` to specify the minimum and maximum number of lines the textarea can automatically adjust.

## Mixed input

Prepend or append an element, generally a label or a button.

Use `slot` to distribute elements that prepend or append to Input.

## Sizes

Add `size` attribute to change the size of Input. In addition to the default size, there are two other options: `large`, `small`.

## Limit length

`maxlength` and `minlength` attributes of input, they declare a limit on the number of characters a user can input. The "number of characters" is measured using JavaScript string length.Setting the `maxlength` prop for a text or textarea type of Input can limit the length of input value, allows you to show word count by setting `show-word-limit` to `true` at the same time.
</docs>
