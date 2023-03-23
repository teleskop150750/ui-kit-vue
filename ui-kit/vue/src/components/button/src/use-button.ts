// useFormItem, useGlobalConfig
import { useFormDisabled, useFormItem, useFormSize } from '@ui/components/form'
import { useRouterLink } from '@ui/hooks'
import { BUTTON_GROUP_INJECTION_KEY } from '@ui/tokens'
import { computed, inject, ref, type SetupContext } from 'vue'

// Text, useSlotsuseDisabled
import type { NButtonEmits, NButtonProps } from './button.model'

// useRouterLink, useRouterLinkProps
export const useButton = (props: NButtonProps, emit: SetupContext<NButtonEmits>['emit']) => {
  const buttonGroupContext = inject(BUTTON_GROUP_INJECTION_KEY, undefined)

  const { tagComputed, linkAttributesComputed, isLinkTag } = useRouterLink(props)
  const isButtonGroup = computed(() => !!buttonGroupContext)
  const { form } = useFormItem()
  const _size = useFormSize(computed(() => buttonGroupContext?.size))
  const _formDisabled = useFormDisabled()
  const _disabled = computed(() => (tagComputed.value === 'button' ? _formDisabled.value : false))
  const _ref = ref<HTMLButtonElement>()

  const _appearance = computed(() => props.appearance || buttonGroupContext?.appearance || '')

  const typeComputed = computed(() => (isLinkTag.value ? undefined : props.type))
  const buttonAttributesComputed = computed(() => {
    const disabledAttributes = {
      'aria-disabled': props.loading || _disabled.value,
    }

    if (isLinkTag.value) {
      return disabledAttributes
    }

    return {
      type: typeComputed.value,
      tabindex: props.loading || _disabled.value ? -1 : 0,
      ...disabledAttributes,
    }
  })

  const buttonLinkAttributesComputed = computed(() => ({
    ...linkAttributesComputed.value,
    ...buttonAttributesComputed.value,
  }))

  function handleClick(evt: MouseEvent) {
    if (props.type === 'reset') {
      form?.resetFields()
    }

    emit('click', evt)
  }

  return {
    _disabled,
    _size,
    _appearance,
    _ref,
    tagComputed,
    // shouldAddSpace,
    handleClick,
    isButtonGroup,
    buttonLinkAttributesComputed,
  }
}
