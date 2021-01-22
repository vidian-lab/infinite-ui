## Chart

### 基础用法

趋势图用法。
:::demo

```html
<template>
  <infinite-chart
    :chartData="data"
    :scale= "[{
      name:'America',
      config: {
        min:0,
        max:200000,
        nice:true,
      }
    }, {
      name:'China',
      config: {
        min:0,
        nice:true,
        max:200000
      }
    },{
      name:'Japan',
      config: {
        min:0,
        max:200000,
        nice:true
      }
    },{
      name:'Germany',
      config: {
        max:200000,
        min:0,
        nice:true
      }
    }]"
  >
    <InfiniteChartToolTips
      visable=true
      :crosshairs="{
        type: 'x',
        follow: true,
        line: {
          style: {
            stroke: 'rgba(255,118,53,0.4)',
            lineDash: [4]
          }
        }
      }"
      :showCrosshairs="true"
      :padding="[40]"
      :showTitle='false'
      :itemTplFunc="()=>{
        return '<div>{title}:{value}</div>'
      }"
      :domStyles="{
        'g2-tooltip':{
          backgroundColor: 'rgba(0,0,0, .5)',
          color: '#fff',
          height: '28px',
          display:'flex',
          alignItems: 'center'
        },
        'g2-tooltip-title': {
          margin: '0'
        }
      }"
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
            China: 9616,
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
| autoFix      | 是否自适应屏幕                              | Boolean | —      |true                                     |
| width        | 图表宽度                              | String/ Number  | —      | 600 |
| height       | 图表高度                                   | String/ Number  | —      | 400                             |
| scale        | 接受度量衡缩放                              | Array | —      | true                                      |
| type         | 图形图标类型                               | String | line/interval      | line |
| intervalConfig| 柱状图，是否采取分组模式，还是串行模式,以及配置  | Object   | —      | -                      |



连续柱状图用法。
:::demo

```html
<template>
  <infinite-chart
    :chartData="data"
    type="interval"
    :scale= "[{
      name:'America',
      config: {
        min:0,
        max:200000,
        nice:true,
      }
    }, {
      name:'China',
      config: {
        min:0,
        nice:true,
        max:200000
      }
    },{
      name:'Japan',
      config: {
        min:0,
        max:200000,
        nice:true
      }
    },{
      name:'Germany',
      config: {
        max:200000,
        min:0,
        nice:true
      }
    }]"
  >
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
            China: 9616,
            Japan: 44122,
            Germany: 22159
          },
          { 
            name: '2007',
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
