import InfiniteResult from './src/index'

// 为组件提供 install 安装方法，供按需引入
InfiniteResult.install = function (Vue) {
  Vue.component(InfiniteResult.name, InfiniteResult)
}
export default InfiniteResult
