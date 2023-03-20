import { onMounted } from 'vue'

export function initThemeClasses() {
  onMounted(() => {
    document.documentElement.classList.add('n-page', 'nado-theme')
    document.body.classList.add('n-page__body')
  })
}
