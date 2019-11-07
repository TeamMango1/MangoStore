const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models')
const {isLoggedIn, isAdmin} = require('./middleware')

const statuses = {
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  CART: 'CART'
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const Orders = await Order.findAll()
    res.json(Orders)
  } catch (err) {
    next(err)
  }
})

router.put('/', isAdmin, async (req, res, next) => {
  try {
    const status = req.body.status,
      id = req.body.orderId
    const order = await Order.update(
      {
        status
      },
      {
        where: {id}
      }
    )
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/', isAdmin, async (req, res, next) => {
  try {
    const id = req.body.orderId
    await Order.destroy({where: {id}})
  } catch (err) {
    next(err)
  }
})
