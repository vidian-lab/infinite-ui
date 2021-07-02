import EllipsisTextAction from '@antv/g2/lib/interaction/action/component/tooltip/ellipsis-text'
import ListHighlight from '@antv/g2/lib/interaction/action/component/list-highlight'
import ListUnchecked from '@antv/g2/lib/interaction/action/component/list-unchecked'
import DataFilter from '@antv/g2/lib/interaction/action/data/filter'
import ListActive from '@antv/g2/lib/interaction/action/component/list-active'
import CursorAction from '@antv/g2/lib/interaction/action/cursor'
import ElmentActive from '@antv/g2/lib/interaction/action/element/active'

const { registerInteraction, registerAction } = require('@antv/g2/lib/core')

registerAction('cursor', CursorAction)
registerAction('list-unchecked', ListUnchecked)
registerAction('data-filter', DataFilter)
registerAction('list-active', ListActive)
registerAction('element-active', ElmentActive)
// legend相关配置
registerAction('ellipsis-text', EllipsisTextAction)
registerAction('legend-item-highlight', ListHighlight, {
  componentNames: ['legend']
})
registerAction('axis-label-highlight', ListHighlight, {
  componentNames: ['axis']
})
registerInteraction('ellipsis-text', {
  start: [
    {
      trigger: 'legend-item-name:mousemove',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false }
    },
    {
      trigger: 'legend-item-name:touchstart',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false }
    },
    {
      trigger: 'axis-label:mousemove',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false }
    },
    {
      trigger: 'axis-label:touchstart',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false }
    }
  ],
  end: [
    { trigger: 'legend-item-name:mouseleave', action: 'ellipsis-text:hide' },
    { trigger: 'legend-item-name:touchend', action: 'ellipsis-text:hide' },
    { trigger: 'axis-label:mouseleave', action: 'ellipsis-text:hide' },
    { trigger: 'axis-label:touchend', action: 'ellipsis-text:hide' }
  ]
})
// legend hover，element active
registerInteraction('legend-active', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-active:active', 'element-active:active'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-active:reset', 'element-active:reset'] }]
})
// legend hover，element active
registerInteraction('legend-highlight', {
  start: [
    { trigger: 'legend-item:mouseenter', action: ['legend-item-highlight:highlight', 'element-highlight:highlight'] }
  ],
  end: [{ trigger: 'legend-item:mouseleave', action: ['legend-item-highlight:reset', 'element-highlight:reset'] }]
})
// legend hover，element active
registerInteraction('axis-label-highlight', {
  start: [
    { trigger: 'axis-label:mouseenter', action: ['axis-label-highlight:highlight', 'element-highlight:highlight'] }
  ],
  end: [{ trigger: 'axis-label:mouseleave', action: ['axis-label-highlight:reset', 'element-highlight:reset'] }]
})
// legend hover，element active
registerInteraction('element-list-highlight', {
  start: [{ trigger: 'element:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'element:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }]
})
// 筛选数据
registerInteraction('legend-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' }
  ],
  start: [{ trigger: 'legend-item:click', action: ['list-unchecked:toggle', 'data-filter:filter'] }]
})
// 筛选数据
registerInteraction('continuous-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'data-filter:filter' }]
})
// 筛选数据
registerInteraction('continuous-visible-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'element-filter:filter' }]
})
// 筛选图形
registerInteraction('legend-visible-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' }
  ],
  start: [{ trigger: 'legend-item:click', action: ['list-unchecked:toggle', 'element-filter:filter'] }]
})
