import { type ComponentInternalInstance, getCurrentInstance as _getCurrentInstance } from 'vue'

import { toKebabCase } from '../strings'

// import { toKebabCase } from '@/util/helpers'

export function getCurrentInstance(name: string, message?: string) {
  const vm = _getCurrentInstance()

  if (!vm) {
    throw new Error(`[Nado] ${name} ${message || 'must be called from inside a setup function'}`)
  }

  return vm
}

export function getCurrentInstanceName(name = 'composables') {
  const vm = getCurrentInstance(name).type

  return toKebabCase(vm?.name)
}

let _uid = 0
let _map = new WeakMap<ComponentInternalInstance, number>()

export function getUid() {
  const vm = getCurrentInstance('getUid')

  if (_map.has(vm)) {
    return _map.get(vm)!
  }

  // eslint-disable-next-line no-plusplus
  const uid = _uid++

  _map.set(vm, uid)

  return uid
}

getUid.reset = () => {
  _uid = 0
  _map = new WeakMap()
}
