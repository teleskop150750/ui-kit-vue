export { default as en } from './lang/en'
export { default as ru } from './lang/ru'

export interface TranslatePair {
  [key: string]: string | string[] | TranslatePair
}

export interface Language {
  name: string
  el: TranslatePair
}
