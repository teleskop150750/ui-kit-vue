import { computed, ref } from 'vue'

import type { NPaginationNavMorePrevProps } from '../pagination-nav-more-prev.model'

export function useMoreButton(props: Pick<NPaginationNavMorePrevProps, 'disabled' | 'pagerCount'>) {
  const quickHover = ref(false)
  const quickFocus = ref(false)

  const pagerCountOffset = computed(() => props.pagerCount - 2)

  function onMouseEnter() {
    if (props.disabled) {
      return
    }

    quickHover.value = true
  }

  return {
    quickHover,
    quickFocus,
    pagerCountOffset,
    onMouseEnter,
  }
}
