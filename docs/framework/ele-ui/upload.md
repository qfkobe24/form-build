---
title: Upload 文件上传
sidebarDepth: 1
---

### 基础用法
::: demo
<<< @/src/demo/ele-ui/upload/base.vue
:::

### 头像上传
::: demo
<<< @/src/demo/ele-ui/upload/avatar.vue
:::

### 对象类型值
::: demo
<<< @/src/demo/ele-ui/upload/object-value.vue
:::

### 文件上传
::: demo
<<< @/src/demo/ele-ui/upload/file.vue
:::

### 事件回调
::: demo
<<< @/src/demo/ele-ui/upload/event.vue
:::

### Props
本组件继承于[upload组件](https://element.eleme.cn/#/zh-CN/component/upload#attribute)，保留了绝大部分的属性配置，在此基础上做出了进一步的优化。

名称  | 是否支持 | 类型 | 默认值 | 是否必传 | 说明
:---- | :---- | :---- | :---- | :---- | :----
[value/v-model](#v-model绑定) | <Badge text="是" type="tip"/> | Array[String/Object] | - | - | 绑定值，form-build内部绑定，开发者无需手动绑定
[getUrlMethod](#geturlmethod) | <Badge text="是" type="tip"/> | Function(res):String/Object | - | 是 | 从接口提取文件链接

#### v-model绑定

::: tip 说明
原来的upload，不支持v-model绑定，由开发者自行通过on-success钩子获取上传接口返回内容。

我们对此进行了优化，支持v-model绑定，重写了组件内部的handleSuccess方法, 有兴趣的看看[重写后的handleSuccess](#handlesuccess)，方便你更好的使用该组件。
:::

::: warning 注意
原来的`file-list`属性请不要再使用，已被v-model替代。
:::

每个文件的绑定值类型有2种，通过getUrlMethod方法的返回值决定：

1. 为字符串类型时，值为文件的访问地址

2. 为对象类型，`url`为必须属性，其它属性由开发者自己定义

#### getUrlMethod

上传接口成功返回时获取文件链接。

### handleSuccess

```js
handleSuccess(res, rawFile) {
  const file = this.getFile(rawFile)

  if (file) {
    file.status = 'success'
    file.response = res

    if (isFunction(this.getUrlMethod)) {
      const url = this.getUrlMethod(res)
      if (url) { // 成功拿到文件链接
        this.onSuccess(res, file, this.uploadFiles)
        this.onChange(file, this.uploadFiles)

        // url如果是object，则必须有url字段
        if (isObject(url) && isEmpty(url.url)) {
          handleError('upload', 'getUrlMethod函数返回值未找到文件url')
        }
        
        // 便于删除查找value的值
        file.remoteUrl = url

        this.updateValue()
      } else { // 文件链接获取失败
        this.handleError(new Error('文件上传失败，或文件链接获取失败'), rawFile)
      }
    } else {
      handleError('upload', '无法获取文件服务器返回的文件链接，请为组件配置getUrlMethod属性')
    }
  }
}
```