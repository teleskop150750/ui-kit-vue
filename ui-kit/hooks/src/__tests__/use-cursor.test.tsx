import { isNil } from '@nado/ui-kit-utils'
import { nextTick, shallowRef } from 'vue'

import { useCursor } from '../use-cursor'

describe('useCursor', () => {
  it('record and set cursor correctly', async () => {
    expect(2).toEqual(2)
    const inputRef = shallowRef<HTMLInputElement>()
    const [recordCursor, setCursor] = useCursor(inputRef)

    if (isNil(inputRef.value)) {
      return
    }

    inputRef.value.value = 'abc'
    // set a cursor position
    inputRef.value.setSelectionRange(1, 1)
    recordCursor()
    inputRef.value.value = 'a-bc'
    setCursor()
    await nextTick()
    const { selectionStart, selectionEnd } = inputRef.value

    expect(selectionStart).toEqual(2)
    expect(selectionEnd).toEqual(2)
  })
})
