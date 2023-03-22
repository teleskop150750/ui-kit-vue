import { mount } from '@vue/test-utils'
import { merge } from 'lodash-es'

function makeMount<C, O, E>(element: C, defaultOptions: O) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: (E | O) | (E & O) = {} as E) => mount(element as any, merge({}, defaultOptions, props))
}

interface Options {
  data?: () => {
    [key: string]: unknown
  }
  methods?: {
    [key: string]: (...args: unknown[]) => any
  }
}

export const makeMountFunc =
  <T extends Record<string, unknown>>(defaultOptions: T) =>
  (template: string, options: Options) =>
    mount({
      ...merge({}, defaultOptions, options),
      template,
    })

export default makeMount
