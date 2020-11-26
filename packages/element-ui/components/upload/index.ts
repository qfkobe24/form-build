import { CreateElement, VNode, VueConstructor } from 'vue'
import upload from './upload.vue'

export const value: string[] = []
export const valueType: string = 'array'

export function getRenderConfig(h: CreateElement, slots: VNode[], ctx?: any) {
  return [
    upload,
    {},
    slots
  ]
}
