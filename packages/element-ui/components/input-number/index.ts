import { CreateElement } from 'vue'

export const value: number = 0
export const valueType: string = 'number'

export function getRenderConfig(h: CreateElement) {
  return [
    'el-input-number',
    {},
    []
  ]
}
