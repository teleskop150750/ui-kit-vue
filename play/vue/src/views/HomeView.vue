<script setup lang="ts">
import { number, object, type Schema, type ValidationError } from 'yup'

const d: Schema = object({
  name: number().min(2).max(5),
})

console.log('nullable', d.spec.nullable)
console.log('optional', d.spec.optional)

d.validate({
  name: 1,
})
  .then((v) => console.log(v))
  .catch((error: ValidationError) => {
    console.log(Object.entries(error))
  })
</script>

<template>
  <main>
    <div>
      <h1>H1</h1>
    </div>
  </main>
</template>
