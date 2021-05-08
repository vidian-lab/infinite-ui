import Vue from 'vue'
import merge from 'infinite-ui/packages/utils/merge'
import { isVNode } from 'infinite-ui/packages/utils/vdom'
import { uuidv4, hyphenate } from 'infinite-ui/packages/utils/index.js'
import InfiniteDragContainerVue from './index.vue'
const defaults = {
  platform: null,
  defaultsStyle: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    display: 'inline-block',
    zIndex: '1501',
    cursor: 'grab'
  }
}
const InfiniteDragContainerConstructor = Vue.extend(InfiniteDragContainerVue)

let currentBpf, instance // 当前拖拽组件对象 当前拖拽组件节点
let bpfQueue = [] // 所有拖拽组件集合
let styleId = ''
const vm = new Vue()
const h = vm.$createElement
// 创建节点
const initInstance = () => {
  instance = new InfiniteDragContainerConstructor({
    el: document.createElement('div')
  })
}
// 添加相关属性
const showNextIBPF = (options) => {
  if (!instance) { initInstance() }
  instance.action = ''
  if (bpfQueue.length > 0) {
    currentBpf = bpfQueue.shift()
    let options = currentBpf.options
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop]
      }
    }
    if (!['string'].includes(typeof instance.platform) && isVNode(instance.platform(h))) {
      instance.$slots.default = [instance.platform(h)]
      instance.platform = null
    } else {
      // delete instance.$slots.default
      instance.$el.innerHTML = instance.platform
      instance.platform = null
    }
    Vue.nextTick(() => {
      if (instance && !document.getElementById(styleId)) { creatStyle() }
      instance.visible = true
    })
  }
  document.body.appendChild(instance.$el)
}
// 初始化拖拽对象
const InfiniteDragContainer = function (options) {
  const optionsAll = merge({}, defaults, InfiniteDragContainer.defaults, options)
  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => { // eslint-disable-line
      bpfQueue.push({
        options: optionsAll,
        resolve: resolve,
        reject: reject
      })

      showNextIBPF(optionsAll)
    })
  } else {
    bpfQueue.push({
      options: optionsAll
    })
    showNextIBPF(optionsAll)
  }
}
// 创建插入css
const creatStyle = function () {
  styleId = uuidv4()
  const styleEl = document.createElement('style')
  styleEl.setAttribute('id', styleId)
  const innerSty = Object.assign({}, instance.defaultsStyle, instance.style)
  let styleElInnerHTML = ''
  Object.keys(innerSty).forEach(k => {
    styleElInnerHTML += `${hyphenate(k)}: ${innerSty[k]};`
  })
  styleEl.innerHTML = `
      .infinite-drag-container {
        ${styleElInnerHTML}
      }
    `
  styleEl.setAttribute('type', 'text/css')
  document.getElementsByTagName('HEAD').item(0).appendChild(styleEl)
}
// 获取实例
InfiniteDragContainer.getInstance = () => {
  InfiniteDragContainer.instance = instance
}
// 隐藏
InfiniteDragContainer.close = () => {
  if (instance) {
    instance.visible = false
    bpfQueue = []
    currentBpf = null
  }
}
// 移除
InfiniteDragContainer.remove = () => {
  if (instance) {
    if (instance.handleRemove && ['function'].includes(typeof instance.handleRemove)) {
      instance.handleRemove()
      const dom = document.body.querySelector('.infinite-drag-container')
      document.body.removeChild(dom)
      document.getElementById(styleId).remove()
    }
    instance.visible = false
    bpfQueue = []
    currentBpf = null
    instance = null
  }
}

export default InfiniteDragContainer
export { InfiniteDragContainer }
