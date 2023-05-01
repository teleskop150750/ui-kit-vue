import { mount } from '@vue/test-utils'
import { flatten } from 'lodash-es'
import { nextTick } from 'vue'

import { NOptions } from '../src/NOptions'
import NOptionGroupStub from './NOptionGroupStub.vue'
import NOptionStub from './NOptionStub.vue'

describe('options', () => {
  let wrapper: ReturnType<typeof mount>
  const onOptionsChange = vi.fn()

  const getLabel = (i: number | string) => `label-${i}`
  const samples = Array.from({ length: 3 })

  const createWrapper = (slotsProps = {}) => {
    wrapper = mount(
      (_: any, { slots }: any) => <NOptions onUpdateOptions={onOptionsChange}>{slots?.default?.()}</NOptions>,
      {
        global: {
          components: {
            NOption: NOptionStub,
            NOptionGroup: NOptionGroupStub,
          },
        },
        slots: slotsProps,
      },
    )
  }

  afterEach(() => {
    wrapper.unmount()
    onOptionsChange.mockClear()
  })

  it('renders emit correct options', async () => {
    createWrapper({
      default: () => samples.map((_, i) => <NOptionStub label={getLabel(i)} />),
    })

    await nextTick()

    expect(onOptionsChange).toHaveBeenCalledWith(samples.map((_, i) => getLabel(i)))
  })

  it('renders emit correct options with option group', async () => {
    createWrapper({
      default: () =>
        samples.map((_, i) => (
          <NOptionGroupStub>
            {{
              default: () => samples.map((_i, j) => <NOptionStub label={getLabel(`${i}-${j}`)}></NOptionStub>),
            }}
          </NOptionGroupStub>
        )),
    })

    expect(onOptionsChange).toHaveBeenCalledWith(
      flatten(samples.map((_, i) => samples.map((_i, j) => getLabel(`${i}-${j}`)))),
    )
  })
})
