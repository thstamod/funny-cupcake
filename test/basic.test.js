/* eslint-disable no-magic-numbers */
/* eslint-disable strict */
/* eslint-disable no-undef */
describe('funnyCupcake test', () => {
  it('show info', () => {
    const fcArray = []
    fcArray[0] = funnyCupcake.info('test', '', {
      timeOut: 20000
    })
    fcArray[1] = funnyCupcake.info('test2', '', {
      timeOut: 20000
    })
    fcArray[2] = funnyCupcake.info('test3', '', {
      timeOut: 20000
    })
    setTimeout(() => {
      funnyCupcake.removefunnyCupcake(fcArray[1])
      const container = funnyCupcake.getContainer()[0]
      const len = container.querySelectorAll('.funnyCupcake').length
      expect(len).toBe(2)
    }, 5000)
  })
})
