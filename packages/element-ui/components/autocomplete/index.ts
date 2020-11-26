import { CreateElement, VNode } from 'vue'
import { isObject, copyUnNullProps } from '../../../utils'
export const value: string = ''
export const valueType: string = 'string,number'

export function getRenderConfig(h: CreateElement, slots: VNode[], ctx: any) {
  // 原生组件属性提取
  const { vData } = ctx
  const { props } = vData || {}
  let attrs = {}
  if (isObject(props)) {
    attrs = copyUnNullProps(props, 'maxlength', 'minlength', 'placeholder', 'rows', 'name', 'max', 'min', 'step', 'resize', 'autofocus')
  }

  return [
    'el-autocomplete',
    {
      attrs
    },
    slots
  ]
}
