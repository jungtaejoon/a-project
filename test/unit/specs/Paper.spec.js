import {mount} from '@vue/test-utils'
import Paper from '@/components/Paper'

describe('Paper.vue', () => {
  const renderer = require('vue-server-renderer').createRenderer()
  const expected = [0]
  it('초기 세팅이 성공해야 한다', () => {
    const wrap = mount(Paper)
    expect(wrap.vm.paragraphHistories).toEqual(expect.arrayContaining(expected))
    expect(wrap.vm.nextParagraphHistoryId).toEqual(1)
    renderer.renderToString(wrap.vm, (err, str) => {
      expect(str).toMatchSnapshot()
    })
  })
})
