import { config } from '@vue/test-utils'

function stylePlugin(wrapper: any) {
  return {
    style: wrapper.element.style,
  }
}

export function InstallStylePlugin() {
  config.plugins.DOMWrapper.install(stylePlugin)
  config.plugins.VueWrapper.install(stylePlugin)
}
