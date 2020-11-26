import { CreateElement, VNode, VNodeData } from 'vue'
import getChildrenVnode from './checkbox'
export const value: any[] = []
export const valueType: string = 'array'

export function getRenderConfig(h: CreateElement, slots: VNode[], ctx?: any) {
  let { options = [], vData = {} }: {options: any[], vData: VNodeData} = ctx.$props

  const props: { [key: string]: any } = vData.props || {}

  try {
    options = ctx.$props.options || []
  } catch (e) {
    options = []
  }

  const children: VNode[] = getChildrenVnode(h, props.direction, options, ctx.$props.renderOptionSlot)

  return [
    'van-checkbox-group',
    {
      style: {
        width: '100%'
      }
    },
    children
  ]
}
