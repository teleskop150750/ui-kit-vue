import type { ExecuteRule } from '../types'
import { format } from '../utils'

export const range: ExecuteRule = (rule, value, _source, errors, options) => {
  const len = typeof rule.len === 'number'
  const min = typeof rule.min === 'number'
  const max = typeof rule.max === 'number'
  // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）
  const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
  let val = value
  let key: 'string' | 'number' | 'array' | undefined = undefined
  const isNumber = typeof value === 'number'
  const isString = typeof value === 'string'
  const isArray = Array.isArray(value)

  if (isNumber) {
    key = 'number'
  } else if (isString) {
    key = 'string'
  } else if (isArray) {
    key = 'array'
  }

  // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type
  if (!key) {
    return
  }

  if (isArray) {
    val = value.length
  }

  if (isString) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".length !== 3
    val = value.replaceAll(spRegexp, '_').length
  }

  const messages = options.messages?.[key]

  if (len) {
    if (val !== rule.len) {
      errors.push(format(messages?.len || '', rule.fullField, rule.len))
    }
  } else if (rule.min !== undefined && min && !max && val < rule.min) {
    errors.push(format(messages?.min || '', rule.fullField, rule.min))
  } else if (rule.max !== undefined && max && !min && val > rule.max) {
    errors.push(format(messages?.max || '', rule.fullField, rule.max))
  } else if (rule.min !== undefined && rule.max !== undefined && min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(messages?.range || '', rule.fullField, rule.min, rule.max))
  }
}
