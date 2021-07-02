import InfiniteOperation from './src/index'

// 为组件提供 install 安装方法，供按需引入
InfiniteOperation.install = function (Vue) {
  Vue.component(InfiniteOperation.name, InfiniteOperation)
}
export default InfiniteOperation
