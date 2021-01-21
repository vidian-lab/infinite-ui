import InfiniteChart from './src/Index.vue'

// 为组件提供 install 安装方法，供按需引入
InfiniteChart.install = function (Vue) {
  Vue.component(InfiniteChart.name, InfiniteChart)
}
export default InfiniteChart
