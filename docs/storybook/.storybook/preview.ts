import type { Preview } from '@storybook/vue3'
import '@theme/all.css'
const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      inlineStories: true,
      source: {
        state: 'open',
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    // controls: {
    //   matchers: {
    //     color: /(background|color)$/i,
    //     date: /Date$/
    //   }
    // },
    themes: {
      default: 'twitter',
      list: [
        { name: 'twitter', class: 'nado-theme', color: '#00aced' },
        { name: 'facebook', class: 'nado-theme', color: '#3b5998' },
      ],
    },
  },
}

export default preview
