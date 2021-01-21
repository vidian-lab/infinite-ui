import InfiniteChartLine from './src/Index.vue'

// 为组件提供 install 安装方法，供按需引入
InfiniteChartLine.install = function (Vue) {
  Vue.component(InfiniteChartLine.name, InfiniteChartLine)
}
export default InfiniteChartLine
