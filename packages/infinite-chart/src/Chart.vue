<template>
  <div class="chart">
    <div :id="id"></div>
    <slot></slot>
  </div>
</template>

<script>

import propsConfig from './props'
import { Chart, registerEngine, registerGeometry, registerComponentController, registerAction, registerInteraction } from '@antv/g2/lib/core'
import Tooltip from '@antv/g2/lib/chart/controller/tooltip'
import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip/geometry'

import Line from '@antv/g2/lib/geometry/line'
import Point from '@antv/g2/lib/geometry/point'
import Interval from '@antv/g2/lib/geometry/interval'
import Axis from '@antv/g2/lib/chart/controller/axis'
import Legend from '@antv/g2/lib/chart/controller/legend'
import Coordinate from '@antv/coord/lib/factory'
// const G = require('@antv/g-canvas')
import * as G from '@antv/g-canvas'
// 按需注入
registerEngine('canvas', G)
registerGeometry('line', Line)
registerGeometry('point', Point)
registerGeometry('interval', Interval)

registerComponentController('axis', Axis)
registerComponentController('tooltip', Tooltip)
registerComponentController('legend', Legend)
registerComponentController('coordinate', Coordinate)

registerAction('tooltip', TooltipAction)
// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [
    { trigger: 'plot:mousemove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
    { trigger: 'plot:touchmove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } }
  ],
  end: [
    { trigger: 'plot:mouseleave', action: 'tooltip:hide' },
    { trigger: 'plot:leave', action: 'tooltip:hide' },
    { trigger: 'plot:touchend', action: 'tooltip:hide' }
  ]
})

export default {
  name: 'Chart',
  props: Object.assign(
    {
      id: String
    },
    propsConfig
  ),
  data () {
    return {
      // TODO 组成默认配置，还是继续合并
      componentConfig: {
        Axis: null,
        ToolTips: null
      }
    }
  },
  mounted () {
    const tooltip = this.getSlots('ToolTips')
    const axis = this.getSlots('Axis')
    const line = this.getSlots('ChartLine')
    // 设置当前的对象配置信息
    this.componentConfig = {
      Axis: this.getSlotAttrs(axis),
      ToolTips: this.getSlotAttrs(tooltip),
      Line: this.getSlotAttrs(line)
    }
    this.render()
  },
  methods: {
    render () {
      const { autoFit, type = 'line', id, width, height, chartData, componentConfig, scale, intervalConfig } = this
      const chart = new Chart({
        container: id,
        autoFit,
        width,
        height
      })
      chart.data(chartData)
      console.log('====================================')
      console.log(chart, Tooltip)
      console.log('====================================')
      // 配置坐标轴
      const {
        Axis,
        ToolTips,
        Line
      } = componentConfig
      // 坐标轴会是一个数组，可以针对多坐标轴
      if (Axis && Axis.length) {
        Axis.map(axisConfig => {
          const { name } = axisConfig
          // 如果没有配置name, 那么针对的就是所有的坐标轴
          if (!name) {
            chart.axis(axisConfig)
          } else {
            chart.axis(name, axisConfig)
          }
        })
      }
      // 获取scale
      (scale && scale.length) && (scale.map(item => {
        const { name, config } = item
        if (name) {
          chart.scale(name, config)
        } else if (config) {
          chart.scale(config)
        }
      }))
      // 配置提示框
      if (!ToolTips.length) {
        chart.tooltip(false)
      } else {
        // 读取slot 对应的配置信息
        // 获取 itemTplFunc
        const itemTpl = ToolTips[0].itemTplFunc()
        ToolTips[0].itemTpl = itemTpl
        // Tooltip(ToolTips[0])
        chart.tooltip(ToolTips[0])
      }
      // 首先判断当前的Gemo 类型 , 柱状图
      if (type === 'interval' && intervalConfig?.type === 'multi') {
        // 如果是 组合柱状图，必须传入选择的固定类型
        // 优先获取Chart内部的配置
        let config
        if (intervalConfig && intervalConfig.type) {
          config = intervalConfig
        } else if (Line.length) {
          config = Line[0]
        }
        const { position, multiName, adjust = [{
          type: 'dodge'
        }] } = config
        chart.interval().position(position).color(multiName).adjust(adjust)
      } else {
        // 获取line 相关的配置，也可能没有配置，也可能有多个的配置，比如多线条，
        (Line && Line.length) && Line.map(item => {
          let {
            position,
            size = 1,
            shape = 'smooth',
            color
          } = item
          let gemo = chart[type]({
            sortable: true
          })
          if (position) {
            gemo.size(size).position(position).shape(shape)
          }
          if (color) {
            gemo.color(color)
          }
        })
      }
      this.chart = chart
      chart.render()
    },
    /**
     * @description 获取内部的slots以及配置类型
     * @param {String} slotName
     * @param {String} type
     * @version 当组件内部同名组件多于一个，只会使用第一个的配置
     */
    getSlots (slotName, type = 'default') {
      const { $slots } = this
      // 获取所有的slots
      const slots = $slots[type]
      const result = slots && (slots.filter(item => {
        const { componentOptions } = item
        if (componentOptions) {
          return componentOptions.tag.includes(slotName)
        }
      }) || [])
      return result || []
    },
    /**
     * @param {Array} 传入的slot
     * @description 获取组件上的配置以及props
     *
     */
    getSlotAttrs (slot) {
      const result = []
      slot.map(item => {
        const { componentOptions = {}, data = {} } = item
        const { propsData = {} } = componentOptions
        const { attrs = {} } = data
        result.push(Object.assign(propsData, attrs))
      })
      return result
    }
  }
}
</script>

<style>

</style>
