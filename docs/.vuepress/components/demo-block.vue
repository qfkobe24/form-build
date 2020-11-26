<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class="source" ref="source"><slot name="source"></slot></div>
    <div style="display:none" ref="sourceCode"><slot name="source-code"></slot></div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <!-- <div class="highlight">
        <slot name="highlight"></slot>
      </div> -->
    </div>
    <div
      class="demo-block-control"
      ref="control"
      :class="{ 'is-fixed': fixedControl }"
      @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <el-tooltip effect="dark" content="点击前往新页面运行" placement="right">
        <transition name="text-slide">
          <el-button
            v-show="hovering || isExpanded"
            size="small"
            type="text"
            class="control-button"
            @click.stop="goCodeEditor">
            在线运行
          </el-button>
        </transition>
      </el-tooltip>
    </div>
  </div>
</template>

<script type="text/babel">
  import { stripScript, stripStyle, stripTemplate } from '../util';
  const version = '2.13.2';

  export default {
    data() {
      return {
        codepen: {
          script: '',
          html: '',
          style: ''
        },
        sourceCode: '',
        hovering: false,
        isExpanded: false,
        fixedControl: false,
        scrollParent: null
      };
    },

    methods: {
      goCodeEditor() {
        const { path } = this.$route
        const ui = path.includes('vant') ? 'vant' : 'element-ui'
        const id = Date.now().toString() + Math.floor(Math.random() * 10000)
        const content = { code: this.sourceCode, ui }
        localStorage.setItem(`playground_content_${id}`, JSON.stringify(content))
        const { href } = this.$router.resolve(`/demo/playground.html?id=${id}`)
        window.open(href, '_blank')
      },

      scrollHandler() {
        const { top, bottom, left } = this.$refs.meta.getBoundingClientRect();
        const offsetWidth = this.$refs.meta.offsetWidth

        this.fixedControl = bottom > document.documentElement.clientHeight &&
          top + 40 <= document.documentElement.clientHeight;
        this.$refs.control.style.left = this.fixedControl ? `${ left }px` : '0';
        this.$refs.control.style.width = this.fixedControl ? `${ offsetWidth }px` : 'auto';
      },

      removeScrollHandler() {
        this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      }
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1];
      },

      blockClass() {
        return `demo-${ this.lang } demo-${ this.$router.currentRoute.path.split('/').pop() }`;
      },

      iconClass() {
        return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom';
      },

      controlText() {
        return this.isExpanded ? '隐藏代码' : '显示代码';
      },

      codeArea() {
        return this.$el.getElementsByClassName('meta')[0];
      },

      codeAreaHeight() {
        if (this.$el.getElementsByClassName('description').length > 0) {
          return this.$el.getElementsByClassName('description')[0].clientHeight
        }
      }
    },

    watch: {
      isExpanded(val) {
        this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';

        if (!val) {
          this.fixedControl = false;
          this.$refs.control.style.left = '0';
          this.$refs.control.style.width = 'auto';
          this.codeArea.style.height = '0';
          this.removeScrollHandler();
          return;
        }
        setTimeout(() => {
          this.scrollParent = document;
          this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler);
          this.codeArea.style.height = `${ this.codeAreaHeight + 1 }px`
          this.scrollHandler();
        }, 400);
      }
    },

    mounted() {
      this.sourceCode = decodeURIComponent(this.$refs.sourceCode.innerHTML)
    },

    beforeDestroy() {
      this.removeScrollHandler();
    }
  };
</script>

<style lang="stylus">
  .demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: .2s;

    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }

    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .demo-button {
      float: right;
    }

    .source {
      padding: 24px;
    }

    .meta {
      background-color: #fafafa;
      border-top: solid 1px #eaeefb;
      overflow: hidden;
      height: 0;
      transition: height .2s;
    }

    .description {
      box-sizing: border-box;
      border: solid 1px #ebebeb;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      word-break: break-word;

      pre {
        margin 0!important;
      }

      p {
        margin: 0;
        line-height: 26px;
      }

      code {
        color: #5e6d82;
        background-color: #e6effb;
        margin: 0 4px;
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
        height: 18px;
        line-height: 18px;
      }
    }

    .highlight {
      pre {
        margin: 0;
      }

      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;

        &::before {
          content: none;
        }
      }
    }

    .demo-block-control {
      border-top: solid 1px #eaeefb;
      height: 44px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;
      background: #ffffff;
    
      &.is-fixed {
        position: fixed;
        bottom: 0;
        z-index 100;
      }

      i {
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }

      > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: .3s;
        display: inline-block;
      }

      &:hover {
        color: #409EFF;
        background-color: #f9fafc;
      }

      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }
      
      .control-button {
        line-height: 26px;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 14px;
        padding-left: 5px;
        padding-right: 25px;
      }
    }
  }
</style>
