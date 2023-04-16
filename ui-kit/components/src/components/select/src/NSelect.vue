<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { vClickOutside as ClickOutside } from '@nado/ui-kit-directives'
import { useFocus, useLocale, useNamespace } from '@nado/ui-kit-hooks'
import { isIOS, useResizeObserver } from '@vueuse/core'
import { computed, defineComponent, nextTick, onMounted, provide, reactive, toRefs, unref } from 'vue'

import { NInput } from '../../input'
import { NScrollbar } from '../../scrollbar'
import { NTag } from '../../tag'
import NTooltip from '../../tooltip/src/NTooltip.vue'
import NOption from './NOption.vue'
import { NOptions } from './NOptions'
import NSelectMenu from './NSelectDropdown.vue'
import { selectEmits, selectProps } from './select.model'
import { SELECT_INJECTION_KEY, type SelectContext } from './token'
import { useSelect, useSelectStates } from './useSelect'

const COMPONENT_NAME = 'NSelect'

export default defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    NInput,
    NSelectMenu,
    NOption,
    NOptions,
    NTag,
    NScrollbar,
    NTooltip,
  },
  directives: { ClickOutside },
  props: {
    ...selectProps,
  },
  emits: [...selectEmits],

  setup(props, ctx) {
    const nsSelect = useNamespace('select')
    const nsInput = useNamespace('input')
    const { t } = useLocale()
    const states = useSelectStates(props)
    const {
      optionList,
      optionsArray,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      setSelected,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconComponent,
      iconReverse,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      onOptionCreate,
      onOptionDestroy,
      handleMenuEnter,
      handleFocus,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      handleKeydownEscape,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,

      reference,
      input,
      iOSInput,
      tooltipRef,
      tags,
      selectWrapper,
      scrollbar,
      queryChange,
      groupQueryChange,
      handleMouseEnter,
      handleMouseLeave,
      showTagList,
      collapseTagList,
    } = useSelect(props, states, ctx)

    const { focus } = useFocus(reference)

    const {
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      cachedOptions,
      optionsCount,
      prefixWidth,
      tagInMultiLine,
    } = toRefs(states)

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
        onOptionCreate,
        onOptionDestroy,
        selectWrapper,
        selected,
        setSelected,
        queryChange,
        groupQueryChange,
      }) as unknown as SelectContext,
    )

    onMounted(() => {
      // eslint-disable-next-line no-multi-assign
      states.cachedPlaceHolder = currentPlaceholder.value = props.placeholder || (() => t('nado.select.placeholder'))

      if (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
        currentPlaceholder.value = ''
      }

      useResizeObserver(selectWrapper, handleResize)

      if (props.remote && props.multiple) {
        resetInputHeight()
      }

      nextTick(() => {
        const refEl = reference.value && reference.value.$el

        if (!refEl) {
          return
        }

        inputWidth.value = refEl.getBoundingClientRect().width

        if (ctx.slots.prefix) {
          const prefix = refEl.querySelector(`.${nsInput.e('prefix')}`)

          prefixWidth.value = Math.max(prefix.getBoundingClientRect().width + 5, 30)
        }
      })
      setSelected()
    })

    if (props.multiple && !Array.isArray(props.modelValue)) {
      ctx.emit(UPDATE_MODEL_EVENT, [])
    }

    if (!props.multiple && Array.isArray(props.modelValue)) {
      ctx.emit(UPDATE_MODEL_EVENT, '')
    }

    const popperPaneRef = computed(() => tooltipRef.value?.popperRef?.contentRef)

    const onOptionsRendered = (v) => {
      optionList.value = v
    }

    // TODO: Fix
    const fooStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }

    return {
      fooStyle,
      isIOS,
      onOptionsRendered,
      tagInMultiLine,
      prefixWidth,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconComponent,
      iconReverse,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      handleMenuEnter,
      handleFocus,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      handleKeydownEscape,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,
      focus,

      reference,
      input,
      iOSInput,
      tooltipRef,
      popperPaneRef,
      tags,
      selectWrapper,
      scrollbar,

      wrapperClasses,
      selectTagsStyle,
      nsSelect,
      tagTextStyle,
      handleMouseEnter,
      handleMouseLeave,
      showTagList,
      collapseTagList,
    }
  },
})
</script>

<template>
  <div
    ref="selectWrapper"
    v-click-outside:[popperPaneRef]="handleClose"
    :class="wrapperClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.stop="toggleMenu"
  >
    <NTooltip
      ref="tooltipRef"
      :visible="dropMenuVisible"
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
      @show="handleMenuEnter"
    >
      <template #default>
        <div class="select-trigger" @mouseenter="inputHovering = true" @mouseleave="inputHovering = false">
          <div
            v-if="multiple"
            ref="tags"
            :class="[nsSelect.e('tags'), nsSelect.is('disabled', selectDisabled)]"
            :style="selectTagsStyle"
          >
            <transition v-if="collapseTags && selected.length > 0" @after-leave="resetInputHeight">
              <span
                :class="[
                  nsSelect.s('tags-wrapper'),
                  nsSelect.sHas('tags-wrapper', 'prefix', prefixWidth && selected.length > 0),
                ]"
              >
                <NTag
                  v-for="item in showTagList"
                  :key="getValueKey(item)"
                  :closable="!selectDisabled && !item.isDisabled"
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
                    :disabled="dropMenuVisible"
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
                            :closable="!selectDisabled && !item.isDisabled"
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
                  nsSelect.b('tags-wrapper'),
                  nsSelect.sHas('tags-wrapper', 'prefix', prefixWidth && selected.length > 0),
                ]"
              >
                <NTag
                  v-for="item in selected"
                  :key="getValueKey(item)"
                  :closable="!selectDisabled && !item.isDisabled"
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
              ref="input"
              v-model="query"
              type="text"
              :class="[nsSelect.e('input'), nsSelect.is(selectSize), nsSelect.is('disabled', selectDisabled)]"
              :disabled="selectDisabled"
              :autocomplete="autocomplete"
              :style="{
                marginLeft: (prefixWidth && selected.length === 0) || tagInMultiLine ? `${prefixWidth}px` : '',
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
              @keydown.enter.stop.prevent="selectOption"
              @keydown.delete="deletePrevTag"
              @keydown.tab="visible = false"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition"
              @input="debouncedQueryChange"
            />
          </div>
          <!-- fix: https://github.com/element-plus/element-plus/issues/11415 -->
          <input
            v-if="isIOS && !multiple && filterable && readonly"
            ref="iOSInput"
            :class="[nsSelect.e('input'), nsSelect.is(selectSize), nsSelect.em('input', 'iOS')]"
            :disabled="selectDisabled"
            type="text"
          />
          <NInput
            :id="id"
            ref="reference"
            v-model="selectedLabel"
            type="text"
            :placeholder="typeof currentPlaceholder === 'function' ? currentPlaceholder() : currentPlaceholder"
            :name="name"
            :autocomplete="autocomplete"
            :size="selectSize"
            :disabled="selectDisabled"
            :readonly="readonly"
            :validate-event="false"
            :class="[nsSelect.is('focus', visible)]"
            :tabindex="multiple && filterable ? -1 : undefined"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="debouncedOnInputChange"
            @paste="debouncedOnInputChange"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @keydown.down.stop.prevent="navigateOptions('next')"
            @keydown.up.stop.prevent="navigateOptions('prev')"
            @keydown.enter.stop.prevent="selectOption"
            @keydown.esc="handleKeydownEscape"
            @keydown.tab="visible = false"
          >
            <template v-if="$slots.prefix" #prefix>
              <div :style="fooStyle">
                <slot name="prefix" />
              </div>
            </template>
            <template #suffix>
              <component
                :is="iconComponent"
                v-if="iconComponent && !showClose"
                class="n-icon"
                :class="[nsSelect.e('caret'), nsSelect.e('icon'), iconReverse]"
              />
              <component
                :is="clearIcon"
                v-if="showClose && clearIcon"
                class="n-icon"
                :class="[nsSelect.e('caret'), nsSelect.e('icon')]"
                @click="handleClearClick"
              />
            </template>
          </NInput>
        </div>
      </template>
      <template #content>
        <div>
          <NSelectMenu>
            <NScrollbar
              v-show="options.size > 0 && !loading"
              ref="scrollbar"
              tag="ul"
              :wrap-class="nsSelect.se('dropdown', 'wrap')"
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
          </NSelectMenu>
        </div>
      </template>
    </NTooltip>
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-select/n-select/index.css');
</style>
