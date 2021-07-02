
import { uuidv4 } from 'infinite-ui/packages/utils/index';
// 注册需要的动画执行函数
import { fadeIn, fadeOut } from '@antv/g2/lib/animate/animation/fade';
import { growInX, growInXY, growInY } from '@antv/g2/lib/animate/animation/grow-in';
import { pathIn } from '@antv/g2/lib/animate/animation/path-in';
import { positionUpdate } from '@antv/g2/lib/animate/animation/position-update';
import { scaleInX, scaleInY } from '@antv/g2/lib/animate/animation/scale-in';
import { sectorPathUpdate } from '@antv/g2/lib/animate/animation/sector-path-update';
import { waveIn } from '@antv/g2/lib/animate/animation/wave-in';
import { zoomIn, zoomOut } from '@antv/g2/lib/animate/animation/zoom';

var _require = require('@antv/g2/lib/core'),
    Chart = _require.Chart,
    registerEngine = _require.registerEngine,
    registerGeometry = _require.registerGeometry,
    registerComponentController = _require.registerComponentController,
    registerInteraction = _require.registerInteraction,
    registerAction = _require.registerAction,
    registerAnimation = _require.registerAnimation;

var Line = require('@antv/g2/lib/geometry/line').default;
var Point = require('@antv/g2/lib/geometry/point').default;
var Interval = require('@antv/g2/lib/geometry/interval').default;
var Axis = require('@antv/g2/lib/chart/controller/axis').default;
var Tooltip = require('@antv/g2/lib/chart/controller/tooltip').default;
var TooltipAction = require('@antv/g2/lib/interaction/action/component/tooltip/geometry').default;
var Legend = require('@antv/g2/lib/chart/controller/legend').default;
var Coordinate = require('@antv/coord/lib/factory').default;
var G = require('@antv/g-canvas');

require('infinite-ui/packages/mixins/chart-legend');

// 按需注入
registerEngine('canvas', G);
registerGeometry('line', Line);
registerGeometry('point', Point);
registerGeometry('interval', Interval);

registerComponentController('axis', Axis);
registerComponentController('tooltip', Tooltip);
registerComponentController('legend', Legend);
registerComponentController('coordinate', Coordinate);

registerAction('tooltip', TooltipAction);
// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } }, { trigger: 'plot:touchmove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }, { trigger: 'plot:leave', action: 'tooltip:hide' }, { trigger: 'plot:touchend', action: 'tooltip:hide' }]
});
// 动画引入
registerAnimation('fade-in', fadeIn);
registerAnimation('fade-out', fadeOut);
registerAnimation('grow-in-x', growInX);
registerAnimation('grow-in-xy', growInXY);
registerAnimation('grow-in-y', growInY);
registerAnimation('scale-in-x', scaleInX);
registerAnimation('scale-in-y', scaleInY);
registerAnimation('wave-in', waveIn);
registerAnimation('zoom-in', zoomIn);
registerAnimation('zoom-out', zoomOut);
registerAnimation('position-update', positionUpdate);
registerAnimation('sector-path-update', sectorPathUpdate);
registerAnimation('path-in', pathIn);
export default {
  computed: {
    id: function id() {
      return uuidv4();
    }
  },
  data: function data() {
    return {
      chart: null
    };
  },

  watch: {
    // 监控data，当发生变化时，重新绘制图表
    data: function data(val, oldVal) {
      this.drawChart(val);
    }
  },
  methods: {
    // 构造图表实例
    constructChart: function constructChart() {
      // 销毁实例
      if (this.chart) {
        this.chart.destroy();
      }
      // const dom = document.getElementById(this.id)
      var dom = this.$el;
      if (dom && dom.innerHTML) {
        dom.innerHTML = '';
      }
      var options = Object.assign({
        container: this.id,
        width: dom.offsetWidth || 800,
        height: dom.innerHeight || 500,
        padding: [42, 20, 80, 70]
      }, this.chartCfg);
      return new Chart(options);
    },
    drawChart: function drawChart(data) {
      // 新建实例
      this.chart = this.constructChart();
      // 配置图表
      this.setChartConfig(data);

      // 绘制
      this.chart.render();
      var e = document.createEvent('Event');
      e.initEvent('resize', true, true);
      window.dispatchEvent(e);

      var _this = this;
      // 销毁实例
      this.$once('hook:beforeDestroy', function () {
        _this.chart.destroy();
      });
    }
  },
  mounted: function mounted() {
    this.data && this.data.length && this.drawChart(this.data);
  }
};