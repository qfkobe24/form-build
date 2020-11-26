<template>
  <form-build class="layout-form" :form-list="list" :inline="true" />
</template>

<script>
export default {
  data () {
    return {
      list: [{
        renderStatic: h => {
          return <div style='padding:10px;'>表单布局示例</div>
        }
      }, {
        id: 'input1',
        label: 'span = 8',
        component: 'input',
        col: {
          span: 8
        }
      }, {
        id: 'input2',
        label: 'span = 8',
        component: 'input',
        col: {
          span: 8
        }
      }, {
        id: 'input3',
        label: 'span = 8',
        component: 'input',
        col: {
          span: 8
        }
      }, {
        id: 'input4',
        label: 'span = 6',
        component: 'input',
        props: {
          span: 6
        }
      }, {
        id: 'input5',
        label: 'span = 6',
        component: 'input',
        col: {
          span: 6,
          offset: 6
        },
        props: {
          placeholder: 'offset = 6'
        }
      }, {
        id: 'input6',
        label: 'span = 6',
        component: 'input',
        col: {
          span: 6,
          offset: 6
        },
        props: {
          placeholder: 'offset = 6'
        }
      }, {
        id: 'input7',
        label: 'span = 6',
        component: 'input',
        col: {
          span: 6,
          push: 6
        },
        props: {
          placeholder: 'push = 6'
        }
      }]
    }
  }
}
</script>

<style scoped>
  .layout-form .form-item{
    background: #99a9bf;
  }
  .layout-form-label .form-item__label{
    background: #99a9bf;
  }
</style>
