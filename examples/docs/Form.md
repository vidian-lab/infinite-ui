## Form

### 基础用法

表单用法。
:::demo

```html
<template>
  <infinite-form
    :required-position="requiredPosition"
    :label-position="labelPosition"
    :form-data="formData"
    :form-btns="formBtns"
  >
  </infinite-form>
</template>
<script>
  const ElInput = require('element-ui/lib/input');
  const cascaders = require('../../packages/infinite-cascaders');
  const selectTags = require('../../packages/infinite-select-tags');
  const validatePass = (rule, value, callback) => {
    if (!value) {
      callback(new Error('密码不能为空'));
    } else if (value.length < 6) {
      callback(new Error('密码不能小于6位数'));
    } else {
      callback();
    }
  };
  const opts = [
    {
      value: 'inputs',
      label: '输入框',
      children: [
        {
          value: 'input-1',
          label: '数字输入框',
          component: 'input',
          type: 'number',
        },
        {
          value: 'input-2',
          label: '文本输入框',
          component: 'input',
          type: 'text',
        },
      ],
    },
    {
      value: 'button',
      label: '按钮',
      children: [
        {
          value: 'button-1',
          label: '主要按钮',
          name: '主要按钮',
          component: 'button',
          type: 'primary',
        },
        {
          value: 'button-2',
          label: '成功按钮',
          name: '成功按钮',
          component: 'button',
          type: 'success',
        },
        {
          value: 'button-3',
          label: '警告按钮',
          name: '警告按钮',
          component: 'button',
          type: 'warning',
        },
        {
          value: 'button-4',
          label: '危险按钮',
          name: '危险按钮',
          component: 'button',
          type: 'danger',
        },
      ],
    },
    {
      value: 'date-picker',
      label: '日期选择器',
      children: [
        {
          value: 'date-picker-1',
          label: '日选择器',
          component: 'date-picker',
          type: 'date',
        },
      ],
    },
  ];

  export default {
    methods: {
      componentClick(val) {
        console.log('====event-click===', val);
      },
      componentEvent(val) {
        console.log('event-input=', val);
      },
    },
    data() {
      return {
        inline: false,
        labelPosition: 'left',
        requiredPosition: 'label',
        seletOpts: [
          {
            id: 'USD',
            name: '美元',
            children: [
              {
                id: 'USD-1',
                name: '美元-1',
              },
              {
                id: 'USD-2',
                name: '美元-2',
              },
              {
                id: 'USD-3',
                name: '美元-3',
              },
              {
                id: 'USD-4',
                name: '美元-4',
              },
            ],
          },
          {
            id: 'GBP',
            name: '英镑',
            disabled: true,
            children: [
              {
                id: 'GBP-1',
                name: '英镑-1',
              },
              {
                id: 'GBP-2',
                name: '英镑-2',
              },
              {
                id: 'GBP-3',
                name: '英镑-3',
              },
              {
                id: 'GBP-4',
                name: '英镑-4',
              },
            ],
          },
          {
            id: 'RMB',
            name: '人民币',
          },
          {
            id: 'EUR',
            name: '欧元',
          },
          {
            id: 'CAD',
            name: '加元',
          },
        ],
        formData: [
          {
            label: '自定义表单组件',
            type: 'component',
            key: 'cascaders',
            isShow: true,
            defaultValue: {
              keys: ['button', 'button-1'],
              value: '',
            },
            component: (h) => {
              return h(cascaders.default, {
                props: {
                  options: opts,
                },
                nativeOn: {
                  click: (val) => {
                    this.componentClick(val);
                  },
                },
                on: {
                  componentEvent: (val) => {
                    this.componentEvent(val);
                  },
                },
              });
            },
          },
          {
            label: '自定义表单组件',
            type: 'component',
            key: 'selectTags',
            isShow: true,
            component: (h) => {
              return h(selectTags.default, {
                props: {
                  options: this.seletOpts,
                  placeholder: '请选择查询信息',
                  tagsNum: 4,
                  defaultCheckeds: ['GBP'],
                },
                on: {
                  componentEvent: (val) => {
                    this.componentEvent(val);
                  },
                },
              });
            },
          },
          {
            label: '姓名',
            type: 'input',
            key: 'name',
            isShow: false,
          },
          {
            label: '喜好',
            type: 'select',
            key: 'likes',
            clearable: true,
            isShow: true,
            options: [
              {
                id: '1',
                label: '篮球',
              },
              {
                id: '2',
                label: '兵乓球',
              },
            ],
          },
          {
            label: '今日开心',
            type: 'switch',
            key: 'happy',
            isShow: true,
          },
          {
            label: '出生日期',
            type: 'date-picker',
            key: 'birthday',
            isShow: true,
          },
          {
            label: '自我介绍',
            type: 'textarea',
            key: 'introduction',
            isShow: true,
          },
          {
            label: '密码',
            type: 'input',
            key: 'password',
            isShow: true,
            disabled: true,
            rules: [
              { required: true, validator: validatePass, trigger: 'blur' },
            ],
          },
        ],
        formBtns: [
          {
            name: '保存',
            type: 'primary',
            click: (val, refs) => {
              refs.validate((valid) => {
                if (valid) {
                  console.log(val);
                }
              });
            },
          },
          {
            name: '取消',
          },
        ],
      };
    },
  };
</script>
```

:::

### 扩展

必选项提示位置为输入框。指定`labelPosition`为`top`,指定`requiredPosition`为`value`,

:::demo

```html
<template>
  <infinite-form
    :inline="inline"
    :required-position="requiredPosition"
    :label-position="labelPosition"
    :form-data="formData"
    :form-btns="formBtns"
  >
  </infinite-form>
</template>
<script>
  const ElInput = require('element-ui/lib/input');
  const cascaders = require('../../packages/infinite-cascaders');
  const validatePass = (rule, value, callback) => {
    if (!value) {
      callback(new Error('密码不能为空'));
    } else if (value.length < 6) {
      callback(new Error('密码不能小于6位数'));
    } else {
      callback();
    }
  };
  const opts = [
    {
      value: 'inputs',
      label: '输入框',
      children: [
        {
          value: 'input-1',
          label: '数字输入框',
          component: 'input',
          type: 'number',
        },
        {
          value: 'input-2',
          label: '文本输入框',
          component: 'input',
          type: 'text',
        },
      ],
    },
    {
      value: 'button',
      label: '按钮',
      children: [
        {
          value: 'button-1',
          label: '主要按钮',
          name: '主要按钮',
          component: 'button',
          type: 'primary',
        },
        {
          value: 'button-2',
          label: '成功按钮',
          name: '成功按钮',
          component: 'button',
          type: 'success',
        },
        {
          value: 'button-3',
          label: '警告按钮',
          name: '警告按钮',
          component: 'button',
          type: 'warning',
        },
        {
          value: 'button-4',
          label: '危险按钮',
          name: '危险按钮',
          component: 'button',
          type: 'danger',
        },
      ],
    },
    {
      value: 'date-picker',
      label: '日期选择器',
      children: [
        {
          value: 'date-picker-1',
          label: '日选择器',
          component: 'date-picker',
          type: 'date',
        },
      ],
    },
  ];

  export default {
    methods: {
      componentClick(val) {
        console.log('====event-click===', val);
      },
      componentEvent(val) {
        console.log('event-input=', val);
      },
    },
    data() {
      return {
        inline: false,
        labelPosition: 'top',
        requiredPosition: 'value',
        formData: [
          {
            label: '自定义表单组件',
            type: 'component',
            key: 'cascaders',
            isShow: true,
            component: (h) => {
              return h(cascaders.default, {
                props: {
                  options: opts,
                },
                nativeOn: {
                  click: (val) => {
                    this.componentClick(val);
                  },
                },
                on: {
                  componentEvent: (val) => {
                    this.componentEvent(val);
                  },
                },
              });
            },
          },
          {
            label: '姓名',
            type: 'input',
            key: 'name',
            isShow: false,
          },
          {
            label: '喜好',
            type: 'select',
            key: 'likes',
            clearable: true,
            isShow: true,
            options: [
              {
                id: '1',
                label: '篮球',
              },
              {
                id: '2',
                label: '兵乓球',
              },
            ],
          },
          {
            label: '今日开心',
            type: 'switch',
            key: 'happy',
            isShow: true,
          },
          {
            label: '出生日期',
            type: 'date-picker',
            key: 'birthday',
            isShow: true,
          },
          {
            label: '自我介绍',
            type: 'textarea',
            key: 'introduction',
            isShow: true,
          },
          {
            label: '密码',
            type: 'input',
            key: 'password',
            isShow: true,
            rules: [
              { required: true, validator: validatePass, trigger: 'blur' },
            ],
          },
        ],
        formBtns: [
          {
            name: '保存',
            type: 'primary',
            click: (val) => {
              console.log(val);
            },
          },
          {
            name: '取消',
          },
        ],
      };
    },
  };
</script>
```

:::

### Attributes

| 参数              | 说明                                                                                    | 类型    | 可选值         | 默认值 |
| ----------------- | --------------------------------------------------------------------------------------- | ------- | -------------- | ------ |
| form-data         | 展示表单的数据`FormData Attributes`                                                     | Array   | —              | —      |
| label-position    | 表单域标签的位置，如果值为 `left` 或者 `right` 时，则需要设置 `label-width`             | String  | right/left/top | right  |
| inline            | 行内表单模式                                                                            | Boolean | —              | —      |
| required-position | 必填符号`*`的位置                                                                       | string  | label/value    | label  |
| form-btns         | 表单按钮数据`Btn Option`                                                                | Array   | —              | —      |
| label-width       | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | String  | —              | 120px  |

### FormData Attributes

| 参数         | 说明                                                                                            | 类型                           | 可选值                                                 | 默认值 |
| ------------ | ----------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------ | ------ |
| key          | 表单数据对象的`key`                                                                             | String                         | —                                                      | —      |
| isShow       | 是否展示该行数据                                                                                | Boolean                        | —                                                      | false  |
| label        | 标签                                                                                            | String                         | —                                                      | —      |
| rules        | 表单验证规则                                                                                    | Object                         | —                                                      | —      |
| class        | 该组件样式                                                                                      | String                         | —                                                      | —      |
| defaultValue | 默认值,根据不同的组件使用不同类型的默认值来渲染                                                 | String/Object/boolean...       | —                                                      | —      |
| type         | 需要显示的组件类型,当 `type` 设置为 `component` 时，可以使用 `component` 属性进行自定义组件传入 | String                         | input/select/switch/textarea/own/date-picker/component | —      |
| component    | 自定义组件，这里的组件`必须`拥有`双向绑定`的值，便于组件的校验和 confirm                        | `Function(h){return h('div')}` | —                                                      | —      |
| options      | 当 `type` 设置为 `select` 时,需要展示的下拉值                                                   | Array                          | —                                                      | —      |
| placeholder  | 占位符文案                                                                                      | String                         | —                                                      | —      |

### Btn Option

| 参数  | 说明                                                                      | 类型                          | 可选值 | 默认值 |
| ----- | ------------------------------------------------------------------------- | ----------------------------- | ------ | ------ |
| type  | 按钮类型，`type`值可以在`button`组件文档中查找                            | String                        | —      | —      |
| name  | 按钮名称                                                                  | String                        | —      | —      |
| click | 按钮的点击回调，这里接受两个值，表单值的`formValue`和表单 ref 的`formRef` | Function(formValue,formRef){} | —      | —      |

### Form Events

| 方法名称      | 说明                                                 | 回调参数                                                   |
| ------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| validate      | 任一表单项被校验后触发                               | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | —                                                          |
| clearValidate | 移除该表单项的校验结果                               | —                                                          |
