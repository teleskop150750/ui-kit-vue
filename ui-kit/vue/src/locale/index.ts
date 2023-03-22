export { default as af } from './lang/af'
export { default as ar } from './lang/ar'
export { default as az } from './lang/az'
export { default as bg } from './lang/bg'
export { default as bn } from './lang/bn'
export { default as ca } from './lang/ca'
export { default as cs } from './lang/cs'
export { default as da } from './lang/da'
export { default as de } from './lang/de'
export { default as el } from './lang/el'
export { default as en } from './lang/en'
export { default as eo } from './lang/eo'
export { default as es } from './lang/es'
export { default as et } from './lang/et'
export { default as eu } from './lang/eu'
export { default as fa } from './lang/fa'
export { default as fi } from './lang/fi'
export { default as fr } from './lang/fr'
export { default as he } from './lang/he'
export { default as hr } from './lang/hr'
export { default as hu } from './lang/hu'
export { default as hyAm } from './lang/hy-am'
export { default as id } from './lang/id'
export { default as it } from './lang/it'
export { default as ja } from './lang/ja'
export { default as kk } from './lang/kk'
export { default as km } from './lang/km'
export { default as ko } from './lang/ko'
export { default as ku } from './lang/ku'
export { default as ky } from './lang/ky'
export { default as lt } from './lang/lt'
export { default as lv } from './lang/lv'
export { default as mn } from './lang/mn'
export { default as nbNo } from './lang/nb-no'
export { default as nl } from './lang/nl'
export { default as pa } from './lang/pa'
export { default as pl } from './lang/pl'
export { default as pt } from './lang/pt'
export { default as ptBr } from './lang/pt-br'
export { default as ro } from './lang/ro'
export { default as ru } from './lang/ru'
export { default as sk } from './lang/sk'
export { default as sl } from './lang/sl'
export { default as sr } from './lang/sr'
export { default as sv } from './lang/sv'
export { default as ta } from './lang/ta'
export { default as th } from './lang/th'
export { default as tk } from './lang/tk'
export { default as tr } from './lang/tr'
export { default as ugCn } from './lang/ug-cn'
export { default as uk } from './lang/uk'
export { default as uzUz } from './lang/uz-uz'
export { default as vi } from './lang/vi'
export { default as zhCn } from './lang/zh-cn'
export { default as zhTw } from './lang/zh-tw'

export interface TranslatePair {
  [key: string]: string | string[] | TranslatePair
}

export interface Language {
  name: string
  el: TranslatePair
}
