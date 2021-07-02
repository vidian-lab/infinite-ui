
import { shallowMount, config } from '@vue/test-utils'
import InfiniteFormSearch from '@/packages/infinite-form-search/src/index.vue'
import InfiniteSearchItem from '@/packages/infinite-form-search/src/infiniteFormSearchItem.vue'
import ElForm from 'element-ui/lib/form.js'
import ElFormItem from 'element-ui/lib/form-item.js'
import ElInput from 'element-ui/lib/input.js'
import ElAutocomplete from 'element-ui/lib/autocomplete'

config.stubs['FormSearchItem'] = InfiniteSearchItem
config.stubs['ElForm'] = ElForm
config.stubs['ElFormItem'] = ElFormItem
config.stubs['ElInput'] = ElInput
config.stubs['ElAutocomplete'] = ElAutocomplete

const getInputItem = () => {
  return [
    {
      inputBox: {
        type: 'input',
        placeholder: '请输入搜索条件',
        searchKey: 'name',
        width: 230
      }
    }
  ]
}

const getSelectItem = () => {
  return [
    {
      inputBox: {
        type: 'selectFetch',
        placeholder: '请输入内容',
        searchKey: 'value',
        prefixIcon: true,
        width: 230,
        clearable: true
      }
    }
  ]
}

describe('InfiniteFormSearch', () => {
  const size = 'small'
  const wrapper = shallowMount(InfiniteFormSearch, {
    propsData: {
      size
    }
  })

  it('props searchItem default is Array', () => {
    expect(wrapper.vm.searchItem).toStrictEqual([])
  })

  it('renders components to input search', async () => {
    const searchItem = getInputItem()
    await wrapper.setProps({
      searchItem
    })
    let inputDom = wrapper.find('.el-input')
    // is render input control
    expect(inputDom.classes('el-input')).toBe(true)
    // the input control type is 'small'
    expect(inputDom.classes('el-input--small')).toBe(true)

    // change the size props to 'medium'
    await wrapper.setProps({
      size: 'medium'
    })
    inputDom = wrapper.find('.el-input')
    // the input control type is 'medium'
    expect(inputDom.classes('el-input--medium')).toBe(true)
    // style attributes 
    expect(inputDom.attributes().style).toBe('width: 230px;')
    // props searchItem default is Array
    await wrapper.setProps({
      searchItem: []
    })
    expect(wrapper.vm.searchItem).toStrictEqual([])
    // test show search icon
    searchItem[0].inputBox.suffixIcon = true
    await wrapper.setProps({
      searchItem
    })
    const searchIcon = wrapper.find('.el-icon-search')
    expect(searchIcon.exists()).toBe(true)
  })

  it('test event inputChangeHandler', async () => {
    const searchItem = getInputItem()
    let inputChangeResultVal = ''
    const inputChangeHandler = jest.fn((val) => { inputChangeResultVal = val })
    searchItem[0].inputBox.inputHandler = inputChangeHandler
    await wrapper.setProps({
      searchItem
    })
    const searchInput = wrapper.find('.el-input__inner')
    searchInput.setValue('test')
    expect(inputChangeResultVal).toBe('test')
  })

  it('renders components to select search', async () => {
    const selectItem = getSelectItem()
    delete selectItem[0].inputBox.placeholder
    await wrapper.setProps({
      searchItem: selectItem
    })

    const selectDom = wrapper.findComponent(ElAutocomplete)
    expect(selectDom.exists()).toBe(true)
  })

  it('test event fetchSuggestions', async () => {
    const selectItem = getSelectItem()
    // set fetchSuggestions
    let selectCbVal = ''
    const fetchSuggestionsFn = jest.fn((params, cb) => {
      selectCbVal = params
    })
    selectItem[0].inputBox.fetchSuggestions = fetchSuggestionsFn
    await wrapper.setProps({
      searchItem: selectItem
    })
    const searchItem = wrapper.findComponent(InfiniteSearchItem)
    const cbFn = jest.fn()
    searchItem.vm.fetchSuggestions('test', cbFn)
    expect(selectCbVal).toBe('test')
  })

  it('test event searchSelectHandler', async () => {
    const selectItem = getSelectItem()
    // set fetchSuggestions
    let selectCbItem = ''
    const searchSelectHandlerFn = jest.fn((item) => {
      selectCbItem = item
    })
    selectItem[0].inputBox.searchSelectHandler = searchSelectHandlerFn
    await wrapper.setProps({
      searchItem: selectItem
    })
    const searchItem = wrapper.findComponent(InfiniteSearchItem)
    const itemData = {
      id: 1,
      name: 'test'
    }
    searchItem.vm.searchSelectHandler(itemData)
    expect(selectCbItem).toEqual(itemData)
  })
})
