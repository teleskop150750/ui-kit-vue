/* eslint-disable prefer-named-capture-group */
export function isKorean(text: string) {
  return /([()|\u3130-\u318F\uAC00-\uD7AF])+/gi.test(text)
}
