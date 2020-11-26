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
        id: 'name',
        component: 'checkbox-popup',
        label: '复选框',
        required: true,
        props: {
          direction: 'vertical-cell',
          iconSize: '14px'
        },
        options: [
          { name: 1, text: '红烧鱼' },
          { name: 2, text: '酸菜鱼' },
          { name: 3, text: '烤鱼' },
          { name: 4, text: '红烧鱼' },
          { name: 5, text: '酸菜鱼' },
          { name: 6, text: '烤鱼' },
          { name: 7, text: '红烧鱼' },
          { name: 8, text: '酸菜鱼' },
          { name: 9, text: '烤鱼' },
          { name: 10, text: '红烧鱼' },
          { name: 21, text: '酸菜鱼' },
          { name: 32, text: '烤鱼' },
          { name: 42, text: '红烧鱼' },
          { name: 52, text: '酸菜鱼' },
          { name: 62, text: '烤鱼' },
          { name: 72, text: '红烧鱼' },
          { name: 82, text: '酸菜鱼' },
          { name: 92, text: '烤鱼' }
        ]
      }]
    }
  }
}
</script>
