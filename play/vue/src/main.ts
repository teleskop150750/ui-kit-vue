import '@theme/all.css'

import { makeInstaller, NButton, NInput } from '@ui'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const NadoUI = makeInstaller([NButton, NInput])
const app = createApp(App)

app.use(router)
app.use(NadoUI, {})

app.mount('#app')
