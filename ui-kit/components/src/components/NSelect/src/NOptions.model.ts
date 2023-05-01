export const optionsEmits = {
  updateOptions: (_val: (string | number)[]) => true,
} as const

export type NOptionsEmits = typeof optionsEmits
