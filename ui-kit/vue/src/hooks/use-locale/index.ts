/* eslint-disable prefer-named-capture-group */
import type { Language } from '@ui/locale'
import Russian from '@ui/locale/lang/ru'
import type { Nillable } from '@ui/utils'
import type { MaybeRef } from '@vueuse/core'
import { get } from 'lodash-es'
import { computed, isRef, type Ref, ref, unref } from 'vue'

import { useGlobalConfig } from '../use-global-config'

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export interface LocaleContext {
  locale: Ref<Language>
  lang: Ref<string>
  t: Translator
}

export function translate(path: string, option: Nillable<TranslatorOption>, locale: Language): string {
  return (get(locale, path, path) as string).replaceAll(/{(\w+)}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`)
}

export function buildTranslator(locale: MaybeRef<Language>): Translator {
  return (path, option) => translate(path, option, unref(locale))
}

export function buildLocaleContext(locale: MaybeRef<Language>): LocaleContext {
  const lang = computed(() => unref(locale).name)
  const localeRef = isRef(locale) ? locale : ref(locale)

  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale),
  }
}

export function useLocale() {
  const locale = useGlobalConfig('locale')

  return buildLocaleContext(computed(() => locale.value || Russian))
}
