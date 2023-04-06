import { type NConfigProviderContext, provideGlobalConfig } from '@nado/ui-kit-components'
import { INSTALLED_KEY } from '@nado/ui-kit-constants'
import type { App, Plugin } from 'vue'

export function makeInstaller(components: Plugin[] = []) {
  const install = (app: App, options?: NConfigProviderContext) => {
    const _app = app as App & Record<symbol, boolean>

    if (_app[INSTALLED_KEY]) {
      return
    }

    _app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))

    if (options) {
      provideGlobalConfig(options, app, true)
    }
  }

  return {
    install,
  }
}
