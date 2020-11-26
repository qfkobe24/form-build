<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'upload_avator',
        component: 'upload',
        label: '上传头像',
        defaultValue: [],
        props: {
          limit: 1,
          showFileList: false, // 隐藏上传按钮需要隐藏默认的文件列表
          listType: 'picture-card',
          action: 'https://www.fastmock.site/mock/d8280a74e608c3d220c8d8d2947cc280/formbuild/upload',
          getUrlMethod(res) {
            if (res.code == '100') {
              return res.data.url
            } else {
              return ''
            }
          }
        },
        renderSlots(h, value) {
          return [
            value && value.length
              ? <img src={value[0]} style="width:100%;height:100%"/>
              : <i class="el-icon-plus avatar-uploader-icon"></i>
          ]
        }
      }]
    }
  }
}
</script>
