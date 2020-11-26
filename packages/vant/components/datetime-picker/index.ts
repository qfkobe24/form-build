import { CreateElement } from 'vue'
import DatetimePickerPopup from './datetime-picker-popup.vue'

export const value: string = ''
export const valueType: string = 'date,string'

export function getRenderConfig(h: CreateElement) {
  return [
    DatetimePickerPopup,
    {},
    []
  ]
}
