const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models')
const {isLoggedIn} = require('./middleware')

const CART = 'CART'

/**
 *  GET a cart by user
 */

router.get('/', isLoggedIn, async (req, res, next) => {
  const id = req.user.id
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

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id
    const productId = req.body.productId
    const cartOrders = await Order.findOrCreate({
      where: {userId, status: CART}
    })
    const cartOrder = cartOrders[0]
    await ProductOrder.findOrCreate({where: {orderId: cartOrder.id, productId}})
    const product = await Product.findByPk(productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

/**
 * remove an item from the cart
 */

router.delete('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id
    const cartOrder = await Order.findOne({
      where: {userId, status: CART}
    })
    if (!cartOrder) {
      res.sendStatus(404) // no cart to delete from
      return
    }
    const productId = req.body.productId
    await ProductOrder.destroy({
      where: {
        orderId: cartOrder.id,
        productId
      }
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
