export default [{
  id: 'upload_1',
  component: 'upload',
  label: '上传',
  defaultValue: [{ name: '首图', url: 'https://pics2.baidu.com/feed/09fa513d269759eeabe5a125497eed116c22df31.jpeg?token=a6bcb611dbe75568d378376abd9809fd' }],
  props: {
    listType: 'picture-card',
    multiple: true,
    action: 'https://www.fastmock.site/mock/d8280a74e608c3d220c8d8d2947cc280/formbuild/upload',
    getUrlMethod(res) {
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
      h('el-button', {
        props: {
          type: 'primary',
          size: 'small'
        },
        slot: 'trigger'
      }, '选择文件'),
      h('div', { slot: 'tip', class: 'el-upload__tip' }, '注意：尽量不要上传太大的文件哈')
    ]
  },
}, {
  id: 'upload_avator',
  component: 'upload',
  label: '上传头像',
  defaultValue: [],
  props: {
    limit: 1,
    showFileList: false,
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
    return value && value.length ? [h('img', {
      domProps: {
        src: value[0]
      },
      style: {
        width: '100%',
        height: '100%',
      }
    })] : [h('i', {
      props: {
        type: 'primary',
        size: 'small'
      },
      class: ['el-icon-plus', 'avatar-uploader-icon']
    })]
  },
}, {
  id: 'upload_3',
  component: 'upload',
  label: '拖拽上传',
  defaultValue: ['https://pics2.baidu.com/feed/09fa513d269759eeabe5a125497eed116c22df31.jpeg?token=a6bcb611dbe75568d378376abd9809fd'],
  props: {
    drag: true,
    action: 'https://www.fastmock.site/mock/d8280a74e608c3d220c8d8d2947cc280/formbuild/upload',
    getUrlMethod(res) {
      if (res.code == '100') {
        return res.data.url
      } else {
        return ''
      }
    }
  },
  renderSlots(h) {
    return [
      h('i', { class: 'el-icon-upload' }),
      h('div', { slot: 'tip', class: 'el-upload__tip' }, '注意：尽量不要上传太大的文件哈')
    ]
  },
}]
