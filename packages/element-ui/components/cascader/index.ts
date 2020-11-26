import { CreateElement } from 'vue'

export const value: any[] = []
export function valueType(itemProps: any) {
  const { props = {} } = itemProps
  const { multiple = false, emitPath = true } : { multiple: boolean, emitPath: boolean } = props

  if (!multiple && !emitPath) {
    return 'string,number'
  } else {
    return 'array'
  }
}

export function getRenderConfig(h: CreateElement) {
  return [
    'el-cascader',
    {},
    []
  ]
}
