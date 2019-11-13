const {expect} = require('chai')
const db = require('../index')
const ProductOrder = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('instanceMethods', () => {
    it('has quantity and oldUntiPrice', async () => {
      const po = ProductOrder.build({quantity: 69, oldUnitPrice: 69})
      await po.validate()
    })
    it('defaults quantity to 0', async () => {
      const po = ProductOrder.build({oldUnitPrice: 69})
      await po.validate()
      expect(po.quantity).to.be.equal(0)
    })
    it('defaults oldUnitPrice to null', async () => {
      const po = ProductOrder.build({quantity: 69})
      await po.validate()
      expect(po.oldUnitPrice).to.be.equal(null)
    })
  })
})
