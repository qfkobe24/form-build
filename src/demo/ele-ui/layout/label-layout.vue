<template>
  <form-build class="layout-form-label" :form-list="list" span="8" :inline="true"/>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        renderStatic: h => {
          return <div style='padding:10px;'>表单项布局示例</div>
        }
      }, {
        id: 'input10',
        label: 'label宽度',
        component: 'input',
        props: {
          placeholder: '默认labelWidth: 80'
        } 
      }, {
        id: 'input11',
        label: 'label宽度',
        component: 'input',
        labelWidth: 120,
        col: {
          span: 10,
        },
        props: {
          placeholder: 'labelWidth: 120'
        } 
      }, {
        id: 'input20',
        label: 'label位置',
        component: 'input',
        props: {
          placeholder: '默认labelPosition: left'
        }
      }, {
        id: 'input21',
        label: 'label位置',
        component: 'input',
        labelPosition: 'top',
        col: {
          span: 10
        },
        props: {
          placeholder: 'labelPosition: top'
        }
      }, {
        id: 'input30',
        label: 'label文本',
        component: 'input',
        props: {
          placeholder: '默认LabelAlign: left'
        }
      }, {
        id: 'input31',
        label: 'label文本',
        component: 'input',
        labelAlign: 'right',
        props: {
          placeholder: 'labelAlign: right'
        }
      }, {
        id: 'input32',
        label: 'label文本',
        component: 'input',
        labelAlign: 'justify',
        props: {
          placeholder: 'labelAlign: justify'
        }
      }, {
        id: 'input40',
        label: 'label对齐',
        component: 'input',
        props: {
          placeholder: '默认itemAlign: center'
        }
      }, {
        id: 'input41',
        label: 'label对齐',
        component: 'input',
        itemAlign: 'top',
        props: {
          placeholder: 'itemAlign: top'
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
