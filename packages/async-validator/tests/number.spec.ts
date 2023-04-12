import { useAsyncValidator } from '../src'

describe('number', () => {
  it('works', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'number',
          },
        })
        .validate(
          {
            v: '1',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('v is not a number')
  })

  it('works for no-required', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'number',
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
    expect(res).toBeFalsy()
  })

  it('works for no-required in case of empty string', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'number',
            required: false,
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
    expect(res).toBeFalsy()
  })

  it('works for required', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'number',
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

  it('transform does not change value', async () => {
    const value = {
      v: '1',
    }
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'number',
            transform: Number,
          },
        })
        .validate(value, (errors, data) => {
          res = {
            value,
            errors,
            data,
          }
        })
    } catch {}
    expect(res.data).toEqual({
      v: 1,
    })
    expect(res.value.v).toBe('1')
    expect(res.errors).toBeFalsy()
  })

  it('return transformed value in promise.then', async () => {
    const value = {
      v: '1',
    }
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'number',
            transform: Number,
          },
        })
        .validate(value, (errors) => {
          res = {
            value,
            errors,
          }
        })
        // eslint-disable-next-line promise/always-return
        .then((source) => {
          res = { ...res, source }
        })
    } catch {}

    expect(res.value.v).toBe('1')
    expect(res.errors).toBeFalsy()
    expect(res.source).toEqual({
      v: 1,
    })
  })
})
