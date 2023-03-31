import { useRouterLinkProps } from '@ui/hooks'
import { buildProps, iconPropType } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

import type NPaginationButton from './button.vue'

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
  label: {
    type: [Number, String],
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: iconPropType,
  },
} as const)

export type NPaginationNavButtonProps = ExtractPropTypes<typeof nPaginationNavButtonProps>

export type NPaginationNavButtonInstance = InstanceType<typeof NPaginationButton>
