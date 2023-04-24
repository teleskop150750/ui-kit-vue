<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { vClickOutside } from '@nado/ui-kit-directives'
import { useLocale, useNamespace } from '@nado/ui-kit-hooks'
import { isIOS, useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, provide, reactive, toRefs, unref, useSlots } from 'vue'

import { NInput } from '../../input'
import { NScrollbar } from '../../scrollbar'
import { NTag } from '../../tag'
import NTooltip from '../../tooltip/src/NTooltip.vue'
import { type SelectedItem, useSelect, useSelectState } from './hooks'
import NOption from './NOption.vue'
import { NOptions } from './NOptions'
import NSelectDropdown from './NSelectDropdown.vue'
import { nSelectEmits, selectProps } from './select.model'
import { SELECT_INJECTION_KEY, type SelectContext } from './token'

const props = defineProps(selectProps)
const emit = defineEmits(nSelectEmits)
const slots = useSlots()

const nsSelect = useNamespace('select')
const nsInput = useNamespace('input')
const { t } = useLocale()
const state = useSelectState(props)
const {
  MENU_WRAPPER_CLASS_NAME,
  optionLabelListInMenu,
  optionsArray,
  selectSize,
  isReadonly,
  handleResize,
  collapseTagSize,
  handleInputChangeDebounced,
  handleQueryChangeDebounced,
  deletePrevTag,
  deleteTag,
  handleOptionSelect,
  setSelected,
  resetInputHeight,
  managePlaceholder,
  canShowClose,
  isDisabled,
  iconSuffix,
  iconReverse,
  showNewOption,
  emptyText,
  resetInputState,
  handleComposition,
  addOption,
  deleteOption,
  handleOpenMenu,
  handleFocus,
  handleBlur,
  handleClearClick,
  closeSelect,
  handleKeydownEscape,
  toggleMenu,
  handleEnterSelect,
  getValueKey,
  navigateOptions,
  isMenuVisible,

  inputRef,
  filterInputRef,
  iOSInputRef,
  tooltipRef,
  tagsWrapperRef,
  selectRootRef,
  scrollbarRef,
  queryChange,
  groupQueryChange,
  handleMouseEnter,
  handleMouseLeave,
  showTagList,
  collapseTagList,
} = useSelect(props, state, emit)

const {
  inputWidth,
  selected,
  inputLength,
  filteredOptionsCount,
  visible,
  selectedLabel,
  hoverIndex,
  query,
  isInputHover,
  currentPlaceholder,
  options,
  cachedOptions,
  optionsCount,
  prefixWidth,
  tagInMultiLine,
} = toRefs(state)

const wrapperClasses = computed(() => {
  const classList = [nsSelect.b()]
  const _selectSize = unref(selectSize)

  if (_selectSize) {
    classList.push(nsSelect.m(_selectSize))
  }

  if (props.disabled) {
    classList.push(nsSelect.m('disabled'))
  }

  return classList
})

const selectTagsStyle = computed(() => ({
  maxWidth: `${unref(inputWidth) - 32}px`,
  width: '100%',
}))

const tagTextStyle = computed(() => {
  const maxWidth = unref(inputWidth) > 123 ? unref(inputWidth) - 123 : unref(inputWidth) - 75

  return { maxWidth: `${maxWidth}px` }
})

provide(
  SELECT_INJECTION_KEY,
  reactive({
    props,
    options,
    optionsArray,
    cachedOptions,
    optionsCount,
    filteredOptionsCount,
    hoverIndex,
    handleOptionSelect,
    addOption,
    deleteOption,
    selectRootRef,
    selected,
    setSelected,
    queryChange,
    groupQueryChange,
  }) as unknown as SelectContext,
)

onMounted(() => {
  // eslint-disable-next-line no-multi-assign
  state.cachedPlaceHolder = currentPlaceholder.value = props.placeholder || (() => t('nado.select.placeholder'))

  if (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
    currentPlaceholder.value = ''
  }

  useResizeObserver(selectRootRef, handleResize)

  if (props.remote && props.multiple) {
    resetInputHeight()
  }

  nextTick(() => {
    const refEl = inputRef.value && inputRef.value.$el

    if (!refEl) {
      return
    }

    inputWidth.value = refEl.getBoundingClientRect().width

    if (slots.prefix) {
      const prefix = refEl.querySelector(`.${nsInput.e('prefix')}`)

      prefixWidth.value = Math.max(prefix.getBoundingClientRect().width + 5, 30)
    }
  })
  setSelected()
})

if (props.multiple && !Array.isArray(props.modelValue)) {
  emit(UPDATE_MODEL_EVENT, [])
}

if (!props.multiple && Array.isArray(props.modelValue)) {
  emit(UPDATE_MODEL_EVENT, '')
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
const popperPaneRef = computed(() => tooltipRef.value?.popperRef?.contentRef)

function onOptionsRendered(payload: Array<string | number>) {
  optionLabelListInMenu.value = payload
}

const prefixStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}
</script>

<script lang="ts">
export default {
  name: 'NSelect',
}
</script>

<template>
  <div
    ref="selectRootRef"
    v-click-outside:[popperPaneRef]="closeSelect"
    :class="wrapperClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.stop="toggleMenu"
  >
    <NTooltip
      ref="tooltipRef"
      :visible="isMenuVisible"
      :placement="placement"
      :teleported="teleported"
      :popper-class="[nsSelect.e('popper'), popperClass]"
      :popper-options="popperOptions"
      :fallback-placements="['bottom-start', 'top-start', 'right', 'left']"
      :effect="effect"
      pure
      trigger="click"
      :stop-popper-mouse-event="false"
      :gpu-acceleration="false"
      :persistent="persistent"
      @show="handleOpenMenu"
    >
      <template #default>
        <div class="select-trigger" @mouseenter="isInputHover = true" @mouseleave="isInputHover = false">
          <div
            v-if="multiple"
            ref="tagsWrapperRef"
            :class="[nsSelect.e('multiple-input-wrapper')]"
            :style="selectTagsStyle"
          >
            <transition
              v-if="collapseTags && Array.isArray(selected) && selected.length > 0"
              @after-leave="resetInputHeight"
            >
              <span
                :class="[
                  nsSelect.e('tags'),
                  nsSelect.eHas(
                    'tags',
                    'prefix',
                    Boolean(prefixWidth && Array.isArray(selected) && selected.length > 0),
                  ),
                ]"
              >
                <NTag
                  v-for="item in showTagList"
                  :key="getValueKey(item)"
                  :closable="!isDisabled && !item.isDisabled"
                  :size="collapseTagSize"
                  :mod="tagMod"
                  @close="deleteTag($event, item)"
                >
                  <span :class="nsSelect.e('tags-text')" :style="tagTextStyle">
                    {{ item.currentLabel }}
                  </span>
                </NTag>
                <NTag
                  v-if="selected.length > maxCollapseTags"
                  :closable="false"
                  :size="collapseTagSize"
                  :type="tagMod"
                  disable-transitions
                >
                  <NTooltip
                    v-if="collapseTagsTooltip"
                    :disabled="isMenuVisible"
                    :fallback-placements="['bottom', 'top', 'right', 'left']"
                    :effect="effect"
                    placement="bottom"
                    :teleported="teleported"
                  >
                    <template #default>
                      <span :class="nsSelect.e('tags-text')">+ {{ selected.length - maxCollapseTags }}</span>
                    </template>
                    <template #content>
                      <div :class="nsSelect.e('collapse-tags')">
                        <div
                          v-for="item in collapseTagList"
                          :key="getValueKey(item)"
                          :class="nsSelect.e('collapse-tag')"
                        >
                          <NTag
                            class="in-tooltip"
                            :closable="!isDisabled && !item.isDisabled"
                            :size="collapseTagSize"
                            :hit="item.hitState"
                            :type="tagMod"
                            disable-transitions
                            :style="{ margin: '2px' }"
                            @close="deleteTag($event, item)"
                          >
                            <span
                              :class="nsSelect.e('tags-text')"
                              :style="{
                                maxWidth: `${inputWidth - 75}px`,
                              }"
                            >
                              {{ item.currentLabel }}
                            </span>
                          </NTag>
                        </div>
                      </div>
                    </template>
                  </NTooltip>
                  <span v-else :class="nsSelect.e('tags-text')">+ {{ selected.length - maxCollapseTags }}</span>
                </NTag>
              </span>
            </transition>
            <transition v-if="!collapseTags" @after-leave="resetInputHeight">
              <span
                :class="[
                  nsSelect.e('tags'),
                  nsSelect.eHas(
                    'tags',
                    'prefix',
                    Boolean(prefixWidth && Array.isArray(selected) && selected.length > 0),
                  ),
                ]"
              >
                <NTag
                  v-for="item in selected as SelectedItem[]"
                  :key="getValueKey(item)"
                  :closable="!isDisabled && !item.isDisabled"
                  :size="collapseTagSize"
                  :hit="item.hitState"
                  :type="tagMod"
                  disable-transitions
                  @close="deleteTag($event, item)"
                >
                  <span :class="nsSelect.e('tags-text')" :style="{ maxWidth: `${inputWidth - 75}px` }">{{
                    item.currentLabel
                  }}</span>
                </NTag>
              </span>
            </transition>
            <input
              v-if="filterable"
              ref="filterInputRef"
              v-model="query"
              type="text"
              :class="[nsSelect.e('input'), nsSelect.is(selectSize), nsSelect.is('disabled', isDisabled)]"
              :disabled="isDisabled"
              :autocomplete="autocomplete"
              :style="{
                marginLeft:
                  (prefixWidth && Array.isArray(selected) && selected.length === 0) || tagInMultiLine
                    ? `${prefixWidth}px`
                    : '',
                flexGrow: 1,
                width: `${inputLength / (inputWidth - 32)}%`,
                maxWidth: `${inputWidth - 42}px`,
              }"
              @focus="handleFocus"
              @blur="handleBlur"
              @keyup="managePlaceholder"
              @keydown="resetInputState"
              @keydown.down.prevent="navigateOptions('next')"
              @keydown.up.prevent="navigateOptions('prev')"
              @keydown.esc="handleKeydownEscape"
              @keydown.enter.stop.prevent="handleEnterSelect"
              @keydown.delete="deletePrevTag"
              @keydown.tab="visible = false"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition"
              @input="handleQueryChangeDebounced"
            />
          </div>
          <!-- fix: https://github.com/element-plus/element-plus/issues/11415 -->
          <input
            v-if="isIOS && !multiple && filterable && isReadonly"
            ref="iOSInputRef"
            :class="[nsSelect.e('input'), nsSelect.is(selectSize), nsSelect.em('input', 'iOS')]"
            :disabled="isDisabled"
            type="text"
          />
          <NInput
            :id="id"
            ref="inputRef"
            v-model="selectedLabel"
            type="text"
            :placeholder="typeof currentPlaceholder === 'function' ? currentPlaceholder() : currentPlaceholder"
            :name="name"
            :autocomplete="autocomplete"
            :size="selectSize"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :validate-event="false"
            :class="[nsSelect.is('focus', visible)]"
            :tabindex="multiple && filterable ? -1 : undefined"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInputChangeDebounced"
            @paste="handleInputChangeDebounced"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @keydown.down.stop.prevent="navigateOptions('next')"
            @keydown.up.stop.prevent="navigateOptions('prev')"
            @keydown.enter.stop.prevent="handleEnterSelect"
            @keydown.esc="handleKeydownEscape"
            @keydown.tab="visible = false"
          >
            <template v-if="$slots.prefix" #prefix>
              <div :style="prefixStyles">
                <slot name="prefix" />
              </div>
            </template>
            <template #suffix>
              <component
                :is="iconSuffix"
                v-if="iconSuffix && !canShowClose"
                class="n-icon"
                :class="[nsSelect.e('caret'), nsSelect.e('icon'), iconReverse]"
              />
              <component
                :is="clearIcon"
                v-if="canShowClose && clearIcon"
                class="n-icon"
                :class="[nsSelect.e('caret'), nsSelect.e('icon')]"
                @click="handleClearClick"
              />
            </template>
          </NInput>
        </div>
      </template>
      <template #content>
        <NSelectDropdown>
          <NScrollbar
            v-show="options.size > 0 && !loading"
            ref="scrollbarRef"
            tag="ul"
            :wrap-class="MENU_WRAPPER_CLASS_NAME"
            :view-class="nsSelect.se('dropdown', 'list')"
            :class="[nsSelect.is('empty', !allowCreate && Boolean(query) && filteredOptionsCount === 0)]"
          >
            <NOption v-if="showNewOption" :value="query" :created="true" />
            <NOptions @update-options="onOptionsRendered">
              <slot />
            </NOptions>
          </NScrollbar>
          <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.size === 0))">
            <slot v-if="$slots.empty" name="empty" />
            <p v-else :class="nsSelect.se('dropdown', 'empty')">
              {{ emptyText }}
            </p>
          </template>
        </NSelectDropdown>
      </template>
    </NTooltip>
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-select/n-select/index.css');
</style>
