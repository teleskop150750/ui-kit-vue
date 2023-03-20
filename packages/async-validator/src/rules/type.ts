import type { ExecuteRule, ValidateValue } from '../types'
import { format } from '../utils'
import { required } from './required'
import { getUrlRegex } from './url'
/* eslint max-len:0 */

const pattern = {
  // http://emailregex.com/
  email:
    // /^(?:(?:[^\s"(),.:;<>@[\\\]]+(?:\.[^\s"(),.:;<>@[\\\]]+)*)|(?:".+"))@(?:(?:\[(?:\d{1,3}\.){3}\d{1,3}])|(?:(?:[\dA-Z\\a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF-]+\.)+[A-Za-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
    // eslint-disable-next-line unicorn/no-unsafe-regex, no-useless-escape, prefer-named-capture-group
    /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\-]+\.)+[A-Za-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?(?:[\da-f]{6}|[\da-f]{3})$/i,
}

const custom = [
  'regexp',
  'email',
  'url',
  'hex',
  'number',
  'integer',
  'float',
  'object',
  'array',
  'date',
  'method',
] as const

type CustomType = (typeof custom)[number]

const types: Record<CustomType, (value: ValidateValue) => boolean> = {
  regexp(value: ValidateValue) {
    if (value instanceof RegExp) {
      return true
    }

    try {
      return !!new RegExp(value)
    } catch {
      return false
    }
  },
  email(value: ValidateValue) {
    return typeof value === 'string' && value.length <= 320 && !!pattern.email.test(value)
  },
  url(value: ValidateValue) {
    return typeof value === 'string' && value.length <= 2048 && !!getUrlRegex().test(value)
  },
  hex(value: ValidateValue) {
    return typeof value === 'string' && !!pattern.hex.test(value)
  },
  number(value: ValidateValue) {
    if (Number.isNaN(value)) {
      return false
    }

    return typeof value === 'number'
  },
  integer(value: ValidateValue) {
    return types.number(value) && Number.parseInt(value) === value
  },
  float(value: ValidateValue) {
    return types.number(value) && !types.integer(value)
  },
  object(value: ValidateValue) {
    return typeof value === 'object' && !types.array(value)
  },
  array(value: ValidateValue) {
    return Array.isArray(value)
  },
  date(value: ValidateValue) {
    return (
      typeof value.getTime === 'function' &&
      typeof value.getMonth === 'function' &&
      typeof value.getYear === 'function' &&
      !Number.isNaN(value.getTime())
    )
  },
  method(value: ValidateValue) {
    return typeof value === 'function'
  },
}

export const type: ExecuteRule = (rule, value, source, errors, options) => {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options)

    return
  }

  const ruleType = rule.type as (typeof custom)[number] | undefined

  if (ruleType !== undefined && custom.includes(ruleType)) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages?.types?.[ruleType] || '', rule.fullField, rule.type))
    }

    return
  }

  // straight typeof check
  if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages?.types?.[ruleType] || '', rule.fullField, rule.type))
  }
}
