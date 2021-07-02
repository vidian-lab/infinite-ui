<script>
import ElInput from 'element-ui/lib/input'
import ElAutocomplete from 'element-ui/lib/autocomplete'

export default {
  name: 'FormSearchItem',
  props: {
    inputBox: {
      type: Object,
      require: true
    },
    searchModels: {
      type: Object,
      require: true
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data () {
    return {
      models: this.searchModels
    }
  },
  components: {
    ElInput,
    ElAutocomplete
  },
  methods: {
    inputChangeHandler (val) {
      if (typeof this.inputBox.inputHandler === 'function') {
        this.inputBox.inputHandler.call(this, val)
      }
    },
    fetchSuggestions (queryString, cb) {
      if (typeof this.inputBox.fetchSuggestions === 'function') {
        this.inputBox.fetchSuggestions.call(this, queryString, cb)
      }
    },
    searchSelectHandler (item) {
      if (typeof this.inputBox.searchSelectHandler === 'function') {
        this.inputBox.searchSelectHandler.call(this, item)
      }
    }
  },
  render (h) {
    const {
      inputBox,
      searchModels,
      size,
      inputChangeHandler,
      fetchSuggestions,
      searchSelectHandler
    } = this
    const placeholder = inputBox.placeholder || ''

    switch (inputBox.type) {
      case 'input':
        return (
          <el-input
            size={size}
            style={inputBox.width ? `width:${inputBox.width}px` : `width:100%`}
            placeholder={placeholder}
            prefix-icon={inputBox.prefixIcon ? 'el-icon-search' : ''}
            suffix-icon={inputBox.suffixIcon ? 'el-icon-search' : ''}
            v-model={searchModels[inputBox.searchKey]}
            vOn:input={inputChangeHandler}
          ></el-input>
        )

      case 'selectFetch':
        return (
          <el-autocomplete
            v-model={searchModels[inputBox.searchKey]}
            size={size}
            clearable={inputBox.clearable}
            prefix-icon={inputBox.prefixIcon ? 'el-icon-search' : ''}
            suffix-icon={inputBox.suffixIcon ? 'el-icon-search' : ''}
            style={inputBox.width ? `width:${inputBox.width}px` : `width:100%`}
            placeholder={placeholder}
            fetch-suggestions={fetchSuggestions}
            trigger-on-focus={false}
            vOn:select={searchSelectHandler}
          ></el-autocomplete>
        )
      default:
        return null
    }
  }
}
</script>
