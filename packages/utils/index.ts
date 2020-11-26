import { AnyFunction, AnyObject } from '../types'


/**
 * 获取变量类型
 * @param value 变量
 * @return number|string|array|object|null|undefined|function
 */
export function getType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

function isType(type: string) {
  return (value: any) => getType(value) === type
}

export function isNumber(value: any): value is number {
  return isType('number')(value)
}

export function isString(value: any): value is string {
  return isType('string')(value)
}

export function isObject(value: any): value is AnyObject {
  return isType('object')(value)
}

export function isPureObject(value: any): value is AnyObject {
  return value && value.constructor && (value.constructor === Object)
}

export function isBoolean(value: any): value is boolean {
  return isType('boolean')(value)
}

export function isArray(value: any): value is any[] {
  return isType('array')(value)
}

export function isNull(value: any): value is null {
  return isType('null')(value)
}

export function isUndefined(value: any): value is undefined {
  return isType('undefined')(value)
}

export function isFunction(value: any): value is AnyFunction {
  return isType('function')(value)
}

export function isDate(value: any): value is Date {
  return isType('date')(value)
}


export function isEmpty(value: any): value is null | undefined {
  return isNull(value) || isUndefined(value)
}

export function isEmptyString(value: any): value is '' {
  return value === ''
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmptyObject(value: any): value is {} {
  return JSON.stringify(value) === '{}'
}


export function isEmptyArray(value: any): value is [] {
  return JSON.stringify(value) === '[]'
}

export function toArray<T>(array: T | T[]): T[] {
  return (isArray(array) ? array : [array])
}

export function deepCopy<T>(obj: T): T {
  let newobj: any
  if (typeof obj !== 'object') {
    newobj = obj
  } else {
    newobj = isObject(obj) ? {} : []
    for (const i of Object.keys(obj)) {
      newobj[i] = isObject(obj[i]) ? deepCopy(obj[i]) : obj[i]
    }
  }
  return newobj
}

export function getCSSLength(val: number | string): string {
  let length: string
  if (isNumber(val)) {
    length = val.toString() + 'px'
  } else {
    length = /px|em|rem|%/g.test(val) ? val : val + 'px'
  }
  return length
}

export function getNumber(val: string | number | undefined): number {
  if (!val && val !== 0) {
    return 0
  } else if (isNumber(val)) { return val }
  return +(val.replace(/[^0-9]/ig, ''))
}

export function noop(): void {}

export function deepObjectMerge(...args: any[]): AnyObject {
  const newObj = {}

  const merge = (obj: AnyObject) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (isPureObject(obj[prop])) {
          newObj[prop] = deepObjectMerge(newObj[prop], obj[prop])
        } else {
          newObj[prop] = obj[prop]
        }
      }
    }
  }

  args.forEach((item: Record<string, any>) => merge(item))
  return newObj
}

/**
 * 
 * @param obj 拷贝对象中的不为空的某些属性
 * @param props 
 */
export function copyUnNullProps(obj: AnyObject, ...props: string[]): AnyObject {
  const newObj = {}

  props.forEach(prop => {
    if (obj.hasOwnProperty(prop)) {
      if (isObject(obj[prop])) {
        newObj[prop] = deepCopy(obj[prop])
      } else {
        newObj[prop] = obj[prop]
      }
    }
  })

  return newObj
}

export function random (MIN: number, MAX: number) {
  return Math.floor(Math.random() * (MAX - MIN)) + MIN
}


/**
 * 合并同名函数
 * @param args 对象集合
 * @description 将对象中同名函数合并成队列
 */
export function mergeFunction (...args: any[]) {
  const newObj = {}
  const merge = (obj: AnyObject = {}) => {
    if (!isObject(obj)) return

    for (const prop in obj) {
      if (isEmpty(newObj[prop])) {
        newObj[prop] = []
      }
      if (isArray(obj[prop])) {
        newObj[prop].push(...obj[prop])
      } else if (isFunction(obj[prop])) {
        newObj[prop].push(obj[prop])
      } else {
        newObj[prop] = obj[prop]
      }
    }
  }

  args.forEach((item: Record<string, any>) => merge(item))
  return newObj
}
