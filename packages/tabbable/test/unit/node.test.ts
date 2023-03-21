import { describe, expect, it } from 'vitest'

import { isFocusable, isTabbable } from '../../src'

describe('tabbable unit tests', () => {
  it('should throw with no input node', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    expect(() => isFocusable()).toThrow()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    expect(() => isTabbable()).toThrow()
  })
})
