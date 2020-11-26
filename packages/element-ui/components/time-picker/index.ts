import { CreateElement } from 'vue'

export const value: any = new Date()
export const valueType: string = 'date'

export function getRenderConfig(h: CreateElement) {
  return [
    'el-time-picker',
    {},
    []
  ]
}
