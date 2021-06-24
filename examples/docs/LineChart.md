## LineChart

### 基础用法

趋势图用法。
:::demo

```html
<template>
  <infinite-line-chart
    :is-smooth="true"
    :axis-name="axisName"
    :data="data"
    :showPoint="showPoint"
    :tooltipCfg="tooltipCfg"
    :useTooltip="useTooltip"
    :legendConfig="legendConfig"
  >
  </infinite-line-chart>
</template>
<script>
  export default {
    data() {
      return {
        key: 'value',
        label:'name',
        data: [
          { name: '1997', value: 860, type: 'America' },
          { name: '2007', value: 144, type: 'America' },
          { name: '2017', value: 193, type: 'America' },
          { name: '1997', value: 961, type: 'China' },
          { name: '2007', value: 357, type: 'China' },
          { name: '2017', value: 122, type: 'China' },
          { name: '1997', value: 441, type: 'Japan' },
          { name: '2007', value: 451, type: 'Japan' },
          { name: '2017', value: 486, type: 'Japan' },
          { name: '1997', value: 221, type: 'Germany' },
          { name: '2007', value: 344, type: 'Germany' },
          { name: '2017', value: 368, type: 'Germany' },
        ],
        axisName: {
          name: '年份',
          value: 'GDP(亿美元)',
          type: '国家',
        },
        showPoint: true,
        useTooltip: true,
        tooltipCfg: {
          position: 'left',
          showCrosshairs: true,
          crosshairs: {
            type: 'x',
          },
        },
        legendConfig: {
          position: 'bottom', // 设置图例的显示位置
          spacingX: 20 // 图例项之间的水平间距
        }
      };
    },
  };
</script>
```

:::

### Attributes

| 参数         | 说明                                     | 类型    | 可选值 | 默认值                                    |
| ------------ | ---------------------------------------- | ------- | ------ | ----------------------------------------- |
| data         | 渲染数据                                 | Array   | —      | —                                         |
| axis-name    | 坐标轴名称                               | Object  | —      | —                                         |
| axis-color   | 坐标轴颜色                               | Object  | —      | `{ lineColor: '#ccc',labelColor: '#999'}` |
| single-color | 单颜色                                   | String  | —      | '#1890ff'                                 |
| show-legend  | 是否显示图例                             | Boolean | —      | true                                      |
| legendConfig  | 对 field 字段对应的图例进行配置。                             | object | —      | `{
          position: 'bottom-center'
        }`                                      |
| show-point   | showPoint                                | Boolean | —      | true                                      |
| is-percent   | `value` 数据是否是百分数（整数和百分数） | Boolean | —      | false                                     |
| is-smooth    | 是否显示曲线                             | Boolean | —      | false                                     |
| show-grid    | 是否显示网格线                           | Boolean | —      | true                                      |
| use-tooltip  | 是否显示提示                             | Boolean | —      | true                                      |
| padding      | 内边距                                  | Array   | —     | `['auto', 'auto']`  || `[20, 20, 95, 80], // 上，右，下，左`                      |
