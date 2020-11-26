
import { CreateElement, VNode } from 'vue'

export const value: number = 0
export const valueType: string = 'number'

export function getRenderConfig(h: CreateElement, slots: VNode[]) {
  return [
    'van-slider',
    {
      style: {
        margin: '20px 0'
      }
    },
    slots
  ]
}
