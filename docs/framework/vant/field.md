---
title: Field 输入框
sidebarDepth: 1
---

::: tip 介绍
表单中的输入框。
:::

### 文本框

::: demo
<<< @/src/demo/vant-ui/field/text.vue
:::

### 文本域

::: demo
<<< @/src/demo/vant-ui/field/text-area.vue
:::

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 输入框类型, 可选值为 `tel` `digit`<br>`number` `textarea` `password` 等 | _string_ | `text` |
| maxlength | 输入的最大字符数 | _number \| string_ | - |
| placeholder | 输入框占位提示文字 | _string_ | - |
| border | 是否显示内边框 | _boolean_ | `true` |
| disabled | 是否禁用输入框 | _boolean_ | `false` |
| readonly | 是否只读 | _boolean_ | `false` |
| center | 是否使内容垂直居中 | _boolean_ | `false` |
| clearable | 是否启用清除控件 | _boolean_ | `false` |
| clickable | 是否开启点击反馈 | _boolean_ | `false` |
| is-link | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` |
| autofocus | 是否自动聚焦，iOS 系统不支持该属性 | _boolean_ | `false` |
| show-word-limit | 是否显示字数统计，需要设置`maxlength`属性 | _boolean_ | `false` |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` | _string_ | `right` |
| input-align | 输入框对齐方式，可选值为 `center` `right` | _string_ | `left` |
| autosize | 是否自适应内容高度，只对 textarea 有效，<br>可传入对象,如 { maxHeight: 100, minHeight: 50 }，<br>单位为`px` | _boolean \| object_ | `false` |
| left-icon | 左侧[图标名称](#/zh-CN/icon)或图片链接 | _string_ | - |
| right-icon | 右侧[图标名称](#/zh-CN/icon)或图片链接 | _string_ | - |
| icon-prefix | 图标类名前缀，同 Icon 组件的 [class-prefix 属性](#/zh-CN/icon#props) | _string_ | `van-icon` |


### Events

除下列事件外，Field 默认支持 Input 标签所有的原生事件

| 事件                 | 说明                 | 回调参数                       |
| -------------------- | -------------------- | ------------------------------ |
| input                | 输入框内容变化时触发 | _value: string (当前输入的值)_ |
| focus                | 输入框获得焦点时触发 | _event: Event_                 |
| blur                 | 输入框失去焦点时触发 | _event: Event_                 |
| clear                | 点击清除按钮时触发   | _event: Event_                 |
| click                | 点击 Field 时触发    | _event: Event_                 |
| click-input          | 点击输入区域时触发   | _event: Event_                 |
| click-left-icon      | 点击左侧图标时触发   | _event: Event_                 |
| click-right-icon     | 点击右侧图标时触发   | _event: Event_                 |

### Slots

| 名称           | 说明                                                       |
| -------------- | ---------------------------------------------------------- |
| label          | 自定义输入框 label 标签                                    |
| input          | 自定义输入框，使用此插槽后，与输入框相关的属性和事件将失效 |
| left-icon      | 自定义输入框头部图标                                       |
| right-icon     | 自定义输入框尾部图标                                       |
| button         | 自定义输入框尾部按钮                                       |
| extra          | 自定义输入框最右侧的额外内容                                |


