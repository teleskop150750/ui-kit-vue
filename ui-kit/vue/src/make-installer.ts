import { provideGlobalConfig } from '@ui/components/config-provider'
import type { App, Plugin } from 'vue'

import type { NConfigProviderContext } from './components/config-provider'
import { INSTALLED_KEY } from './constants'

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
