import { isString } from '@nado/ui-kit-utils'
import { computed } from 'vue'

import type { NFormItemProps } from '../NFormItem.model'

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
