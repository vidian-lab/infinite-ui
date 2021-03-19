import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views'
import animateIndex from '@/views/animateIndex'
import download from '@/docs/Download.md'
import { getFileList } from './generate'
const Installation = require('./docs').Installation

const generateRouters = getFileList()
const routes = [
  // {
  //   path: '/scrollContainer',
  //   name: '/scrollContainer',
  //   component: scrollContainer
  // },
  {
    path: '/',
    name: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: '/homeAnimationIndex',
    component: animateIndex
  },
  {
    path: '/guide',
    name: 'Guide',
    redirect: '/guide/installation',
    component: Layout,
    children: [
      {
        path: 'installation',
        name: 'installation',
        component: Installation
      },
      ...generateRouters,
      {
        path: 'download',
        name: 'download',
        component: download
      }
    ]
  }
]

// 修复NavigationDuplicated 路由重复点击报错
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
export default router
