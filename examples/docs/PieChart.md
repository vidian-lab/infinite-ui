## PieChart

### 基础用法

饼图用法。
:::demo

```html
<template>
  <infinite-pie-chart
    :chart-cfg="chartCfg"
    :type="'nightingale'"
    :axis-name="axisName"
    :data="data"
  >
  </infinite-pie-chart>
</template>
<script>
  export default {
    data() {
      return {
        chartCfg: {},
        data: [
          { name: '2016', value: 2 },
          { name: '2017', value: 1 },
          { name: '2018', value: 3 },
        ],
        axisName: {
          name: '年份',
          value: 'GDP(亿美元)',
        },
      };
    },
  };
</script>
```

:::

### Attributes

| 参数          | 说明           | 类型    | 可选值                                                                               | 默认值                                   |
| ------------- | -------------- | ------- | ------------------------------------------------------------------------------------ | ---------------------------------------- |
| chartCfg      | Chart 图表对象 | Object  | `{ container: this.id,width: dom.offsetWidth || 800,height: dom.innerHeight || 500}` |
| data          | 渲染数据       | Array   | —                                                                                    | —                                        |
| color-map     | 颜色组         | Array   | —                                                                                    | —                                        |
| axis-name     | 坐标轴名称     | Object  | —                                                                                    | —                                        |
| guide         | 辅助元素内容   | Object  | —                                                                                    | —                                        |
| use-tooltip   | 是否使用提示   | Boolean | —                                                                                    | true                                     |
| legend-option | 图例配置       | Object  | —                                                                                    | `{show: true,position: 'bottom-center'}` |
| label-option  | label 配置     | Object  | —                                                                                    | `{show: false,offset: 20}`               |
| type          | 图表类型       | String  | ring,pie,nightingale                                                                 | ring                                     |
| inner-radius  | —              | Number  | —                                                                                    | —                                        |
| padding       | 内边距         | Array   | —                                                                                    | `['auto', 'auto']`                       |
