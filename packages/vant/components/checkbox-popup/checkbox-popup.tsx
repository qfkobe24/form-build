import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { isBoolean, isFunction, isArray } from '../../../utils'
import { RenderOptionSlot, AnyObject } from '../../../types'

@Component({

})
export default class CheckboxPopup extends Vue {
  @Prop({ default: () => [] }) readonly value!: any[];
  @Prop({ default: () => ({}) }) readonly contentStyle?: AnyObject;
  @Prop({ default: () => [] }) readonly options!: any[]; // 选项数据
  @Prop({ default: '请选择' }) readonly placeholder!: string;
  @Prop({ default: () => ({}) }) readonly injectProps!: AnyObject;
  @Prop(Function) readonly renderOptionSlot!: RenderOptionSlot

  private showPopup: boolean = false
  private defaultStyle: AnyObject = { // 默认样式
    maxHeight: '400px'
  }

  private selectedValue: any[] = [] // 当前选中值

  get valueStr(): string {
    if (isArray(this.value)) {
      const selectedOptions = this.options.filter(item => this.selectedValue.includes(item.name))
      return selectedOptions.map(item => item.text).join(',')
    } else {
      return ''
    }
  }

  private render(h: CreateElement) {
    return h('div', {}, [
      this.renderCell(h),
      this.renderPopup(h)
    ])
  }

  private renderCell(h: CreateElement) {
    return (<van-cell 
      onClick = {this.togglePopup}
      class={this.valueStr ? '' : 'form-item-placeholder'}>{this.valueStr || this.placeholder}</van-cell>)
  }

  private renderPopup(h: CreateElement) {
    return h('van-popup', {
      props: {
        value: this.showPopup,
        position: 'bottom',
        'get-container': 'body',
      },
      on: {
        close: this.confirmSelect,
        input: this.togglePopup
      }
    }, [
      h('van-checkbox-group', {
        style: {
          ...this.defaultStyle, ...this.contentStyle
        },
        props: {
          value: this.selectedValue,
          ...this.injectProps
        },
        on: {
          input: this.handleValueChange
        }
      }, this.renderCheckbox(h))
    ])
  }

  private renderCheckbox(h: CreateElement) {
    return this.options.map((item: any, index: number) => {
      return h('van-cell', {
        props: {
          clickable: true,
          key: item.name
        },
        on: {
          click: () => this.toggle(index)
        }
      }, [
        h('van-checkbox', {
          props: item,
          ref: 'checkboxes',
          slot: 'right-icon'
        }),
        isFunction(this.renderOptionSlot) ? this.renderOptionSlot(h, item) : item.text || item.name
      ])
    })
  }

  private togglePopup(state?: boolean) {
    if (isBoolean(state)) {
      this.showPopup = state
    } else {
      this.showPopup = !this.showPopup
    }
  }

  private handleValueChange(val: any[]) {
    this.selectedValue = val
  }

  private confirmSelect(): void {
    this.$nextTick(() => {
      this.$emit('input', this.selectedValue)
    })
  }

  private toggle(index: number) {
    // TODO 处理最多选中个数限制问题
    const targetItem = this.options[index]
    const targetIndex = this.selectedValue.findIndex(item => item === targetItem.name)

    targetIndex >= 0 ? this.selectedValue.splice(targetIndex, 1) : this.selectedValue.push(targetItem.name)
  }

  @Watch('value', { immediate: true, deep: true })
  private handle<T>(val: T[]): void {
    if (JSON.stringify(val) !== JSON.stringify(this.selectedValue)) {
      this.selectedValue = val
    }
  }
}
