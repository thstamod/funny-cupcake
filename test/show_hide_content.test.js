/* eslint-disable no-magic-numbers */
/* eslint-disable strict */
/* eslint-disable no-undef */
describe('funnyCupcake show hide content', () => {
  afterEach(() => {
    if (document.querySelector('#funnyCupcake-container')) {
      document.querySelector('#funnyCupcake-container').remove()
    }
  })
  it('show title', () => {
    funnyCupcake.info('', 'test', {
      timeOut: 0
    })
    const container = funnyCupcake.getContainer()
    const len = container.querySelector(
      '.funnyCupcake-info .funnyCupcake-title'
    ).innerHTML
    expect(len).toEqual('test')
  })
  it('show message', () => {
    funnyCupcake.info('test', '', {
      timeOut: 0
    })
    const container = funnyCupcake.getContainer()
    const len = container.querySelector(
      '.funnyCupcake-info .funnyCupcake-message'
    ).innerHTML
    expect(len).toEqual('test')
  })
  it('hide title', () => {
    funnyCupcake.info('test', '', {
      timeOut: 0
    })
    const container = funnyCupcake.getContainer()
    const len = container.querySelector(
      '.funnyCupcake-info .funnyCupcake-title'
    )
    expect(len).toEqual(null)
  })
  it('hide message', () => {
    funnyCupcake.info('', '', {
      timeOut: 0
    })
    const container = funnyCupcake.getContainer()
    const len = container.querySelector(
      '.funnyCupcake-info .funnyCupcake-message'
    )
    expect(len).toEqual(null)
  })
  it('hide close button', () => {
    funnyCupcake.info('test', 'test', {
      timeOut: 0,
      hasCloseButton: false
    })
    const container = funnyCupcake.getContainer()
    const len = container.querySelector(
      '.funnyCupcake-info .funnyCupcake-close-button'
    )
    expect(len).toEqual(null)
  })
})
