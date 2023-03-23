<script setup>
import { NButton } from '@ui'

import TheHeader from '~~/components/TheHeader.vue'
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
