import InfiniteDownload from '@/packages/infinite-download/src/main.js'
describe('InfiniteDownload.vue', () => {
  // 代理createObjectURL和revokeObjectURL方法
  window.URL = {
    createObjectURL: jest.fn(
      _ => 'http://test.com'
    ),
    revokeObjectURL: jest.fn()
  }
  // 测试错误爆出
  it('test error', () => {
    function drinkOctopus () {
      InfiniteDownload('测试数据')
    }
    expect(drinkOctopus).toThrowError('You need to pass in an object')
  })

  const resouceStream = new Blob(['Hello Infinite!'])
  const resouceUrl = 'https://trust.pingan.com/ncfbupload/img/historyimg/e0f21488-4ea1-4f2d-b813-8a349d88438f.doc'

  // 测试 removeChild 方法执行内容
  it('test removeChild', (done) => {
    // 设置模拟原始'removeChild'jest函数的跟踪器
    jest.spyOn(document.body, 'removeChild')
    InfiniteDownload.url(resouceUrl)
    const expectObjectContaining = expect.objectContaining({
      src: resouceUrl
    })
    window.setTimeout(() => {
      expect(document.body.removeChild).toBeCalledWith(expectObjectContaining)
      done()
    }, 300)
  })

  // 测试直接调用download实现下载功能
  it('mode to stram ant config Object to download', () => {
    // 设置模拟原始'appendChild'jest函数的跟踪器
    jest.spyOn(document.body, 'appendChild')
    InfiniteDownload({
      resouce: resouceStream,
      name: 'infinite.txt'
    })
    const expectObjectContaining = expect.objectContaining({
      download: 'infinite.txt',
      href: 'http://test.com/'
    })
    // jest.clearAllMocks()
    expect(document.body.appendChild).toBeCalledWith(expectObjectContaining)
  })
  // 测试使用url的mode下载
  it('mode to url ant config Object to download', () => {
    jest.clearAllMocks()
    const expectObjectContaining = expect.objectContaining({
      src: resouceUrl
    })
    InfiniteDownload({
      resouce: resouceUrl,
      mode: 'url'
    })
    expect(document.body.appendChild).toBeCalledWith(expectObjectContaining)
  })

  // 测试IE下下载传入的参数
  it('test IE download ', () => {
    window.navigator.msSaveOrOpenBlob = jest.fn()
    navigator.msSaveBlob = jest.fn()
    InfiniteDownload.stream(resouceStream, 'infinite.txt')
    expect(navigator.msSaveBlob.mock.calls[0].length).toBe(2)
  })
})
