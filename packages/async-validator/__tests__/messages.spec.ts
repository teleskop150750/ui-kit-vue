import { describe, expect, it } from 'vitest'

import { useAsyncValidator } from '../src'

describe('messages', () => {
  it('can call messages', async () => {
    const messages = {
      required(f) {
        return `${f} required!`
      },
    }
    let res: any

    const validate = useAsyncValidator()

    try {
      const schema = await validate.useSchema({
        v: {
          required: true,
        },
        v2: {
          type: 'array',
        },
      })

      schema.messages(messages)
      schema.validate(
        {
          v: '',
          v2: '1',
        },
        (errors) => {
          res = errors
        },
      )
    } catch {}
    expect(res.length).toBe(2)
    expect(res[0].message).toBe('v required!')
    expect(res[1].message).toBe('v2 is not an array')
    expect(Object.keys(messages).length).toBe(1)
  })

  it('can use options.messages', async () => {
    const messages = {
      required(f) {
        return `${f} required!`
      },
    }
    let res: any

    const validate = useAsyncValidator()

    try {
      const schema = await validate.useSchema({
        v: {
          required: true,
        },
        v2: {
          type: 'array',
        },
      })

      schema.validateWithOptions(
        {
          v: '',
          v2: '1',
        },
        {
          messages,
        },
        (errors) => {
          res = errors
        },
      )
    } catch {}
    expect(res.length).toBe(2)
    expect(res[0].message).toBe('v required!')
    expect(res[1].message).toBe('v2 is not an array')
    expect(Object.keys(messages).length).toBe(1)
  })

  it('messages with parameters', async () => {
    const messages = {
      required: 'Field %s required!',
    }
    let res: any

    const validate = useAsyncValidator()

    try {
      const schema = await validate.useSchema({
        v: {
          required: true,
        },
      })

      schema.messages(messages)
      schema.validate(
        {
          v: '',
        },
        (errors) => {
          res = errors
        },
      )
    } catch {}
    expect(res).toBeTruthy()
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('Field v required!')
    expect(Object.keys(messages).length).toBe(1)
  })

  it('messages can be without parameters', async () => {
    const messages = {
      required: 'required!',
    }
    let res: any

    const validate = useAsyncValidator()

    try {
      const schema = await validate.useSchema({
        v: {
          required: true,
        },
      })

      schema.messages(messages)
      schema.validate(
        {
          v: '',
        },
        (errors) => {
          res = errors
        },
      )
    } catch {}
    expect(res).toBeTruthy()
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('required!')
    expect(Object.keys(messages).length).toBe(1)
    expect(messages.required).toBe('required!')
  })

  it('message can be a function', async () => {
    const message = 'this is a function'
    let res
    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            required: true,
            message: () => message,
          },
        })
        .validate(
          {
            v: '', // provide empty value, this will trigger the message.
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBeTruthy()
    expect(res.length).toBe(1)
    expect(res[0].message).toBe(message)
  })
})
