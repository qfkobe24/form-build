import { CreateElement, VNode } from 'vue'
import { isFunction } from '../../../utils'
import { AnyObject } from '../../../types'
export const value: string | number = ''
export const valueType: string = 'string,number'

export function getRenderConfig(h: CreateElement, slots: VNode[], ctx?: any) {
  let options = []

  try {
    options = ctx.$props.options
  } catch (e) {
    options = []
  }

  return [
    'el-radio-group',
    {},
    options.map((option: AnyObject, index: number) => {
      let optionText = (option as any).text

      if (isFunction(ctx.$props.renderOptionSlot)) {
        optionText = ctx.$props.renderOptionSlot(h, option, index)
      }

      return h('el-radio', {
        props: {
          ...option
        }
      }, [optionText])
    })
  ]
}
