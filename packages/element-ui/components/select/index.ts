import { CreateElement, VNode } from 'vue'
import { isFunction, isArray, copyUnNullProps } from '../../../utils'
import { AnyObject } from '../../../types'

interface Option {
  label: string;
  disabled: boolean;
  value?: any;
  options?: Option;
  [propName: string]: any;
}

interface RenderOptionSlot {
  (h: CreateElement, option: Option, index: number): VNode;
}

export function valueType(itemProps: any) {
  const { multiple } = itemProps
  if (multiple) {
    return 'array'
  } else {
    return 'string,number'
  }
}

export function getRenderConfig(h: CreateElement, slots: VNode[], ctx?: any) {
  let options: Option[] = []
  const renderOptionSlot: RenderOptionSlot = ctx.$props.renderOptionSlot

  try {
    options = ctx.$props.options
  } catch (e) {
    options = []
  }

  return [
    'el-select',
    {},
    [
      ...options.map((option: Option, index: number) => {
        return getSelectOption(h, option, index, renderOptionSlot)
      }),
      ...slots
    ]
  ]
}

/**
 * 获取选项vNode
 * @param h 
 * @param option 选项/分组
 */
function getSelectOption(h: CreateElement, option: Option, index: number, renderOptionSlot: RenderOptionSlot):VNode {
  // 是分组
  if (isArray(option.options)) {
    return h('el-option-group', {
      props: {
        key: index + '' + (option as any).label,
        ...copyUnNullProps(option, 'label', 'disabled')
      }
    }, [
      ...option.options.map((optionItem: Option, itemIindex: number) => {
        return getSelectOption(h, optionItem, itemIindex, renderOptionSlot)
      })
    ])
  } else {
    let customOptionSlot: VNode | string = ''

    if (isFunction(renderOptionSlot)) {
      customOptionSlot = renderOptionSlot(h, option, index)
    }

    return h('el-option', {
      props: {
        key: index + '' + (option as any).value,
        ...option
      }
    }, [customOptionSlot])
  }
}
