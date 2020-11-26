import { CreateElement } from 'vue'

export const value: number = 0
export const valueType: string = 'number,array'

export function getRenderConfig(h: CreateElement) {
  return [
    'el-slider',
    {
      class: 'default-slider',
    },
    []
  ]
}
