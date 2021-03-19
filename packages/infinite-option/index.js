import InfiniteOption from '../infinite-select/src/infiniteOption'

// 为组件提供 install 安装方法，供按需引入
InfiniteOption.install = function (Vue) {
  Vue.component(InfiniteOption.name, InfiniteOption)
}
export default InfiniteOption
