<script lang="ts" setup>
import { NFocusTrap } from '@nado/ui-kit-vue'
import { reactive, ref } from 'vue'

const ieneInput = ref<HTMLInputElement>()

const isActiveNested = ref(false)
const isDisplayNested = ref(false)

const demos = reactive({
  basic: {
    isActive: false,
  },
  nested: {
    // initialFocus: () => ieneInput.value,
    isActive: false,
  },
  nested_nested: {
    // initialFocus: () => ieneInput.value,
    isActive: false,
    isDisplay: false,
    activate() {
      isActiveNested.value = true
      isDisplayNested.value = true
    },
    deactivate() {
      isActiveNested.value = false
      isDisplayNested.value = false
    },
    onDeactivate() {
      isDisplayNested.value = false
    },
  },
  vif: {
    isActive: false,
  },
  iene: {
    initialFocus: () => ieneInput.value,
    isActive: false,
  },
  ocd: {
    isActive: false,
  },
  aoc: {
    isActive: false,
    clickOutsideEnabled: false,
    allowOutsideClick: () => demos.aoc.clickOutsideEnabled,
  },
  methods: {
    isActive: false,
  },
  comp: {
    isActive: false,
  },
})

// function handleClickFromAOC() {
//   if (demos.aoc.isActive) {
//     // eslint-disable-next-line no-alert
//     alert('Successfully clicked outside of NFocusTrap')
//   } else {
//     // eslint-disable-next-line no-alert
//     alert('Active the NFocusTrap first to see that you can allow clicks to escape conditionally')
//   }
// }
</script>

<template>
  <div class="body">
    <h1 tabindex="0">focus-trap demo</h1>

    <div id="demo-nested-2">
      <h2 id="nested-heading-2">nested</h2>
      <p>Nested focus traps.</p>
      <p>
        <button id="activate-nested-2" @click="demos.nested.isActive = true">
          activate trap {{ demos.nested.isActive }}
        </button>
      </p>

      <div>{{ isActiveNested }} {{ isDisplayNested }}</div>

      <NFocusTrap v-if="demos.nested.isActive" v-model:active="demos.nested.isActive">
        <div class="trap" :class="demos.nested.isActive && 'is-active'" tabindex="-1">
          <p>
            <button id="deactivate-nested-2" @click="demos.nested.isActive = false">deactivate outer trap</button>
          </p>
          <p>
            <button id="nested-activate-nested-2" @click="isActiveNested = true">activate inner trap</button>
          </p>
          <NFocusTrap v-if="isActiveNested" v-model:active="isActiveNested">
            <div id="nested-nested-2" style="padding: 5px 10px">
              <p>
                <button>nothing</button>
              </p>
              <p>
                <button id="nested-deactivate-nested-2" @click="isActiveNested = false">
                  deactivate and close inner trap
                </button>
              </p>
            </div>
          </NFocusTrap>
        </div>
      </NFocusTrap>
    </div>

    <section id="basic">
      <h2>default behavior</h2>
      <p>
        <button id="activate-default" @click="demos.basic.isActive = true">activate trap</button>
      </p>

      <NFocusTrap v-if="demos.basic.isActive" v-model:active="demos.basic.isActive">
        <div class="trap" :class="demos.basic.isActive && 'is-active'" tabindex="-1">
          <p>
            Here is a focus trap
            <a href="#">with</a>
            <a href="#">some</a>
            <a href="#">focusable</a> parts.
          </p>
          <p>
            <button id="deactivate-default" @click="demos.basic.isActive = false">deactivate trap</button>
          </p>
        </div>
      </NFocusTrap>
    </section>
  </div>
</template>

<style scoped>
.body {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;

  color: hsl(0deg 0% 20%);
  font-size: 14px;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

.body *:focus {
  outline: 5px solid lightblue;
}

.trap {
  padding: 1em 2em;

  border: 1px solid hsl(0deg 0% 80%);
}

.trap.is-active {
  background: hsl(297deg 100% 96%);
}

.inline-label {
  margin-right: 0.5em;
}

#demo-four,
#initial-nine {
  outline: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

code,
kbd {
  padding: 0 2px;

  font-size: 90%;

  background: hsl(0deg 0% 93%);
}
</style>
