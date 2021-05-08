<script>
import ElInput from 'element-ui/lib/input'
import ElSelect from 'element-ui/lib/select'
import ElOption from 'element-ui/lib/option'
import ElDatePicker from 'element-ui/lib/date-picker'
import ElSwitch from 'element-ui/lib/switch'

export default {
  name: 'InfiniteFormItem',
  data () {
    return {
      models: this.formModels
    }
  },
  components: {
    ElInput,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElSwitch
  },
  props: {
    itemData: {
      type: Object,
      default: () => { },
      required: true
    },
    formModels: {
      type: Object,
      default: () => { }
    }
  },
  render (h, context) {
    const { itemData, formModels } = this
    const _data = {
      props: {
        ...itemData
      }
    }
    const placeholder = itemData.placeholder || ''
    formModels[itemData.key] = formModels[itemData.key] || itemData.defaultValue
    switch (itemData.type) {
      case 'component':
        const component = itemData.component(h)
        const componentOptions = component.componentOptions
        const sealedOptions = componentOptions.Ctor.sealedOptions
        const model = sealedOptions.model
        let flag = model && model.event && model.prop
        componentOptions.propsData[flag ? model.prop : 'value'] = formModels[itemData.key]
        const listenersFlag = !componentOptions.listeners
        if (listenersFlag) {
          componentOptions.listeners = {}
        }
        componentOptions.listeners[flag ? model.event : 'input'] = (val) => {
          formModels[itemData.key] = val
        }
        return component
      case 'input':
        return (<el-input {..._data} placeholder={placeholder} class={itemData.class} v-model={formModels[itemData.key]} />)
      case 'select':
        return (<el-select {..._data} placeholder={placeholder} class={itemData.class} clearable={itemData.clearable} v-model={formModels[itemData.key]}>
          {(itemData.options || []).map(o => (<el-option label={o.label} value={o.id} />))}
        </el-select>)
      case 'switch':
        return (<el-switch {..._data} v-model={formModels[itemData.key]}></el-switch>)
      case 'textarea':
        return (<el-input {..._data} type="textarea" placeholder={placeholder} class={itemData.class} v-model={formModels[itemData.key]} />)
      // case 'radio':
      //   return (<el-radio placeholder={placeholder} class={itemData.class} v-model={formModels[itemData.key]} />)
      case 'date-picker':
        return (
          <el-date-picker
            v-model={formModels[itemData.key]}
            align="right"
            type="date"
            placeholder="选择日期"
          // picker-options={}
          >
          </el-date-picker>
        )
      default:
        return null
    }
  }
}
</script>
