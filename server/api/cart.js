const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models')
module.exports = router

// order cart enum status

// router.use((req, res, next) => {
//   try {
//     const id = req.user.dataValues.id
//     // const id = req.session.passport.user;
//     if (!id) {
//       console.log('oof')
//       res.sendStatus(403)
//       throw new Error('User did a thing')
//     }
//     next()
//   } catch (err) {
//     next(err)
//   }
// })

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
      res.send({})
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
    const id = req.body.userId
    const cartOrder = await Order.findOrCreate({userId: id, status: CART})
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
    const id = req.body.userId
    const cartOrder = await Order.findOrCreate({userId: id, status: CART})
    const product = await Product.findByPk(req.body.productId)
    await cartOrder.removeProduct(product)
    res.json(product)
  } catch (error) {
    next(error)
  }
})
