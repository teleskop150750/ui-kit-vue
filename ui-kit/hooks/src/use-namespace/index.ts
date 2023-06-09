export const namespace = 'n'
const statePrefix = 'is-'
const hasPrefix = 'has-'

const _bem = (_namespace: string, block: string, blockSuffix: string, element: string, modifier: string) => {
  let cls = `${_namespace}-${block}`

  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }

  if (element) {
    cls += `__${element}`
  }

  if (modifier) {
    cls += `--${modifier}`
  }

  return cls
}

export function useNamespace(block: string) {
  function b(blockSuffix = '') {
    return _bem(namespace, block, blockSuffix, '', '')
  }

  function s(blockSuffix = '', state = true) {
    return state ? _bem(namespace, block, blockSuffix, '', '') : ''
  }

  function e(element: string, state = true) {
    return element && state ? _bem(namespace, block, '', element, '') : ''
  }

  function m(modifier: string, state = true) {
    return modifier && state ? _bem(namespace, block, '', '', modifier) : ''
  }

  function se(blockSuffix: string, element: string, state = true) {
    return blockSuffix && element && state ? _bem(namespace, block, blockSuffix, element, '') : ''
  }

  function sm(blockSuffix: string, modifier: string, state = true) {
    return blockSuffix && modifier && state ? _bem(namespace, block, blockSuffix, '', modifier) : ''
  }

  function em(element: string, modifier: string, state = true) {
    return element && modifier && state ? _bem(namespace, block, '', element, modifier) : ''
  }

  function sem(blockSuffix: string, element: string, modifier: string, state = true) {
    return blockSuffix && element && modifier && state ? _bem(namespace, block, blockSuffix, element, modifier) : ''
  }

  // is
  function is(name: string, state = true) {
    return name && state ? _bem(namespace, block, '', '', `${statePrefix}${name}`) : undefined
  }

  function sIs(blockSuffix: string, name: string, state = true) {
    return blockSuffix && name && state ? _bem(namespace, block, blockSuffix, '', `${statePrefix}${name}`) : undefined
  }

  function eIs(element: string, name: string, state = true) {
    return element && name && state ? _bem(namespace, block, '', element, `${statePrefix}${name}`) : undefined
  }

  function seIs(blockSuffix: string, element: string, name: string, state = true) {
    return blockSuffix && element && name && state
      ? _bem(namespace, block, blockSuffix, element, `${statePrefix}${name}`)
      : undefined
  }

  // has
  function has(name: string, state = true) {
    return name && state ? _bem(namespace, block, '', '', `${hasPrefix}${name}`) : undefined
  }

  function sHas(blockSuffix: string, name: string, state = true) {
    return blockSuffix && name && state ? _bem(namespace, block, blockSuffix, '', `${hasPrefix}${name}`) : undefined
  }

  function eHas(element: string, name: string, state = true) {
    return element && name && state ? _bem(namespace, block, '', element, `${hasPrefix}${name}`) : undefined
  }

  function seHas(blockSuffix: string, element: string, name: string, state = true) {
    return blockSuffix && element && name && state
      ? _bem(namespace, block, blockSuffix, element, `${hasPrefix}${name}`)
      : undefined
  }

  // Type
  function type(name: string, val?: string, state = true) {
    return name && val && state ? _bem(namespace, block, '', '', `${name}-${val}`) : undefined
  }

  function sType(blockSuffix: string, name: string, val: string, state = true) {
    return blockSuffix && name && val && state ? _bem(namespace, block, blockSuffix, '', `${name}-${val}`) : undefined
  }

  function eType(element: string, name: string, val: string, state = true) {
    return element && name && val && state ? _bem(namespace, block, '', element, `${name}-${val}`) : undefined
  }

  function seType(blockSuffix: string, element: string, name: string, val: string, state = true) {
    return blockSuffix && element && name && val && state
      ? _bem(namespace, block, blockSuffix, element, `${name}-${val}`)
      : undefined
  }

  // for css var
  // --el-xxx: value;
  function cssVar(object: Record<string, string>) {
    const styles: Record<string, string> = {}

    for (const key in object) {
      if (Object.hasOwn(object, key)) {
        const val = object[key]

        if (val) {
          styles[`--${namespace}-${key}`] = val
        }
      }
    }

    return styles
  }

  // with block
  function cssVarBlock(object: Record<string, string>) {
    const styles: Record<string, string> = {}

    for (const key in object) {
      if (Object.hasOwn(object, key)) {
        const val = object[key]

        if (val) {
          styles[`--${namespace}-${block}-${key}`] = val
        }
      }
    }

    return styles
  }

  function cssVarName(name: string) {
    return `--${namespace}-${name}`
  }

  function cssVarBlockName(name: string) {
    return `--${namespace}-${block}-${name}`
  }

  return {
    namespace,
    b,
    s,
    e,
    m,
    se,
    sm,
    em,
    sem,
    // is
    is,
    sIs,
    eIs,
    seIs,
    // has
    has,
    sHas,
    eHas,
    seHas,
    // type
    type,
    sType,
    eType,
    seType,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>
