import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { isFunction, isBoolean } from '../../../utils'
import { RenderOptionSlot, AnyObject } from '../../../types'

@Component({

})
export default class RadioPopup extends Vue {
  @Prop({ default: () => '' }) readonly value!: string;
  @Prop({ default: () => ({}) }) readonly contentStyle?: AnyObject;
  @Prop({ default: () => [] }) readonly options!: any[]; // 选项数据
  @Prop({ default: '请选择' }) readonly placeholder!: string;
  @Prop({ default: () => ({}) }) readonly injectProps!: AnyObject;
  @Prop(Function) readonly renderOptionSlot!: RenderOptionSlot

  private showPopup: boolean = false
  private defaultStyle: AnyObject = { // 默认样式
    maxHeight: '400px'
  }

  private selectedValue: string | number = '' // 当前选中值

  get valueStr(): string {
    const selectedItem = this.options.find(item => item.name === this.selectedValue)
    return selectedItem && selectedItem.text || ''
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
      h('van-radio-group', {
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
      }, this.renderRadio(h))
    ])
  }

  private renderRadio(h: CreateElement) {
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
        h('van-radio', {
          props: item,
          ref: 'radioes',
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

  private confirmSelect(): void {
    this.$nextTick(() => {
      this.$emit('input', this.selectedValue)
    })
  }

  private handleValueChange(val: string | number) {
    this.selectedValue = val
  }
  
  private toggle(index: number) {
    this.selectedValue = this.options[index].name
  }

  @Watch('value', { immediate: true, deep: true })
  private handle(val: string | number): void {
    if (val !== this.selectedValue) {
      this.selectedValue = val
    }
  }
}
