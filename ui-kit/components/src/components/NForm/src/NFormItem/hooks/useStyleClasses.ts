import { useNamespace } from '@nado/ui-kit-hooks'
import { computed, type ComputedRef, inject, type Ref } from 'vue'

import type { useFormSize } from '../../hooks/useFormSize'
import { FORM_CONTEXT_INJECTION_KEY } from '../../NForm/tokens'
import type { NFormItemProps, NFormItemValidateState } from '../NFormItem.model'

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
    ns.is('error', validateState.value === 'danger'),
    ns.is('validating', validateState.value === 'validating'),
    ns.is('success', validateState.value === 'success'),
    ns.is('required', isRequired.value || props.required || false),
    ns.is('no-asterisk', formContext?.hideRequiredAsterisk),
    { [ns.m('feedback')]: formContext?.statusIcon },
  ])

  return {
    ns,
    formItemClasses,
  }
}
