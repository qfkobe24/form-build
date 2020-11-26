import Vue from 'vue'
import { isEmpty } from '../utils'
import { FormItem, AnyFunction } from '../types'

export default class EventBus {
  bus: any
  events: object = {}
  constructor() {
    this.bus = new Vue()
  }

  /**
   * 注册监听
   * @param item 表单配置项
   * @param model 表单数据模型
   */
  on(item: FormItem, model: any) {
    if (item.listen) {
      Object.keys(item.listen).forEach((key: string) => {
        if (!key.includes(':')) {
          return
        }
        this.bus.$on(key, (val: any) => {
          item.listen[key](val, item, model)
        })
        this.addEvent(key.split(':')[0], key.split(':')[1])
      })
    }
  }

  addEvent(id: string, event: string) {
    if (isEmpty(this.events[id])) {
      this.events[id] = {}
    }
    if (isEmpty(this.events[id][event])) {
      this.events[id] = {
        [event]: (val: any) => {
          this.bus.$emit(`${id}:${event}`, val)
        }
      }
    }
  }

  getEventsById(id: string) {
    return this.events[id] || {}
  }
  
  emit(eventName: string, ...other: any) {
    this.bus.$emit(eventName, other)
  }

  off(eventName: string, cb: AnyFunction) {
    this.bus.$off([eventName, cb])
  }
}