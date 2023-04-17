import { useAsyncValidator } from '../src'

describe('string', () => {
  it('works for none require', async () => {
    const data = {
      v: '',
    }
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'string',
          },
        })
        .validate(data, (errors, d) => {
          res = {
            errors,
            d,
          }
        })
    } catch {}
    expect(res.errors).toBe(undefined)
    expect(res.d).toEqual(data)
  })

  it('works for empty string', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'string',
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

  it('works for undefined string', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'string',
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

  it('works for null string', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'string',
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

  it('works for message', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'string',
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
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('haha')
  })

  it('works for none empty', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'string',
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
    expect(res).toBe(undefined)
  })

  it('works for whitespace empty', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            type: 'string',
            whitespace: true,
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
})
