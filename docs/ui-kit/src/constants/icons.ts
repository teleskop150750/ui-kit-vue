import { NIconPhone, NIconPlus, NIconSearch } from '@nado/ui-kit-icons-vue'

export const iconsMap = {
  NIconPlus,
  NIconSearch,
  NIconPhone,
} as const

export const iconsList = [
  {
    label: 'NIconPlus',
    value: 'NIconPlus',
  },
  {
    label: 'NIconPhone',
    value: 'NIconPhone',
  },
  {
    label: 'NIconSearch',
    value: 'NIconSearch',
  },
] as const
