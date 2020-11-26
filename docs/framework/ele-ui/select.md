---
title: Select 选择器
sidebarDepth: 1
---

### 基础用法

::: demo
<<< @/src/demo/ele-ui/select/base.vue
:::

### 选项值为对象类型

::: demo
<<< @/src/demo/ele-ui/select/object-value.vue
:::

### 自定义选项模板

::: demo
<<< @/src/demo/ele-ui/select/option-slot.vue
:::

### 分组
::: demo
<<< @/src/demo/ele-ui/select/group.vue
:::

### 可远程搜索
::: demo
<<< @/src/demo/ele-ui/select/remote.vue
:::


### Form Item

名称  | 类型 | 默认值 | 是否必传 | 说明
:---- | :---- | :---- | :---- | :---- | :----
options | Array[[option对象](#option对象)/[option分组对象](#option分组对象)] | true | - | 选项配置列表
renderOptionSlot | Function(h:createEelement, option: Option对象, index): VNodes | - | - | 自定义选项模板

#### Option对象
[全部支持原文档](https://element.eleme.cn/#/zh-CN/component/select#option-attributes)

#### Option分组对象
参数  | 类型 | 默认值 | 是否必传 | 说明
:---- | :---- | :---- | :---- | :---- | :----
label | String | - | 否 | 分组的组名
disabled | Boolean | false | 否 | 是否将该分组下所有选项置为禁用
options | Array[[option对象](#option对象)] | true | 是 | 选项配置列表

### Props

参考[Select Attributes](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)


### Events
[Select Events](https://element.eleme.cn/#/zh-CN/component/select#select-events)，此外对原文档补充说明如下。

1. `visible-change`和`remove-tag`在json配置中不能用驼峰的格式：

```js
on: {
  'remove-tag'() {
    console.log('removeTag')
  }
},
```
