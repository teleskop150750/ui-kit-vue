import type { App } from 'vue'

import * as icons from './components'

export default (app: App) => {
  for (const [key, component] of Object.entries(icons)) {
    app.component(key, component)
  }
}

export * from './components'
export * as icons from './components'
