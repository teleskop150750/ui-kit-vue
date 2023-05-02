import { type Arrayable, castArray, getProp } from '@nado/ui-kit-utils'
import { computed, type ComputedRef, inject } from 'vue'
import type { Schema } from 'yup'

import { FORM_CONTEXT_INJECTION_KEY } from '../../NForm/tokens'
import type { NFormItemProps } from '../NFormItem.model'
import type { FormItemRule } from '../types'

export function useFieldRules(props: NFormItemProps) {
  const formContext = inject(FORM_CONTEXT_INJECTION_KEY, undefined)

  const fieldRules = computed(() => {
    const { required, prop } = props

    const rules: FormItemRule[] = []

    if (props.rules) {
      rules.push(...castArray(props.rules))
    }

    const formRules = formContext?.rules

    if (formRules && prop) {
      const formItemRiles = getProp<Arrayable<FormItemRule> | undefined>(formRules, prop).value

      if (formItemRiles) {
        rules.push(...castArray(formItemRiles))
      }
    }

    if (required === undefined) {
      return rules
    }

    const requiredRules = getRequiredRules(rules)

    requiredRules.forEach(([rule, i]) => {
      if (getIsRequiredRules(rule) !== required) {
        rules[i] = required ? rule.rule.required() : rule.rule.optional()
      }
    })

    return rules
  })

  function filterRulesByTrigger(rules: ComputedRef<FormItemRule[]>, trigger: string): Schema[] {
    return rules.value
      .filter((rule) => {
        if (!rule.trigger || !trigger) {
          return true
        }

        if (Array.isArray(rule.trigger)) {
          return rule.trigger.includes(trigger)
        }

        return rule.trigger === trigger
      })
      .map((el) => el.rule)
  }

  return {
    fieldRules,
    filterRulesByTrigger,
  }
}

function getRequiredRules(rules: FormItemRule[]) {
  return rules.map((rule, i) => [rule, i] as const).filter(([rule]) => getIsRequiredRules(rule))
}

function getIsRequiredRules(rule: FormItemRule) {
  return rule.rule.spec.nullable === false && rule.rule.spec.optional === false
}
