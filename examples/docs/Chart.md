## Chart

### 基础用法

趋势图用法。
:::demo

```html
<template>
  <infinite-chart
    :chartData="data"
  >
    <InfiniteChartToolTips
      visable=true
    />
    <InfiniteChartLine :size='2' position="name*America" color="rgb(255,118,53)" />
    <InfiniteChartLine :size='2' position="name*China" color="rgb(255,290,53)" />
    <InfiniteChartLine :size='2' position="name*Japan" color="rgb(55,118,53)" />
    <InfiniteChartLine :size='2' position="name*Germany" color="rgb(255,118,153)" />
    <InfiniteChartAxis name='America'/>
    <InfiniteChartAxis name='China' :visible='false' />
    <InfiniteChartAxis name='Japan' :visible='false' />
    <InfiniteChartAxis name='Germany' :visible='false' />
  </infinite-chart>
</template>
<script>
  export default {
    data() {
      return {
        data: [
          {
            name: '1997',
            America: 86085,
            China: 26160,
            Japan: 44122,
            Germany: 22159
          },
          { name: '2007',
            America: 144776,
            China: 35715,
            Japan: 45153,
            Germany: 34447
          },
          { name: '2017',
            America: 193868,
            China: 122503,
            Japan: 48675,
            Germany: 36865
          }
        ],
        axisName: {
          name: '年份',
          value: 'GDP(亿美元)',
          type: '国家',
        },
      };
    },
  };
</script>
```

:::

### Attributes

| 参数          | 说明                                      | 类型    | 可选值 | 默认值                                    |
| ------------ | ---------------------------------------- | ------- | ------ | ----------------------------------------- |
| chart-data   | 渲染数据                                   | Array   | —      | —                                         |
| autoFit      | 是否自适应屏幕                              | Boolean | —      |true                                     |
| width        | 图表宽度                              | String/ Number  | —      | 600 |
| height       | 图表高度                                   | String/ Number  | —      | 400                             |
| scale        | 接受度量衡缩放                              | Array | —      | true                                      |
| type         | 图形图标类型                               | String | line/interval      | line |
| interval-config| 柱状图，是否采取分组模式，还是串行模式,以及配置  | Object   | —      | -                      |



连续柱状图用法。
:::demo

```html
<template>
  <infinite-chart
    :chartData="data"
    type="interval"
  >
    <InfiniteChartToolTips
      visable=true
    />
    <InfiniteChartLine :size='10' position="name*America" color="rgb(5,198,53)" />
    <InfiniteChartLine :size='10' position="name*China" color="rgb(255,100,0)" />
    <InfiniteChartLine :size='10' position="name*Japan" color="rgb(0,255,255)" />
    <InfiniteChartLine :size='10' position="name*Germany" color="rgb(155,128,153)" />
  </infinite-chart>
  
</template>
<script>
  export default {
    data() {
      return {
        data: [
          {
            name: '1997',
            America: 86085,
            China: 21616,
            Japan: 44122,
            Germany: 22159
          },
          { 
            name: '2007',
            America: 144776,
            Japan: 45153,
            Germany: 34447,
            China: 35715,
          },
          { name: '2017',
            America: 193868,
            China: 122503,
            Japan: 48675,
            Germany: 36865
          }
        ],
      };
    },
  };
</script>
```
:::





分组柱状图用法。
:::demo




```html
<template>
  <infinite-chart
    :chartData="data"
    type="interval"
    :intervalConfig="{
      type: 'multi',
      position: 'name*value',
      multiName: 'type'
    }"
  >
    <InfiniteChartToolTips
      visable=true
    />
  </infinite-chart>
  
</template>
<script>
  export default {
    data() {
      return {
        data:[
          { name: '1997', value: 86085, type: 'America' },
          { name: '2007', value: 144776, type: 'America' },
          { name: '2017', value: 193868, type: 'America' },
          { name: '1997', value: 9616, type: 'China' },
          { name: '2007', value: 35715, type: 'China' },
          { name: '2017', value: 122503, type: 'China' },
          { name: '1997', value: 44122, type: 'Japan' },
          { name: '2007', value: 45153, type: 'Japan' },
          { name: '2017', value: 48675, type: 'Japan' },
          { name: '1997', value: 22159, type: 'Germany' },
          { name: '2007', value: 34447, type: 'Germany' },
          { name: '2017', value: 36865, type: 'Germany' }
        ],
        axisName: {
          name: '年份',
          value: 'GDP(亿美元)',
          type: '国家',
        },
      };
    },
  };
</script>
```



:::
### Infinite-Chart-Line 
Chart 内部图形基类
### Attributes

| 参数         | 说明                                     | 类型    | 可选值 | 默认值                                    |
| ------------ | ---------------------------------------- | ------- | ------ | ----------------------------------------- |
| smooth         | 是否平滑过渡                             | Boolean   | true/false     | true                                         |
| shape   | 坐标轴名称                               | Object  | —      | —                                         |
| position   | 映射的字段                               | String  | —      | 必选 |
| size | 宽度                                   | String/Number  | —      | 1                     |
| color  | 颜色                             | String | —      | ——                                   |

### Infinite-Chart-ToolTips
Chart 内部提示框
### Attributes

| 参数         | 说明                                     | 类型    | 可选值 | 默认值                                    |
| ------------ | ---------------------------------------- | ------- | ------ | ----------------------------------------- |
| visible         | 是否可见                             | Boolean   | true/false     | true                                         |
| crosshairs   | 提示标线   | Boolean | String  | false      | —                                         |
| show-point   | 遮罩层固定显示位置，接受 {x,y} 形式参数  | Boolean/String  | —     | true |
| offset | 漂移量，相对于X轴的漂移量       | Number/String  | —     | 10                  |
| cross-line  | 辅助线配置       | Object | —      | `{stroke: '#666',lineWidth: 2,lineDash: [2, 3]}`   |
| padding  | 展示边距       | Array | —      | [10]    |
| containerTpl  | 渲染提示层。外层| String | top/bottom/left/right | —    |
| itemTpl  | 渲染提示层 |  String/Boolean | —      | —    |
| domStyles  | 提示层dom样式      | Boolean/Object | —| —   |
| showItemMarker  | 当前坐标轴次刻度线样式配置。      | Boolean/Object | —| —   |


