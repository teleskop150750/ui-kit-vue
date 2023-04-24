export const nOptionsEmits = {
  updateOptions: (_val: (string | number)[]) => true,
} as const

export type NOptionsEmits = typeof nOptionsEmits
