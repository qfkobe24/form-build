import { CreateElement, VNode } from 'vue'
import RadioPopup from './radio-popup'
import { RenderOptionSlot } from '../../../types'
import { isFunction } from '../../../utils'

export const value: string | number = ''
export const valueType: string = 'string,number'

export function getRenderConfig(h: CreateElement, slots: VNode[], ctx?: any) {
  const { options = [], renderOptionSlot }: {options: any[], renderOptionSlot: RenderOptionSlot} = ctx.$props || {}
  
  return [
    RadioPopup,
    {
      props: isFunction(renderOptionSlot) ? {
        options,
        renderOptionSlot
      } : { options }
    },
    []
  ]
}
