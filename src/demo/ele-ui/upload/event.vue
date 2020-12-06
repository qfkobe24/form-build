<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        renderStatic: h => {
          return <div style='padding:10px;'>请尝试删除文件，或者上传超出个数的文件：</div>
        }
      }, {
        id: 'upload',
        label: '事件绑定',
        component: 'upload',
        defaultValue: ['https://pics2.baidu.com/feed/09fa513d269759eeabe5a125497eed116c22df31.jpeg?token=a6bcb611dbe75568d378376abd9809fd'],
        props: {
          listType: 'picture-card',
          multiple: true,
          showFileList: false, // 隐藏上传按钮需要隐藏默认的文件列表
          limit: 2,
          action: 'https://www.fastmock.site/mock/d8280a74e608c3d220c8d8d2947cc280/formbuild/upload',
          getUrlMethod(res) {
            // 请根据业务的接口格式处理返回值
            if (res.code == '100') {
              return res.data.url
            } else {
              return ''
            }
          },
          beforeRemove(file, fileList) {
            return new Promise((resolve, reject) => {
              this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                resolve()
              }).catch(() => {
                reject(Error('取消删除'))     
              })
            })
          },
          onExceed(files, fileList) {
            this.$message.error('已达到上传上线')
          }
        },
        renderSlots(h, value) {
          return [
            <div>
              {value.map(item => <img src={item} style="width:100%;height:100%"/>)}
              {value && value.length >= 2 ? '' : <i class="el-icon-plus avatar-uploader-icon"></i>}
            </div>,
            <div class="el-upload__tip" slot="tip">最多上传2个文件</div>
          ]
        }
      }]
    }
  }
}
</script>
