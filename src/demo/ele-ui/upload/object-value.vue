<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'upload',
        label: '对象类型值',
        component: 'upload',
        defaultValue: [{ name: '首图', url: 'https://pics2.baidu.com/feed/09fa513d269759eeabe5a125497eed116c22df31.jpeg?token=a6bcb611dbe75568d378376abd9809fd' }],
        props: {
          listType: 'picture-card',
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
            <i class="el-icon-plus avatar-uploader-icon"></i>,
            <div class="el-upload__tip" slot="tip">注意：尽量不要上传太大的文件哈</div>
          ]
        }
      }]
    }
  }
}
</script>
