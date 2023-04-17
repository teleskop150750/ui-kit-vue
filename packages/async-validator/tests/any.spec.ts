import { useAsyncValidator } from '../src'

const validate = useAsyncValidator()
const testNoErrorsFor = (value: any) => async () => {
  let res: any

  try {
    await validate
      .useSchema({
        v: {
          type: 'any',
        },
      })
      .validate(
        {
          v: value,
        },
        (errors) => {
          res = errors
        },
      )
  } catch {}
  expect(res).toBe(undefined)
}

const testRequiredErrorFor = (value: any) => async () => {
  let res: any

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
          v: value,
        },
        (errors) => {
          res = errors
        },
      )
  } catch {}
  expect(res.length).toBe(1)
  expect(res[0].message).toBe('v is required')
}

describe('any', () => {
  it('allows null', testNoErrorsFor(null))
  it('allows undefined', testNoErrorsFor(undefined))
  it('allows strings', testNoErrorsFor('foo'))
  it('allows numbers', testNoErrorsFor(1))
  it('allows booleans', testNoErrorsFor(false))
  it('allows arrays', testNoErrorsFor([]))
  it('allows objects', testNoErrorsFor({}))
  it('rejects undefined when required', testRequiredErrorFor(undefined))

  it('rejects null when required', testRequiredErrorFor(null))
})
