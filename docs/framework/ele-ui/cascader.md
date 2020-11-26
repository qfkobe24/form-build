---
title: Cascader 级联选择器
sidebarDepth: 1
---

::: tip 说明
支持[Cascader](https://element.eleme.cn/#/zh-CN/component/cascader)的所有类型、属性和事件配置。
:::

### 基础用法
::: demo
<<< @/src/demo/ele-ui/cascader.vue
:::


### Events
对事件补充说明如下：

1. `visible-change`和`remove-tag`在json配置中不能用驼峰的格式：

```js
on: {
  'remove-tag'() {
    console.log('removeTag')
  }
},
```