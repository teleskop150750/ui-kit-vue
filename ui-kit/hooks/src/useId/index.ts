import { debugWarn, isClient, type MaybeRef } from '@nado/ui-kit-utils'
import { computed, getCurrentInstance, inject, type InjectionKey, type Ref, unref } from 'vue'

import { namespace } from '../useNamespace'

export interface NIdInjectionContext {
  prefix: number
  current: number
}

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10_000),
  current: 0,
}

export const ID_INJECTION_KEY: InjectionKey<NIdInjectionContext> = Symbol('ID_INJECTION_KEY')

export function useIdInjection(): NIdInjectionContext {
  return getCurrentInstance() ? inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection
}

export function useId(deterministicId?: MaybeRef<string>): Ref<string> {
  const idInjection = useIdInjection()

  if (!isClient && idInjection === defaultIdInjection) {
    debugWarn(
      'IdInjection',
      `Похоже, вы используете серверный рендеринг, вы должны указать поставщика идентификаторов, чтобы обеспечить успех процесса гидратации.
Применение: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`,
    )
  }

  const idRef = computed(
    // eslint-disable-next-line no-plusplus
    () => unref(deterministicId) || `${namespace}-id-${idInjection.prefix}-${idInjection.current++}`,
  )

  return idRef
}
