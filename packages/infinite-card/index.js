import InfiniteCard from './src/index'

// 为组件提供 install 安装方法，供按需引入
InfiniteCard.install = function (Vue) {
  Vue.component(InfiniteCard.name, InfiniteCard)
}
export default InfiniteCard
