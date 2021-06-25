<template>
  <div :id="id"></div>
</template>

<script>
import mixinChart from 'infinite-ui/packages/mixins/chart'
import { percentFormat, floatIntFormat } from 'infinite-ui/packages/utils/index'

export default {
  name: 'InfiniteLineChart',
  data () {
    return {
     
    }
  },
  mixins: [mixinChart],
  props: {
    // chartCfg
    chartCfg: {
      type: Object,
      default: () => {}
    },
    // 数据
    
    data: {
      type: Array,
      default: () => []
    },
    // 坐标轴名称
    axisName: {
      type: Object,
      default: () => {
        return {
          name: 'name',
          value: 'value',
          type: 'type'
        }
      }
    },
    // 坐标轴颜色
    axisColor: {
      type: Object,
      default: () => {
        return {
          lineColor: '#ccc',
          labelColor: '#999'
        }
      }
    },
    // 单颜色
    singleColor: {
      type: String,
      default: '#1890ff'
    },
    // 是否显示图例
    showLegend: {
      type: Boolean,
      default: true
    },
    legendConfig: {
      type: Object,
      default: () => {}
    },
    // 是否显示点
    showPoint: {
      type: Boolean,
      default: true
    },
    // value 数据是否是百分数（整数和百分数）
    isPercent: {
      type: Boolean,
      default: false
    },
    // 是否显示曲线
    isSmooth: {
      type: Boolean,
      default: false
    },
    // 是否显示网格线
    showGrid: {
      type: Boolean,
      default: true
    },
    useTooltip: {
      type: Boolean,
      default: true
    },
    tooltipCfg: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    setChartConfig: function (data) {
      // 为 chart 装载数据
      this.chart.data(data)
      // 进行列定义
      let _this = this
      let scaleConfig = (function () {
        let obj = {}
       
        for (const key in _this.axisName) {
          if (_this.axisName.hasOwnProperty(key)) {
            obj[key] = {}
            obj[key]['alias'] = _this.axisName[key]
            if (key === 'value') {
              // 数据格式, 将数据转为百分数或浮点数(保留一位小数), 整数不做处理
              obj[key]['formatter'] = _this.isPercent ? percentFormat : floatIntFormat
            }
          }
        }
        obj.alias = '现金流(亿)'

        obj.value = {
          min: 0,
          nice: true
          // max: 1000,
          // tickCount: 6
        }
        return obj
      }())
      this.chart.scale(scaleConfig)

      // 配置tooltip
      // 是否使用tooltip
      if (this.useTooltip) {
        // 配置图表tooltip
        this.chart.tooltip(_this.tooltipCfg)
      } else {
        this.chart.tooltip(false)
      }

      // 配置图表图例
      if (this.showLegend) {
        this.chart.legend('type', { ...{
          position: 'bottom-center'
        },
        ...this.legendConfig })
      } else {
        this.chart.legend('type', false)
      }

      // 坐标轴配置
      this.chart.axis('name', {
        tickLine: false
       
      })
      this.chart.axis('value', {
        line: {
          // lineWidth: 1, // 设置线的宽度
          stroke: '#d9d9d9', // 设置线的颜色
          lineDash: [1, 1]// 设置虚线
        },
        grid: {
          lineStyle: {
            lineDash: null,
            stroke: '#d9d9d9',
            lineWidth: 10
          }
        },
        label: {
          autoRotate: false,
          rotate: 0,
          formatter: (text, item, index) => {
            return text + ''
          }
        }
      })

      // 配置折线和散点的颜色、形状等
      let line = this.chart.line().position('name*value')
      let point
      if (this.showPoint) {
        point = this.chart.point().position('name*value').size(4).shape('circle').style({
          stroke: '#fff',
          lineWidth: 1
        })
      }

      // 配置多条折线时的颜色
      if (this.data.length > 0 && this.data[0].hasOwnProperty('type')) {
        line.color('type')
        if (this.showPoint) {
          point.color('type')
        }
      } else {
        line.color(this.singleColor)
        if (this.showPoint) {
          point.color(this.singleColor)
        }
      }

      // 折线是否显示为曲线
      if (this.isSmooth) {
        line.shape('smooth')
      }
    }
  }
}
</script>
