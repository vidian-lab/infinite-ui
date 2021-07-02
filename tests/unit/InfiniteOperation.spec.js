import InfiniteOperation from '@/packages/infinite-operation/src/index.vue'
import { mount } from '@vue/test-utils'

describe('InfiniteOperation.vue', () => {
  const clickHandler = jest.fn(() => true)
 
  const wrapper = mount(InfiniteOperation, {
    propsData: {
      bindData: { id: 'test' },
      tipsContent: '编辑',
      icon: 'el-icon-edit',
      callBack: clickHandler
    }
  })
  it('InfiniteOperation event clicked', async () => {
    const span = wrapper.find('span')
    await span.trigger('click')
    expect(clickHandler).toHaveBeenCalled()
    expect(clickHandler).toHaveReturnedWith(true)
  })
  
  it('InfiniteOperation pass icon is should be found', async () => {
    expect((wrapper.find('i')).exists()).toBe(true)
    await wrapper.setProps({
      icon: '',
      text: 'text'
    })
    expect(wrapper.find('span').text()).toBe('text')
    wrapper.destroy()
  })
})
