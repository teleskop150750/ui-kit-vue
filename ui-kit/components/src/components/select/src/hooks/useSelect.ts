import { CHANGE_EVENT, EVENT_CODE, UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { useLocale, useNamespace } from '@nado/ui-kit-hooks'
import {
  type Arrayable,
  debugWarn,
  get,
  getComponentSize,
  isArray,
  isClient,
  isEqual,
  isFunction,
  isKorean,
  isNil,
  isNumber,
  isObject,
  scrollIntoView,
} from '@nado/ui-kit-utils'
import { debounce } from 'lodash-es'
import { computed, nextTick, ref, type SetupContext, shallowRef, toRaw, triggerRef, watch } from 'vue'

import { useFormItem, useFormSize } from '../../../form'
import type { NInputInstance } from '../../../input'
import type { NScrollbarInstance } from '../../../scrollbar'
import { type NTooltipInstance } from '../../../tooltip'
import type { NSelectEmits, NSelectProps, SelectVModel, SelectVModelValue } from '../select.model'
import type { QueryChangeCtx, SelectOptionProxy } from '../token'
import type { SelectedItem, SelectState } from './useSelectState'

const DEFAULT_REMOTE_TIME = 300

export function useSelect(props: NSelectProps, state: SelectState, emit: SetupContext<NSelectEmits>['emit']) {
  const ns = useNamespace('select')
  const MENU_WRAPPER_CLASS_NAME = ns.se('dropdown', 'wrap')
  // template refs
  const inputRef = ref<NInputInstance>()
  const filterInputRef = ref<HTMLInputElement>()
  const iOSInputRef = ref<HTMLInputElement>()
  const tooltipRef = ref<NTooltipInstance>()
  const tagsWrapperRef = ref<HTMLElement>()
  const selectRootRef = ref<HTMLElement>()
  const scrollbarRef = ref<NScrollbarInstance>()

  const hoverOption = ref<SelectOptionProxy>()
  const queryChange = shallowRef<QueryChangeCtx>({ query: '' })
  const groupQueryChange = shallowRef('')
  let originClientHeight = 0

  const { form, formItem } = useFormItem()

  const { emptyText } = getSelectEmptyText(props, state)
  const isReadonly = computed(() => !props.filterable || props.multiple || !state.visible)
  const isDisabled = computed(() => props.disabled || form?.disabled)
  const hasValue = computed(() =>
    props.multiple
      ? isArray(props.modelValue) && props.modelValue.length > 0
      : !isNil(props.modelValue) && props.modelValue !== '',
  )
  const canShowClose = computed(() => props.clearable && !isDisabled.value && state.isInputHover && hasValue.value)
  const debounceRemoteTime = computed(() => (props.remote ? DEFAULT_REMOTE_TIME : 0))

  const canVisibleMenuWhenRemove = computed(() => !(props.remote && state.query === '' && state.options.size === 0))

  const iconSuffix = computed(() =>
    props.remote && props.filterable && !props.remoteShowSuffix ? undefined : props.suffixIcon,
  )
  const iconReverse = computed(() =>
    ns.is('reverse', Boolean(iconSuffix.value && state.visible && props.suffixTransition)),
  )

  const { selectSize, collapseTagSize } = getSelectSize()

  const { optionLabelListInMenu, optionsProxyList, cachedOptionsProxyList, showNewOption } = useOptionsProxyList(
    props,
    state,
  )

  const isMenuVisible = computed({
    get() {
      return state.visible && canVisibleMenuWhenRemove.value
    },
    set(val: boolean) {
      state.visible = val
    },
  })

  const optionsAllDisabled = computed(() =>
    optionsProxyList.value.filter((option) => option.visible).every((option) => option.disabled),
  )

  const { showTagList, collapseTagList } = getTagList(props, state)

  // watch
  watch([() => isDisabled.value, () => selectSize.value, () => form?.size], () => {
    nextTick(() => {
      resetInputHeight()
    })
  })

  watch(
    () => props.placeholder,
    (val) => {
      state.currentPlaceholder = val || ''
      state.cachedPlaceHolder = val || ''
    },
  )

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (props.multiple) {
        resetInputHeight()

        state.currentPlaceholder =
          (isArray(val) && val.length > 0) || (filterInputRef.value && state.query !== '')
            ? ''
            : state.cachedPlaceHolder

        if (props.filterable && !props.reserveKeyword) {
          state.query = ''
          handleQueryChange(state.query)
        }
      }

      setSelected()

      if (props.filterable && !props.multiple) {
        state.inputLength = 20
      }

      if (!isEqual(val, oldVal) && props.validateEvent) {
        formItem?.validate('change').catch((error) => debugWarn(error))
      }
    },
    {
      flush: 'post',
      deep: true,
    },
  )

  watch(
    () => state.visible,
    (val) => {
      if (!val) {
        if (props.filterable) {
          if (isFunction(props.filterMethod)) {
            props.filterMethod('')
          }

          if (isFunction(props.remoteMethod)) {
            props.remoteMethod('')
          }
        }

        filterInputRef.value && filterInputRef.value.blur()
        state.query = ''
        state.previousQuery = undefined
        state.selectedLabel = ''
        state.inputLength = 20
        state.menuVisibleOnFocus = false
        resetHoverIndex()
        nextTick(() => {
          if (
            filterInputRef.value &&
            filterInputRef.value.value === '' &&
            isArray(state.selected) &&
            state.selected.length === 0
          ) {
            state.currentPlaceholder = state.cachedPlaceHolder
          }
        })

        if (!props.multiple && !isArray(state.selected)) {
          if (state.selected) {
            state.selectedLabel =
              props.filterable && props.allowCreate && state.createdSelected && state.createdLabel
                ? state.createdLabel
                : state.selected.currentLabel

            if (props.filterable) {
              state.query = state.selectedLabel
            }
          }

          if (props.filterable) {
            state.currentPlaceholder = state.cachedPlaceHolder
          }
        }
      } else {
        tooltipRef.value?.updatePopper?.()

        if (props.filterable) {
          state.filteredOptionsCount = state.optionsCount
          state.query = props.remote ? '' : state.selectedLabel
          iOSInputRef.value?.focus?.()

          if (props.multiple) {
            filterInputRef.value?.focus()
          } else if (state.selectedLabel) {
            state.currentPlaceholder = `${state.selectedLabel}`
            state.selectedLabel = ''
          }

          handleQueryChange(state.query)

          if (!props.multiple && !props.remote) {
            queryChange.value.query = ''

            triggerRef(queryChange)
            triggerRef(groupQueryChange)
          }
        }
      }

      emit('visibleChange', val)
    },
  )

  watch(
    // fix `Array.prototype.push/splice/..` cannot trigger non-deep watcher
    // https://github.com/vuejs/vue-next/issues/2116
    () => state.options.entries(),
    () => {
      if (!isClient) {
        return
      }

      tooltipRef.value?.updatePopper?.()

      if (props.multiple) {
        resetInputHeight()
      }

      const inputs = selectRootRef.value?.querySelectorAll('input') || []

      if (![...inputs].includes(document.activeElement as HTMLInputElement)) {
        setSelected()
      }

      if (props.defaultFirstOption && (props.filterable || props.remote) && state.filteredOptionsCount) {
        checkDefaultFirstOption()
      }
    },
    {
      flush: 'post',
    },
  )

  watch(
    () => state.hoverIndex,
    (val) => {
      hoverOption.value = isNumber(val) && val > -1 ? optionsProxyList.value[val] : undefined

      optionsProxyList.value.forEach((option) => {
        option.hover = hoverOption.value === option
      })
    },
  )

  // Methods
  function closeSelect() {
    state.visible = false
  }

  function toggleMenu(event?: MouseEvent) {
    if (event && !state.mouseEnter) {
      return
    }

    if (isDisabled.value) {
      return
    }

    if (state.menuVisibleOnFocus) {
      state.menuVisibleOnFocus = false
    } else if (!tooltipRef.value || !tooltipRef.value.isFocusInsideContent()) {
      state.visible = !state.visible
    }

    if (state.visible) {
      ;(filterInputRef.value || inputRef.value)?.focus()
    }
  }

  function clearSelected(event: Event) {
    event.stopPropagation()

    const value: Arrayable<SelectVModelValue> = props.multiple ? [] : ''

    if (isArray(state.selected) && isArray(value)) {
      state.selected.forEach((item) => {
        if (item.isDisabled) {
          value.push(item.value)
        }
      })
    }

    emit(UPDATE_MODEL_EVENT, value)
    emitChange(value)
    state.hoverIndex = -1
    state.visible = false
    emit('clear')
  }

  function setSelected() {
    if (!props.multiple && !isArray(props.modelValue) && !isNil(props.modelValue)) {
      const option = getSelectedItem(props.modelValue)

      // TODO
      // if (option.props?.created) {
      //   state.createdLabel = option.props.value
      //   state.createdSelected = true
      // } else {
      //   state.createdSelected = false
      // }
      state.createdSelected = false

      state.selectedLabel = option.currentLabel
      state.selected = option

      if (props.filterable) {
        state.query = state.selectedLabel
      }

      return
    }

    state.selectedLabel = ''

    const result: SelectedItem[] = []

    if (isArray(props.modelValue)) {
      props.modelValue.forEach((value) => {
        result.push(getSelectedItem(value))
      })
    }

    state.selected = result
    nextTick(() => {
      resetInputHeight()
    })
  }

  // Tag
  function deletePrevTag(event: KeyboardEvent) {
    if (event.code === EVENT_CODE.delete) {
      return
    }

    const target = event.target as HTMLInputElement

    if (target.value.length <= 0 && !toggleLastOptionHitState() && isArray(props.modelValue)) {
      const value = [...props.modelValue]

      value.pop()
      emit(UPDATE_MODEL_EVENT, value)
      emitChange(value)
    }

    if (target.value.length === 1 && isArray(props.modelValue) && props.modelValue.length === 0) {
      state.currentPlaceholder = state.cachedPlaceHolder
    }
  }

  // TODO
  function deleteTag(event: MouseEvent, tag: SelectedItem) {
    event.stopPropagation()

    if (!isArray(state.selected) || !isArray(props.modelValue)) {
      return
    }

    const index = state.selected.indexOf(tag)

    if (index < 0 || isDisabled.value) {
      return
    }

    const value = [...props.modelValue]

    value.splice(index, 1)
    emit(UPDATE_MODEL_EVENT, value)
    emitChange(value)
    emit('removeTag', tag.value)
  }

  // TODO
  function scrollToOption(option?: Arrayable<{ value: SelectVModelValue }>) {
    if (!option) {
      return
    }

    const targetOption = isArray(option) ? option[0] : option
    let target = undefined

    if (targetOption?.value) {
      const options = optionsProxyList.value.filter((item) => item.value === targetOption.value)

      if (options.length > 0) {
        target = options[0]!.$el
      }
    }

    if (tooltipRef.value && target) {
      const menu = tooltipRef.value?.popperRef?.contentRef?.querySelector?.<HTMLElement>(`.${MENU_WRAPPER_CLASS_NAME}`)

      if (menu) {
        scrollIntoView(menu, target)
      }
    }

    scrollbarRef.value?.scroll()
  }

  function addOption(vm: SelectOptionProxy) {
    state.optionsCount += 1
    state.filteredOptionsCount += 1
    state.options.set(vm.value, vm)
    state.cachedOptions.set(vm.value, vm)
  }

  function deleteOption(key: string | number, vm: SelectOptionProxy) {
    if (state.options.get(key) !== vm) {
      return
    }

    state.optionsCount -= 1
    state.filteredOptionsCount -= 1
    state.options.delete(key)
  }

  // Handlers
  function handleOpenMenu() {
    nextTick(() => scrollToOption(state.selected))
  }

  function handleClearClick(event: Event) {
    clearSelected(event)
  }

  // TODO byClick => undefined
  function handleOptionSelect(option: SelectOptionProxy, byClick = false) {
    if (props.multiple && isArray(props.modelValue)) {
      const selectedList = [...(props.modelValue || [])]
      const optionIndex = getValueIndex(selectedList, option.value)

      if (optionIndex > -1) {
        selectedList.splice(optionIndex, 1)
      } else if (props.multipleLimit <= 0 || selectedList.length < props.multipleLimit) {
        selectedList.push(option.value)
      }

      emit(UPDATE_MODEL_EVENT, selectedList)
      emitChange(selectedList)

      if (option.created) {
        state.query = ''
        handleQueryChange('')
        state.inputLength = 20
      }

      if (props.filterable) {
        filterInputRef.value?.focus()
      }
    } else {
      emit(UPDATE_MODEL_EVENT, option.value)
      emitChange(option.value)
      state.visible = false
    }

    state.isSilentBlur = byClick
    setSoftFocus()

    if (state.visible) {
      return
    }

    nextTick(() => {
      scrollToOption(option)
    })
  }

  function handleComposition(event: CompositionEvent) {
    const text = (event.target as HTMLInputElement)!.value

    if (event.type === 'compositionend') {
      state.isOnComposition = false
      nextTick(() => handleQueryChange(text))
    } else {
      const lastCharacter = text.at(-1) || ''

      state.isOnComposition = !isKorean(lastCharacter)
    }
  }

  // Focus / Blur
  function handleFocus(event: FocusEvent) {
    if (!state.softFocus) {
      if (props.automaticDropdown || props.filterable) {
        if (props.filterable && !state.visible) {
          state.menuVisibleOnFocus = true
        }

        state.visible = true
      }

      emit('focus', event)
    } else {
      state.softFocus = false
    }
  }

  function blur() {
    state.visible = false
    inputRef.value?.blur()
    iOSInputRef.value?.blur?.()
  }

  function handleBlur(event: FocusEvent) {
    // https://github.com/ElemeFE/element/pull/10822
    nextTick(() => {
      if (state.isSilentBlur) {
        state.isSilentBlur = false
      } else {
        emit('blur', event)
      }
    })
    state.softFocus = false
  }

  async function handleQueryChange(val: string | number | boolean) {
    if (state.previousQuery === val || state.isOnComposition) {
      return
    }

    if (isNil(state.previousQuery) && (isFunction(props.filterMethod) || isFunction(props.remoteMethod))) {
      state.previousQuery = val

      return
    }

    state.previousQuery = val
    nextTick(() => {
      if (state.visible) {
        tooltipRef.value?.updatePopper?.()
      }
    })
    state.hoverIndex = -1

    if (props.multiple && props.filterable) {
      nextTick(() => {
        const length = filterInputRef.value!.value.length * 15 + 20

        state.inputLength = props.collapseTags ? Math.min(50, length) : length
        managePlaceholder()
        resetInputHeight()
      })
    }

    if (props.remote && isFunction(props.remoteMethod)) {
      state.hoverIndex = -1
      props.remoteMethod(val)
    } else if (isFunction(props.filterMethod)) {
      props.filterMethod(val)
      triggerRef(groupQueryChange)
    } else {
      state.filteredOptionsCount = state.optionsCount
      queryChange.value.query = val

      triggerRef(queryChange)
      triggerRef(groupQueryChange)
    }

    if (props.defaultFirstOption && (props.filterable || props.remote) && state.filteredOptionsCount) {
      await nextTick()
      checkDefaultFirstOption()
    }
  }

  function handleInputChange() {
    if (props.filterable && state.query !== state.selectedLabel) {
      state.query = state.selectedLabel
      handleQueryChange(state.query)
    }
  }

  const handleInputChangeDebounced = debounce(() => {
    handleInputChange()
  }, debounceRemoteTime.value)

  const handleQueryChangeDebounced = debounce((e) => {
    handleQueryChange(e.target.value)
  }, debounceRemoteTime.value)

  // Key
  function handleEnterSelect() {
    if (!state.visible) {
      toggleMenu()
    } else if (optionsProxyList.value[state.hoverIndex]) {
      handleOptionSelect(optionsProxyList.value[state.hoverIndex]!)
    }
  }

  function navigateOptions(direction: 'next' | 'prev') {
    if (!state.visible) {
      state.visible = true

      return
    }

    if (state.options.size === 0 || state.filteredOptionsCount === 0) {
      return
    }

    if (state.isOnComposition) {
      return
    }

    if (optionsAllDisabled.value) {
      return
    }

    if (direction === 'next') {
      state.hoverIndex += 1

      if (state.hoverIndex === state.options.size) {
        state.hoverIndex = 0
      }
    } else if (direction === 'prev') {
      state.hoverIndex -= 1

      if (state.hoverIndex < 0) {
        state.hoverIndex = state.options.size - 1
      }
    }

    const option = optionsProxyList.value[state.hoverIndex]!

    if (option.disabled === true || option.states.groupDisabled === true || !option.visible) {
      navigateOptions(direction)
    }

    nextTick(() => scrollToOption(hoverOption.value))
  }

  function handleKeydownEscape(event: Event) {
    if (!state.visible) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    state.visible = false
  }

  // Mouse
  function handleMouseEnter() {
    state.mouseEnter = true
  }

  function handleMouseLeave() {
    state.mouseEnter = false
  }

  // Resize
  function handleResize() {
    resetInputWidth()
    tooltipRef.value?.updatePopper?.()

    if (props.multiple) {
      resetInputHeight()
    }
  }

  // Utils
  function emitChange(val: SelectVModel) {
    if (!isEqual(props.modelValue, val)) {
      emit(CHANGE_EVENT, val)
    }
  }

  function getValueKey(item: { value: SelectVModelValue }) {
    return isObject(item.value) ? get(item.value, props.valueKey) : item.value
  }

  function resetInputWidth() {
    if (inputRef.value) {
      state.inputWidth = inputRef.value.rootRef!.offsetWidth
    }
  }

  function resetInputHeight() {
    nextTick(() => {
      if (!inputRef.value) {
        return
      }

      const input = inputRef.value.$el.querySelector('input') as HTMLInputElement

      originClientHeight ||= input.clientHeight > 0 ? input.clientHeight + 2 : 0
      const tagsWrapperEl = tagsWrapperRef.value
      const gotSize = getComponentSize(selectSize.value || form?.size)

      const sizeInMap = gotSize === originClientHeight || originClientHeight <= 0 ? gotSize : originClientHeight

      const isElHidden = input.offsetParent === null

      // it's an inner input so reduce it by 2px.
      !isElHidden &&
        (input.style.height = `${
          (isArray(state.selected) && state.selected.length === 0
            ? sizeInMap
            : Math.max(
                tagsWrapperEl ? tagsWrapperEl.clientHeight + (tagsWrapperEl.clientHeight > sizeInMap ? 6 : 0) : 0,
                sizeInMap,
              )) - 2
        }px`)

      state.tagInMultiLine = Number.parseFloat(input.style.height) >= sizeInMap

      if (isMenuVisible.value) {
        tooltipRef.value?.updatePopper?.()
      }
    })
  }

  function setSoftFocus() {
    state.softFocus = true
    const _input = filterInputRef.value || inputRef.value

    if (_input) {
      _input?.focus()
    }
  }

  function managePlaceholder() {
    if (state.currentPlaceholder === '') {
      return
    }

    state.currentPlaceholder = filterInputRef.value!.value ? '' : state.cachedPlaceHolder
  }

  function resetHoverIndex() {
    setTimeout(() => {
      const { valueKey, multiple } = props
      const stateSelected = state.selected

      if (!multiple && !isArray(stateSelected)) {
        state.hoverIndex = optionsProxyList.value.findIndex((item) => getValueKey(item) === getValueKey(stateSelected))
      } else if (isArray(state.selected) && state.selected.length > 0) {
        state.hoverIndex = Math.min.apply(
          undefined,
          // TODO
          state.selected.map((selected) =>
            optionsProxyList.value.findIndex((item) => get(item, valueKey) === get(selected, valueKey)),
          ),
        )
      } else {
        state.hoverIndex = -1
      }
    }, 300)
  }

  function getValueIndex(
    arr: Array<SelectVModelValue | SelectOptionProxy> = [],
    value: SelectVModelValue | SelectOptionProxy = undefined,
  ) {
    if (!isObject(value)) {
      return arr.indexOf(value)
    }

    const { valueKey } = props
    let index = -1

    arr.some((item, i) => {
      if (toRaw(get(item, valueKey)) === get(value, valueKey)) {
        index = i

        return true
      }

      return false
    })

    return index
  }

  // TODO
  function getSelectedItem(value: SelectVModelValue): SelectedItem {
    let option: SelectedItem | undefined

    for (let i = state.cachedOptions.size - 1; i >= 0; i--) {
      const cachedOption = cachedOptionsProxyList.value[i]!
      const isEqualValue = isObject(value)
        ? get(cachedOption.value, props.valueKey) === get(value, props.valueKey)
        : cachedOption.value === value

      if (isEqualValue) {
        option = {
          value,
          currentLabel: cachedOption.currentLabel,
          isDisabled: cachedOption.isDisabled,
          hitState: true, // TODO see
        }
        break
      }
    }

    if (option) {
      return option
    }

    const label = isObject(value) ? value.label : !isNil(value) ? value : ''
    const newOption: SelectedItem = {
      value,
      currentLabel: label,
      hitState: false, // TODO see
      isDisabled: false, // TODO see
    }

    if (props.multiple) {
      newOption.hitState = false
    }

    return newOption
  }

  function resetInputState(event: KeyboardEvent) {
    if (event.code !== EVENT_CODE.backspace) {
      toggleLastOptionHitState(false)
    }

    state.inputLength = filterInputRef.value!.value.length * 15 + 20
    resetInputHeight()
  }

  function toggleLastOptionHitState(hit?: boolean) {
    if (!isArray(state.selected)) {
      return
    }

    const option = state.selected.at(-1)

    if (!option) {
      return
    }

    if (hit === true || hit === false) {
      option.hitState = hit

      return hit
    }

    option.hitState = !option.hitState

    return option.hitState
  }

  /**
   * find and highlight first option as default selected
   * @remark
   * - if the first option in dropdown list is user-created,
   *   it would be at the end of the optionsArray
   *   so find it and set hover.
   *   (NOTE: there must be only one user-created option in dropdown list with query)
   * - if there's no user-created option in list, just find the first one as usual
   *   (NOTE: exclude options that are disabled or in disabled-group)
   */
  function checkDefaultFirstOption() {
    const optionsInDropdown = optionsProxyList.value.filter((n) => n.visible && !n.disabled && !n.states.groupDisabled)
    const userCreatedOption = optionsInDropdown.find((n) => n.created)
    const firstOriginOption = optionsInDropdown[0]

    state.hoverIndex = getValueIndex(optionsProxyList.value, userCreatedOption || firstOriginOption)
  }

  return {
    MENU_WRAPPER_CLASS_NAME,
    optionLabelListInMenu,
    optionsArray: optionsProxyList,
    selectSize,
    handleResize,
    handleInputChangeDebounced,
    handleQueryChangeDebounced,
    deletePrevTag,
    deleteTag,
    clearSelected,
    handleOptionSelect,
    scrollToOption,
    isReadonly,
    resetInputHeight,
    canShowClose,
    iconSuffix,
    iconReverse,
    showNewOption,
    collapseTagSize,
    setSelected,
    managePlaceholder,
    isDisabled,
    emptyText,
    toggleLastOptionHitState,
    resetInputState,
    handleComposition,
    addOption,
    deleteOption,
    handleOpenMenu,
    handleFocus,
    blur,
    handleBlur,
    handleClearClick,
    closeSelect,
    handleKeydownEscape,
    toggleMenu,
    handleEnterSelect,
    getValueKey,
    navigateOptions,
    isMenuVisible,
    queryChange,
    groupQueryChange,
    showTagList,
    collapseTagList,

    // DOM ref
    inputRef,
    filterInputRef,
    iOSInputRef,
    tooltipRef,
    tagsWrapperRef,
    selectRootRef,
    scrollbarRef,

    // Mouser Event
    handleMouseEnter,
    handleMouseLeave,
  }
}

export function useOptionsProxyList(props: NSelectProps, state: SelectState) {
  const optionLabelListInMenu = ref<Array<string | number>>([])
  const optionsProxyList = computed(() => {
    const list: SelectOptionProxy[] = [...state.options.values()]
    const newList: SelectOptionProxy[] = []

    optionLabelListInMenu.value.forEach((item) => {
      const index = list.findIndex((i) => i.currentLabel === item)

      if (index > -1) {
        newList.push(list[index]!)
      }
    })

    return newList.length > 0 ? newList : list
  })

  const cachedOptionsProxyList = computed(() => [...state.cachedOptions.values()])

  const hasExistingOption = computed(() =>
    optionsProxyList.value.filter((option) => !option.created).some((option) => option.currentLabel === state.query),
  )
  const showNewOption = computed(
    () => props.filterable && props.allowCreate && state.query !== '' && !hasExistingOption.value,
  )

  return {
    optionLabelListInMenu,
    optionsProxyList,
    cachedOptionsProxyList,
    showNewOption,
  }
}

export function getSelectEmptyText(props: NSelectProps, state: SelectState) {
  const { t } = useLocale()
  const loadingText = computed(() => props.loadingText || t('nado.select.loading'))
  const noMatchText = computed(() => props.noMatchText || t('nado.select.noMatch'))
  const noDataText = computed(() => props.noDataText || t('nado.select.noData'))
  const emptyText = computed(() => {
    if (props.loading) {
      return loadingText.value
    }

    if (props.filterable && state.query && state.options.size > 0 && state.filteredOptionsCount === 0) {
      return noMatchText.value
    }

    if (state.options.size === 0) {
      return noDataText.value
    }

    return undefined
  })

  return { emptyText }
}

export function getSelectSize() {
  const selectSize = useFormSize()
  const collapseTagSize = computed(() => (['small'].includes(selectSize.value) ? 'small' : 'default'))

  return {
    selectSize,
    collapseTagSize,
  }
}

export function getTagList(props: NSelectProps, state: SelectState) {
  const showTagList = computed(() => (isArray(state.selected) && state.selected.slice(0, props.maxCollapseTags)) || [])
  const collapseTagList = computed(() => (isArray(state.selected) && state.selected.slice(props.maxCollapseTags)) || [])

  return {
    showTagList,
    collapseTagList,
  }
}
