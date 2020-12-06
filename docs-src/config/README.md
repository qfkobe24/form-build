---
title: form-build配置
---

## Props
名称  | 类型 | 默认值 | 是否必传 | 说明
:---- | :---- | :---- | :---- | :----
form-list | Array[<a href="#表单项配置">Object</a>] | [] | 是 | 表单组件配置集合
model | Object | {} | 否 | 表单数据对象
label-width | [Number, String] | 100 | 否 | 全部表单项label宽度
label-position | Enum | left | 否 | 全部表单项域标签的位置，可选值：left/top
label-align | Enum | left | 否 | 全部表单项域标签的位置，可选值：left/justify/right
content-width | [Number, String] | auto | 否 | 全部表单项组件宽度
span | [Number, String] | -- | 否 | 全部表单占据的列数
inline | Boolean | false | 否 | 全部表单项行内模式
disabled | Boolean | false | 否 | 是否全局禁用
elSize | Enum | -- | 否 | 全部表单项尺寸，ui = ele生效，可选值：medium/small/mini
show-erroressage | Boolean | true | 否 | 全部表单展示错误信息

## Slots
名称 | 说明
:---- | :----
action-button | 表单操作按钮

## Methods
方法名 | 入参 | 回参 | 说明
:---- | :---- | :---- | :----
sumbit | -- | promise | 提交表单，`resolve(model：经过outputFormat处理的数据)` `reject(fields：校验不成功字段)`
reset | -- | -- | 重置表单
validate | options: <a href="https://github.com/yiminghe/async-validator#options" target="_blank">ValidateOption</a> | promise | 校验表单，`resolve()` `reject(fields：校验不成功字段)`
validateField | fields: Array[id], options: <a href="https://github.com/yiminghe/async-validator#options" target="_blank">ValidateOption</a> | promise | 校验表单部分字段，`resolve()` `reject(fields：校验不成功字段)`

## 表单项配置
名称  | 类型 | 默认值 | 是否必传 | 说明
:---- | :---- | :---- | :---- | :----
id | String | -- | 是 | 表单id,与表单数据对象的key相关
component | String | -- | 是 | 表单组件，内置组件使用String（<a href="#内置组件列表">内置组件列表</a>），支持传入自定义组件
label | String | -- | 否 | 当前表单项label内容，不传则不显示label
labelWidth | [Number, String] | 100 | 否 | 当前表单项label宽度
labelPosition | String | left | 否 | 当前表单项域标签的位置，可选值：left/top
labelAlign | String | left | 否 | 当前表单项域标签的位置，可选值：left/justify/right
contentAlign | String | left | 否 | 当前表单项的组件位置，可选值：left/center/
contentWidth | [Number, String] | auto | 否 | 当前表单项的组件宽度
required | Boolean | false | 否 | 是否必填，若为true会加上必填样式和增加必填的校验
disabled | Boolean | false | 否 | 是否禁用
hidden | Boolean | false | 否 | 是否隐藏
showErrorMessage | Boolean | true | 否 | 是否展示错误信息
validateTrigger | String | -- | 否 | 默认为提交时校验，可选值：change
rules | [Object, Array] | -- | 否 | 校验规则,使用<a href="https://github.com/yiminghe/async-validator" target="_blank">async-validator</a>，配置内容为async-validator的descriptor
inline | Boolean | false | 否 | 当前表单项行内模式
col | Object | -- | 否 | <a href="#栅格布局">栅格化配置</a>
gutter | Number | -- | 否 | 表单项间间隔(栅格化布局下有效)
inputFormat | Function(val, item, model) | -- | 否 | 值**传入**表单组件前的数据转换，`@return 处理后的val`
outputFormat | Function(val, item, model) | -- | 否 | 值**传出**表单组件前的数据转换，`@return 处理后的val`
renderLabel | Function(h, formItem, model) | -- | 否 | 表单lable渲染函数，`@return VNode对象`
prepend | Function(h, formItem, model) | -- | 否 | 表单组件前面内容的渲染函数，`@return VNode对象`
append | Function(h, formItem, model) | -- | 否 | 表单组件后面内容的渲染函数，`@return VNode对象`
renderStatic | Function | -- | 否 | 静态组件渲染函数，`@return VNode对象`
renderSlots | Function | -- | 否 | 表单组件slot渲染函数，`@return Array[VNode]`
renderOptionSlot | Function(h, option, index) | -- | 否 | 表单组件options slot渲染函数, 仅component为'checkbox'，'radio'，'select'时生效, `@return VNode对象`
options | Array[Object] | -- | 否 | <a href="#选项配置">表单组件选项</a>， 仅component为'checkbox'，'radio'，'select'时生效
listen | Object | -- | 否 | 监听其他表单事件，<a href="#事件监听配置">配置参考</a>


## 栅格布局
名称  | 类型 | 默认值 | 说明
:---- | :---- | :---- | :----
span | [Number, String]  | -- | 占据的列数
offset | [Number, String]  | -- | 左侧的间隔格数
push | [Number, String]  | -- | 右移动格数
pull | [Number, String] | -- | 左移动格数

## 选项配置
名称  | 类型 | 默认值 | 说明
:---- | :---- | :---- | :----
label | String  | -- | 展示标签
value | String  | -- | 选项值
disabled | Boolean  | -- | 是否禁用
... | any | -- | 更多配置

## 事件监听配置
名称  | 类型 | 默认值 | 说明
:---- | :---- | :---- | :----
(id):(event) | Function(value, item) | -- | 监听其他表单项的事件，如name:change表示监听表单为name的change事件（change需为存在事件）；value为被监听的value，item为当前表单项form-item

## 内置组件列表
* **element-ui支持组件**
  * `input`
  * `input-number`
  * `radio`
  * `radio-button`
  * `checkbox`
  * `checkbox-button`
  * `date-picker`
  * `select`
  * `slider`
  * `time-picker`
  * `time-select`
  * `upload`
  * `switch`

* **vant支持组件**
  * `field`
  * `picker`
  * `slider`
  * `radio`
  * `radio-button`
  * `checkbox`
  * `checkbox-button`
  * `stepper`
  * `switch`
  * `datatime-picker`
