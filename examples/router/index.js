import Vue from 'vue'
import VueRouter from 'vue-router'

import {
  Installation,
  Button,
  Cascaders,
  Dialog,
  Form,
  LineChart,
  NavMenu,
  Pagination,
  PieChart,
  SelectTags,
  Table,
  ThemePicker,
  Tree,
  Chart
} from './docs'
// import Home from '@/views/home'
import Layout from '@/views'
import animateIndex from '@/views/animateIndex'
import { getFileList } from './generate'

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
      }, {
        path: 'button',
        name: 'button',
        component: Button
      }, {
        path: 'cascaders',
        name: 'cascaders',
        component: Cascaders
      }, {
        path: 'dialog',
        name: 'dialog',
        component: Dialog
      }, {
        path: 'form',
        name: 'form',
        component: Form
      }, {
        path: 'lineChart',
        name: 'lineChart',
        component: LineChart
      }, {
        path: 'chart',
        name: 'chart',
        component: Chart
      }, {
        path: 'navMenu',
        name: 'navMenu',
        component: NavMenu
      }, {
        path: 'pagination',
        name: 'pagination',
        component: Pagination
      }, {
        path: 'pieChart',
        name: 'PieChart',
        component: PieChart
      }, {
        path: 'selectTags',
        name: 'SelectTags',
        component: SelectTags
      }, {
        path: 'table',
        name: 'table',
        component: Table
      }, {
        path: 'themePicker',
        name: 'themePicker',
        component: ThemePicker
      }, {
        path: 'tree',
        name: 'tree',
        component: Tree
      }
    ]
  }
]

routes.push(...generateRouters)

// 修复NavigationDuplicated 路由重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
export default router
