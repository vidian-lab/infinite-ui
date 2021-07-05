## FromSearch

搜索提供了用户进行文本查询的功能，用户可以针对当前页面的内容通过精确搜索和模糊搜索进行内容筛选和定位，提高查询效率。,支持input输入搜索，select远程搜索。

### 基础用法

### input输入条件搜索

:::demo prefixIcon、suffixIcon可用于控制Icon显示的位置，searchInputHandler回调中可以接收输入的value

```html
<template>
   <infinite-form-search
   :searchItem="searchItem"
   :size="size"
   >
   </infinite-form-search>
</template>

<script>
  export default {
    data(){
        return {
            searchItem:[
                {
                    inputBox:{
                        type:'input',
                        placeholder:'请输入搜索条件',
                        searchKey:'name',
                        suffixIcon:true,
                        width:230,
                        inputHandler:this.searchInputHandler
                    }
                }
            ],
            size:'small'
        }
    },
    methods:{
        searchInputHandler(val){
           console.log(val);
        }
    }
  }
</script>

```
:::

### 远程搜索

通过关键字从后台接口获取搜索结果列表，可选取列表选项再进行精确查找。

:::demo selectFetchSuggestions回调中可处理远程拉取数据逻辑，只需要将拉取的结果传入‘cb’回调函数当中即可；searchSelectHandler可接收选中后的选项

```html
<template>
   <infinite-form-search
   :searchItem="searchItem"
   :size="size"
   >
   </infinite-form-search>
</template>

<script>
  export default {
    data(){
        return {
            searchItem:[
                {
                    inputBox:{
                        type:'selectFetch',
                        placeholder:'请输入内容',
                        searchKey:'value',
                        prefixIcon:true,
                        width:230,
                        clearable:true,
                        fetchSuggestions:this.selectFetchSuggestions,
                        searchSelectHandler:this.searchSelectHandler,
                        openHighlight: true
                    }
                }
            ],
            size:'small'
        }
    },
    methods:{
        selectFetchSuggestions(queryString, cb){
           const result = this.getList({value:queryString})
           cb(result)
        },
        getList(params){
          const result=[
              {value:"三全鲜食（北新泾店）",address:"长宁区新渔路144号"},
              {value:"Hot honey 首尔炸鸡（仙霞路）",address:"上海市长宁区淞虹路661号"},
              {value:"新旺角茶餐厅",address:"上海市普陀区真北路988号创邑金沙谷6号楼113"},
              {value:"泷千家(天山西路店)",address:"天山西路438号"},
              {value:"胖仙女纸杯蛋糕（上海凌空店）",address:"上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
              {value:"贡茶",address:"上海市长宁区金钟路633号"},
              {value:"豪大大香鸡排超级奶爸",address:"上海市嘉定区曹安公路曹安路1685号" },
              {value:"茶芝兰（奶茶，手抓饼）",address:"上海市普陀区同普路1435号"},
              {value:"十二泷町",address:"上海市北翟路1444弄81号B幢-107"},
              {value:"星移浓缩咖啡",address:"上海市嘉定区新郁路817号"}
          ]
          return result.filter(f=>f.value.includes(params.value))
        },
        searchSelectHandler(item){
           console.log(item);
        }
    }
  }
</script>

```
:::


### input 输入校验

支持用户对搜索内容的输入校验。

:::demo 通过设置rules增加页面校验

```html
<template>
   <infinite-form-search
   :searchItem="searchItem"
   :size="size"
   >
   </infinite-form-search>
</template>

<script>

  export default {
    data(){
    const validatePass = (rule, value, callback) => {
            if (value.length > 5) {
            callback(new Error('长度大于5位数'));
            } else {
            callback();
            }
        };
        return {
            searchItem:[
                {
                    inputBox:{
                        type:'input',
                        placeholder:'请输入搜索条件',
                        searchKey:'name',
                        suffixIcon:true,
                        width:230,
                        inputHandler:this.searchInputHandler,
                        rules: {
                            name:[{validator:validatePass,trigger:'change'}]
                        } ,
                        validErrorTips:''
                    }
                }
            ],
            size:'small'
            
        }
    },
    methods:{
        searchInputHandler(val){
           console.log(val);
        }
    }
  }
</script>

```
:::

### Attributes

| 参数       | 说明                                  | 类型   | 可选值                | 默认值 |
| ---------- | ------------------------------------- | ------ | --------------------- | ------ |
| searchItem | 搜索输入项配置`SearchItem Attributes` | Array  | —                     | —      |
| className  | 自定义`class`名称                     | String | —                     | —      |
| size       | 搜索框尺寸大小                        | String | medium / small / mini | —      |


### SearchItem Attributes

| 参数                | 说明                                             | 类型                      | 可选值            | 默认值 |
| ------------------- | ------------------------------------------------ | ------------------------- | ----------------- | ------ |
| type                | 搜索框展示类型                                   | String                    | input/selectFetch | —      |
| placeholder         | 输入框录入提示                                   | String                    | —                 | —      |
| searchKey           | 搜索框绑定的唯一key                              | String                    | —                 | —      |
| suffixIcon          | 输入框头部图标                                   | Boolean                   | —                 | false  |
| suffix-icon         | 输入框尾部图标                                   | Boolean                   | —                 | false  |
| width               | 搜索框宽度                                       | Number                    | —                 | —      |
| clearable           | 可清空的输入框值                                 | Boolean                   | —                 | false  |
| rules               | 搜索框校验规则                                   | Object                    | —                 | —      |
| inputHandler        | `type`为`input`时，输入框的`input`回调事件       | Function(val)             | —                 | —      |
| fetchSuggestions    | `type`为`selectFetch`时，输入框的`input`回调事件 | Function(queryString, cb) | —                 | —      |
| searchSelectHandler | `type`为`selectFetch`时，选中数据项后的回调事件  | Function(item)            | —                 | —      |
| openHighlight   | 是否打开搜索高亮                                    | Boolean                   | —                 | false  |
| highlightColor  | 搜索高亮的颜色值                                    | String                    | —                 | #ff8241|
