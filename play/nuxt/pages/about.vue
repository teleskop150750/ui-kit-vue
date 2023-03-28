<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()!

const t = instance.proxy!.$route

console.log(t)
</script>

<template>
  <div>
    <p>About</p>
    <br />
    <NuxtLink to="/"> Back to home </NuxtLink>
  </div>
</template>
