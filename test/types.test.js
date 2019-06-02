/* eslint-disable no-magic-numbers */
/* eslint-disable strict */
/* eslint-disable no-undef */
describe('funnyCupcake test types', () => {
  it('show info', () => {
    funnyCupcake.info('test', '', {
      timeOut: 0
    })
    const container = funnyCupcake.getContainer()
    const len = container.querySelectorAll('.funnyCupcake-info').length
    expect(len).toEqual(1)
  })
  it('show success', () => {
    funnyCupcake.success('test', '', {
      timeOut: 0
    })
    const container = funnyCupcake.getContainer()
    const len = container.querySelectorAll('.funnyCupcake-success').length
    expect(len).toEqual(1)
  })
  it('show wanning', () => {
    funnyCupcake.warning('test', '', {
      timeOut: 0
    })
    const container = funnyCupcake.getContainer()
    const len = container.querySelectorAll('.funnyCupcake-warning').length
    expect(len).toEqual(1)
  })
  it('show error', () => {
    funnyCupcake.error('test', '', {
      timeOut: 0
    })
    const container = funnyCupcake.getContainer()
    const len = container.querySelectorAll('.funnyCupcake-error').length
    expect(len).toEqual(1)
  })
})
