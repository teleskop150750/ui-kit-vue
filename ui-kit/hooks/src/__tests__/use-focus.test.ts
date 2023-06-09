import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import { useFocus } from '../use-focus'

describe('useFocus', () => {
  it('should focus el', async () => {
    const inputEl = document.createElement('input')

    document.body.append(inputEl)

    const reference = ref(inputEl)
    const { focus } = useFocus(reference)

    focus()

    expect(document.activeElement).toBe(inputEl)
  })
})
