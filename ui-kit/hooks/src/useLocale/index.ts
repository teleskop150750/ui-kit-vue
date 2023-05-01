import { type Language, ru } from '@nado/ui-kit-locale'
import { get, type MaybeRef } from '@nado/ui-kit-utils'
import { computed, inject, type InjectionKey, isRef, type Ref, ref, unref } from 'vue'

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export interface LocaleContext {
  locale: Ref<Language>
  lang: Ref<string>
  t: Translator
}

export function buildTranslator(locale: MaybeRef<Language>): Translator {
  return (path, option) => translate(path, option, unref(locale))
}

export function translate(path: string, option: undefined | TranslatorOption, locale: Language): string {
  return (get(locale, path, path) as string).replaceAll(
    /{(?<temp1>\w+)}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`,
  )
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

export const LOCALE_CONTEXT_KEY: InjectionKey<Ref<Language | undefined>> = Symbol('LOCALE_CONTEXT_KEY')

export function useLocale(localeOverrides?: Ref<Language | undefined>) {
  const locale = localeOverrides || inject(LOCALE_CONTEXT_KEY, ref())!

  return buildLocaleContext(computed(() => locale.value || ru))
}
