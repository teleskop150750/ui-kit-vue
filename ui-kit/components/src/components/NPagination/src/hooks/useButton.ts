import { computed } from 'vue'

import { useRouterLink } from '../../../NConfigProvider'
import type { NPaginationNavButtonProps } from '../NPaginationNavButton.model'

export function useButton(props: NPaginationNavButtonProps) {
  const { tagComputed, linkAttributesComputed, isLinkTag } = useRouterLink(props)
  const _disabled = computed(() => (tagComputed.value === 'button' ? props.disabled : false))

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
    buttonLinkAttributesComputed,
  }
}
