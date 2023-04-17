import { useAsyncValidator } from '../src'

describe('object', () => {
  it('works for the required object with fields in case of empty string', async () => {
    let res: any
    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'object',
            required: true,
            fields: {},
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
    expect(res[0].message).toBe('v is not an object')
  })
})
