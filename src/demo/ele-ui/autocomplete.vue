<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'autocomplete',
        label: '带输入建议',
        component: 'autocomplete',
        props: {
          placeholder: '请输入',
          clearable: true,
          fetchSuggestions(queryString, callbackFunc) {
            setTimeout(() => {
              callbackFunc([{
                value: '红烧鱼',
                star: 5
              }, {
                value: '酸菜鱼',
                star: 4
              }, {
                value: '烤鱼',
                star: 3
              }])
            }, 300)
          }
        },
        scopedSlots: {
          default: ({ item }) => {
            return `${item.value}（${item.star}星）`
          }
        }
      }]  
    }
  }
}
</script>
