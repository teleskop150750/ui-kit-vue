import { useGlobalConfig } from '@ui/components/config-provider'
import { buildProps, definePropType } from '@ui/utils'
import { computed, type ExtractPropTypes, getCurrentInstance } from 'vue'

// import { useGlobalConfig } from '../services/global-config'

const vueRouterLinkProps = buildProps({
  to: {
    type: definePropType<string | object | undefined>([String, Object]),
    default: undefined,
  },
  activeClass: {
    type: String,
    default: '',
  },
  exactActiveClass: {
    type: String,
    default: '',
  },
  replace: {
    type: Boolean,
    default: false,
  },
  ariaCurrentValue: {
    type: String,
    default: undefined,
  },
  custom: {
    type: Boolean,
    default: undefined,
  },
})

const nuxtRouterLinkProps = buildProps({
  target: {
    type: String,
    default: '',
  },
  rel: {
    type: String,
    default: undefined,
  },
  noRel: {
    type: Boolean,
    default: undefined,
  },
  external: {
    type: Boolean,
    default: undefined,
  },
  prefetch: {
    type: Boolean,
    default: undefined,
  },
  noPrefetch: {
    type: Boolean,
    default: undefined,
  },
})

export const useRouterLinkProps = buildProps({
  ...vueRouterLinkProps,
  ...nuxtRouterLinkProps,
  tag: {
    type: String,
    default: 'span',
  },
  href: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
export type NRouterLinkProps = ExtractPropTypes<typeof useRouterLinkProps>

export function useRouterLink(props: NRouterLinkProps) {
  const globalProperties = computed(() => getCurrentInstance()?.appContext.config.globalProperties)
  const vueRouter = computed(() => globalProperties.value?.$router)
  const vueRoute = computed(() => globalProperties.value?.$route)

  const routerComponent = useGlobalConfig('routerComponent')

  const isNuxt = !!globalProperties.value?.$nuxt
  const isNuxtLink = computed(() => !!(!props.disabled && props.to && isNuxt && routerComponent))

  const tagComputed = computed(() => {
    if (props.disabled) {
      return props.tag
    }

    if (props.href && !props.to) {
      return 'a'
    }

    if (isNuxtLink.value) {
      return routerComponent.value
    }

    if (props.to) {
      return 'router-link'
    }

    return props.tag || 'div'
  })

  const isLinkTag = computed(() => isNuxtLink.value || ['a', 'router-link'].includes(tagComputed.value as string))

  const hrefComputed = computed(
    () =>
      // to resolve href on server for SEO optimization
      // https://github.com/nuxt/nuxt.js/issues/8204
      props.href || (props.to ? vueRouter.value?.resolve(props.to, vueRoute.value).href : ''),
  )

  const linkAttributesComputed = computed(() => {
    if (!isLinkTag.value) {
      return {}
    }

    if (tagComputed.value === 'a') {
      return {
        target: props.target,
        href: hrefComputed.value,
      }
    }

    const vueRouterProps = {
      to: props.to,
      activeClass: props.activeClass,
      exactActiveClass: props.exactActiveClass,
      replace: props.replace,
      ariaCurrentValue: props.ariaCurrentValue,
      custom: props.custom,
    }

    if (tagComputed.value === 'router-link') {
      return vueRouterProps
    }

    if (isNuxtLink.value) {
      return {
        ...vueRouterProps,
        target: props.target,
        rel: props.rel,
        noRel: props.noRel,
        external: props.external,
        prefetch: props.prefetch,
        noPrefetch: props.noPrefetch,
      }
    }

    return {}
  })

  const isActiveRouterLink = computed(() => {
    if (!vueRouter.value || !props.to) {
      return false
    }

    const to = vueRouter.value.resolve(props.to).href
    const currentHref = vueRouter.value.currentRoute.value.path

    return to.replace('#', '') === currentHref.replace('#', '')
  })

  return {
    isLinkTag,
    tagComputed,
    hrefComputed,
    isActiveRouterLink,
    linkAttributesComputed,
  }
}
