// useFormItem, useGlobalConfig
import { useFormDisabled } from '@ui/components/form'
import { useRouterLink } from '@ui/hooks'
import { computed } from 'vue'

// Text, useSlotsuseDisabled
import type { NPaginationNavButtonProps } from '../button.model'

// useRouterLink, useRouterLinkProps
export function useButton(props: NPaginationNavButtonProps) {
  const { tagComputed, linkAttributesComputed, isLinkTag } = useRouterLink(props)
  const _formDisabled = useFormDisabled()
  const _disabled = computed(() => (tagComputed.value === 'button' ? _formDisabled.value : false))

  const typeComputed = computed(() => (isLinkTag.value ? undefined : 'button'))
  const buttonAttributesComputed = computed(() => {
    const disabledAttributes = {
      'aria-disabled': _disabled.value,
    }

    if (isLinkTag.value) {
      return disabledAttributes
    }

    return {
      type: typeComputed.value,
      tabindex: _disabled.value ? -1 : 0,
      ...disabledAttributes,
    }
  })

  const buttonLinkAttributesComputed = computed(() => ({
    ...linkAttributesComputed.value,
    ...buttonAttributesComputed.value,
  }))

  return {
    _disabled,
    tagComputed,
    // shouldAddSpace,
    buttonLinkAttributesComputed,
  }
}
