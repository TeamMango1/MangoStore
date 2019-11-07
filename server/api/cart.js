const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models')
module.exports = router

const CART = 'CART'

/**
 *  GET a cart by user
 */

router.get('/', async (req, res, next) => {
  const id = req.user.dataValues.id
  try {
    const carts = await Order.findAll({
      where: {userId: id, status: CART}
    })
    if (carts.length === 0) {
      res.json([])
    } else {
      const cart = carts[0]
      const products = await cart.getProducts()
      res.json(products)
    }
  } catch (error) {
    next(error)
  }
})

/**
 * add an item to cart
 */

router.post('/', async (req, res, next) => {
  try {
    const id = req.user.dataValues.id
    const cartOrder = await Order.findOrCreate({
      where: {userId: id, status: CART}
    })
    const product = await Product.findByPk(req.body.productId)
    await cartOrder.addProduct(product)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

/**
 * remove an item from the cart
 */

router.delete('/', async (req, res, next) => {
  try {
    const id = req.user.dataValues.id
    const cartOrder = await Order.findOrCreate({
      where: {userId: id, status: CART}
    })
    const product = await Product.findByPk(req.body.productId)
    if(product)
      await cartOrder.removeProduct(product)
    res.json(product)
  } catch (error) {
    next(error)
  }
})
