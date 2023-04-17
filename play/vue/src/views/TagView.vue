<script setup lang="ts">
import { getCurrentInstance } from 'vue'

import Docs from '@/components/tag/Docs.vue'

const instance = getCurrentInstance()!

const t = instance.proxy!.$route

console.log(t)
</script>

<template>
  <main>
    <div>
      <Docs />
    </div>
  </main>
</template>
