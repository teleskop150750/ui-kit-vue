import { describe, expect, it } from 'vitest'

import { useAsyncValidator } from '../src'

describe('asyncValidator', () => {
  it('works', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: [
            {
              asyncValidator() {
                return Promise.reject(new Error('e1'))
              },
            },
            {
              asyncValidator() {
                return Promise.reject(new Error('e2'))
              },
            },
          ],
          v2: [
            {
              asyncValidator() {
                return Promise.reject(new Error('e3'))
              },
            },
          ],
        })
        .validate(
          {
            v: 2,
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}

    expect(res.length).toBe(3)
    expect(res[0].message).toBe('e1')
    expect(res[1].message).toBe('e2')
    expect(res[2].message).toBe('e3')
  })

  it('first works', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: [
            {
              asyncValidator(_rule, _value, cb) {
                cb()
              },
            },
            {
              asyncValidator(_rule, _value, _cb) {
                return Promise.reject(new Error('e2'))
              },
            },
          ],
          v2: [
            {
              asyncValidator(_rule, _value, _cb) {
                return Promise.reject(new Error('e3'))
              },
            },
          ],
        })
        .validateWithOptions(
          {
            v: 2,
            v2: 1,
          },
          {
            first: true,
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('e2')
  })

  describe('firstFields', () => {
    it('works for true', async () => {
      let res: any

      const validate = useAsyncValidator()

      try {
        await validate
          .useSchema({
            v: [
              {
                asyncValidator() {
                  return Promise.reject(new Error('e1'))
                },
              },
              {
                asyncValidator() {
                  return Promise.reject(new Error('e2'))
                },
              },
            ],

            v2: [
              {
                asyncValidator() {
                  return Promise.reject(new Error('e3'))
                },
              },
            ],
            v3: [
              {
                asyncValidator() {
                  return Promise.reject(new Error('e4'))
                },
              },
              {
                asyncValidator() {
                  return Promise.reject(new Error('e5'))
                },
              },
            ],
          })
          .validateWithOptions(
            {
              v: 1,
              v2: 1,
              v3: 1,
            },
            {
              firstFields: true,
            },
            (errors) => {
              res = errors
            },
          )
      } catch {}
      expect(res.length).toBe(3)
      expect(res[0].message).toBe('e1')
      expect(res[1].message).toBe('e3')
      expect(res[2].message).toBe('e4')
    })

    it('works for array', async () => {
      let res: any

      const validate = useAsyncValidator()

      try {
        await validate
          .useSchema({
            v: [
              {
                asyncValidator: () => Promise.reject(new Error('e1')),
              },
              {
                asyncValidator() {
                  return Promise.reject(new Error('e2'))
                },
              },
            ],

            v2: [
              {
                asyncValidator() {
                  return Promise.reject(new Error('e3'))
                },
              },
            ],
            v3: [
              {
                asyncValidator() {
                  return Promise.reject(new Error('e4'))
                },
              },
              {
                asyncValidator() {
                  return Promise.reject(new Error('e5'))
                },
              },
            ],
            v4: [
              {
                asyncValidator: () =>
                  new Promise((resolve) => {
                    setTimeout(resolve, 100)
                  }),
              },
              {
                asyncValidator: () =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => reject(new Error('e6')), 100)
                  }),
              },
              {
                asyncValidator: () =>
                  new Promise((resolve, reject) => {
                    // eslint-disable-next-line unicorn/error-message
                    setTimeout(() => reject(new Error('')), 100)
                  }),
              },
            ],
          })
          .validateWithOptions(
            {
              v: 1,
              v2: 1,
              v3: 1,
            },
            {
              firstFields: ['v'],
            },
            (errors) => {
              res = errors
            },
          )
      } catch {}
      expect(res.length).toBe(6)
      expect(res[0].message).toBe('e1')
      expect(res[1].message).toBe('e3')
      expect(res[2].message).toBe('e4')
      expect(res[3].message).toBe('e5')
      expect(res[4].message).toBe('e6')
      expect(res[5].message).toBe('')
    })
    it('Whether to remove the "Uncaught (in promise)" warning', async () => {
      let allCorrect = true

      const validate = useAsyncValidator()

      try {
        await validate
          .useSchema({
            async: {
              asyncValidator(rule) {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject([new Error(typeof rule.message === 'function' ? rule.message() : rule.message)])
                  }, 100)
                })
              },
              message: 'async fails',
            },
          })
          .validate({
            v: 1,
          })
      } catch ({ errors }) {
        allCorrect = errors.length === 1
      }
      expect(allCorrect).toBe(true)
    })
  })
})
