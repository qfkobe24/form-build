import { CreateElement, VNode, VNodeData } from 'vue'
import { isFunction } from '../../../utils'
import { RenderOptionSlot, AnyObject } from '../../../types'
function getNormalChildren(h: CreateElement, options: any[], renderOptionSlot: RenderOptionSlot) {
  return options.map((option: AnyObject, index: number) => {
    let optionText = (option as any).text
    if (isFunction(renderOptionSlot)) {
      optionText = renderOptionSlot(h, option, index)
    }
    return h('van-checkbox', { 
      props: { ...option },
      style: {
        marginTop: '6px',
        marginBottom: '6px'
      }
    }, [optionText])
  })
}

function getWrappedChildren(h: CreateElement, options: any[], renderOptionSlot: RenderOptionSlot) {
  return options.map((option: AnyObject, index: number) => {
    let optionText = (option as any).text
    if (isFunction(renderOptionSlot)) {
      optionText = renderOptionSlot(h, option, index)
    }

    const cellVNode = h('van-cell',
      {
        props: {
          key: option,
          clickable: true,
          index
        },
        style: {
          padding: '6px 0'
        },
        on: {
          click() {
          // TODO 有没有更好的不会出bug的方法
            (cellVNode as any).children[1].componentInstance.toggle()
          }
        }
      },
      [
        h('van-checkbox', { props: { ...option }, ref: 'checkbox', slot: 'right-icon' }),
        h('div', { slot: 'title' }, [optionText])
      ])

    return cellVNode
  })
}

export default function getChildrenVnode(
  h: CreateElement,
  diection: string,
  options: any[],
  renderOptionSlot: any): VNode[] {
  if (diection === 'vertical-cell') {
    return getWrappedChildren(h, options, renderOptionSlot)
  } else {
    return getNormalChildren(h, options, renderOptionSlot)
  }
}
