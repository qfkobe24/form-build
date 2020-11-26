<script>
import { Upload } from 'element-ui'
import { isString, isNumber, isEmpty, isObject, isArray, toArray, noop, isFunction, deepCopy } from '../../../utils'
import { handleError } from '../../../utils/error'

export default {
  extends: Upload,
  props: {
    value: {
      required: true
    },
    getUrlMethod: {
      type: Function,
      required: true,
      default: noop
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!val || !val.length) {
          this.uploadFiles = []
        }

        // 拦截上传结束/删除文件导致的变化
        if (this.isInnerChange()) { return }

        this.uploadFiles = val.map(item => {
          let fileItem

          if (isString(item)) { // 纯字符串
            fileItem = {
              url: item,
              uid: (Date.now() + this.tempIndex++),
              remoteUrl: item,
              status: 'success'
            }
          } else if (isObject(item)) {
            // item.url字段必须存在
            if (!isString(item.url)) {
              handleError('upload', 'object类型的文件值"url"字段不能为空')
            }

            fileItem = {
              ...item,
              remoteUrl: deepCopy(item),
              status: item.status || 'success',
              uid: item.uid || (Date.now() + this.tempIndex++)
            }
          } else {
            // value格式错误提示
            handleError('upload', '值类型不合法，请检查或使用inputFormat转化')
          }
          return fileItem
        })
      }
    },
    fileList: {
      immediate: true,
      handler: noop
    }
  },
  methods: {
    isInnerChange() {
      let innerValue = this.uploadFiles.map(file => {
        let url = isObject(file.remoteUrl)
          ? file.remoteUrl.url
          : isString(file.remoteUrl)
            ? file.remoteUrl
            : ''

        if (isEmpty(url)) url = ''

        return url
      })
      innerValue = innerValue.sort().join()

      let outerValue = (this.value || []).map(valItem => {
        let url = isObject(valItem)
          ? valItem.url
          : isString(valItem)
            ? valItem
            : ''

        if (isEmpty(url)) url = ''
        return url
      })
      outerValue = outerValue.sort().join()

      return innerValue === outerValue
    },
    updateValue() {
      const newVal = this.uploadFiles.map(file => file.remoteUrl)
      this.$emit('input', newVal)
    },
    /**
     * 重写handleSuccess
     */
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile)

      if (file) {
        file.status = 'success'
        file.response = res

        if (isFunction(this.getUrlMethod)) {
          const url = this.getUrlMethod(res)
          if (url) { // 成功拿到文件链接
            this.onSuccess(res, file, this.uploadFiles)
            this.onChange(file, this.uploadFiles)

            // url如果是object，则必须有url字段
            if (isObject(url) && isEmpty(url.url)) {
              handleError('upload', 'getUrlMethod函数返回值未找到文件url')
            }
            
            // 便于删除查找value的值
            file.remoteUrl = url

            this.updateValue()
          } else { // 文件链接获取失败
            this.handleError(new Error('文件上传失败，或文件链接获取失败'), rawFile)
          }
        } else {
          handleError('upload', '无法获取文件服务器返回的文件链接，请为组件配置getUrlMethod属性')
        }
      }
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile)
      const fileList = this.uploadFiles

      file.status = 'fail'

      fileList.splice(fileList.indexOf(file), 1)

      this.updateValue()

      this.onError(err, file, this.uploadFiles)
      this.onChange(file, this.uploadFiles)
    },
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw)
      }
      const doRemove = () => {
        this.abort(file)
        const fileList = this.uploadFiles
        fileList.splice(fileList.indexOf(file), 1)

        this.updateValue()

        this.onRemove(file, fileList)
      }

      if (!this.beforeRemove) {
        doRemove()
      } else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles)
        if (before && before.then) {
          before.then(() => {
            doRemove()
          }, noop)
        } else if (before !== false) {
          doRemove()
        }
      }
    },
    clearFiles() {
      this.uploadFiles = []
      this.updateValue()
    }
  }
}
</script>
