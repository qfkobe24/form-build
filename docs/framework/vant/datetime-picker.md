---
title: DatetimePicker 日期时间选择器
sidebarDepth: 1
---

### 基础用法

::: demo
<<< @/src/demo/vant-ui/datetime-picker/base.vue
:::

### 格式化

::: demo
<<< @/src/demo/vant-ui/datetime-picker/format.vue
:::

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 框占位提示文字 | _string_ | `请选择` |
| displayFormat | 格式化字符串，参考[dayjs](https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens) | _string_ | - |
| injectProps | [选择器属性配置](#injectprops) | _onject_ | - |

#### injectProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 时间类型，可选值为 `date` `time` <br> `year-month` `month-day` | _string_ | `datetime` |
| title | 顶部栏标题 | _string_ | `''` |
| confirm-button-text | 确认按钮文字 | _string_ | `确认` |
| cancel-button-text | 取消按钮文字 | _string_ | `取消` |
| loading | 是否显示加载状态 | _boolean_ | `false` |
| filter | 选项过滤函数 | _(type, vals) => vals_ | - |
| formatter | 选项格式化函数 | _(type, val) => val_ | - |
| item-height `v2.8.6` | 选项高度，支持 `px` 和 `rem` 单位，默认 `px` | _number \| string_ | `44` |
| visible-item-count | 可见的选项个数 | _number \| string_ | `5` |
| swipe-duration `v2.2.13` | 快速滑动时惯性滚动的时长，单位`ms` | _number \| string_ | `1000` |


当时间选择器类型为 date 或 datetime 时，支持以下 props:

| 参数     | 说明                       | 类型   | 默认值 |
| -------- | -------------------------- | ------ | ------ |
| min-date | 可选的最小时间，精确到分钟 | _Date_ | 十年前 |
| max-date | 可选的最大时间，精确到分钟 | _Date_ | 十年后 |


当时间选择器类型为 time 时，支持以下 props:

| 参数       | 说明           | 类型               | 默认值 |
| ---------- | -------------- | ------------------ | ------ |
| min-hour   | 可选的最小小时 | _number \| string_ | `0`    |
| max-hour   | 可选的最大小时 | _number \| string_ | `23`   |
| min-minute | 可选的最小分钟 | _number \| string_ | `0`    |
| max-minute | 可选的最大分钟 | _number \| string_ | `59`   |

### Events

| 事件名  | 说明                     | 回调参数              |
| ------- | ------------------------ | --------------------- |
| change  | 当值变化时触发的事件     | picker: Picker 实例   |
| confirm | 点击完成按钮时触发的事件 | value: 当前选中的时间 |
| cancel  | 点击取消按钮时触发的事件 | -                     |