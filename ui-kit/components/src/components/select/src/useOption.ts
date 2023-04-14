/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { escapeStringRegexp, get } from '@nado/ui-kit-utils'
import { computed, getCurrentInstance, inject, type Ref, toRaw, unref, watch } from 'vue'

import type { NOptionProps } from './option.model'
import { type QueryChangeCtx, SELECT_GROUP_INJECTION_KEY, SELECT_INJECTION_KEY } from './token'

export interface OptionSate {
  index: number
  groupDisabled: boolean
  visible: boolean
  hitState: boolean
  hover: boolean
}

export function useOption(props: NOptionProps, states: OptionSate) {
  // inject
  const select = inject(SELECT_INJECTION_KEY)!
  const selectGroup = inject(SELECT_GROUP_INJECTION_KEY, { disabled: false })!

  // computed
  const isObject = computed(() => Object.prototype.toString.call(props.value).toLowerCase() === '[object object]')

  const itemSelected = computed(() => {
    if (!select.props.multiple) {
      return isEqual(props.value, select.props.modelValue)
    }

    return contains(select.props.modelValue as unknown[], props.value)
  })

  const limitReached = computed(() => {
    if (select.props.multiple) {
      const modelValue = (select.props.modelValue || []) as unknown[]

      return !itemSelected.value && modelValue.length >= select.props.multipleLimit && select.props.multipleLimit > 0
    }

    return false
  })

  const currentLabel = computed(() => props.label || (isObject.value ? '' : props.value))

  const currentValue = computed(() => props.value || props.label || '')

  const isDisabled = computed(() => props.disabled || states.groupDisabled || limitReached.value)

  const instance = getCurrentInstance()

  const contains = (arr = [], target = undefined) => {
    if (!isObject.value) {
      return arr && arr.includes(target)
    }

    const { valueKey } = select.props

    return arr && arr.some((item) => toRaw(get(item, valueKey)) === get(target, valueKey))
  }

  const isEqual = (a: unknown, b: unknown) => {
    if (!isObject.value) {
      return a === b
    }

    const { valueKey } = select.props

    return get(a, valueKey) === get(b, valueKey)
  }

  const hoverItem = () => {
    if (!props.disabled && !selectGroup.disabled) {
      select.hoverIndex = select.optionsArray.indexOf(instance.proxy)
    }
  }

  watch(
    () => currentLabel.value,
    () => {
      if (!props.created && !select.props.remote) {
        select.setSelected()
      }
    },
  )

  watch(
    () => props.value,
    (val, oldVal) => {
      const { remote, valueKey } = select.props

      if (!Object.is(val, oldVal)) {
        select.onOptionDestroy(oldVal, instance.proxy)
        select.onOptionCreate(instance.proxy)
      }

      if (!props.created && !remote) {
        if (valueKey && typeof val === 'object' && typeof oldVal === 'object' && val[valueKey] === oldVal[valueKey]) {
          return
        }

        select.setSelected()
      }
    },
  )

  watch(
    () => selectGroup.disabled,
    () => {
      states.groupDisabled = selectGroup.disabled
    },
    { immediate: true },
  )

  const { queryChange } = toRaw(select)

  watch(
    queryChange,
    (changes: Ref<QueryChangeCtx>) => {
      const { query } = unref(changes)

      const regexp = new RegExp(escapeStringRegexp(query), 'i')

      states.visible = regexp.test(currentLabel.value) || props.created

      if (!states.visible) {
        select.filteredOptionsCount -= 1
      }
    },
    { immediate: true },
  )

  return {
    select,
    currentLabel,
    currentValue,
    itemSelected,
    isDisabled,
    hoverItem,
  }
}
