const { expect } = require('chai');
import enzyme, { mount } from 'enzyme'
const { db } = require('../server/db')
const { Product, Review, Order} = require('../../server/db/models')

describe('Associations', () => {
  before(() => db.sync({ force: true }))
  afterEach(() => db.sync({ force: true }))

  it('a product may belong to many orders', async () => {
    const ProductA = await Product.create({ name: 'ProductA' })
    const ProductB = await Product.create({ name: 'ProductB' })
    const ProductC = await Product.create({ name: 'ProductC' })
    const ProductD = await Product.create({ name: 'ProductD' })

    const orderNum1 =  Order.create({ orderId: 1 })
    const orderNum2 =  Order.create({ orderId: 2 })

    await orderNum1.addProducts([ProductA, ProductB, ProductC])
    await orderNum2.addProducts([ProductA, ProductB, ProductD])

    const firstOrder = await orderNum1.getProducts().map(product => product.name)
    const secondOrder = await orderNum2.getProducts().map(product => product.name)

    expect(firstOrder).to.deep.equal(["ProductA", "ProductB", "ProductC"])
    expect(secondOrder).to.deep.equal(["ProductA", "ProductB", "ProductD"])

  })

  it('a product may have many review', async () => {
    const goodReview = await Review.create({ text: 'Good!' })
    const decentReview = await Review.create({ text: 'twas ok' })
    const badReview = await Review.create({ text: '... never again' })


    const someProduct =  Review.create({ name: "Some Product" })

    await someProduct.addReview([goodReview,decentReview,badReview])

    const someProductsReview = await someProduct.getReviews().map(review => review.text)

    expect(someProductsReview).to.deep.equal(["Good!", 'twas ok', "... never again"])
  })

})

describe('Sequelize Model for Products', () => {

  before(() => db.sync({ force: true }))

  afterEach(() => db.sync({ force: true }))

  it('must have name, price, inventory, availability, & description fields', async () => {

    const product = {
      name: 'Fancy Product',
      price: 50,
      inventory: 77,
      availability:true,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    }
    product.notARealAttribute = 'does not compute'
    const savedProduct = await Product.create(product)
    expect(savedProduct.title).to.equal('Fancy Product')
    expect(savedProduct.price).to.equal(50)
    expect(savedProduct.availability).to.equal(true)
    expect(savedProduct.description).to.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
  })
})
