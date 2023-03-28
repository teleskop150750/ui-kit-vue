/* eslint-disable @typescript-eslint/no-explicit-any */
import { memoize } from 'lodash-es'
import memoOne from 'memoize-one'
import { computed, getCurrentInstance, type StyleValue } from 'vue'

import type { VirtualizedProps } from '../virtual-list.model'

type CacheFn = (_: any, __: any, ___: any) => Record<string, StyleValue>

export const useCache = () => {
  const vm = getCurrentInstance()!

  const props = vm.proxy!.$props as VirtualizedProps

  return computed<CacheFn>(() => {
    const _getItemStyleCache = (_: any, __: any, ___: any) => ({})

    return props.perfMode ? memoize(_getItemStyleCache) : memoOne(_getItemStyleCache)
  })
}
