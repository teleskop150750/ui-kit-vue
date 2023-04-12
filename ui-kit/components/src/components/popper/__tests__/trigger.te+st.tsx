// eslint-disable-next-line no-console
console.log(1)

// import { mount, type VueWrapper } from '@vue/test-utils'
// import { afterEach, describe, expect, it, vi } from 'vitest'
// import { nextTick, ref } from 'vue'

// import NPopperTrigger from '../src/NPopperTrigger.vue'
// import type { NPopperTriggerInstance } from '../src/popper-trigger.model'
// import { POPPER_INJECTION_KEY } from '../src/tokens'

// const AXIOM = 'rem is the best girl'

// const popperInjection = {
//   triggerRef: ref(null),
//   popperInstanceRef: ref(null),
//   contentRef: ref(null),
// }

// function mountTrigger(props = {}) {
//   return mount(() => <NPopperTrigger {...props}>{AXIOM}</NPopperTrigger>, {
//     global: {
//       provide: {
//         [POPPER_INJECTION_KEY as symbol]: popperInjection,
//       },
//     },
//   }) as VueWrapper<NPopperTriggerInstance>
// }

// describe('<NPopperTrigger />', () => {
//   let wrapper: VueWrapper<NPopperTriggerInstance>

//   afterEach(() => {
//     popperInjection.triggerRef.value = null
//   })
//   describe('rendering', () => {
//     it('should be able to render with children', async () => {
//       wrapper = mountTrigger()
//       await nextTick()

//       // expect(popperInjection.triggerRef.value).not.toBeNull()
//       // expect(wrapper.text()).toEqual(AXIOM)
//     })

//     // it('should be able to render for virtual ref', async () => {
//     //   wrapper = mountTrigger({
//     //     virtualTriggering: true,
//     //   })

//     //   await nextTick()

//     //   expect(wrapper.text()).not.toEqual(AXIOM)

//     //   const virtualRef = document.createElement('div')

//     //   await wrapper.setProps({
//     //     virtualRef,
//     //   })

//     //   expect(popperInjection.triggerRef.value).toStrictEqual
//     // })
//   })

//   // describe('can attach handlers', () => {
//   //   it('should be able to attach handlers to the trigger', async () => {
//   //     const onClick = vi.fn()
//   //     const virtualRef = document.createElement('div')

//   //     wrapper = mountTrigger({
//   //       onClick,
//   //       virtualTriggering: true,
//   //       virtualRef,
//   //     })
//   //     await nextTick()
//   //     expect(onClick).not.toHaveBeenCalled()
//   //     const evt = new MouseEvent('click')

//   //     virtualRef.dispatchEvent(evt)
//   //     await nextTick()
//   //     expect(onClick).toHaveBeenCalled()
//   //   })
//   // })
// })
