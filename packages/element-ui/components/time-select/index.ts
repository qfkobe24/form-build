import { CreateElement } from 'vue'

export const value: string = ''
export const valueType: string = 'string'

export function getRenderConfig(h: CreateElement) {
  return [
    'el-time-select',
    {},
    []
  ]
}
