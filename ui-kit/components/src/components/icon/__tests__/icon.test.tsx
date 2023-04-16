import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import NIcon from '../src/NIcon.vue'

describe('Icon.vue', () => {
  test('render', () => {
    const wrapper = mount(() => <NIcon color="#000000" size={18} />)

    expect(wrapper.element.getAttribute('style')).toContain(`--n-comp-icon-color: #000000`)
    expect(wrapper.element.getAttribute('style')).toContain(`font-size: 18px`)
  })
})
