import InfiniteSelect from './src/index'

// 为组件提供 install 安装方法，供按需引入
InfiniteSelect.install = function (Vue) {
  Vue.component(InfiniteSelect.name, InfiniteSelect)
}
export default InfiniteSelect
