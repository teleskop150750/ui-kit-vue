import type { FocusableElement } from '@nado/tabbable'

import type { Config, Nillable } from '../../types'

interface Params {
  optionName: keyof Pick<Config, 'initialFocus' | 'fallbackFocus' | 'setReturnFocus'>
  params: FocusableElement
}

/**
 * Возвращает узел для заданного параметра, который,
 * как ожидается, будет параметром, который может быть либо узлом DOM, строкой,
 * являющейся селектором для получения узла,
 * `false` (если узел явно не задан), либо функцией,
 * которая возвращает любое из этих значений.
 * @returns Возвращается
 * `undefined`, если параметр не указан;
 * `false`, если параметр разрешен на `false` (узел явно не указан);
 * в противном случае разрешенный DOM node.
 *
 * @throws {Error} If the option is set, not `false`, and is not, or does not resolve to a node.
 */
// TODO: ...params
export function useGetNodeForOption(config: Config) {
  const getNodeForOption = (
    optionName: Params['optionName'],
    params?: Params['params'],
  ): Nillable<false | FocusableElement> => {
    let optionValue = config[optionName]

    if (typeof optionValue === 'function') {
      optionValue = optionValue(params as FocusableElement)
    }

    // TODO: Кто вернут true?
    if ((optionValue as boolean) === true) {
      optionValue = undefined // use default value
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue
      }

      // else, empty string (invalid), null (invalid), 0 (invalid)
      throw new Error(`\`${optionName}\` был указан, но не был узлом, или не вернул узел`)
    }

    if (typeof optionValue === 'string') {
      const node = config.document.querySelector<FocusableElement>(optionValue) || undefined

      if (!node) {
        throw new Error(`\`${optionName}\` поскольку селектор ссылается на неизвестный узел`)
      }

      return node
    }

    return optionValue as any
  }

  return { getNodeForOption }
}
