const router = require('express').Router()
const {Order, Product, User, ProductOrder} = require('../db/models')
const {isLoggedIn, isAdmin} = require('./middleware')

const statuses = {
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  CART: 'CART'
}

router.get('/', async (req, res, next) => {
  try {
    const Orders = await Order.findAll({
      include: [
        {
          model: Product,
          attributes: ['name']
        },
        {
          model: User,
          attributes: ['email', 'firstName', 'lastName']
        }
      ]
    })
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
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
