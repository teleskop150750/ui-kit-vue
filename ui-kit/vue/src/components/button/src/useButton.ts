import { useDisabled, useSize } from '@ui/hooks'
// useFormItem, useGlobalConfig
import { BUTTON_GROUP_INJECTION_KEY } from '@ui/tokens'
// Text, useSlots
import { computed, inject, ref, type SetupContext } from 'vue'

import type { ButtonEmits, ButtonProps } from './button.model'

// TODO: FORM
export const useButton = (props: ButtonProps, emit: SetupContext<ButtonEmits>['emit']) => {
  const buttonGroupContext = inject(BUTTON_GROUP_INJECTION_KEY, undefined)
  const isButtonGroup = computed(() => !!buttonGroupContext)
  // const globalConfig = useGlobalConfig('button')
  // const { form } = useFormItem()
  const _size = useSize(computed(() => buttonGroupContext?.size))
  const _disabled = useDisabled()
  const _ref = ref<HTMLButtonElement>()
  // const slots = useSlots()

  const _type = computed(() => props.type || buttonGroupContext?.type || '')

  const handleClick = (evt: MouseEvent) => {
    if (props.type === 'reset') {
      // form?.resetFields()
    }

    emit('click', evt)
  }

  return {
    _disabled,
    _size,
    _type,
    _ref,
    // shouldAddSpace,
    handleClick,
    isButtonGroup,
  }
}
