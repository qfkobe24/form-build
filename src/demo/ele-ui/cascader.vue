<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'cascader',
        label: '级联',
        component: 'cascader',
        props: {
          placeholder: '请选择',
          clearable: true,
          filterable: true,
          props: {
            // emitPath: false
          },
          options: [{
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              disabled: true,
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }]
        }
      }]  
    }
  }
}
</script>
