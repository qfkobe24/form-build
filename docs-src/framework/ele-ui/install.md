---
title: 安装使用
---

## CDN 引入

可通过CDN的方式引入form-build，请确保element-ui在form-build之前引入。form-build会自动注册为全局组件。

<<< @/src/demo/ele-ui/cdn.html

<!-- TODO 锁定版本 -->
::: tip 说明
使用 CDN 引入时，请在链接地址上锁定版本，以免你的项目受到非兼容更新的影响。
:::

## NPM 引入

npm安装插件
```bash
npm i form-build -S
```

在入口文件(main.js)中注册组件：

```js
import Vue from 'vue'
import formBuild from 'form-build'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(formBuild, {
  UIname: 'element-ui',
  UIplugin: ElementUI
})
```