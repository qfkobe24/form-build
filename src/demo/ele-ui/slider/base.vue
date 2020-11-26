<template>
  <form-build :form-list="formList" ref="form" labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'slider',
        label: '默认',
        component: 'slider',
      }]
    }
  }
}
</script>
