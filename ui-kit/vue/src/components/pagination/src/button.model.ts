import { useRouterLinkProps } from '@ui/hooks'
import { buildProps, iconPropType } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

import type NPaginationButton from './button.vue'

export const nButtonMods = ['solid', 'outline'] as const

export const nPaginationNavButtonProps = buildProps({
  ...useRouterLinkProps,
  to: {
    type: useRouterLinkProps.to.type,
    default: undefined,
  },
  tag: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  mode: {
    type: String,
    values: nButtonMods,
    default: 'solid',
  },
  label: {
    type: [Number, String],
    default: '',
  },
  icon: {
    type: iconPropType,
  },
} as const)

export type NPaginationNavButtonProps = ExtractPropTypes<typeof nPaginationNavButtonProps>

export type NPaginationNavButtonInstance = InstanceType<typeof NPaginationButton>
