import { describe, expect, it } from 'vitest'

import { useAsyncValidator } from '../src'

describe('date', () => {
  it('required works for undefined', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'date',
            required: true,
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
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('v is required')
  })

  it('required works for ""', async () => {
    let res: any
    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'date',
            required: true,
          },
        })
        .validate(
          {
            v: '',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('v is required')
  })

  it('required works for non-date type', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'date',
            required: true,
          },
        })
        .validate(
          {
            v: {},
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('v is not a date')
  })

  it('required works for "timestamp"', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'date',
            required: true,
          },
        })
        .validate(
          {
            v: 1_530_374_400_000,
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })
})
