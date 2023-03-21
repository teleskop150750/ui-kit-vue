import { useNamespace } from '@ui/hooks'
import { computed, type ComputedRef, inject, type Ref } from 'vue'

import type { useFormSize } from '../../hooks'
import { FORM_CONTEXT_INJECTION_KEY } from '../../tokens'
import type { NFormItemProps, NFormItemValidateState } from '../form-item.model'

interface Params {
  props: NFormItemProps
  validateState: Ref<NFormItemValidateState>
  size: ReturnType<typeof useFormSize>
  isRequired: ComputedRef<boolean>
}

export function useStyleClasses({ props, validateState, size, isRequired }: Params) {
  const ns = useNamespace('form-item')
  const formContext = inject(FORM_CONTEXT_INJECTION_KEY, undefined)
  const formItemClasses = computed(() => [
    ns.b(),
    ns.m(size.value),
    ns.is('error', validateState.value === 'error'),
    ns.is('validating', validateState.value === 'validating'),
    ns.is('success', validateState.value === 'success'),
    ns.is('required', isRequired.value || props.required),
    ns.is('no-asterisk', formContext?.hideRequiredAsterisk),
    formContext?.requireAsteriskPosition === 'right' ? 'asterisk-right' : 'asterisk-left',
    { [ns.m('feedback')]: formContext?.statusIcon },
  ])

  const validateClasses = computed(() => [ns.e('error')])

  return {
    ns,
    formItemClasses,
    validateClasses,
  }
}
