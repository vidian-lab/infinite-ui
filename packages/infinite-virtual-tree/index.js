import InfiniteVirtualTree from './src/index'
// 为组件提供 install 安装方法，供按需引入
InfiniteVirtualTree.install = function (Vue) {
  Vue.component(InfiniteVirtualTree.name, InfiniteVirtualTree)
}
export default InfiniteVirtualTree
