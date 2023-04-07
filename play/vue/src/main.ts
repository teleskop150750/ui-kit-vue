import '@nado/ui-kit-theme/src/theme.css'

import { makeInstaller, NButton, NInput } from '@nado/ui-kit-vue'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const NadoUI = makeInstaller([NButton, NInput])
const app = createApp(App)

app.use(router)
app.use(NadoUI, {})

app.mount('#app')
