import { escapeStringRegexp, get, isBoolean, isNil, isObject, isString } from '@nado/ui-kit-utils'
import { computed, getCurrentInstance, inject, type Ref, toRaw, unref, watch } from 'vue'

import type { NOptionProps } from '../NOption.model'
import { type QueryChangeCtx, SELECT_GROUP_INJECTION_KEY, SELECT_INJECTION_KEY, type SelectOptionProxy } from '../token'

export interface OptionSate {
  index: number
  groupDisabled: boolean
  visible: boolean
  hitState: boolean
  hover: boolean
}

export function useOption(props: NOptionProps, optionState: OptionSate) {
  const optionInstance = getCurrentInstance()!
  const proxy = optionInstance.proxy! as unknown as SelectOptionProxy

  // inject
  const selectContext = inject(SELECT_INJECTION_KEY)!
  const selectGroupContext = inject(SELECT_GROUP_INJECTION_KEY, { disabled: false })

  // computed
  const valueIsObject = computed(() => isObject(props.value))

  const itemSelected = computed(() => {
    if (!selectContext.props.multiple) {
      return isEqual(props.value, selectContext.props.modelValue)
    }

    return containsInSelectedList(selectContext.props.modelValue as Array<any>, props.value)
  })

  const limitReached = computed(() => {
    const isMultiple = selectContext.props.multiple
    const limit = selectContext.props.multipleLimit

    if (isMultiple !== true || isNil(limit)) {
      return false
    }

    const modelValue = (selectContext.props.modelValue || []) as any[]

    return !itemSelected.value && modelValue.length >= limit && limit > 0
  })

  const currentLabel = computed(() => (!isNil(props.label) ? props.label : valueIsObject.value ? '' : props.value))
  const currentValue = computed(() => (!isNil(props.value) ? props.value : props.label || ''))
  const isDisabled = computed(() => props.disabled || optionState.groupDisabled || limitReached.value)

  function containsInSelectedList(selected: Array<any> = [], value: any = undefined) {
    if (!valueIsObject.value) {
      return selected && selected.includes(value)
    }

    const { valueKey } = selectContext.props

    return selected && selected.some((item) => toRaw(get(item, valueKey!)) === get(value, valueKey!))
  }

  function isEqual(a: unknown, b: unknown) {
    if (!valueIsObject.value) {
      return a === b
    }

    const { valueKey } = selectContext.props

    return get(a, valueKey!) === get(b, valueKey!)
  }

  function hoverItem() {
    if (!props.disabled && !selectGroupContext.disabled) {
      selectContext.hoverIndex = selectContext.optionsArray.indexOf(optionInstance.proxy)
    }
  }

  watch(
    () => currentLabel.value,
    () => {
      if (!props.created && !selectContext.props.remote) {
        selectContext.setSelected()
      }
    },
  )

  watch(
    () => props.value,
    (val, oldVal) => {
      const { remote, valueKey } = selectContext.props

      if (!Object.is(val, oldVal)) {
        selectContext.deleteOption(oldVal, optionInstance.proxy as unknown as SelectOptionProxy)
        selectContext.addOption(optionInstance.proxy as unknown as SelectOptionProxy)
      }

      if (!props.created && !remote) {
        if (valueKey && isObject(val) && isObject(oldVal) && val[valueKey] === oldVal[valueKey]!) {
          return
        }

        selectContext.setSelected()
      }
    },
  )

  watch(
    () => selectGroupContext.disabled,
    () => {
      optionState.groupDisabled = selectGroupContext.disabled
    },
    { immediate: true },
  )

  const { queryChange } = toRaw(selectContext)

  watch(
    queryChange,
    (changes: Ref<QueryChangeCtx>) => {
      const { query } = unref(changes)

      if (isBoolean(query)) {
        return
      }

      const regexp = new RegExp(escapeStringRegexp(`${query}`), 'i')

      optionState.visible = (isString(currentLabel.value) && regexp.test(currentLabel.value)) || props.created

      if (!optionState.visible) {
        selectContext.filteredOptionsCount -= 1
      }
    },
    { immediate: true },
  )

  return {
    proxy,
    selectContext,
    currentLabel,
    currentValue,
    itemSelected,
    isDisabled,
    hoverItem,
  }
}
