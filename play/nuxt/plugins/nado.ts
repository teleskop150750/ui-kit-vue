import { makeInstaller } from '@nado/'

import { defineNuxtPlugin } from '#app'
import NuxtLink from '#app/components/nuxt-link'

export default defineNuxtPlugin((nuxtApp) => {
  const nado = makeInstaller()

  const config = {
    routerComponent: markRaw(NuxtLink),
  }

  nuxtApp.vueApp.use(nado, config)
})
