import type { FocusableElement } from '@nado/tabbable'

import type { State } from '../../utils'

/**
 * Находит индекс контейнера, содержащего элемент.
 * @param {HTMLElement} element
 * @returns Индекс контейнера либо в `state.containers`, либо
 *`state.containerGroups` (порядок/длина этих списков одинаковы); -1
 * если элемент не найден.
 */
export function useFindContainerIndex(state: State) {
  const findContainerIndex = (element: FocusableElement): number =>
    // NOTE: выполните поиск по `containerGroups`, потому что возможно, что группа не содержит tabbable nodes,
    // но все еще содержит узлы с возможностью фокусировки (например, если все они имеют `tabindex =-1`),
    // и нам все еще нужно найти элемент там
    state.containerGroups.findIndex(
      ({ container, tabbableNodes }) =>
        container.contains(element) ||
        // вернитесь к явному поиску tabbable, который будет учитывать любые веб-компоненты,
        // если для ловушки использовалась опция `tabbableOptions.getShadowRoot`,
        // включающая поддержку теневого DOM в tabbable (`Node.contains()` не заглядывает внутрь веб-компонентов, даже если открыт)
        tabbableNodes.find((node) => node === element),
    )

  return { findContainerIndex }
}
