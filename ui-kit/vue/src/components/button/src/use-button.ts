// useFormItem, useGlobalConfig
import { useFormDisabled, useFormSize } from '@ui/components/form/src/hooks'
import { BUTTON_GROUP_INJECTION_KEY } from '@ui/tokens'
import { computed, inject, ref, type SetupContext } from 'vue'

// Text, useSlotsuseDisabled
import type { ButtonEmits, ButtonProps } from './button.model'

export const useButton = (props: ButtonProps, emit: SetupContext<ButtonEmits>['emit']) => {
  const buttonGroupContext = inject(BUTTON_GROUP_INJECTION_KEY, undefined)
  const isButtonGroup = computed(() => !!buttonGroupContext)
  // const { form } = useFormItem()
  const _size = useFormSize(computed(() => buttonGroupContext?.size))
  const _disabled = useFormDisabled()
  const _ref = ref<HTMLButtonElement>()

  // const slots = useSlots()
  console.log(buttonGroupContext?.appearance)

  const _appearance = computed(() => props.appearance || buttonGroupContext?.appearance || '')

  const handleClick = (evt: MouseEvent) => {
    if (props.type === 'reset') {
      // form?.resetFields()
    }

    emit('click', evt)
  }

  return {
    _disabled,
    _size,
    _appearance,
    _ref,
    // shouldAddSpace,
    handleClick,
    isButtonGroup,
  }
}
