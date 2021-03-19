import InfiniteSteps from './src/index'
// 为组件提供 install 安装方法，供按需引入
InfiniteSteps.install = function (Vue) {
  Vue.component(InfiniteSteps.name, InfiniteSteps)
}
export default InfiniteSteps
