import { describe, expect, it } from 'vitest'

import { useAsyncValidator } from '../src'

describe('validator', () => {
  it('works', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: [
            {
              validator(rule, value, callback) {
                callback(new Error('e1'))
              },
            },
            {
              validator(rule, value, callback) {
                callback(new Error('e2'))
              },
            },
          ],
          v2: [
            {
              validator(rule, value, callback) {
                callback(new Error('e3'))
              },
            },
          ],
          v3: [
            {
              validator() {
                return false
              },
            },
            {
              validator() {
                return new Error('e5')
              },
            },
            {
              validator() {
                return false
              },
              message: 'e6',
            },
            {
              validator() {
                return true
              },
            },
            // Customize with empty message
            {
              validator() {
                return false
              },
              message: '',
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
    expect(res.length).toBe(7)
    expect(res[0].message).toBe('e1')
    expect(res[1].message).toBe('e2')
    expect(res[2].message).toBe('e3')
    expect(res[3].message).toBe('v3 fails')
    expect(res[4].message).toBe('e5')
    expect(res[5].message).toBe('e6')
    expect(res[6].message).toBe('')
  })

  it('first works', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: [
            {
              validator(rule, value, callback) {
                callback(new Error('e1'))
              },
            },
            {
              validator(rule, value, callback) {
                callback(new Error('e2'))
              },
            },
          ],
          v2: [
            {
              validator(rule, value, callback) {
                callback(new Error('e3'))
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
    expect(res[0].message).toBe('e1')
  })

  describe('firstFields', () => {
    it('works for true', async () => {
      let res

      const validate = useAsyncValidator()

      try {
        await validate
          .useSchema({
            v: [
              {
                validator(rule, value, callback) {
                  callback(new Error('e1'))
                },
              },
              {
                validator(rule, value, callback) {
                  callback(new Error('e2'))
                },
              },
            ],

            v2: [
              {
                validator(rule, value, callback) {
                  callback(new Error('e3'))
                },
              },
            ],
            v3: [
              {
                validator(rule, value, callback) {
                  callback(new Error('e4'))
                },
              },
              {
                validator(rule, value, callback) {
                  callback(new Error('e5'))
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
      let res

      const validate = useAsyncValidator()

      try {
        await validate
          .useSchema({
            v: [
              {
                validator(rule, value, callback) {
                  callback(new Error('e1'))
                },
              },
              {
                validator(rule, value, callback) {
                  callback(new Error('e2'))
                },
              },
            ],

            v2: [
              {
                validator(rule, value, callback) {
                  callback(new Error('e3'))
                },
              },
            ],
            v3: [
              {
                validator(rule, value, callback) {
                  callback(new Error('e4'))
                },
              },
              {
                validator(rule, value, callback) {
                  callback(new Error('e5'))
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
              firstFields: ['v'],
            },
            (errors) => {
              res = errors
            },
          )
      } catch {}
      expect(res.length).toBe(4)
      expect(res[0].message).toBe('e1')
      expect(res[1].message).toBe('e3')
      expect(res[2].message).toBe('e4')
      expect(res[3].message).toBe('e5')
    })
  })

  it('custom validate function throw error', async () => {
    const validate = useAsyncValidator()

    try {
      const validator = validate.useSchema({
        v: [
          {
            validator() {
              throw new Error('something wrong')
            },
          },
        ],
      })

      await validator.validateWithOptions(
        { v: '' },
        {
          suppressValidatorError: true,
        },
      )
    } catch ({ errors }) {
      expect(errors.length).toBe(1)
      expect(errors[0].message).toBe('something wrong')
    }
  })
})
