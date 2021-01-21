import InfiniteChartAxis from './src/Index.vue'

// 为组件提供 install 安装方法，供按需引入
InfiniteChartAxis.install = function (Vue) {
  Vue.component(InfiniteChartAxis.name, InfiniteChartAxis)
}
export default InfiniteChartAxis
