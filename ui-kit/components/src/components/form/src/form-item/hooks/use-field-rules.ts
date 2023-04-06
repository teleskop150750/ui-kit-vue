import type { RuleItem } from '@nado/async-validator'
import { type Arrayable, castArray, getProp } from '@nado/ui-kit-utils'
import { computed, type ComputedRef, inject } from 'vue'

import { FORM_CONTEXT_INJECTION_KEY } from '../../tokens'
import type { NFormItemProps } from '../form-item.model'
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

    if (requiredRules.length === 0) {
      rules.push({ required })

      return rules
    }

    requiredRules.forEach(([rule, i]) => {
      if (rule.required !== required) {
        rules[i] = { ...rule, required }
      }
    })

    return rules
  })

  function filterRulesByTrigger(rules: ComputedRef<FormItemRule[]>, trigger: string) {
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
      .map(({ trigger: _trigger, ...rule }): RuleItem => rule)
  }

  return {
    fieldRules,
    filterRulesByTrigger,
  }
}

function getRequiredRules(rules: FormItemRule[]) {
  return rules.map((rule, i) => [rule, i] as const).filter(([rule]) => Object.keys(rule).includes('required'))
}
