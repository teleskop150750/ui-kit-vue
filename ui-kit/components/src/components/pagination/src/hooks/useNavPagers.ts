import { computed, ref, watchEffect } from 'vue'

import type { NPaginationNavProps } from '../pagination-nav.model'

export function useNavPagers(props: NPaginationNavProps) {
  const showPrevMore = ref(false)
  const showNextMore = ref(false)

  const pagers = computed(() => {
    const halfPagerCount = (props.pagerCount - 1) / 2
    let _showPrevMore = false
    let _showNextMore = false

    if (props.pageCount > props.pagerCount) {
      if (props.currentPage > props.pagerCount - halfPagerCount) {
        _showPrevMore = true
      }

      if (props.currentPage < props.pageCount - halfPagerCount) {
        _showNextMore = true
      }
    }

    const array: number[] = []

    if (_showPrevMore && !_showNextMore) {
      const startPage = props.pageCount - (props.pagerCount - 2)

      for (let i = startPage; i < props.pageCount; i++) {
        array.push(i)
      }

      return array
    }

    if (!_showPrevMore && _showNextMore) {
      for (let i = 2; i < props.pagerCount; i++) {
        array.push(i)
      }

      return array
    }

    if (_showPrevMore && _showNextMore) {
      const offset = Math.floor(props.pagerCount / 2) - 1

      for (let i = props.currentPage - offset; i <= props.currentPage + offset; i++) {
        array.push(i)
      }

      return array
    }

    for (let i = 2; i < props.pageCount; i++) {
      array.push(i)
    }

    return array
  })

  watchEffect(() => {
    const halfPagerCount = (props.pagerCount - 1) / 2

    showPrevMore.value = false
    showNextMore.value = false

    if (props.pageCount! > props.pagerCount) {
      if (props.currentPage > props.pagerCount - halfPagerCount) {
        showPrevMore.value = true
      }

      if (props.currentPage < props.pageCount! - halfPagerCount) {
        showNextMore.value = true
      }
    }
  })

  return {
    showPrevMore,
    showNextMore,
    pagers,
  }
}
