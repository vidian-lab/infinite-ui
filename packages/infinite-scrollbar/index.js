import InfiniteScrollBar from './src/index'

// 为组件提供 install 安装方法，供按需引入
InfiniteScrollBar.install = function (Vue) {
  Vue.component(InfiniteScrollBar.name, InfiniteScrollBar)
}
export default InfiniteScrollBar
