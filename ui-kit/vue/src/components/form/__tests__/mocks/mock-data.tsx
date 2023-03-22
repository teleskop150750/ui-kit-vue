import Button from '@ui/components/button'
import Input from '@ui/components/input'
import { defineComponent, ref, toRef } from 'vue'

import Form from '../../src/form/form.vue'
import FormItem from '../../src/form-item/form-item.vue'

interface DomainItem {
  key: number
  value: string
}

const DynamicDomainForm = defineComponent({
  setup() {
    return () => <div>{11}</div>
  },
})

export default DynamicDomainForm

