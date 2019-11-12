const toTitle = require('./toTitle')
const {expect} = require('chai')

describe('toTitle', () => {
  it('turns all cap constants into titlecase', () => {
    expect(toTitle("OOF")).to.equal('Oof')
  })
})
