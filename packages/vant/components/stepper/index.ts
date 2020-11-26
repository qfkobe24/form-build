import { CreateElement, VNode } from 'vue'

export const value: number = 0
export const valueType: string = 'string,number'

export function getRenderConfig(h: CreateElement) {
  return [
    'van-stepper',
    {
      class: {
        'van-cell': true
      }
    },
    []
  ]
}
