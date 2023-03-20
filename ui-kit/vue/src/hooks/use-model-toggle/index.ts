import { buildProp, definePropType, type ExtractPropType, isBoolean, type Nillable } from '@ui/utils'
import { isFunction } from '@vue/shared'
import { isClient } from '@vueuse/core'
import { computed, type ExtractPropTypes, getCurrentInstance, onMounted, type Ref, watch } from 'vue'

const _prop = buildProp({
  type: definePropType<Nillable<boolean>>(Boolean),
  default: undefined,
} as const)

const _event = buildProp({
  type: definePropType<(val: boolean) => void>(Function),
} as const)

export type UseModelTogglePropsRaw<T extends string> = {
  [K in T]: typeof _prop
} & {
  [K in `onUpdate:${T}`]: typeof _event
}

export type UseModelTogglePropsGeneric<T extends string> = {
  [K in T]: ExtractPropType<typeof _prop>
} & {
  [K in `onUpdate:${T}`]: ExtractPropType<typeof _event>
}

export const createModelToggleComposable = <T extends string>(name: T) => {
  const updateEventKey = `update:${name}` as const
  const updateEventKeyRaw = `onUpdate:${name}` as const
  const useModelToggleEmits = [updateEventKey]

  const useModelToggleProps = {
    [name]: _prop,
    [updateEventKeyRaw]: _event,
  } as UseModelTogglePropsRaw<T>

  function useModelToggle({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide,
  }: ModelToggleParams) {
    const instance = getCurrentInstance()!
    const { emit } = instance
    const props = instance.props as UseModelTogglePropsGeneric<T> & {
      disabled: boolean
    }

    const hasUpdateHandler = computed(() => isFunction(props[updateEventKeyRaw]))
    // когда оно соответствует значению по умолчанию, мы говорим, что оно отсутствует
    // хотя это может быть ошибочно передано пользователем, но нам нужно исключить это
    // состояние
    const isModelBindingAbsent = computed(() => props[name] === undefined)

    function doShow(event?: Event) {
      if (indicator.value === true) {
        return
      }

      indicator.value = true

      if (toggleReason) {
        toggleReason.value = event
      }

      if (isFunction(onShow)) {
        onShow(event)
      }
    }

    function doHide(event?: Event) {
      if (indicator.value === false) {
        return
      }

      indicator.value = false

      if (toggleReason) {
        toggleReason.value = event
      }

      if (isFunction(onHide)) {
        onHide(event)
      }
    }

    function show(event?: Event) {
      if (props.disabled === true || (isFunction(shouldProceed) && !shouldProceed())) {
        return
      }

      const shouldEmit = hasUpdateHandler.value && isClient

      if (shouldEmit) {
        emit(updateEventKey, true)
      }

      if (isModelBindingAbsent.value || !shouldEmit) {
        doShow(event)
      }
    }

    function hide(event?: Event) {
      if (props.disabled === true || !isClient) {
        return
      }

      const shouldEmit = hasUpdateHandler.value && isClient

      if (shouldEmit) {
        emit(updateEventKey, false)
      }

      if (isModelBindingAbsent.value || !shouldEmit) {
        doHide(event)
      }
    }

    function onChange(val?: boolean) {
      if (!isBoolean(val)) {
        return
      }

      if (props.disabled && val) {
        if (hasUpdateHandler.value) {
          emit(updateEventKey, false)
        }

        return
      }

      if (indicator.value !== val) {
        if (val) {
          doShow()
        } else {
          doHide()
        }
      }
    }

    function toggle() {
      if (indicator.value) {
        hide()
      } else {
        show()
      }
    }

    watch(() => props[name], onChange)

    if (shouldHideWhenRouteChanges && instance!.appContext.config.globalProperties.$route! !== undefined) {
      watch(
        () => ({
          ...(instance!.proxy as Record<string, any>)!.$route,
        }),
        () => {
          if (shouldHideWhenRouteChanges.value && indicator.value) {
            hide()
          }
        },
      )
    }

    onMounted(() => {
      onChange(props[name])
    })

    return {
      hide,
      show,
      toggle,
      hasUpdateHandler,
    }
  }

  return {
    useModelToggle,
    useModelToggleProps,
    useModelToggleEmits,
  }
}

const { useModelToggle, useModelToggleProps, useModelToggleEmits } = createModelToggleComposable('modelValue')

export { useModelToggle, useModelToggleEmits, useModelToggleProps }

export type UseModelToggleProps = ExtractPropTypes<typeof useModelToggleProps>

export interface ModelToggleParams {
  indicator: Ref<boolean>
  toggleReason?: Ref<Event | undefined>
  shouldHideWhenRouteChanges?: Ref<boolean>
  shouldProceed?: () => boolean
  onShow?: (event?: Event) => void
  onHide?: (event?: Event) => void
}
