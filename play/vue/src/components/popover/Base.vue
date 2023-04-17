<script lang="ts" setup>
import { NButton, NPopover, vClickOutside } from '@nado/ui-kit-vue'
import { ref, type StyleValue, unref } from 'vue'

const visible = ref(false)
const nested = ref(false)

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const st: StyleValue = {
  margin: 0,
  textAlign: 'right',
}
</script>

<template>
  <div>
    <h2>NPopover</h2>

    <div class="tooltip-base-box-m">
      <h3>Basic usage</h3>
      <NPopover
        placement="top-start"
        title="Title"
        :width="200"
        trigger="hover"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <NButton class="m-2">Hover to activate</NButton>
        </template>
      </NPopover>

      <NPopover
        placement="bottom"
        title="Title"
        :width="200"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <NButton class="m-2">Click to activate</NButton>
        </template>
      </NPopover>

      <NPopover
        ref="popover"
        placement="right"
        title="Title"
        :width="200"
        trigger="focus"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <NButton class="m-2">Focus to activate</NButton>
        </template>
      </NPopover>

      <NPopover
        ref="popover"
        title="Title"
        :width="200"
        trigger="contextmenu"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <NButton class="m-2">contextmenu to activate</NButton>
        </template>
      </NPopover>

      <NPopover
        :visible="visible"
        placement="bottom"
        title="Title"
        :width="200"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <NButton class="m-2" @click="visible = !visible">Manual to activate</NButton>
        </template>
      </NPopover>
    </div>

    <div class="tooltip-base-box-m">
      <h3>Virtual triggering</h3>
      <NButton ref="buttonRef" v-click-outside="onClickOutside">Click me</NButton>

      <NPopover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" title="With title" is-virtual-triggering>
        <span> Some content </span>
      </NPopover>
    </div>

    <div class="tooltip-base-box-m">
      <h3>Rich content</h3>
      <NPopover
        :width="300"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
      >
        <template #reference>
          <NButton>1111111</NButton>
        </template>
        <template #default>
          <div class="demo-rich-conent" style="display: flex; flex-direction: column; gap: 16px">
            <div>
              <p class="demo-rich-content__name" :style="st">Nado Ui</p>
              <p
                class="demo-rich-content__mention"
                style="
                  margin: 0;

                  color: var(--el-color-info);
                  font-size: 14px;
                "
              >
                @nado-ui
              </p>
            </div>

            <p class="demo-rich-content__desc" style="margin: 0">
              Element Plus, a Vue 3 based component library for developers, designers and product managers
            </p>
          </div>
        </template>
      </NPopover>
    </div>

    <div class="tooltip-base-box-m">
      <h3>Nested operation</h3>
      <NPopover :visible="nested" placement="top" is-trapping :escape-deactivates="false" :width="180">
        <p>Are you sure to delete this?</p>
        <div :style="st">
          <NButton size="small" plain @click="nested = false">cancel</NButton>
          <NButton size="small" @click="nested = false">confirm</NButton>
        </div>
        <template #reference>
          <NButton @click="nested = true">Delete</NButton>
        </template>
      </NPopover>
    </div>
  </div>
</template>

<style scoped>
.n-button {
  margin: 8px;
}

.n-button--size-small {
  margin: 4px;
}

.tooltip-base-box-m {
  padding: 0 80px;
}
</style>
