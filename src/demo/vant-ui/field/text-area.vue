<template>
  <form-build 
    :form-list="formList" 
    ref="form" 
    :model="model"/>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      formList: [{
        id: 'name',
        component: 'field',
        label: '姓名',
        required: true,
        props: {
          placeholder: '请输入姓名',
          type: 'textarea',
          maxlength: '50',
          autosize: true
        }
      }]
    }
  }
}
</script>
