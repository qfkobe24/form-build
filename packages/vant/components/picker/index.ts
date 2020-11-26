import { CreateElement } from 'vue'
import PickerPopup from './picker-popup.vue'
export const value: string = ''
export function valueType(itemProps: any) {
  const { type } = itemProps
  if (type === 'col') {
    return 'string,number'
  } else {
    return 'array'
  }
}

export function getRenderConfig(h: CreateElement) {
  return [
    PickerPopup,
    {},
    []
  ]
}
