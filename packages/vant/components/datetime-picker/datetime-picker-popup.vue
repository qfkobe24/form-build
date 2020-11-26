<template>
  <div>
    <van-cell @click="showPopup=true" :class="{'form-item-placeholder': !value}">
      <template v-if="value">{{value | formatValue(displayFormat)}}</template>
      <template v-else>{{placeholder}}</template>
    </van-cell>
    <van-popup
        v-model="showPopup"
        position="bottom" 
        get-container="body">
      <van-datetime-picker
        ref="picker"
        show-toolbar
        v-model="curVal"
        v-bind="injectProps"
        v-on="$listeners"
        @confirm="confirmSelect"
        @cancel="cancelSelect"/>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { isString, isDate } from '../../../utils'
import { AnyObject } from '../../../types'
import { handleError } from '../../../utils/error'
import dayjs from 'dayjs'

@Component({
  filters: {
    formatValue(val: Date | string, formatStr: string) {
      try {
        // 格式化显示日期
        if (isString(val) && formatStr) { // 时：分
          if (/^\d\d:\d\d$/.test(val)) {
            // 获取日期
            const now = new Date()
            val = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${val}`
            return dayjs(val).format(formatStr)
          }

          return val
        } else if (isDate(val)) { // Date
          return dayjs(val).format(formatStr)
        } else {
          return val
        }
      } catch (e) {
        handleError('datetime-picker', '"displayFormat"的值不合法，请检查')
        return val 
      }
    }
  }
})

export default class DatetimePicker extends Vue {
  @Prop({ default: null }) readonly value!: string | any[];
  @Prop({ default: '请选择' }) readonly placeholder!: string;
  @Prop({ default: '' }) readonly displayFormat!: string;
  @Prop({ default: () => ({}) }) readonly injectProps!: AnyObject;

  private showPopup: boolean = false
  private curVal: any = ''

  private cancelSelect(value: string) {
    this.showPopup = false
  }

  private confirmSelect(value: string) {
    this.$emit('input', value)
    this.showPopup = false
  }

  @Watch('value', { immediate: true, deep: true })
  private handle(val: string) {
    this.curVal = this.value
  }
}
</script>
