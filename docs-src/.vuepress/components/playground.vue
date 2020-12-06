<template>
  <ClientOnly  v-if="formBuild">
    <div class="container">
      <h3 class="title">
        <a href="/" style="vertical-align: middle;">form-build</a>
        <span style="font-size: 22px; vertical-align: middle;">在线运行</span>
      </h3>
      <p class="hint">
        form-build当前使用的UI框架：
        <label v-for="name in UINames" :key="name" class="radio-item">
          <input name="ui" type="radio" :value="name" :checked="currentUI === name" @change="onChangeUI" />
          <span class="name">{{ name }}</span>
        </label>
      </p>
      <vuep :template="template" v-if="currentUI" />
    </div>
  </ClientOnly>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import Vant from 'vant'

  const UINames = ['element-ui', 'vant']
  export default {
    data() {
      return {
        formBuild: null,
        template: '',
        currentUI: UINames[0],
        UINames: UINames,
      }
    },
    async mounted() {
      let res = await import('../../../lib/form-build.umd')
      this.formBuild = res.default
      const content = this.getStorageContent()
      const { code, ui } = JSON.parse(content)
      this.currentUI = ui || UINames[0]
      this.registeUI()
      this.template = code
    },
    methods: {
      goRoot() {
        this.$router.push('/')
      },
      getStorageContent() {
        const { query } = this.$route
        const storageKey = `playground_content_${query.id}`
        const localContent = localStorage.getItem(storageKey)
        const sessionContent = sessionStorage.getItem(storageKey)

        const content = localContent || sessionContent || '{}'

        if (localContent && !sessionContent) {
          this.resetStorage(storageKey, content)
        }

        return content
      },
      resetStorage(key, content) {
        localStorage.removeItem(key)
        sessionStorage.setItem(key, content)
      },
      registeUI() {
        const { currentUI } = this
        const UIname = currentUI === 'vant' ? 'vant' : 'element-ui'
        const UIplugin = currentUI === 'vant' ? Vant : ElementUI
        
        this.formBuild.install(Vue, { UIname, UIplugin })
      },
      onChangeUI(ev) {
        this.currentUI = ''

        this.$nextTick(() => {
          this.currentUI = ev.target.value
          this.registeUI()
        })
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 24px;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 30px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
  }

  .container {
    padding: 0 20px;
  }

  .vuep {
    height: 600px;
  }

  .hint {
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
  }

  .radio-item {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .radio-item input {
    margin: 0 5px;
  }

  .radio-item .name {
    margin-top: -2px;
  }
</style>