<script setup lang="ts">
import { NIconArrowDown } from '@nado/ui-kit-icons-vue'
import { NButton, NDropdown, NDropdownItem, NDropdownMenu, NIcon } from '@nado/ui-kit-vue'
</script>

<template>
  <NDropdown trigger="click">
    <NButton class="el-dropdown-link">
      Dropdown List
      <NIcon class="el-icon--right">
        <NIconArrowDown />
      </NIcon>
    </NButton>
    <template #dropdown>
      <NDropdownMenu>
        <NDropdownItem>Action 1</NDropdownItem>
        <NDropdownItem>Action 2</NDropdownItem>
        <NDropdownItem>Action 3</NDropdownItem>
        <NDropdownItem disabled>Action 4</NDropdownItem>
        <NDropdownItem divided>Action 5</NDropdownItem>
      </NDropdownMenu>
    </template>
  </NDropdown>
</template>

<style scoped>
.example-showcase .el-dropdown-link {
  display: flex;
  align-items: center;

  color: var(--n-sys-color-primary);

  cursor: pointer;
}
</style>
