import { CreateElement } from 'vue'

export const value: boolean = false
export const valueType: string = 'boolean'

export function getRenderConfig(h: CreateElement) {
  return [
    'van-switch',
    {},
    []
  ]
}
