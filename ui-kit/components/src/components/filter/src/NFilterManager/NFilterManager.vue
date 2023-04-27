<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { NIconClose, NIconDelete, NIconEditPen, NIconFilter, NIconPlus } from '@nado/ui-kit-icons-vue'
import { ref } from 'vue'

import { NButton } from '../../../button'
import { NDialog } from '../../../dialog'
import { NDropdown, NDropdownItem, NDropdownMenu } from '../../../dropdown'
import { NIcon } from '../../../icon'
import NFilterManagerFormCreateFilter from '../NFilterManagerFormCreateFilter/NFilterManagerFormCreateFilter.vue'

const ns = useNamespace('filter-manager')
const dialogVisible = ref(false)

function handleCommand() {
  dialogVisible.value = true
}
</script>

<script lang="ts">
export default {
  name: 'NFilterManager',
}
</script>

<template>
  <div :class="ns.b()">
    <NDropdown trigger="click" :class="ns.e('filter-dropdown')">
      <button :class="ns.e('filter')" type="button" aria-label="Open">
        <span :class="ns.e('filter-content')">
          <NIconFilter :class="ns.e('filter-icon')" />
        </span>
      </button>
      <template #dropdown>
        <NDropdownMenu :class="ns.e('filter-dropdown-content')">
          <NDropdownItem
            :class="ns.e('filter-dropdown-item')"
            @keydown.enter="handleCommand"
            @keydown.space="handleCommand"
            @click="handleCommand"
          >
            <NIcon><NIconPlus /></NIcon> Новый фильтр
          </NDropdownItem>
          <NDropdownItem :class="ns.e('filter-dropdown-item')">
            <div :class="ns.e('filter-dropdown-item-label')">Foo</div>
            <div :class="ns.e('filter-dropdown-item-actions')">
              <NButton size="small" mode="outline" :icon="NIconEditPen" />
              <NButton size="small" mode="outline" :icon="NIconDelete" />
            </div>
          </NDropdownItem>
        </NDropdownMenu>
      </template>
    </NDropdown>
    <div :class="[ns.e('filter'), ns.em('filter', 'current')]">
      <span :class="ns.e('filter-content')">
        <span :class="ns.e('filter-label')"> Hello </span>
        <button :class="ns.e('filter-delete')" type="button">
          <NIconClose />
        </button>
      </span>
    </div>
  </div>

  <NDialog v-model="dialogVisible" title="Tips" width="30%" align-center close-on-click-modal>
    <NFilterManagerFormCreateFilter />
    <template #footer>
      <span class="dialog-footer">
        <NButton @click="dialogVisible = false">Cancel</NButton>
        <NButton appearance="primary" @click="dialogVisible = false"> OK </NButton>
      </span>
    </template>
  </NDialog>
</template>

<style>
.n-filter-manager {
  display: inline-block;
}

.n-filter-manager__filter {
  position: relative;

  display: inline-flex;
  flex-direction: column;
  align-items: stretch;

  height: var(--n-sys-component-size-base);
  padding: 0 calc(16px - 1px);

  color: var(--n-sys-color-white);
  font: inherit;
  font-weight: var(--n-sys-text-weight-semibold);
  font-size: var(--n-sys-text-size-base);
  font-family: var(--n-sys-text-font-family);
  line-height: 1;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;

  border-color: var(--n-sys-color-primary);
  border-style: solid;
  border-width: 1px;
  border-radius: var(--n-sys-border-radius-base);

  background-color: var(--n-sys-color-primary);

  cursor: pointer;

  user-select: none;
  touch-action: none;
}

.n-filter-manager__filter:not(.n-filter-manager__filter--current) {
  padding: 0 calc(12px - 1px);
}

.n-filter-manager__filter:not(.n-filter-manager__filter--current):hover {
  border-color: var(--n-sys-color-primary-light);

  background-color: var(--n-sys-color-primary-light);
}

.n-filter-manager__filter:not(.n-filter-manager__filter--current):active {
  border-color: var(--n-sys-color-primary-dark);

  background-color: var(--n-sys-color-primary-dark);
}

.n-filter-manager__filter:not(.n-filter-manager__filter--current):focus-visible {
  z-index: 1;

  outline: var(--n-sys-outline-primary);
  outline-offset: 0;
}

.n-filter-manager > .n-filter-manager__filter:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.n-filter-manager > .n-filter-manager__filter:not(:first-child) {
  margin-left: -1px;

  border-left-color: var(--n-sys-color-primary-200);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.n-filter-manager__filter-content {
  display: flex;
  flex: 10000 1 0;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;

  text-align: center;
}

.n-filter-manager__filter-icon {
  width: 18px;
  height: 18px;
}

.n-filter-manager__filter-delete {
  width: 22px;
  height: 22px;
  margin-right: -6px;
  padding: 2px;

  color: var(--n-sys-color-white);

  border: 0;
  border-radius: 50px;

  background-color: var(--n-sys-color-primary-dark);

  cursor: pointer;
}

.n-filter-manager__filter-delete:hover {
  background-color: var(--n-sys-color-primary-light);
}

.n-filter-manager__filter-delete:focus-visible {
  z-index: 1;

  outline: var(--n-sys-outline-primary);
  outline-offset: 0;
}

.n-filter-manager__filter-dropdown-item {
  display: flex;
  justify-content: space-between;
}

.n-filter-manager__filter-dropdown-item-actions {
  display: flex;
  gap: 8px;
}
</style>
