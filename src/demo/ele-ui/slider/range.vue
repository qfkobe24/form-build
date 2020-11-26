<template>
  <form-build :form-list="formList" ref="form" :model="model" labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      model: {
        range: [20, 40]
      },
      formList: [{
        id: 'range',
        label: '范围',
        component: 'slider',
        props: {
          range: true
        },
      }]
    }
  }
}
</script>
