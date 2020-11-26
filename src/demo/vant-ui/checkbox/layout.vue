<template>
  <form-build 
    ref="form" 
    :form-list="formList" 
    :model="model"/>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      formList: [{
        id: 'checkbox_1',
        component: 'checkbox',
        label: '水平布局',
        required: true,
        options: [{
          text: '选项1',
          name: 1
        }, {
          text: '选项2',
          name: 2
        }],
        props: {
          direction: 'horizontal'
        }
      }, {
        id: 'checkbox_2',
        component: 'checkbox',
        label: '垂直布局',
        required: true,
        options: [{
          text: '选项1',
          name: 1
        }, {
          text: '选项2',
          name: 2
        }],
        props: {
          direction: 'vertical'
        }
      }, {
        id: 'checkbox_3',
        component: 'checkbox',
        label: '垂直单元格布局',
        required: true,
        options: [{
          text: '选项1',
          name: 1
        }, {
          text: '选项2',
          name: 2
        }],
        props: {
          direction: 'vertical-cell'
        }
      }]
    }
  }
}
</script>
