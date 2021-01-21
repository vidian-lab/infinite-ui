import InfiniteChartToolTips from './src/Index.vue'

// 为组件提供 install 安装方法，供按需引入
InfiniteChartToolTips.install = function (Vue) {
  Vue.component(InfiniteChartToolTips.name, InfiniteChartToolTips)
}
export default InfiniteChartToolTips
