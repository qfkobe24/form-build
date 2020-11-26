export default [
  { // 单列简单类型
    id: 'picker_col_1',
    component: 'picker',
    label: 'picker单列1',
    validateTrigger: 'change',
    defaultValue: '上海',
    props: {
      placeholder: '请选择',
      type: 'col',
      columns: ['广州', '上海', '北京', '深圳']
    },
    rules: [
      { 
        validator: (rule, value) => {
          return value !== '上海'
        },
        message: '暂不支持上海地区'
      }
    ]
  }, { // 单列简单类型
    id: 'picker_col_2',
    component: 'picker',
    label: 'picker单列2',
    defaultValue: 1,
    props: {
      placeholder: '请选择',
      valueKey: 'cityName',
      realValueKey: 'cityId',
      type: 'col',
      columns: [
        {
          cityName: '广州',
          cityId: 1
        },
        {
          cityName: '上海',
          cityId: 2
        },
        {
          cityName: '北京',
          cityId: 3
        },
        {
          cityName: '深圳',
          cityId: 4
        }
      ]
    }
  }, { // 多列，简单类型
    id: 'picker_cols_1',
    component: 'picker',
    label: 'picker多列1',
    defaultValue: ['周二', '上午'],
    props: {
      placeholder: '请选择',
      type: 'cols',
      columns: [
        // 第一列
        {
          values: ['周一', '周二', '周三', '周四', '周五']
        },
        // 第二列
        {
          values: ['上午', '下午', '晚上']
        },
      ]
    }
    
  }, { // 多列，复杂类型
    id: 'picker_cols_2',
    component: 'picker',
    label: 'picker多列2',
    defaultValue: [1, 1],
    props: {
      placeholder: '请选择',
      type: 'cols',
      valueKey: 'label',
      realValueKey: 'value',
      columns: [
        // 第一列
        {
          values: [{
            label: '周一',
            value: 1
          }, {
            label: '周二',
            value: 2
          }, {
            label: '周三',
            value: 3
          }, {
            label: '周四',
            value: 4
          }, {
            label: '周五',
            value: 5
          }]        
        },
        // 第二列
        {
          values: [{
            label: '上午',
            value: 1
          }, {
            label: '下午',
            value: 2
          }, {
            label: '晚上',
            value: 3
          }]   
        },
      ]
    }
    
  }, { // 级联
    id: 'picker_cascader',
    component: 'picker',
    label: '地址',
    defaultValue: [],
    props: {
      placeholder: '请选择',
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
  }
]
