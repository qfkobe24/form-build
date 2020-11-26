import { CreateElement, VNode } from 'vue'
import { isFunction } from '../../../utils'
import { AnyObject } from '../../../types'

export const value: any[] = []
export const valueType: string = 'array'

export function getRenderConfig(h: CreateElement, slots: VNode[], ctx?: any) {
  let options: any[] = []
  
  try {
    options = ctx.$props.options
  } catch (e) {
    options = []
  }

  return [
    'el-checkbox-group',
    {},
    options.map((option: AnyObject, index: number) => {
      let optionText = (option as any).text

      if (isFunction(ctx.$props.renderOptionSlot)) {
        optionText = ctx.$props.renderOptionSlot(h, option, index)
      }

      return h('el-checkbox', {
        props: {
          ...option
        }
      }, [optionText])
    })
  ]
}
