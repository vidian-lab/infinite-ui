import InfiniteToolTips from './src/index'
// 为组件提供 install 安装方法，供按需引入
InfiniteToolTips.install = function (Vue) {
  Vue.component(InfiniteToolTips.name, InfiniteToolTips)
}
export default InfiniteToolTips
