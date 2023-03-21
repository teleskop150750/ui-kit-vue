/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'

import { useAsyncValidator } from '../src'

describe('array', () => {
  it('works for type', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'array',
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
    expect(res[0].message).toBe('v is not an array')
  })

  it('works for type and required', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'array',
          },
        })
        .validate(
          {
            v: '',
          },
          (errors, fields) => {
            res = { errors, fields }
          },
        )
    } catch {}
    expect(res.errors.length).toBe(1)
    expect(res.fields).toMatchInlineSnapshot(`
      Object {
        "v": Array [
          Object {
            "field": "v",
            "fieldValue": "",
            "message": "v is not an array",
          },
        ],
      }
    `)
    expect(res.errors[0].message).toBe('v is not an array')
  })

  it('works for none require', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'array',
          },
        })
        .validate(
          {
            v: [],
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for empty array', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'array',
          },
        })
        .validate(
          {
            v: [],
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('v is required')
  })

  it('works for undefined array', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'array',
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

  it('works for undefined array and required', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'array',
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

  it('works for undefined array and defaultField', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'array',
            defaultField: { type: 'string' },
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

  it('works for undefined array', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'array',
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

  it('works for none empty', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'array',
            message: 'haha',
          },
        })
        .validate(
          {
            v: [1],
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for empty array with min', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            min: 1,
            max: 3,
            type: 'array',
          },
        })
        .validate(
          {
            v: [],
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('v must be between 1 and 3 in length')
  })

  it('works for empty array with max', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            min: 1,
            max: 3,
            type: 'array',
          },
        })
        .validate(
          {
            v: [1, 2, 3, 4],
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('v must be between 1 and 3 in length')
  })
})
