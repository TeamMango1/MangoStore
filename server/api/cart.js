const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models')
const {isLoggedIn} = require('./middleware')

const CART = 'CART'

/**
 *  GET a cart by user
 */

router.get('/', async (req, res, next) => {
  const sessionCart = req.session.cart
  try {
    if (!req.user) {
      res.json(sessionCart)
    } else {
      // const carts = await Order.findAll({
      //   where: {userId: id, status: CART}
      // })
      // if (carts.length === 0) {
      //   res.json([])
      // } else {
      //   const cart = carts[0]
      //   const products = await cart.getProducts()
      //   res.json(products)
      // }

      const id = req.user.id

      const cartOrders = await Order.findOrCreate({
        where: {userId: id, status: CART}
      })
      const cartOrder = cartOrders[0]
      sessionCart.forEach(async product => {
        await ProductOrder.findOrCreate({
          where: {orderId: cartOrder.id, productId: product.id}
        })
      })
      const products = await cartOrder.getProducts()
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
    const productId = req.body.productId
    if (!req.user) {
      const product = await Product.findByPk(productId)
      req.session.cart.push(product)
      res.json(product)
    } else {
      const userId = req.user.id
      const cartOrders = await Order.findOrCreate({
        where: {userId, status: CART}
      })
      const cartOrder = cartOrders[0]
      await ProductOrder.findOrCreate({
        where: {orderId: cartOrder.id, productId}
      })
      const product = await Product.findByPk(productId)
      res.json(product)
    }
  } catch (error) {
    next(error)
  }
})

/**
 * remove an item from the cart
 */

router.delete('/', async (req, res, next) => {
  try {
    const productId = req.body.productId
    if (!req.user) {
      const newCart = req.session.cart.filter(item => {
        return item.id !== productId
      })
      req.session.cart = newCart
      res.sendStatus(200)
    } else {
      const userId = req.user.id
      const cartOrder = await Order.findOne({
        where: {userId, status: CART}
      })
      if (!cartOrder) {
        res.sendStatus(404) // no cart to delete from
        return
      }
      await ProductOrder.destroy({
        where: {
          orderId: cartOrder.id,
          productId
        }
      })
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
