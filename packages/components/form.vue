<script lang="ts">
import { Component, Watch, Prop, Vue, Provide } from 'vue-property-decorator'
import { CreateElement, VNodeData } from 'vue'

import formItem from './form-item.vue'
import { handleError } from '../utils/error'

import { AnyObject, FormItem, LabelPosition, LabelAlign, ItemAlign, ContentAlign, ElSize } from '../types'

import { 
  isString,
  isEmpty,
  isFunction,
  isEmptyString,

  getType,
  deepCopy,
  deepObjectMerge,
  random,
  mergeFunction,
  isObject
} from '../utils'
import { valueMap, valueTypeMap, cpmTypes } from '../utils/components-config-map'
import EventBus from '../event'
import { ValidateOption } from 'async-validator'

const __eventBus = new EventBus()
@Component({
  components: {
    formItem
  }
})
export default class FormBuild extends Vue {
  formId: string = `fb${random(1, 1000)}`
  newFormList: FormItem[] = []
  fields: string[] = []
  rules = {}
  // vnode重写白名单
  reWriteVNodes = ['class', 'style', 'attrs', 'props', 'on', 'nativeOn', 'scopedSlots', 'slot', 'key', 'ref']

  @Prop({ default: () => [] }) formList!: FormItem[]
  @Prop({ default: () => ({}) }) model?: AnyObject

  // 改变formitem label的属性
  @Prop({ default: '80px' }) readonly labelWidth?: string | number
  @Prop({ default: 'left' }) readonly labelPosition?: LabelPosition
  @Prop({ default: 'left' }) readonly labelAlign?: LabelAlign
  @Prop({ default: 'center' }) readonly itemAlign?: ItemAlign
  @Prop({ type: [String, Number], default: 'auto' }) readonly contentWidth!: string | number
  @Prop(String) readonly contentAlign?: ContentAlign
  @Prop(Boolean) readonly inline?: boolean
  @Prop([String, Number]) readonly span?: number | string
  @Prop({ type: Boolean, default: true }) readonly showErrorMessage?: boolean

  // 改变formitem content的属性，为了方法往下子组件调用这类属性放到provide
  @Prop(String) readonly elSize?: ElSize
  @Prop({ default: false }) readonly disabled?: boolean;

  @Provide() size = this.elSize;
  @Provide('disabled') globalDisabled = this.disabled;

  validateField(fields: string | string[], validateOption: ValidateOption) {  
    let valid = true
    const validatefields = this.fields.filter((field) => fields.includes(field))
    let invalidFields = {}
    validatefields.forEach(field => {
      this.getFormItemById(field).validate(validateOption, (message: string, fields: any) => {
        if (message) {
          valid = false
        }
        invalidFields = Object.assign({}, invalidFields, fields)
      })
    })
    return new Promise((resolve, reject) => valid ? resolve() : reject(invalidFields))
  }

  validate(validateOption: ValidateOption = {}) {
    return this.validateField(this.fields, validateOption)
  }

  // validate({ files, validateOption }) {  
  //   let valid = true
  //   // if (this.fields.length === 0) {
  //   //   return Promise.resolve();
  //   // }
  //   // [TODO] handle
  //   let invalidFields = {}
  //   this.fields.forEach(field => {
  //     this.getFormItemById(field).validate(validateOption, (message: string, fields: any) => {
  //       if (message) {
  //         valid = false
  //       }
  //       invalidFields = Object.assign({}, invalidFields, fields)
  //     })
  //   })
  //   return new Promise((resolve, reject) => valid ? resolve() : reject(invalidFields))
  // }

  reset() {
    this.newFormList.forEach((item: FormItem) => {
      const { id, inputFormat } = item
      // 自定义组件兼容
      let value = valueMap[item.component]
      if (isFunction(item.component) || isObject(item.component)) {
        value = isEmpty(item.defaultValue) ? null : item.defaultValue
      }
      
      // val = isFunction(inputFormat) 
      //   ? inputFormat(val, item, this.model)
      //   : val
      
      this.$set((this.model as any), id, value)
      
      this.getFormItemById(id).clearValidate()
    })
  }

  submit() {
    return this.validate().then(() => {
      const model = deepCopy(this.model)
      this.newFormList
        .filter((item: FormItem) => isFunction(item.outputFormat) || item.hidden)
        .forEach((item: FormItem) => {
          const { id, outputFormat, hidden } = item
          if (hidden) {
            delete (model as any)[id]
          } else {
            // 返回字符串或者对象的处理
            const obj = outputFormat((model as any)[id], item, this.model)
            Object.assign(model, isObject(obj) ? obj : { [id]: obj })
          }
        })
      return Promise.resolve(model)
    }).catch((fields: any) => {
      return Promise.reject(fields)
    })
  }

  getFormItemById(id: string) {
    return this.$refs[`form-item-${id}`] as formItem
  }

  @Watch('formList', { immediate: true })
  private handle(list: FormItem[], oldlist: FormItem[]) {
    this.newFormList = this.getValidList(list)
    
    this.getPushList(this.newFormList, oldlist)
      .forEach((item: FormItem) => {
        this.fields.push(item.id)
        this.setPropForModel(item)
        this.setListenEvent(item)
      })
  }

  @Watch('model')
  private handleModel(obj: any) {
    Object.keys(obj).forEach((key: string) => {
      const item = this.formList.find((i: FormItem) => i.id === key)
      if (item) {
        const { id, inputFormat, component } = item
        let val: any = obj[key]
        
        val = isFunction(inputFormat) && val
          ? inputFormat(val, item, this.model)
          : val
        this.$set((this as any).model, id, val)
      }
    })
  }

  /**
   * 获取有效的list
   * @description component !== 'static', 过滤 1.id为空 2.id重复 3. 类型不存在的
   * @return list
   */
  private getValidList(list: FormItem[]) {
    const set = new Set()
    return list.filter((item: FormItem, index: number) => {
      const { id, component, renderStatic } = item
      const isValid = isEmpty(id) || isEmptyString(id)
      const isExisted = set.has(id)
      const isStaticItem = isFunction(renderStatic)
      const isSupportCpm = isString(component) ? cpmTypes.includes(component) : true
      const tips = '配置错误'
      set.add(id)

      if (isStaticItem) {
        return item
      } else if (isValid) {
        handleError(tips, `formList[${index}]的id是必填字段`, 'warn')
      } else if (isExisted) {
        handleError(tips, `formList[${index}]的id = ${item.id}已被使用，formList配置项id需唯一，请重新设置！`, 'warn')
      } else if (!isSupportCpm) {
        handleError(tips, `（formList[${index}]的id = ${item.id}）暂不支持${component}类型的组件，仅支持${JSON.stringify(cpmTypes)}`, 'warn')
      } else {
        return item
      }
    })
  }

  private getPushList(list: FormItem[] = [], oldList: FormItem[] = []) {
    return list.filter((item: FormItem, index: number) => {
      return !isFunction(item.renderStatic) && !this.fields.includes(item.id)
    })
  }

  private setPropForModel(item: FormItem) {
    const { id, defaultValue, inputFormat, component } = item

    let value = isString(component) ? valueMap[component] : null
    let valueType = isString(component) ? valueTypeMap[component] : null
    // 部分组件的值类型需要通过配置项具体区分
    if (isFunction(valueType)) {
      valueType = valueType(item.props || {})
      // 根据类型获取默认值
      value = this.getCompDefaultValue(valueType, component)
    }
    
    let val: any = (this as any).model[id] || defaultValue
    if (isEmpty(val)) {
      val = value
    } else {
      val = isFunction(inputFormat) ? inputFormat(val, item, this.model) : val
    }
    this.$set((this as any).model, id, val)

    // 未提前设置定义类型，不做类型检测
    if (!isEmpty(valueType) && !valueType.includes(getType(val))) {
      handleError(component, `key为${id}表单配置项，默认值类型应该为${valueType}类型，请检查类型或使用inputFormat进行数据处理`)
    }
  }

  private setListenEvent(item: FormItem) {
    __eventBus.on(item, this.model)
  }

  /**
   * 根据类型获取默认值
   * @param valueType 组件类型
   * @param component 组件类型
   * 
   */
  private getCompDefaultValue(valueType: string, component: string): any {
    if (!isString(valueType)) {
      handleError('form', `component为"${component}"的组件valueType异常，请检查`, 'warn')

      return
    }

    valueType = valueType.split(',')[0]

    // 默认值映射表
    const COMPONENT_VALUE_MAP = {
      string: '',
      number: 0,
      boolean: false,
      array: [],
      object: {},
      date: new Date()
    }

    const defaultValue = COMPONENT_VALUE_MAP[valueType]

    return isEmpty(defaultValue) ? null : defaultValue
  }

  private getFormItemProps(item: FormItem) {
    const { model, labelWidth, labelPosition, labelAlign, itemAlign, contentAlign, inline, span, disabled, showErrorMessage, contentWidth } = this
    const config: any = {
      value: (model as any)[item.id],
      labelWidth,
      contentWidth,
      labelPosition,
      labelAlign,
      contentAlign,
      itemAlign,
      inline,
      disabled,
      showErrorMessage,
      col: {
        span: inline ? span : null
      }
    }

    // 将白名单的vnodedata字段，包装到vdata节点上
    const createVData = (obj: FormItem, reWriteVNodes: string[]) => {
      const vData: VNodeData = {}
      const temp = { vData }
      const events = __eventBus.getEventsById(obj.id)
      let hasOnKey = false
      Object.keys(item).forEach((key: string) => {
        if (reWriteVNodes.includes(key)) {
          if (key === 'on') { // 合并事件
            hasOnKey = true
            // const events = __eventBus.getEventsById(obj.id)
            temp.vData[key] = mergeFunction(obj.on, events)
          } else {
            temp.vData[key] = item[key]
          }
        } else {
          temp[key] = item[key]
        }
      })
      
      if (!hasOnKey) {
        temp.vData.on = events
      }
      return temp
    }
    if (item.id === 'mark') {
      console.log('config', config)
      console.log('createVData(item, this.reWriteVNodes)', createVData(item, this.reWriteVNodes))
    }
    
    return deepObjectMerge(config, createVData(item, this.reWriteVNodes))
  }

  private render(h: CreateElement) {
    return h('div', [
      ...this.renderFormItem(h),
      this.$slots['action-button']
    ])
  }


  private renderFormItem(h: CreateElement) {
    return this.newFormList.map((item: FormItem) => {
      return h('form-item', {
        props: this.getFormItemProps(item),
        ref: `form-item-${item.id}`, 
        key: `item-${item.id}`,
        on: {
          valueChange: (val: any) => {
            (this.model as any)[item.id] = val
          },
          'hook:beforeDestroy': () => {
            const { listen, id } = item
            if (isObject(listen)) {
              Object.keys(listen).forEach((key: string) => {
                __eventBus.off(key, listen[key])
              })
            }
            
            this.$delete((this.model as any), id)
          }
        }
      })
    })
  }
}
</script>
