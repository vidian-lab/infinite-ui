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
      :visible='options.visible'
      :crosshairs="options.crosshairs"
      :showCrosshairs='options.showCrosshairs'
      :itemTpl='options.itemTpl'
      :showMarkers='options.showMarkers'
      :marker='options.marker'
    />
    <InfiniteChartLine :size='2' position="name*America" color="rgb(255,118,53)" />
    <InfiniteChartLine :size='2' position="name*China" color="rgb(255,290,53)" />
    <InfiniteChartLine :size='2' position="name*Japan" color="rgb(55,118,53)" />
    <InfiniteChartLine :size='2' position="name*Germany" color="rgb(255,118,153)" />
    <InfiniteChartLegend names='America,China,Japan,Germany'  />
    <InfiniteChartLegend names='America' :marker='{
      symbol: "circle"
    }' />
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
        options:{
          crosshairs: {
            type: 'xy',
            line:{
              style: {
                stroke: 'rgba(24,144,255,0.2)', // 辅助线的颜色
                fillOpacity: 0.2,
                lineWidth: 2, // 辅助线的宽度
                lineDash: [2, 3] // 设置虚线样式
              }
            } 
          },
          itemTpl: '<li style="background:transparent;margin-bottom:8px" data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{name}: {value}</li>',
          visible: true,
          showCrosshairs: true
        },
        config:{
          value: '',
          itemWidth: 200,
          title: {
            style: {
              fill: '#f00'
            }
          }
        },
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
    <InfiniteChartLegend names='America,China,Japan,Germany' />
    <InfiniteChartLine :size='10' position="name*China" color="rgb(255,100,0)" />
    <InfiniteChartLine :size='10' position="name*America" color="rgb(5,198,53)" />
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
            China: 21616,
            America: 86085,
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
    <InfiniteChartLegend names='America,China,Japan,Germany' />
  </infinite-chart>
</template>
<script>
  export default {
    data() {
      return {
        data:[
          { name: '1997', value: 9616, type: 'China' },
          { name: '2007', value: 35715, type: 'China' },
          { name: '1997', value: 86085, type: 'America' },
          { name: '2017', value: 122503, type: 'China' },
          { name: '2007', value: 144776, type: 'America' },
          { name: '2017', value: 193868, type: 'America' },
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
| position   | 映射的字段,类似x*y.此字段强约束                  | String  | —      | 必选 |
| size | 宽度                                   | String/Number  | —      | 1                     |
| color  | 颜色                             | String | —      | ——                                   |

### Infinite-Chart-ToolTips
Chart 内部提示框
### Attributes

| 参数         | 说明       | 类型    | 可选值 | 默认值           |
| ------------ | ---- | ------- | ------ | ------- |
| visible  | 是否可见      | Boolean   | true/false     | true   |
| showCrosshairs  | 是否显示 tooltips 辅助线， 默认不展示      | Boolean   | true/false     | false   |
| crosshairs   | 提示标线的配置，取决于showCrosshairs配置   | Object  | false      | —    |
| crosshairs.type   | 提示标线的类型  | String  | 'x','y','xy'      | x   |
| crosshairs.type   | 提示标线的类型  | String  | 'x','y','xy'      | x   |
| crosshairs.follow   | 提示标线是否跟随鼠标移动  | Boolean  | true/false      | false   |
| crosshairs.textBackground   | 辅助线文本背景配置  | Object  | -      | -   |
| crosshairs.line   | 辅助线表现样式配置  | Object  | -      | -   |
| crosshairs.text   | 辅助线文本配置  | Object  | -      | -   |
| show-point   | 遮罩层固定显示位置，接受 {x,y} 形式参数  | Boolean/String  | —     | true |
| offset | 漂移量，相对于X轴的漂移量       | Number/String  | —     | 10                  |
| cross-line  | 辅助线配置       | Object | —      | `{stroke: '#666',lineWidth: 2,lineDash: [2, 3]}`   |
| padding  | 展示边距       | Array | —      | [10]    |
| containerTpl  | 用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。| String | - | —    |
| itemTpl  | 渲染提示层，接受4个参数 index,color,name,value |  String/Boolean | —      | —    |
| domStyles  | 提示层dom样式，配置以下class的具体指'g2-tooltip';'g2-tooltip-title';'g2-tooltip-list';'g2-tooltip-list-item';'g2-tooltip-marker';'g2-tooltip-value';'g2-tooltip-name'; | Boolean/Object | —| —   |
| marker  | 图形和tooltips焦点的自定义样式，取决于showMarker是否为真     | Object | —| —   |
| showMarker  | 是否展示自定义marker。      | Boolean/Object | —| —   |
| showTitle  | 是否展示title。      | Boolean | true/false | true   |




### Infinite-Chart-Legend
Chart 图例框配置，只有图例项组件正确配置才能展示图例属性组件
### Attributes

| 参数 | 说明 |配置类型| 类型  | 可选值 | 默认值 |
| ---------- | ------ | -------| ------- | ------ | --------- |
| names      | 配置的图例key   | 全局配置  | Array/String   | —  | — |
| layout     | 布局方式  | 全局配置  |  String  | 'horizontal', 'vertical'  | —                                         |
| position   | 图例的位置 | 全局配置  | String  | 'top', 'top-left', 'top-right', 'right', 'right-top', 'right-bottom', 'left', 'left-top', 'left-bottom', 'bottom', 'bottom-left', 'bottom-right', 'bottom-center'     | 'bottom-center' |
| background | 背景框配置项 | 全局配置 | Object  | —  |  — |
| flipPage   | 分类图例，当图例项过多时是否进行分页。| 分类图例 | Boolean | — |— |
| handler    | 适用于 连续图例，滑块的配置项     | 连续图例   | Object |— |—  |
| itemHeight | 适用于 分类图例，图例的高度，默认为 null。| 分类图例  | Number | null |—  |
| itemWidth  | 适用于 分类图例，图例的宽度，默认为 null。| 分类图例  | Number | null |—  |
| itemName   | 适用于 分类图例，图例名称的配置。     | 分类图例  | Object | —| —   |
| itemSpace  | 适用于 分类图例，控制图例项水平方向的间距。 | 分类图例   | Object | — | —   |
| itemValue  | 图例项 value 附加值的配置项 | 分类图例 | Object | —| —   |
| animate    | 动画开关  | 全局配置| Boolean | true/false | true   |
| animateOption   | 动画配置 |全局配置| Object | —| —   |
| label      | 适用于 连续图例，文本的配置项 |连续图例| Object | —| —   |
| marker     | 适用于 分类图例，图例项的 marker 图标的配置 |分类图例| Object | —| —   |
| min        | 选择范围的最小值。| 连续图例 | Number | —| —   |
| max        | 选择范围的最大值。| 连续图例 | Number | —| —   |
| maxWidth   | 图例项最大的宽度值| 分类图例 | Number | —| —   |
| maxHeight  | 图例项最大的高度值| 分类图例 | Number | —| —   |
| offsetX    | 图例项X方向的偏移值 | 全局配置 | Number | —| —   |
| offsetY    | 图例项Y方向的偏移值 | 全局配置 | Number | —| —   |
| rail       | 图例背景色的配置 | 连续图例 | Object | —| —   |
| reversed   | 图例配置是否逆序 | 分类图例 | Boolean | —| — |
| slidable   | 图例配置可以连续滑动 | 连续图例 | Boolean | —| — |
| title      | 图例标题配置,为空则不展示 | 全局配置 | Object | —| null |
| track      | 择范围的色块样式配置项 | 连续图例 | Object | —| — |
| values     | 适用于连续图例，选择的值。 | 连续图例 | Object | —| — |


