<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const { uid } = getCurrentInstance()!
</script>

<template>
  <svg
    class="n-spinner"
    xmlns="http://www.w3.org/2000/svg"
    width="160"
    height="160"
    viewBox="0 0 160 160"
    fill="none"
    color="innerColor"
  >
    <defs>
      <linearGradient :id="`spinner-secondHalf-${uid}`">
        <stop offset="0%" stop-opacity="0" stop-color="currentColor" />
        <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
      </linearGradient>
      <linearGradient :id="`spinner-firstHalf-${uid}`">
        <stop offset="0%" stop-opacity="1" stop-color="currentColor" />
        <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
      </linearGradient>
    </defs>

    <g stroke-width="24">
      <path :stroke="`url(#spinner-firstHalf-${uid})`" d="M 148,80 a 68,68 0 0 1 -136,0" />
      <path :stroke="`url(#spinner-secondHalf-${uid})`" d="M 12,80 a 68,68 0 0 1 136,0" />
    </g>
    <animateTransform
      from="0 0 0"
      to="360 0 0"
      attributeName="transform"
      type="rotate"
      repeatCount="indefinite"
      dur="1000ms"
    />
  </svg>
</template>
