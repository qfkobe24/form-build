<script lang="ts">
import { Properties as CSSProperties } from 'csstype'
import AsyncValidator, { ErrorList, Rules, FieldErrorList, RuleItem, ValidateOption } from 'async-validator'
import { CreateElement, VNodeData, VNode } from 'vue'
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { getRenderConfigMap } from '../utils/components-config-map'
import { noop, deepObjectMerge, getCSSLength, getNumber, isObject, isFunction, isString, isEmptyArray, isEmptyObject, mergeFunction, isEmpty } from '../utils'
import { vNodeDataMerge } from '../utils/vNodeData'
import { AnyFunction, AnyObject, SelectOptions, RenderOptionSlot, LabelPosition, LabelAlign, ItemAlign, ContentAlign, ElSize } from '../types'

import Form from './form.vue'

interface Col {
  span?: number;
  offset?: number;
  push?: number;
  pull?: number;
}

type RenderFunction = (h: CreateElement, item?: FormItem, model?: any) => VNode

type RenderSlots = (h: CreateElement, value: any) => VNode[]

type ElementChild = string | VNode

@Component({
  name: 'FormItem'
})
export default class FormItem extends Vue {
  @Prop(String) readonly id!: string
  @Prop([String, Object, Function]) readonly component!: string | AnyObject | AnyFunction
  @Prop(String) readonly label!: string
  @Prop([String, Number]) readonly labelWidth!: string | number
  @Prop({ type: [String, Number], default: 'auto' }) readonly contentWidth!: string | number
  @Prop(String) readonly labelPosition!: LabelPosition
  @Prop(String) readonly labelAlign!: LabelAlign
  @Prop(String) readonly itemAlign!: ItemAlign
  @Prop({ default: () => ({}) }) readonly vData!: VNodeData
  @Prop(Object) readonly itemStyle?: CSSProperties
  @Prop(String) readonly contentAlign?: ContentAlign
  @Prop({ type: Boolean, default: false }) readonly required?: boolean
  @Prop(Array) readonly options?: SelectOptions[]
  @Prop([Object, Array]) readonly rules?: Rules
  @Prop(Number) readonly gutter?: number
  @Prop(Object) readonly col?: Col
  @Prop(String) readonly validateTrigger?: string 
  @Prop(Boolean) readonly inline?: boolean
  @Prop(Boolean) readonly hidden?: boolean
  @Prop({ type: Boolean, default: true }) readonly showErrorMessage?: boolean
  @Prop(Function) readonly renderLabel?: RenderFunction
  @Prop(Function) readonly renderStatic?: RenderFunction
  @Prop(Function) readonly renderOptionSlot?: RenderOptionSlot
  @Prop(Function) readonly prepend?: RenderFunction
  @Prop(Function) readonly append?: RenderFunction
  @Prop(Function) readonly renderSlots?: RenderSlots
  @Prop() readonly value: any

  @Inject() readonly 'size'?: ElSize
  @Inject() readonly 'disabled'?: boolean
  
  private validateState = '' 
  private validateMessage = ''

  get isError() {
    return this.validateState === 'error'
  }

  get isMobileUI(): boolean {
    return ['vant'].includes((this as any).$currentUIName)
  }

  get injectProps() {
    const { disabled, size } = this
    
    return {
      props: {
        disabled: Boolean(disabled),
        size: (this as any).$currentUIName === 'element-ui' ? size : null
      }
    }
  }

  get validateEvent() {
    const { validateTrigger } = this
    if (!validateTrigger) return
    const event = validateTrigger === 'change' || !validateTrigger ? 'input' : validateTrigger
    return {
      on: {
        [event]: () => {
          const timer = setTimeout(() => {
            this.validate()
            clearTimeout(timer)
          }, 0)
        }
      }
    }
  }
  
  get vDataOfBindValue() {
    const { value } = this
    return {
      props: {
        value
      },
      on: {
        input: (val: any) => {
          this.$emit('valueChange', val)
        }
      }
    }
  }

  get formatedRules() {
    const { rules } = this
    let selfRules: RuleItem[]
    const requiredSetting = {
      required: !!this.required,
      message: `${this.label}为必填`,
    }


    if (rules instanceof Array) {
      selfRules = rules
    } else {
      selfRules = rules ? [rules] : []
    }

    const hasRequiredRule = selfRules && selfRules.length && selfRules.filter(rule => !isEmpty(rule.required)).length
    const requiredRule: any = this.required !== undefined && !hasRequiredRule ? [requiredSetting] : []

    // return selfRules.concat(requiredRule)
    return requiredRule.concat(selfRules)
  }

  validate(validateOption: ValidateOption = {}, callback: AnyFunction = noop) {
    const rules = this.formatedRules
    const isEmptyRule = !rules && isEmptyArray(rules)
    if ((isEmptyRule && this.required === undefined) || this.hidden) {
      callback()
      return
    }

    this.validateState = 'validating'

    const descriptor = {}
    const model = {}    

    // if (rules && rules.length > 0) {
    //   rules.forEach((rule: any) => {
    //     delete rule.trigger
    //   })
    // }
    
    descriptor[this.id] = rules
    model[this.id] = this.value
    const validator = new AsyncValidator(descriptor)
    
    validator.validate(model, { firstFields: true, ...validateOption }, (errors: ErrorList, invalidFields: FieldErrorList): void => {
      this.validateState = !errors ? 'success' : 'error'
      this.validateMessage = errors ? errors[0].message : ''
      callback(this.validateMessage, invalidFields)
    })
  }

  clearValidate() {
    this.validateState = ''
    this.validateMessage = ''
  }

  private getLabelClass(): Record<string, unknown> {
    return {
      'form-item__label': true,
      'form-item__label--align-right': this.labelAlign === 'right',
      'form-item__label--align-justify': this.labelAlign === 'justify'
    }
  }

  private getLabelWrapperStyle(): CSSProperties {
    const { labelWidth } = this
    const width: string = getCSSLength(labelWidth)
    return { width, flexShrink: 0 }
  }
  
  private getGridStyle(): CSSProperties {
    let { span, offset, pull, push } = this.col || {}
    span = getNumber(span)
    offset = getNumber(offset)
    pull = getNumber(pull)
    push = getNumber(push)
    const toFixed = (value: number, n = 5) => Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
    const getSize = (val: number) => val ? toFixed(val / 0.24) + '%' : undefined
    const width = getSize(span)
    const offsetLeft = getSize(offset)
    const right = getSize(pull)
    const left = getSize(push)

    // 计算左右边距
    const marginLeft = this.gutter ? parseInt(this.gutter.toString(), 10) / 2 + 'px' : undefined
    // let marginRight = marginLeft || null

    // // 如果有左右边距，重新计算宽度
    // if (marginLeft) {
    //   width = `calc(${width} - ${parseInt(this.gutter)})`
    // }

    // if (offsetLeft) {
    //   marginLeft = marginLeft ? `calc(${marginLeft} + ${offsetLeft})` : offsetLeft
    // }

    return {
      display: this.inline ? 'inline-flex' : 'flex',
      width,
      marginLeft: offsetLeft,
      paddingLeft: marginLeft,
      paddingRight: marginLeft,
      right,
      left
    }
  }

  private getFormItemStyle(): CSSProperties {
    const style: CSSProperties = {}

    if (this.col && this.inline) {
      const gridStyle: CSSProperties = this.getGridStyle() // 栅格化的样式
      
      Object.assign(style, gridStyle)
    }
    return style
  }

  private getFormItemClass(): Record<string, unknown> {
    return {
      'form-item': true,
      mobile: this.isMobileUI,
      pc: !this.isMobileUI,
      'form-item--inline': this.inline,
      // 'form-item--align-top': this.itemAlign === 'top',
      // 'form-item--vertical': this.labelPosition === 'top',
      'form-item--error': this.isError,
      'form-item--hidden': this.hidden
    }
  }

  private getFormItemInnerClass(): Record<string, unknown> {
    return {
      'form-item-inner': true,
      'form-item-inner--align-top': this.itemAlign === 'top',
      'form-item-inner--vertical': this.labelPosition === 'top',
    }
  }

  private getMessageClass(): Record<string, unknown> {
    const { isMobileUI } = this
    return {
      'form-item__message': true,
      'form-item__message--hidden': !this.showErrorMessage,
      pc: !isMobileUI,
      mobile: isMobileUI,
    }
  }

  private getChildrenSlots(h: CreateElement): VNode[] {
    const { renderSlots } = this
    let slots: VNode[] = []
    if (renderSlots && isFunction(renderSlots)) {      
      slots = slots.concat(renderSlots(h, this.value))
    }    
    return slots
  }

  private createLable(h: CreateElement): ElementChild {
    if (this.renderLabel) {
      const { model, formList } = this.$parent as Form 
      return this.renderLabel(h, formList[this.id], model)
    }

    if (!this.label) { return '' }

    const requiredVNode = h('div', { class: 'form-item__required' }, '*')
    const labelVNode = h('div', { class: this.getLabelClass() }, this.label)

    return h('div', {
      class: 'form-item__label-wrapper',
      style: this.getLabelWrapperStyle(),
    }, [
      this.required ? requiredVNode : '',
      labelVNode
    ])
  }

  private createFormItem(h: CreateElement): ElementChild[] {
    return [
      this.createLable(h),
      this.createContent(h),
    ]
  }

  private createContent(h: CreateElement): ElementChild {
    return h('div', { 
      class: {
        'form-item__content': true,
        // 'form-item__content--align-right': this.contentAlign === 'right',
        // 'form-item__content--align-center': this.contentAlign === 'center'
      } 
    }, [
      this.createChildren(h),
      this.createMessage(h),
    ])
  }

  private createChildren(h: CreateElement): ElementChild {
    const { append, prepend, contentAlign } = this
    const { model, formList } = this.$parent as Form
    const slots = this.getChildrenSlots(h)

    let tag: string | AnyObject = ''
    let data = {}
    let initvData = {}
    let formChildren = null

    if (isFunction(this.component) || isObject(this.component)) {
      tag = this.component
      data = vNodeDataMerge(this.injectProps, this.vData, this.vDataOfBindValue, this.validateEvent)
      formChildren = slots
    } else if (isString(this.component)) {
      [tag, initvData, formChildren] = getRenderConfigMap[this.component](h, slots, this)
      data = vNodeDataMerge(initvData, this.injectProps, this.vData, this.vDataOfBindValue, this.validateEvent)
    }

    this.id === 'oldPassword' && console.log('data ===>', data)
    

    const formChild = h(tag, data, formChildren)

    const justifyContentMap = {
      right: 'flex-end',
      center: 'center',
      left: 'flex-start',
    }
    
    return h('div', { 
      class: 'form-item__content-main',
      style: { 
        justifyContent: contentAlign ? justifyContentMap[contentAlign] : 'flex-start' 
      } 
    }, [
      prepend ? prepend(h, formList[this.id], model) : '',
      h('div', { style: { width: this.contentWidth }, class: 'form-child-wrapper' }, [formChild]),
      append ? append(h, formList[this.id], model) : '',
    ])
  }

  private createMessage(h: CreateElement): ElementChild {
    if (!this.validateMessage || this.validateState !== 'error') {
      return ''
    }
    return h('transition', 
      { props: { name: 'form-item-zoom-in-top', appear: true } }, 
      [
        h('div', { class: this.getMessageClass() }, this.validateMessage)
      ]
    )
  }

  private render(h: CreateElement) {
    const { renderStatic } = this
    if (renderStatic && isFunction(renderStatic)) {
      return renderStatic(h)
    }

    return h('div', { 
      // class: {
      //   'form-item-wrapper': true,
      //   'form-item-wrapper--inline': this.inline
      // },
      class: this.getFormItemClass(),
      style: Object.assign(this.getFormItemStyle(), this.itemStyle) 
    }, [
      h('div', {
        class: this.getFormItemInnerClass(),
        // style: this.itemStyle,
      }, this.createFormItem(h))
    ])
  }
}
</script>

<style scoped>
.form-item {
  --accent-color: #f56c6c;
  --offset-left: 10px;


  margin-bottom: 22px;
  background-color: #fff;
  position: relative;
  margin-left: var(--offset-left);
}

.form-item--inline {
  display: inline-block;
}
.form-item.mobile {
  /* margin: 0 10px;
  padding: 10px 0; */
  margin-bottom: 0;
}

.form-item-inner {
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
}
.form-item-inner--align-top {
  align-items: flex-start;
}
.form-item-inner--vertical {
  flex-direction: column;
  align-items: flex-start;
}
.form-item.mobile .form-item-inner {
  margin: 0 10px;
  padding: 10px 0;
  border-color: #eee;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}

.form-item.mobile /deep/.van-cell {
  padding: 0
}

/** placeholder */
.form-item.mobile /deep/.form-item-placeholder * {
  color: #ccc;
}

.form-item--error.pc /deep/.el-input__inner {
  border-color: var(--accent-color);
}
.form-item--error.pc /deep/.el-input__inner:focus {
  border-color: var(--accent-color);
}
.form-item--error.pc /deep/.el-textarea__inner {
  border-color: var(--accent-color);
}
.form-item--error.pc /deep/.el-textarea__inner:focus {
  border-color: var(--accent-color);
}
.form-item--error.mobile { 
  border-color: var(--accent-color);
}
.form-item--hidden {
  display: none;
}

.form-item__label-wrapper {
  position: relative;
  left: 0;
  top: 0;
}
.form-item__label {
  font-size: 14px;
  color: #606266;
}
.form-item__required {
  content: '*';
  color: var(--accent-color);
  position: absolute;
  left: calc(var(--offset-left) * -1);
  top: 0;
  font-size: 16px;
}
.form-item__label--align-right {
  text-align: right;    
}
.form-item__label--align-justify {
  text-align: justify;
  height: 24px;
  line-height: 24px;
}
.form-item__label--align-justify::after {
  display: inline-block;
  content: '';
  width: 100%;
  height: 0;
  overflow: hidden;
}
.form-item-inner--vertical .form-item__label{
  margin-bottom: 4px;
}

.form-item__content {
  position: relative;
  left: 0;
  top: 0;
  margin-left: 15px;
  flex-grow: 1;
}
.form-item-inner--vertical .form-item__content {
  margin-left: 0;
}
.form-item.mobile .form-item__content{
  flex-grow: 1;
}
.form-item__content--align-center {
  justify-content: center;
}
.form-item__content--align-right {
  justify-content: flex-end;
}

.form-item__content .default-slider {
  width: 500px;
}

.form-item__content-main {
  display: flex;
  width: 100%;
  align-items: center;
}

.form-child-wrapper {
  flex-grow: 1
}

.form-item__message {
  position: absolute;
  left: 0;
  font-size: 10px;
  color: var(--accent-color);
}
.form-item__message.form-item__message--hidden {
  display: none;
}
.form-item__message.pc {
  top: 100%;
}
.form-item__message.mobile {
  bottom: -10px;
  right: 0;
  text-align: right;
}

.form-item-zoom-in-top-enter-active,
.form-item-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}
.form-item-zoom-in-top-enter,
.form-item-zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
</style>
