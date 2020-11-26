import { AnyObject } from '../types'
import { deepObjectMerge, isObject, mergeFunction } from './index'

/**
 * 
 * @param args 合并vNodeData
 */
export function vNodeDataMerge(...args: any[]): AnyObject {
  const newObj = {}

  const merge = (obj: AnyObject) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop === 'on' || prop === 'nativeOn') {
          newObj[prop] = mergeFunction(obj[prop], newObj[prop] || {})
        } else {
          if (isObject(obj[prop])) {
            newObj[prop] = deepObjectMerge(newObj[prop], obj[prop])
          } else {
            newObj[prop] = obj[prop]
          }
        }
      }
    }
  }

  args.forEach((item: Record<string, any>) => merge(item))
  return newObj
}