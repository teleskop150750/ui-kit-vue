<script setup>
import { NButton } from '@nado/ui-kit-vue'

import NuxtLink from '#app/components/nuxt-link'
// import { NuxtLink, TheHeader } from '@/.nuxt/components'
// import { NuxtLink } from '~/.nuxt/components'
// import TheHeader from '~/components/TheHeader.vue'
// TheHeader
</script>

<template>
  <div>
    <TheHeader>
      <p>HOME</p>
    </TheHeader>
    <br />
    <NuxtLink to="/about"> About </NuxtLink>
    <NButton disabled>About</NButton>
    <NButton to="/about">About</NButton>
  </div>
</template>
