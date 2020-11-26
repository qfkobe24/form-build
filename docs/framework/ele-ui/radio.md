---
title: Radio 单选框
sidebarDepth: 1
---

### 基础用法
::: demo
<<< @/src/demo/ele-ui/radio/base.vue
:::

### 按钮单选框组
::: demo
<<< @/src/demo/ele-ui/radio/button.vue
:::

### 自定义选项模板
::: demo
<<< @/src/demo/ele-ui/radio/option-slot.vue
:::

### Form Item
::: tip 提示
由于单独的radio使用场景极少，且可以被radio或者switch替代，该组件均使用RadioGroup。
:::

名称  | 类型 | 默认值 | 是否必传 | 说明
:---- | :---- | :---- | :---- | :---- | :----
options | Array[[option对象](#option对象)] | true | - | 选项配置列表
renderOptionSlot | Function(h:createEelement, option: Option对象, index): VNodes | - | - | 自定义选项模板

#### Option对象

参考[Radio Attributes](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)中针对RadioGroup可用的配置。此外新增以下配置：

名称  | 是否支持 | 类型 | 默认值 | 是否必传 | 说明
:---- | :---- | :---- | :---- | :---- | :----
text | <Badge text="是" type="tip"/> | String | - | 是 | 选项显示内容

### Props

参考[RadioGroup Attributes](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes)。


### Events
参考[RadioGroup Events](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-events)



