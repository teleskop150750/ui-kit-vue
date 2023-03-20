import { describe, expect, it } from 'vitest'

import { useAsyncValidator } from '../src'

describe('unicode', () => {
  it('works for unicode U+0000 to U+FFFF ', async () => {
    let res
    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'string',
            len: 4,
          },
        })
        .validate(
          {
            v: '吉吉吉吉',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for unicode gt U+FFFF ', async () => {
    let res
    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'string',
            len: 4, // 原来length属性应该为8，更正之后应该为4
          },
        })
        .validate(
          {
            v: '𠮷𠮷𠮷𠮷',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('Rich Text Format', async () => {
    let res
    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'string',
            len: 2,
          },
        })
        .validate(
          {
            v: '💩💩',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })
})
