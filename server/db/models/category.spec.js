const {expect} = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('instanceMethods', () => {
    it('requires name', async () => {
      const category = Category.build()
      try {
        await category.validate()
        throw Error('validation should have failed without title')
      }
      catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    describe('Name', () => {
      let panda;
      before(async () =>{
        panda = await Category.create({name:"thicc"})
      })
      it('returns true if the name is correct', () => {
        expect(panda.name('thicc')).to.be.equal(true)
      })
      it('returns false if the name is incorrect', () => {
        expect(panda.name('fat')).to.be.equal(false)
      })
    })
  })
})
