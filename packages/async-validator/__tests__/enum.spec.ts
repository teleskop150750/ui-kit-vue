import { describe, expect, it } from 'vitest'

import { useAsyncValidator } from '../src'

describe('enum', () => {
  it('run validation on `false`', async () => {
    let res: any

    const validator = useAsyncValidator()

    try {
      await validator
        .useSchema({
          v: {
            type: 'enum',
            enum: [true],
          },
        })
        .validate(
          {
            v: false,
          },
          (errors) => {
            res = errors
          },
        )
    } catch {}

    expect(res.length).toBe(1)
    expect(res[0].message).toBe('v must be one of true')
  })
})
