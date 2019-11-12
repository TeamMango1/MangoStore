const router = require('express').Router()
const {Order, Product, User, ProductOrder} = require('../db/models')
const {isLoggedIn, isAdmin} = require('./middleware')


//GET all orders for a singleUser
router.get(`/singleUser`, isLoggedIn, async (req,res,next)=>{

  try{
    let orders = await Order.findAll({
      where:{
        userId: req.user.id
      },
      include:[
        {
          model: Product
        }
      ]
    })

    res.json(orders)
  }catch(error){
    next(error)
  }
})

//GET (api/orders/:id) Details on single order based on order ID

router.get(`/:id`, isLoggedIn, async (req,res,next)=>{
  try{
    let singleOrder = await Order.findOne({
      where:{
        id: req.params.id
      },
      include:[
        {model:Product},
        {
          model: User,
          attributes: ['email', 'firstName', 'lastName']
        }
      ]
    })
    res.json(singleOrder)
  } catch(error){
    next(error)
  }
})

const paginate = page => {
  const offset = (page - 1) * 20
  const limit = 21

  return {
    offset,
    limit
  }
}

router.get('/', async (req, res, next) => {
  try {
    // let query = {
    //   include: [
    //     {
    //       model: Product,
    //       attributes: ['name']
    //     },
    //     {
    //       model: User,
    //       attributes: ['email', 'firstName', 'lastName']
    //     },

    //   ],
    //   order: [['id', 'ASC']]

    // }
    // if (Object.keys(req.query).length !== 0)
    //   query.where = {status: req.query.status}
    // const Orders = await Order.findAll(query)
    console.log(req.query.pageNum)
    const orders = await Order.findAll({
      include:[
        {model: Product, attributes:['name']},
        {model: User, attributes:['email', 'firstName', 'lastName']}
      ],
      ...paginate(req.query.pageNum),
      order:[['id','ASC']]

    })
    res.json(orders)
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
