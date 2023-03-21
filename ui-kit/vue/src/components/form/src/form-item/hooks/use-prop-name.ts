import { isString } from 'lodash-es'
import { computed } from 'vue'

import type { NFormItemProps } from '../form-item.model'

export function usePropName(props: NFormItemProps) {
  const propName = computed(() => {
    if (!props.prop) {
      return ''
    }

    return isString(props.prop) ? props.prop : props.prop.join('.')
  })

  return {
    propName,
  }
}
