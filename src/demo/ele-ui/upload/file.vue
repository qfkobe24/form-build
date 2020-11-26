<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'upload',
        label: '文件类型',
        component: 'upload',
        defaultValue: [{ name: '首图', url: 'https://imgs.bestwehotel.com/images/inn/1af49bdMEi' }],
        props: {
          listType: 'text',
          multiple: true,
          action: 'https://www.fastmock.site/mock/d8280a74e608c3d220c8d8d2947cc280/formbuild/upload',
          getUrlMethod(res) {
            // 请根据业务的接口格式处理返回值
            if (res.code == '100') {
              return {
                name: Date.now(),
                url: res.data.url
              }
            } else {
              return ''
            }
          }
        },
        renderSlots(h) {
          return [
            <el-button size="mini" type="primary" slot="trigger">选择文件</el-button>,
            <div class="el-upload__tip" slot="tip">注意：尽量不要上传太大的文件哈</div>
          ]
        }
      }]
    }
  }
}
</script>
