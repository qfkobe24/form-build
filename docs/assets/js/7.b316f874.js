(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{437:function(t,e,o){},494:function(t,e,o){"use strict";o(437)},504:function(t,e,o){"use strict";o.r(e);o(157),o(114),o(26),o(61),o(109),o(115),o(241),o(238),o(77),o(239);var n={data:function(){return{codepen:{script:"",html:"",style:""},sourceCode:"",hovering:!1,isExpanded:!1,fixedControl:!1,scrollParent:null}},methods:{goCodeEditor:function(){var t=this.$route.path.includes("vant")?"vant":"element-ui",e=Date.now().toString()+Math.floor(1e4*Math.random()),o={code:this.sourceCode,ui:t};localStorage.setItem("playground_content_".concat(e),JSON.stringify(o));var n=this.$router.resolve("/demo/playground.html?id=".concat(e)).href;window.open(n,"_blank")},scrollHandler:function(){var t=this.$refs.meta.getBoundingClientRect(),e=t.top,o=t.bottom,n=t.left,s=this.$refs.meta.offsetWidth;this.fixedControl=o>document.documentElement.clientHeight&&e+40<=document.documentElement.clientHeight,this.$refs.control.style.left=this.fixedControl?"".concat(n,"px"):"0",this.$refs.control.style.width=this.fixedControl?"".concat(s,"px"):"auto"},removeScrollHandler:function(){this.scrollParent&&this.scrollParent.removeEventListener("scroll",this.scrollHandler)}},computed:{lang:function(){return this.$route.path.split("/")[1]},blockClass:function(){return"demo-".concat(this.lang," demo-").concat(this.$router.currentRoute.path.split("/").pop())},iconClass:function(){return this.isExpanded?"el-icon-caret-top":"el-icon-caret-bottom"},controlText:function(){return this.isExpanded?"隐藏代码":"显示代码"},codeArea:function(){return this.$el.getElementsByClassName("meta")[0]},codeAreaHeight:function(){if(this.$el.getElementsByClassName("description").length>0)return this.$el.getElementsByClassName("description")[0].clientHeight}},watch:{isExpanded:function(t){var e=this;if(this.codeArea.style.height=t?"".concat(this.codeAreaHeight+1,"px"):"0",!t)return this.fixedControl=!1,this.$refs.control.style.left="0",this.$refs.control.style.width="auto",this.codeArea.style.height="0",void this.removeScrollHandler();setTimeout((function(){e.scrollParent=document,e.scrollParent&&e.scrollParent.addEventListener("scroll",e.scrollHandler),e.codeArea.style.height="".concat(e.codeAreaHeight+1,"px"),e.scrollHandler()}),400)}},mounted:function(){this.sourceCode=decodeURIComponent(this.$refs.sourceCode.innerHTML)},beforeDestroy:function(){this.removeScrollHandler()}},s=(o(494),o(76)),i=Object(s.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"demo-block",class:[t.blockClass,{hover:t.hovering}],on:{mouseenter:function(e){t.hovering=!0},mouseleave:function(e){t.hovering=!1}}},[o("div",{ref:"source",staticClass:"source"},[t._t("source")],2),t._v(" "),o("div",{ref:"sourceCode",staticStyle:{display:"none"}},[t._t("source-code")],2),t._v(" "),o("div",{ref:"meta",staticClass:"meta"},[t.$slots.default?o("div",{staticClass:"description"},[t._t("default")],2):t._e()]),t._v(" "),o("div",{ref:"control",staticClass:"demo-block-control",class:{"is-fixed":t.fixedControl},on:{click:function(e){t.isExpanded=!t.isExpanded}}},[o("transition",{attrs:{name:"arrow-slide"}},[o("i",{class:[t.iconClass,{hovering:t.hovering}]})]),t._v(" "),o("transition",{attrs:{name:"text-slide"}},[o("span",{directives:[{name:"show",rawName:"v-show",value:t.hovering,expression:"hovering"}]},[t._v(t._s(t.controlText))])]),t._v(" "),o("el-tooltip",{attrs:{effect:"dark",content:"点击前往新页面运行",placement:"right"}},[o("transition",{attrs:{name:"text-slide"}},[o("el-button",{directives:[{name:"show",rawName:"v-show",value:t.hovering||t.isExpanded,expression:"hovering || isExpanded"}],staticClass:"control-button",attrs:{size:"small",type:"text"},on:{click:function(e){return e.stopPropagation(),t.goCodeEditor(e)}}},[t._v("\n          在线运行\n        ")])],1)],1)],1)])}),[],!1,null,null,null);e.default=i.exports}}]);