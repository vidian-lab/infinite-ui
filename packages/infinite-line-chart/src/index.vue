<template>
  <div :id="id"></div>
</template>

<script>
import mixinChart from 'infinite-ui/packages/mixins/chart'

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
    axisConfig: {
      type: Object,
      default: () => ({
        x: {
          key: 'name',
          cfg: {}
        },
        y: {
          key: 'value', 
          cfg: {}
        }
      })
    },
    // 数据
    data: {
      type: Array,
      default: () => []
    },
    // 颜色
    color: {
      type: Object,
      default: () => ({
        key: 'type', 
        value: ['red', 'blue', 'green', 'yellow']
      })
    },
    // 是否显示图例
    showLegend: {
      type: Boolean,
      default: true
    },
    legendConfig: {
      type: Object,
      default: () => ({})
    },
    // 是否显示点
    showPoint: {
      type: Boolean,
      default: true
    },
    pointCfg: {
      type: Object,
      default: () => ({})
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
    // 是否打开tooltip
    useTooltip: {
      type: Boolean,
      default: true
    },
    // tooltip配置
    tooltipCfg: {
      type: Object,
      default: () => ({})
    },
    // 是否移除某个交互如点击筛选数据
    removeInteractionOption: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    setChartConfig: function (data) {
      // 为 chart 装载数据
      this.chart.data(data)
      // 进行列定义
      const genConfig = () => {
        for (const key in this.axisConfig) {
          if (this.axisConfig.hasOwnProperty(key)) {
            let k = this.axisConfig[key]['key'] || ''
            this.chart.axis(k, this.axisConfig[key]['cfg'])
            this.chart.scale({
              [k]: {
                ...this.axisConfig[key]['scaleCfg'] 
              }
            })
          }
        }
      }
      // 配置Xaxis Yaxis scale
      genConfig()
    
      // 配置tooltip
      // 是否使用tooltip
      if (this.useTooltip) {
        // 配置图表tooltip
        this.chart.tooltip(this.tooltipCfg)
      } else {
        this.chart.tooltip(false)
      }
      // 配置图表图例
      if (this.showLegend) {
        this.chart.legend('type', { ...{
          position: 'bottom'
        },
        ...this.legendConfig })
      } else {
        this.chart.legend(false) // 关闭图例
      }
      let valueStr = `${this.axisConfig['x']['key']}*${this.axisConfig['y']['key']}` || 'name*value'
      // 配置折线和散点的颜色、形状等
      let line = this.chart.line().position(valueStr)
      let point
      if (this.showPoint) {
        point = this.chart.point().position(valueStr).size(4).shape('circle').style(this.pointCfg)
      }

      // 配置多条折线时的颜色
      if (this.data.length > 0) {
        line.color(this.color['key'], this.color['value'])
        if (this.showPoint) {
          point.color(this.color['key'], this.color['value'])
        }
      }

      // 折线是否显示为曲线
      if (this.isSmooth) {
        line.shape('smooth')
      }

      // 移除传入的相关交互
      if (Array.isArray(this.removeInteractionOption) && this.removeInteractionOption.length) {
        this.chart.removeInteraction(...this.removeInteractionOption)
      }
    }
  }
}
</script>
