import InfiniteChartLegend from './src/Index.vue'

// 为组件提供 install 安装方法，供按需引入
InfiniteChartLegend.install = function (Vue) {
  Vue.component(InfiniteChartLegend.name, InfiniteChartLegend)
}
export default InfiniteChartLegend
