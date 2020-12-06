---
title: Checkbox 复选框组
sidebarDepth: 1
---

::: tip 介绍
显示在表单内的复选框组`component`值为`checkbox`，弹框显示的复选框组`component`值为`checkbox-popup`。
:::

### 布局

::: demo
<<< @/src/demo/vant-ui/checkbox/layout.vue
:::

### 自定义选项文本

::: demo
<<< @/src/demo/vant-ui/checkbox/custom-slot.vue
:::

### 弹框显示

::: demo
<<< @/src/demo/vant-ui/checkbox/popup.vue
:::

### Form Item
::: tip 提示
由于单独的checkbox使用场景极少，且可以被radio或者switch替代，该组件均使用checkbox-group。
:::

名称  | 类型 | 默认值 | 是否必传 | 说明
:---- | :---- | :---- | :---- | :---- | :----
options | Array[[option对象](#options)] | true | - | 选项配置列表
renderOptionSlot | Function(h:createEelement, option: Option, index): VNodes | - | - | 自定义选项文本

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 标识符（选中值） | _any_ | - |
| text | 选项文本，可被renderOptionSlot覆盖 | _string_ | - |
| shape | 形状，可选值为 `square` | _string_ | `round` |
| disabled | 是否禁用复选框 | _boolean_ | `false` |
| label-disabled | 是否禁用复选框文本点击 | _boolean_ | `false` |
| label-position | 文本位置，可选值为 `left` | _string_ | `right` |
| icon-size | 图标大小，默认单位为`px` | _number \| string_ | `20px` |
| checked-color | 选中状态颜色 | _string_ | `#1989fa` |

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用所有复选框 | _boolean_ | `false` |
| max | 最大可选数，`0`为无限制 | _number \| string_ | `0` |
| direction | 排列方向，可选值为`horizontal` `vertical` `vertical-cell` | _string_ | `vertical` |
| icon-size | 所有复选框的图标大小，默认单位为`px` | _number \| string_ | `20px` |
| checked-color | 所有复选框的选中状态颜色 | _string_ | `#1989fa` |

### Events

| 事件名 | 说明                     | 回调参数       |
| ------ | ------------------------ | -------------- |
| change | 当绑定值变化时触发的事件 | _names: any[]_ |
