import { CreateElement, VNode } from 'vue'
import CheckboxPopup from './checkbox-popup'
import { RenderOptionSlot } from '../../../types'
import { isFunction } from '../../../utils'

export const value: any[] = []
export const valueType: string = 'array'

export function getRenderConfig(h: CreateElement, slots: VNode[], ctx?: any) {
  const { options = [], renderOptionSlot }: {options: any[], renderOptionSlot: RenderOptionSlot} = ctx.$props || {}

  return [
    CheckboxPopup,
    {
      props: isFunction(renderOptionSlot) ? {
        options,
        renderOptionSlot
      } : { options }
    },
    []
  ]
}
