<template>
  <form-build :form-list="formList" ref="form" label-align="justify" :model="model">
    <template slot="action-button">
      <div class="button-group">
        <van-button size="large" type="primary" @click="validate">确定</van-button>
        <van-button size="large" @click="reset">取消</van-button>
      </div>
    </template>
  </form-build>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      formList: [{
        renderStatic: h => {
          return <div class="title">编辑收货地址</div>
        }
      }, {
        id: 'name',
        component: 'field',
        label: '姓名',
        required: true,
        props: {
          placeholder: '请输入姓名',
        }
      }, {
        id: 'mobile',
        component: 'field',
        label: '手机号',
        required: true,
        props: {
          placeholder: '请输入手机号',
        },
        rules: [{
          component: 'string',
          pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
          message: '请填写正确的手机号',
          trriger: 'change'
        }],
      }, {
        id: 'area',
        component: 'picker',
        label: '所在地区',
        required: true,
        props: {
          placeholder: '请选择所在地区',
          type: 'cascader',
          valueKey: 'cityName',
          realValueKey: 'cityId',
          columns: [
            {
              cityName: '浙江',
              cityId: '1',
              children: [
                {
                  cityName: '杭州',
                  cityId: '15',
                  children: [{ cityName: '西湖区', cityId: '2' }, { cityName: '余杭区', cityId: '3' }],
                },
                {
                  cityName: '温州',
                  cityId: '4',
                  children: [{ cityName: '鹿城区', cityId: '5' }, { cityName: '瓯海区', cityId: '6' }],
                },
              ],
            },
            {
              cityName: '福建',
              cityId: '7',
              children: [
                {
                  cityName: '福州',
                  cityId: '11',
                  children: [{ cityName: '鼓楼区', cityId: '8' }, { cityName: '台江区', cityId: '10' }],
                },
                {
                  cityName: '厦门',
                  cityId: '12',
                  children: [{ cityName: '思明区', cityId: '13' }, { cityName: '海沧区', cityId: '14' }],
                },
              ],
            },
          ]
        }
      }, {
        id: 'detailAddress',
        component: 'field',
        label: '详细地址',
        required: true,
        props: {
          placeholder: '请输入详细地址',
        }
      }, {
        id: 'addressType',
        label: '地址类型',
        component: 'radio',
        required: true,
        props: {
          direction: 'horizontal',
        },
        options: [{
          name: 1,
          text: '家庭'
        }, {
          name: 2,
          text: '工作'
        }],
      }, {
        id: 'remark',
        label: '备注',
        itemAlign: 'top',
        component: 'field',
        props: {
          maxlength: 40,
          type: 'textarea',
          placeholder: '备注（选填）',
        },
        append: h => {
          const length = this.model && this.model.remark && this.model.remark.length || 0
          return <span style="font-size:10px; width: 60px;">{length}/40字</span>
        },
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
    } 
  }
}
</script>
<style scoped>
.button-group {
  padding: 40px 20px;
}

.button-group button {
  margin-bottom: 20px;
} 

.title {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
  padding: 20px;
  margin-bottom: 10px;
}
</style>
