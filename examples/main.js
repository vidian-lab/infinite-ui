import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// // 引入element-ui
import './plugins/element'

import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
import demoBlock from './components/demo-block'
import hljs from 'highlight.js'
import '../packages/theme-chalk/src/index.scss'
// // 导入组件库
import packages from '../packages'

for (const key in packages) {
  if (packages.hasOwnProperty(key)) {
    const element = packages[key]
    if (element.install && element.name.toLocaleLowerCase().includes('infinite')) {
      Vue.use(element)
    };
  }
}
const { InfiniteDownload, InfiniteDragContainer } = packages
Vue.prototype.$InfiniteDownload = InfiniteDownload
Vue.prototype.$InfiniteDragContainer = InfiniteDragContainer
Vue.config.productionTip = false

Vue.component('demo-block', demoBlock)

router.afterEach(route => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)

    const scrollParent = document.querySelector('.view-container-scroll')
    scrollParent.scrollTop = 0
  })
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
