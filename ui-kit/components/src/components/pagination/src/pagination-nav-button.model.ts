import { buildProps, iconPropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { useRouterLinkProps } from '../../config-provider'
import type NPaginationButton from './NPaginationNavButton.vue'

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
    default: undefined,
  },
} as const)

export type NPaginationNavButtonProps = ExtractPropTypes<typeof nPaginationNavButtonProps>

export type NPaginationNavButtonInstance = InstanceType<typeof NPaginationButton>
