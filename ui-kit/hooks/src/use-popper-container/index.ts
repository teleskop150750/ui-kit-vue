import { isClient } from '@nado/ui-kit-utils'
import { computed, onBeforeMount } from 'vue'

import { useIdInjection } from '../use-id'
import { namespace } from '../use-namespace'

let cachedContainer: HTMLElement

export function usePopperContainerId() {
  const idInjection = useIdInjection()

  const id = computed(() => `${namespace}-popper-container-${idInjection.prefix}`)
  const selector = computed(() => `#${id.value}`)

  return {
    id,
    selector,
  }
}

function createContainer(id: string) {
  const container = document.createElement('div')

  container.id = id
  document.body.append(container)

  return container
}

export function usePopperContainer() {
  const { id, selector } = usePopperContainerId()

  onBeforeMount(() => {
    if (!isClient) {
      return
    }

    // This is for bypassing the error that when under testing env, we often encounter
    // document.body.innerHTML = '' situation
    // for this we need to disable the caching since it's not really needed
    if (process.env.NODE_ENV === 'test' || (!cachedContainer && !document.body.querySelector(selector.value))) {
      cachedContainer = createContainer(id.value)
    }
  })

  return {
    id,
    selector,
  }
}
