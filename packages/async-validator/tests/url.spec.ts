import { useAsyncValidator } from '../src'

describe('url', () => {
  it('works for empty string', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
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
    expect(res).toBe(undefined)
  })

  it('works for ip url', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
          },
        })
        .validate(
          {
            v: 'http://10.218.136.29/talent-tree/src/index.html',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for required empty string', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
            required: true,
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

  it('works for type url', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
          },
        })
        .validate(
          {
            v: 'http://www.taobao.com',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for type url has query', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
          },
        })
        .validate(
          {
            v: 'http://www.taobao.com/abc?a=a',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for type url has hash', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
          },
        })
        .validate(
          {
            v: 'http://www.taobao.com/abc#!abc',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for type url has query and has', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
          },
        })
        .validate(
          {
            v: 'http://www.taobao.com/abc?abc=%23&b=a~c#abc',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for type url has multi hyphen', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
          },
        })
        .validate(
          {
            v: 'https://www.tao---bao.com',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })

  it('works for type not a valid url', async () => {
    let res: any

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
          },
        })
        .validate(
          {
            v: 'http://www.taobao.com/abc?abc=%23&b=  a~c#abc    ',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res.length).toBe(1)
    expect(res[0].message).toBe('v is not a valid url')
  })

  it('support skip schema', async () => {
    let res

    const validate = useAsyncValidator()

    try {
      await validate
        .useSchema({
          v: {
            type: 'url',
          },
        })
        .validate(
          {
            v: '//g.cn',
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}
    expect(res).toBe(undefined)
  })
})
