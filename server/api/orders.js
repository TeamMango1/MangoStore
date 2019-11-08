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
    let query = {
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
    }
    if (Object.keys(req.query).length !== 0)
      query.where = {status: req.query.status}
    const Orders = await Order.findAll(query)
    res.json(Orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const result = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Product
        },
        {
          model: User,
          attributes: ['email', 'firstName', 'lastName']
        }
      ]
    })
    res.json(result)
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
    console.log(order)
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

router.delete('/products',isAdmin,async(req,res,next)=>{
  try {
    const orderId = req.body.orderId
    const productId = req.body.productId

    await ProductOrder.destroy({where: {orderId,productId}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
