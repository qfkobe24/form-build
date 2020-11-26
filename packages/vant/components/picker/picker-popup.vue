<template>
  <div>
    <van-cell @click="openPicker" :class="{'form-item-placeholder': !selectedLabelStr}">{{selectedLabelStr || placeholder}}</van-cell>
    <van-popup
        v-model="showPopup"
        position="bottom" 
        get-container="body">
      <van-picker
        ref="picker"
        show-toolbar 
        :title="label" 
        :columns="columns" 
        :valueKey="valueKey" 
        @confirm="confirmSelect"
        @cancel="cancelSelect" />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { isString, isNumber, isEmpty, isObject, isArray, toArray } from '../../../utils'
import PickerSeek from './picker-seek'
import { SelectedOption, SelectedItem, SelectedItems, SelectedValue, SelectedIndex, PickerIndex, PickerValue } from '../../types/picker'
import { Picker as vPicker } from 'vant/types'

@Component({

})
export default class Picker extends Vue {
  @Prop({ default: 'col' }) readonly type!: string; // 选择器类型 单列：'col' 多列：'cols' 级联： 'cascader'
  @Prop({ default: null }) readonly value!: string | any[];
  @Prop({ default: '' }) readonly label!: string | any[];
  @Prop({ default: '请选择' }) readonly placeholder!: string;
  @Prop({ default: 'text' }) readonly valueKey!: string; // 选项显示字段
  @Prop({ default: '' }) readonly realValueKey!: string; // 选项选中值对应字段
  @Prop({ default: () => [] }) readonly columns!: any[]; // 列数据

  private showPopup: boolean = false
  private selectedItem: SelectedOption = [] // 当前选中项的值（字符串/对象）
  private selectedValue: SelectedValue = '' // 当前选中值
  private selectedIndex: SelectedIndex = -1 // 当前选中值索引

  get selectedLabelStr(): string {
    if (isString(this.selectedItem) || isNumber(this.selectedItem)) { // 单列，选项为简单类型
      return this.selectedItem as string
    } else if (isObject(this.selectedItem)) { // 选项为对象类型
      return this.selectedItem[this.valueKey]
    } else if (isArray(this.selectedItem)) {
      return (this.selectedItem as any[]).map((item: SelectedItem) => {
        if (isString(item) || isNumber(item)) {
          return item
        } else if (isObject(item)) {
          return item[this.valueKey] 
        } else {
          return ''
        }
      }).join(',')
    } else {
      return ''
    }
  }

  private openPicker() {
    this.showPopup = true
    this.setPickerIndex()
  }

  private confirmSelect(item: SelectedItem, index: SelectedIndex): void {
    this.showPopup = false
    
    // this.initPicker()
    const { selectedValue, selectedItem }: {selectedValue: SelectedValue, selectedItem: SelectedItem} = 
    PickerSeek.getValueByIndex(
      this.columns,
      index,
      this.type,
      this.realValueKey || this.valueKey)

    this.selectedIndex = index
    this.selectedValue = selectedValue
    this.selectedItem = selectedItem

    this.$nextTick(() => {
      this.$emit('input', this.selectedValue)
    })
  }

  private cancelSelect() {
    this.showPopup = false
    this.setPickerIndex()
  }

  /**
   * 设置picker的索引
   * @param isNextTick 是否是异步请求
   */
  private setPickerIndex(isNextTick = false) {
    if (this.$refs.picker) {
      (this.$refs.picker as vPicker).setIndexes(toArray(this.selectedIndex))
    } else if (!isNextTick) { // picker第一次显示之前在DOM 中还不存在
      this.$nextTick(() => {
        this.setPickerIndex(true)
      })
    }
  }

  /**
   * 设置picker的值
   */
  // private setValues() {
  //   this.$refs.picker.setValues(this.selectedValue)
  // }

  // private initPicker() {
  //   if (PickerSeek) return

  //   PickerSeek = new PickerSeek()
  // }

  @Watch('value', { immediate: true, deep: true })
  private handle(val: SelectedValue) {
    if (JSON.stringify(val) !== JSON.stringify(this.selectedValue)) {
      this.selectedValue = val
      // 重新计算selectedItem和selectedIndex
      // this.initPicker()

      const { selectedIndex, selectedItem }: {selectedIndex: SelectedIndex, selectedItem: SelectedItem} =
      PickerSeek.getIndexByValue(
        this.columns,
        val,
        this.type,
        this.realValueKey || this.valueKey)

      this.selectedIndex = selectedIndex
      this.selectedItem = selectedItem

      this.setPickerIndex()
    }
  }
}
</script>
