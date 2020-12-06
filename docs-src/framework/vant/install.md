---
title: 安装使用
---
## CDN 引入

可通过CDN的方式引入vant，请确保vant在form-build之前引入。form-build会自动注册为全局组件。

<<< @/src/demo/vant-ui/cdn.html

<!-- TODO 锁定版本 -->
::: tip 说明
使用 CDN 引入时，请在链接地址上锁定版本，以免你的项目受到非兼容更新的影响。
:::

## NPM 引入

npm安装插件
```bash
npm i form-build -S
```

在入口文件(main.js)中注册组件。

### 注册方式一. 引入所有UI组件

全局注册formBuild时，将UI框架和名称作为Vue.use方法的第二个参数传入。

```javascript
import Vant from 'vant'; // 全局引入
import 'vant/lib/index.css';
import formBuild from 'form-build';

Vue.use(formBuild, {
  UIname: 'vant', // 必填
  UIplugin: Vant
})
```

### 注册方式二. 按需引入UI组件

`UIname`为必填参数，`UIplugin`和`UIcomponents`2者至少有一个不能为空。

```javascript
import { Button, Field, Cell, Popup, Checkbox, DatetimePicker } from 'vant' // 按需引入
import 'vant/lib/index.css';
import formBuild from 'form-build';

Vue.use(formBuild, {
  UIname: 'vant', // 必填
  UIcomponents: [Button, Field, Cell, Popup, Checkbox, DatetimePicker]
})
```