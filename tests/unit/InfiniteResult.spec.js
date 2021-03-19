import { shallowMount } from '@vue/test-utils'
import InfiniteResult from '@/packages/infinite-result/src/index.vue'

describe('InfiniteButton.vue', () => {
  const title = 'title'
  const subTitle = 'subTitle'
  const slotDefault = '测试默认插槽'
  const status = 'success'

  it('title and subTitle and default-slot test', async () => {
    const wrapper = shallowMount(InfiniteResult, {
      slots: {
        default: slotDefault
      }
    })
    await wrapper.setProps({
      status,
      title,
      subTitle
    })
    const elStatusI = wrapper.find('.infinite-result-status i')
    expect(elStatusI.attributes('class')).toBe(`el-icon-${status}`)
    const elTitle = wrapper.find('.infinite-result-title')
    expect(elTitle.text()).toBe(title)
    const elSubtitle = wrapper.find('.infinite-result-subtitle')
    expect(elSubtitle.text()).toBe(subTitle)
    const elExtra = wrapper.find('.infinite-result-extra')
    expect(elExtra.text()).toBe(slotDefault)
  })

  it('icon-slot test', async () => {
    const slotIcon = '测试icon插槽'
    const wrapper = shallowMount(InfiniteResult, {
      slots: {
        icon: slotIcon
      }
    })
    console.log(wrapper.html())
    const elStatus = wrapper.find('.infinite-result-status')
    expect(elStatus.text()).toBe(slotIcon)
  })
})
