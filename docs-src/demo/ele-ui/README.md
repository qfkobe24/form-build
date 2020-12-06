---
title: form-build ElementUI使用示例
---

## 基础用法
::: tip 说明
formBuild提供提交表单和重置表单api，可通过$refs调用  
:::

::: demo
<<< @/src/demo/ele-ui/base.vue
:::


## 表单项布局
::: tip 说明
表单间支持栅格布局
:::

::: demo
<<< @/src/demo/ele-ui/layout/col-layout.vue
:::

## 表单label布局
::: demo
<<< @/src/demo/ele-ui/layout/label-layout.vue
:::

## 数据处理
::: tip 说明 
编辑表单的时候，常见API返回数据格式与组件绑定数据格式不一致，这时候可通过item的<a href="/config/#表单项配置">inputFormat</a>和<a href="/config/#表单项配置">outputFormat</a>进行数据处理。
:::

::: demo
<<< @/src/demo/ele-ui/data-handle.vue
:::


## 自定义组件
::: tip 说明 
自定义组件需在内部实现v-model，<a href="https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model" target="_blank">关于自定义组件使用v-model</a>
:::

::: warning 注意
这里受formbuild封装的限制，只能使用名为 value 的 prop 和名为 input 的事件
:::
::: demo
<<< @/src/demo/ele-ui/custom-components.vue
:::

## 表单校验
::: tip 说明
更多校验规则配置请查看<a href="https://github.com/yiminghe/async-validator" target="_blank">async-validator</a>
:::

::: demo
<<< @/src/demo/ele-ui/validate.vue
:::

## 表单校验-综合应用
::: demo
<<< @/src/demo/ele-ui/validate2.vue
:::

## 搜索表单
::: tip 说明
常于table结合，对table数据进行筛选
:::

::: demo
<<< @/src/demo/ele-ui/search-form.vue
:::

## 表单联动
::: demo
<<< @/src/demo/ele-ui/reactive.vue
:::
