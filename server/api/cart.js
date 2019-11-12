const router = require('express').Router()
const {Order, Product, ProductOrder, User} = require('../db/models')
const {isLoggedIn} = require('./middleware')

const CART = 'CART'
const PAID = 'PAID'

/**
 *  GET a cart by user
 */

router.get('/', async (req, res, next) => {
  const sessionCart = req.session.cart
  try {
    if (!req.user) {
      const compiledCart = []
      for (let i = 0; i < sessionCart.length; i++) {
        console.log(i)
        let index = -1
        for (let j = 0; j < compiledCart.length; i++) {
          if (compiledCart[j].id === sessionCart[i].id) {
            index = j
            break
          }
        }
        if (index === -1) {
          const temp = sessionCart[i]
          temp.ProductOrder = {}
          temp.ProductOrder.quantity = 1
          compiledCart.push(temp)
        } else {
          compiledCart[index].ProductOrder.quantity++
        }
      }
      res.json(compiledCart)
    } else {
      const id = req.user.id

      const cartOrders = await Order.findOrCreate({
        where: {userId: id, status: CART}
      })
      const cartOrder = cartOrders[0]
      sessionCart.forEach(async product => {
        const pos = await ProductOrder.findOrCreate({
          where: {orderId: cartOrder.id, productId: product.id}
        })
        const po = pos[0]
        po.quantity++
        await po.save()
      })
      req.session.cart = []
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
    let {productId, quantity} = req.body
    quantity = 1
    if (!req.user) {
      const product = await Product.findByPk(productId)
      for (let i = 0; i < quantity; i++) {
        req.session.cart.push(product)
      }
      res.json(product)
    } else {
      const userId = req.user.id
      const cartOrders = await Order.findOrCreate({
        where: {userId, status: CART}
      })
      const cartOrder = cartOrders[0]
      const pos = await ProductOrder.findOrCreate({
        where: {orderId: cartOrder.id, productId}
      })
      const po = pos[0]
      po.quantity += quantity
      await po.save()
      const product = await Product.findByPk(productId)
      res.json(product)
    }
  } catch (error) {
    next(error)
  }
})

/**
 * checkout cart (change status to paid)
 */
router.put('/', async (req, res, next) => {
  try {
    const sessionCart = req.session.cart,
      {email, address} = req.body
    if (!req.user) {
      console.log('creating user:\t', req.body, '\n\n\n')
      const user = await User.create({email}) // attach the user to the seession?
      const order = await Order.create({status: PAID, email, address})
      user.addOrder(order)
      for (const product of sessionCart) {
        await ProductOrder.create({
          orderId: order.id,
          productId: product.id,
          quantity: 1,
          oldUnitPrice: product.price
        })
      }
      req.session.cart = []
    } else {
      const userId = req.user.id
      const cart = await Order.findOne({
        where: {userId, status: CART},
        include: [{model: Product}]
      })

      const products = await cart.getProducts()
      for (let product of products) {
        const po = await ProductOrder.findOne({
          where: {
            orderId: cart.id,
            productId: product.id
          }
        })
        product.inventory -= po.quantity
        product.save()
        await po.update({oldUnitPrice: product.price})
      }
      await cart.update({status: PAID, address})
    }
    res.sendStatus(200)
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
