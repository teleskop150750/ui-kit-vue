import type { RuleValuePackage, RuleValuePackageMap } from '../../../types'

export function rulesMapToList(rulesMap: RuleValuePackageMap) {
  const result: RuleValuePackage[] = []

  Object.values(rulesMap).forEach((val) => {
    result.push(...(val || []))
  })

  return result
}
