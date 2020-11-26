import { CreateElement, VNode } from 'vue'

export const value: string = ''
export const valueType: string = 'string'

export function getRenderConfig(h: CreateElement, slots: VNode[]) {
  return [
    'van-field',
    {},
    slots
  ]
}
