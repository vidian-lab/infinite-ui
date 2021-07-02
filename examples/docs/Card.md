## Card 按钮

常用的卡片展示组件

### 基础用法

卡片的基础用法。
:::demo 使用`shadow`、`round`、`padding`属性来定义 Card 的样式。

```html
<el-row :gutter="12">
  <el-col :span="8">
     <infinite-card>默认卡片</infinite-card>
  </el-col>
  <el-col :span="8">
    <infinite-card shadow='always' :round="round">
      <template name='title'>
        圆角-常驻阴影
      </template>
    </infinite-card>
  </el-col>
  <el-col :span="8">
    <infinite-card shadow='hover' :round="round">
      <template name='title'>
        hover阴影
      </template>
    </infinite-card>
  </el-col>
  </el-row>
  <el-row :gutter="12">
    <el-col :span="8">
      <infinite-card padding="10px" shadow='hover' :round="round">
        <template name='title'>
          hover阴影,缩小边距
        </template>
      </infinite-card>
    </el-col>
  </el-row>
<script>
  export default {
    data(){
      return {
        round: true
      }
    }
  };
</script>
```

:::

### 展示详细内容
:::demo 使用slot来自定义 Card 的内部数据。

```html
<el-row :gutter="12">
  <el-col :span="8">
    <infinite-card shadow='always' :round="round" icon="el-icon-s-tools">
      <template name='title'>
        公司存款
      </template>
      <div class="deposit">
        <div class='money'>
          <span>5,532</span><em>亿</em>
        </div>
        <div class="indicator-list">
          <dl><dt>较上月</dt><dd><span>32<i class="el-icon-top"></i></span></dd></dl>
          <dl><dt>较年初</dt><dd><span>32<i class="el-icon-bottom"></i></span></dd></dl>
        </div>
      </div>
    </infinite-card>
  </el-col>
</el-row>
<script>
  export default {
    data(){
      return {
        round: true
      }
    }
  };
</script>
<style>
.deposit .money{
  margin:14px 0;
  height:24px;
  line-height: 24px;
  font-size: 24px;
  text-align: right;
}
.deposit .money em{ 
  font-size: 12px;
}

.indicator-list dl {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 12px;
  line-height: 12px;
  color: #666;
}

.indicator-list dl:first-of-type{
  margin-bottom: 14px;
}
</style>

```

:::

### 添加特殊的背景图片

:::demo 通过`shadowBackground`来显示特殊背景图

```html
<el-row :gutter="12">
  <el-col :span="8">
    <infinite-card
      :shadowBackground="shadowBackground"
    shadow='always' :round="round" icon="el-icon-s-tools">
      <template name='title'>
        公司存款
      </template>
      <div class="deposit">
        <div class='money'>
          <span>5,532</span><em>亿</em>
        </div>
        <div class="indicator-list">
          <dl><dt>较上月</dt><dd><span>32<i class="el-icon-top"></i></span></dd></dl>
          <dl><dt>较年初</dt><dd><span>32<i class="el-icon-bottom"></i></span></dd></dl>
        </div>
      </div>
    </infinite-card>
  </el-col>
</el-row>
<script>
  export default {
    data(){
      return {
        round: true,
        shadowBackground:{
          url: 'https://ae03.alicdn.com/kf/H7d43b6824f3e450aa56261745a6eb4b7q.png',
          position:'absolute',
          width:"50px",
          height: "50px",
          right: '0px',
          top:'0px',
          "z-index":"-1"
        }
      }
    }
  };
</script>
<style>
.deposit .money{
  margin:14px 0;
  height:24px;
  line-height: 24px;
  font-size: 24px;
  text-align: right;
}
.deposit .money em{ 
  font-size: 12px;
}

.indicator-list dl {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 12px;
  line-height: 12px;
  color: #666;
}

.indicator-list dl:first-of-type{
  margin-bottom: 14px;
}
</style>
```

:::

### Attributes

| 参数     | 说明            | 类型    | 可选值    | 默认值 |
| -------- | -----------    | ------- | ----------------- | ------ |
| title    | 标题，可以通过slot/title传入       | string  |—  | —      |
| padding    | card边距       | string  |—  | 16px 24px      |
| size     | 尺寸            | string  | medium / small / large   | —      |
| round    | 是否圆角按钮      | boolean | —      | false  |
| icon     | 标题的图标类名    | string | —      | —  |
| shadow   | card的阴影层展示    | string | never/always/hover      | never  |
| shadowBackground   | card的背景图片展示，url为图片类链接。若需要展示背景图片，此选项必选    | Object | —     | —|
