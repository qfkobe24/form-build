<template>
  <div class="page">
    <form-build :formList="formList" ref="form" :model="model" labelWidth="100px">
      <template slot="action-button">
        <div class="button-group">
          <van-button size="large" round type="primary" @click="validate">确定</van-button>
          <van-button size="large" round @click="reset">取消</van-button>
        </div>
      </template>
    </form-build>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        invoiceContent: '商品明细',
        invoiceType: 1,
        isNeedInvoice: true,
      },
      formList: [{
      //   renderStatic: h => {
      //     return <div class="invoice-title">编辑发票信息</div>
      //   }
      // }, {
        id: 'isNeedInvoice',
        component: 'switch',
        label: '需要发票',
        required: true,
        contentAlign: 'right',
        itemStyle: {
          marginBottom: '25px'
        },
        props: {
          'active-color': '#4ac6fc',
          size: '20px'
        }
      }, {
        id: 'invoiceType',
        label: '发票类型',
        component: 'radio',
        required: true,
        props: {
          direction: 'horizontal',
          'checked-color': '#4ac6fc',
          'icon-size': '18px'
        },
        options: [{
          name: 1,
          text: '个人'
        }, {
          name: 2,
          text: '单位'
        }],
        listen: {
          'isNeedInvoice:change': (val, item) => {
            item.props = { ...item.props }
            item.props.disabled = !val
          }
        }
      }, {
        id: 'name',
        component: 'field',
        label: '个人姓名',
        required: true,
        props: {
          placeholder: '请输入个人姓名',
        },
        listen: {
          'invoiceType:change': (val, item) => {
            item.hidden = +val === 2
          },
          'isNeedInvoice:change': (val, item) => {
            item.props = { ...item.props }
            item.props.disabled = !val
          }
        }
      }, {
        id: 'title',
        component: 'field',
        label: '单位名称',
        required: true,
        hidden: true,
        props: {
          placeholder: '请输入单位名称',
        },
        listen: {
          'invoiceType:change': (val, item) => {
            item.hidden = +val !== 2
          },
          'isNeedInvoice:change': (val, item) => {
            item.props = { ...item.props }
            item.props.disabled = !val
          }
        }
      }, {
        id: 'taxNo',
        component: 'field',
        label: '纳税人识别号',
        required: true,
        hidden: true,
        props: {
          placeholder: '请输入纳税人识别号',
        },
        listen: {
          'invoiceType:change': (val, item) => {
            item.hidden = +val !== 2
          },
          'isNeedInvoice:change': (val, item) => {
            item.props = { ...item.props }
            item.props.disabled = !val
          }
        }
      }, {
        id: 'detailAddress',
        component: 'field',
        label: '发送邮箱',
        required: true,
        props: {
          placeholder: '请输入发送邮箱',
        },
        rules: [{
          type: 'string',
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: '请填写正确的邮箱地址',
        }],
        listen: {
          'isNeedInvoice:change': (val, item) => {
            item.props = { ...item.props }
            // item.props.disabled = !val
            console.log(val)
            item.hidden = !val
          }
        }
      }, {
        id: 'invoiceContent',
        label: '发票内容',
        component: 'field',
        disabled: true,
        itemStyle: {
          marginTop: '20px',
        }
      }]
    }
  },

  methods: {
    validate() {
      this.$refs.form.submit().then(model => {
        alert(JSON.stringify(model))
      }).catch(fields => {
        console.warn('以下字段校验不通过：', fields)
      })
    },
    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>
<style>
/* .page {
  background-color: #f1f2f3;
  position: absolute;
  left: 0;
  top: 30px;
  right: 0;
  bottom: 0;
} */

.button-group {
  padding: 40px 20px;
}

.button-group button {
  margin-bottom: 20px;
} 

.invoice-title {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
  padding: 20px;
  background-color: #fff;
}
</style>
