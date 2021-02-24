<template>
  <div class="chart">
    <div ref='chart-con' :id="id"></div>
    <slot></slot>
  </div>
</template>

<script>
import { setScale, setToolTips, setGemo, setAxis, setLegend } from './util'
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
  name: 'ChartVue',
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
    const legend = this.getSlots('ChartLegend')
    // 设置当前的对象配置信息
    this.componentConfig = {
      Axis: this.getSlotAttrs(axis),
      ToolTips: this.getSlotAttrs(tooltip),
      Line: this.getSlotAttrs(line),
      legend: this.getSlotAttrs(legend)
    }
    this.$nextTick(() => {
      this.render()
    })
  },
  methods: {
    render () {
      const { autoFit, type = 'line', id, width, height, chartData, componentConfig, scale, intervalConfig, legendConfig } = this
      const chart = new Chart({
        container: id,
        autoFit,
        width,
        height
      })
      chart.data(chartData)
      // 配置坐标轴
      const {
        Axis,
        ToolTips,
        Line,
        legend
      } = componentConfig
      setAxis(chart, Axis)
      // 设置获取scale
      setScale(chart, Line, chartData, scale)
      // 设置提示框
      setToolTips(chart, ToolTips)
      // 设置图形
      setGemo(chart, type, intervalConfig, Line)
      setLegend(chart, legend, legendConfig, intervalConfig, type, chartData)
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
      const slots = $slots[type] || []
      return slots.filter(item => {
        const { componentOptions } = item
        if (componentOptions) {
          return componentOptions.tag.includes(slotName)
        }
      })
    },
    /**
     * @param {Array} 传入的slot
     * @description 获取组件上的配置以及props
     *
     */
    getSlotAttrs (slot) {
      const result = []
      slot.forEach(item => {
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
