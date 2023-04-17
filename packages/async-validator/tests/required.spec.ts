import { useAsyncValidator } from '../src'

const required = true

describe('required', () => {
  it('works for array required=true', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: [
            {
              required,
              message: 'no',
            },
          ],
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
    expect(res[0].message).toBe('no')
  })

  it('works for array required=true & custom message', async () => {
    // allow custom message
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: [
            {
              required,
              message: 'no',
            },
          ],
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
    expect(res).toBeFalsy()
  })

  it('works for array required=false', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: false,
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
    expect(res).toBeFalsy()
  })

  it('works for string required=true', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required,
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

  it('works for string required=false', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
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

  it('works for number required=true', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required,
          },
        })
        .validate(
          {
            v: 1,
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBeFalsy()
  })

  it('works for number required=false', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: false,
          },
        })
        .validate(
          {
            v: 1,
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBeFalsy()
  })

  it('works for null required=true', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required,
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

  it('works for null required=false', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: false,
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

  it('works for undefined required=true', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required,
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

  it('works for undefined required=false', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: false,
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

  it('should support empty string message', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required,
            message: '',
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
    expect(res[0].message).toBe('')
  })
})
