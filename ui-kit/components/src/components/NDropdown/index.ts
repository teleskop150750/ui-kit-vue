import { withInstall, withNoopInstall } from '@nado/ui-kit-utils'

import Dropdown from './src/NDropdown.vue'
import DropdownItem from './src/NDropdownItem.vue'
import DropdownMenu from './src/NDropdownMenu.vue'

export const NDropdown = withInstall(Dropdown, {
  DropdownItem,
  DropdownMenu,
})
export const NDropdownItem = withNoopInstall(DropdownItem)
export const NDropdownMenu = withNoopInstall(DropdownMenu)
export * from './src/NDropdown.model'
export * from './src/tokens'
