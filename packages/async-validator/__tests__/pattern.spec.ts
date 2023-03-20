import { describe, expect, it } from 'vitest'

import { useAsyncValidator } from '../src'

describe('pattern', () => {
  it('works for non-required empty string', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            pattern: /^\d+$/,
            message: 'haha',
          },
        })
        .validate(
          {
            // useful for web, input's value defaults to ''
            v: '',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('work for non-required empty string with string regexp', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            pattern: '^\\d+$',
            message: 'haha',
          },
        })
        .validate(
          {
            // useful for web, input's value defaults to ''
            v: 's',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('haha')
  })

  it('works for required empty string', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            pattern: /^\d+$/,
            message: 'haha',
            required: true,
          },
        })
        .validate(
          {
            // useful for web, input's value defaults to ''
            v: '',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('haha')
  })

  it('works for non-required null', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            pattern: /^\d+$/,
            message: 'haha',
          },
        })
        .validate(
          {
            v: undefined,
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for non-required undefined', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            pattern: /^\d+$/,
            message: 'haha',
          },
        })
        .validate(
          {
            v: undefined,
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            pattern: /^\d+$/,
            message: 'haha',
          },
        })
        .validate(
          {
            v: ' ',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('haha')
  })

  it('works for RegExp with global flag', async () => {
    let res
    let res2

    const validator = useAsyncValidator()

    try {
      const schema = validator.useSchema({
        v: {
          pattern: /global/g,
          message: 'haha',
        },
      })

      await schema.validate(
        {
          v: 'globalflag',
        },
        (errors) => {
          res = errors
        },
      )

      await schema.validate(
        {
          v: 'globalflag',
        },
        (errors) => {
          res2 = errors
        },
      )
    } catch {}
    expect(res).toBe(undefined)
    expect(res2).toBe(undefined)
  })
})
