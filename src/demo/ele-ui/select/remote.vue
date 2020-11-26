<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    const selectSingleOptions = []
    let that = this
    return {
      loading: false,
      formList: [{
        id: 'select',
        label: '远程搜索',
        component: 'select',
        props: {
          placeholder: '请输入关键字搜索',
          filterable: true,
          remote: true,
          loading: that.loading,
          remoteMethod(query) {
            this.loading = true
            setTimeout(() => {
              this.loading = false
              selectSingleOptions.push(
                { value: 1, label: '红烧鱼', disabled: false },
                { value: 2, label: '酸菜鱼', disabled: false },
                { value: 3, label: '烤鱼', disabled: false })
            }, 1000)
          }
        },
        options: selectSingleOptions
      }]
    }
  }
}
</script>
