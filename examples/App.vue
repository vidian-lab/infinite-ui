<!--
 * @Author: your name
 * @Date: 2020-12-21 09:47:44
 * @LastEditTime: 2020-12-31 16:18:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /infinite-ui/examples/App.vue
-->
<template>
  <div style="height: 100%">
    <el-container :class="{ 'home-container': isFixed }">
      <el-header v-if="!['/homeAnimationIndex','/scrollContainer'].includes($route.name)"
                 height="80"
                 :class="{ 'header-fixed': !isFixed }">
        <header-model></header-model>
      </el-header>
      <div :class="{ 'view-container': !isFixed }">
        <div class="view-container-scroll">
          <router-view></router-view>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
import HeaderModel from './components/header'
export default {
  components: {
    HeaderModel
  },
  data () {
    return {}
  },
  computed: {
    isFixed () {
      return this.$route.name.includes('home')
    }
  },
  mounted () {
    // var t = window.devicePixelRatio 
    // if (t !== 1) {
    //   alert('当前缩放比不正确，请调整成100%缩放比体验最佳')
    // }
  }
}
</script>
<style lang='scss' scoped>
.header-fixed {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1500;
  .header-model {
    border-bottom: 1px solid rgba(151, 151, 151, 0.1);
  }
}
.home-container {
  background: url("./assets/bg_header.png") no-repeat top;
  background-size: 2556px;
}
</style>
