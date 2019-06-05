/* eslint-disable no-magic-numbers */
/* eslint-disable strict */
/* eslint-disable no-undef */

describe('funnyCupcake removeAll nodifications', () => {
  afterAll(() => {
    if (document.querySelector('#funnyCupcake-container')) {
      document.querySelector('#funnyCupcake-container').remove()
    }
  })
  it('remove all nodifications', () => {
    funnyCupcake.info('test', '', {
      timeOut: 0
    })
    funnyCupcake.removeAll()

    setTimeout(() => {
      const container = funnyCupcake.getContainer()
      const len = container.querySelectorAll('.funnyCupcake').length
      expect(len).toEqual(0)
    }, 1000)
  })
})
