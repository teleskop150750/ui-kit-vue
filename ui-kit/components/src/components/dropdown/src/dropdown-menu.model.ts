import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

export const dropdownMenuProps = buildProps({
  onKeydown: { type: definePropType<(event: KeyboardEvent) => void>(Function) },
})

export type NDropdownMenuProps = ExtractPropTypes<typeof dropdownMenuProps>
