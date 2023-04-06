import { config } from '@vue/test-utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stylePlugin(wrapper: any) {
  return {
    style: wrapper.element.style,
  }
}

export function InstallStylePlugin() {
  config.plugins.DOMWrapper.install(stylePlugin)
  config.plugins.VueWrapper.install(stylePlugin)
}
