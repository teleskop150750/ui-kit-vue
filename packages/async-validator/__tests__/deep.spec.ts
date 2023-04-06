import { describe, expect, it } from 'vitest'

import { type Rules, useAsyncValidator } from '../src'

describe('deep', () => {
  it('deep array specific validation', async () => {
    let res
    const { useSchema } = useAsyncValidator()

    try {
      await useSchema({
        v: {
          required: true,
          type: 'array',
          fields: {
            0: [{ type: 'string' }],
            1: [{ type: 'string' }],
          },
        },
      }).validate(
        {
          v: [1, 'b'],
        },
        (errors, fields) => {
          res = { errors, fields }
        },
      )
    } catch {}
    expect(res.errors.length).toBe(1)
    expect(res.fields).toMatchInlineSnapshot(`
      Object {
        "v.0": Array [
          Object {
            "field": "v.0",
            "fieldValue": 1,
            "message": "v.0 is not a string",
          },
        ],
      }
    `)
    expect(res.errors[0].message).toBe('v.0 is not a string')
  })

  it('deep object specific validation', async () => {
    let res

    const validator = useAsyncValidator()

    try {
      await validator
        .useSchema({
          v: {
            required: true,
            type: 'object',
            fields: {
              a: [{ type: 'string' }],
              b: [{ type: 'string' }],
            },
          },
        })
        .validate(
          {
            v: {
              a: 1,
              b: 'c',
            },
          },
          (errors, fields) => {
            res = { errors, fields }
          },
        )
    } catch {}
    expect(res.errors.length).toBe(1)
    expect(res.fields).toMatchInlineSnapshot(`
      Object {
        "v.a": Array [
          Object {
            "field": "v.a",
            "fieldValue": 1,
            "message": "v.a is not a string",
          },
        ],
      }
    `)
    expect(res.errors[0].message).toBe('v.a is not a string')
  })

  describe('defaultField', () => {
    it('deep array all values validation', async () => {
      let res

      const validator = useAsyncValidator()

      try {
        await validator
          .useSchema({
            v: {
              required: true,
              type: 'array',
              defaultField: [{ type: 'string' }],
            },
          })
          .validate(
            {
              v: [1, 2, 'c'],
            },
            (errors, fields) => {
              res = { errors, fields }
            },
          )
      } catch {}
      expect(res.errors.length).toBe(2)
      expect(res.fields).toMatchInlineSnapshot(`
        Object {
          "v.0": Array [
            Object {
              "field": "v.0",
              "fieldValue": 1,
              "message": "v.0 is not a string",
            },
          ],
          "v.1": Array [
            Object {
              "field": "v.1",
              "fieldValue": 2,
              "message": "v.1 is not a string",
            },
          ],
        }
      `)
      expect(res.errors[0].message).toBe('v.0 is not a string')
      expect(res.errors[1].message).toBe('v.1 is not a string')
    })

    it('deep transform array all values validation', async () => {
      let res

      const validator = useAsyncValidator()

      try {
        await validator
          .useSchema({
            v: {
              required: true,
              type: 'array',
              defaultField: [{ type: 'number', max: 0, transform: Number }],
            },
          })
          .validate(
            {
              v: ['1', '2'],
            },
            (errors, fields) => {
              res = { errors, fields }
            },
          )
      } catch {}
      expect(res.errors.length).toBe(2)
      expect(res.fields).toMatchInlineSnapshot(`
        Object {
          "v.0": Array [
            Object {
              "field": "v.0",
              "fieldValue": 1,
              "message": "v.0 cannot be greater than 0",
            },
          ],
          "v.1": Array [
            Object {
              "field": "v.1",
              "fieldValue": 2,
              "message": "v.1 cannot be greater than 0",
            },
          ],
        }
      `)
      expect(res.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "field": "v.0",
            "fieldValue": 1,
            "message": "v.0 cannot be greater than 0",
          },
          Object {
            "field": "v.1",
            "fieldValue": 2,
            "message": "v.1 cannot be greater than 0",
          },
        ]
      `)
    })

    it('will merge top validation', async () => {
      const obj = {
        value: '',
        test: [
          {
            name: 'aa',
          },
        ],
      }

      const descriptor: Rules = {
        test: {
          type: 'array',
          min: 2,
          required: true,
          message: '至少两项',
          defaultField: [
            {
              type: 'object',
              required: true,
              message: 'test 必须有',
              fields: {
                name: {
                  type: 'string',
                  required: true,
                  message: 'name 必须有',
                },
              },
            },
          ],
        },
      }

      let res: any

      const validator = useAsyncValidator()

      try {
        await validator.useSchema(descriptor).validate(obj, (errors) => {
          res = errors
        })
      } catch {}
      expect(res).toMatchInlineSnapshot(`
        Array [
          Object {
            "field": "test",
            "fieldValue": Array [
              Object {
                "name": "aa",
              },
            ],
            "message": "至少两项",
          },
        ]
      `)
    })

    it('array & required works', async () => {
      const descriptor: Rules = {
        testArray: {
          type: 'array',
          required: true,
          defaultField: [{ type: 'string' }],
        },
      }
      const record = {
        testArray: [],
      }

      const validator = useAsyncValidator()

      try {
        const useSchema = validator.useSchema(descriptor)

        await useSchema.validate(record, () => {})
      } catch {}
    })

    it('deep object all values validation', async () => {
      let res

      const validator = useAsyncValidator()

      try {
        await validator
          .useSchema({
            v: {
              required: true,
              type: 'object',
              defaultField: [{ type: 'string' }],
            },
          })
          .validate(
            {
              v: {
                a: 1,
                b: 'c',
              },
            },
            (errors) => {
              res = errors
            },
          )
      } catch {}
      expect(res.length).toBe(1)
      expect(res[0].message).toBe('v.a is not a string')
    })
  })
})
