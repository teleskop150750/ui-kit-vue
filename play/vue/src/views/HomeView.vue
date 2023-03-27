<script setup lang="ts">
import { NButton, NButtonGroup } from '@ui/index'

import DocsButton from '@/components/button/DocsButton.vue'
import DocsForm from '@/components/form/DocsForm.vue'
import DocsInput from '@/components/input/DocsInput.vue'
</script>

<template>
  <main>
    <NButtonGroup size="small" appearance="success">
      <NButton appearance="primary">Prev</NButton>
      <NButton>Next</NButton>
    </NButtonGroup>

    <div>
      <DocsForm />
      <DocsButton />
      <DocsInput />
    </div>
  </main>
</template>
