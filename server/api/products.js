const router = require('express').Router()
const {Product, Category, Review} = require('../db/models')
const {isAdmin} = require('./middleware')
module.exports = router

/**
 * get all products (/api/projects)
 */
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{model: Category}]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

/**
 * get single product (/api/products/:id)
 */
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          as: 'review'
        },
        {
          model: Category,
          as: 'categories'
        }
      ]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

/**
 * POST new review on a product
 */

router.post(`/:id`, async (req, res, next) => {
  try {
    const newReview = await Review.create({
      reviewText: req.body.review.reviewText,
      rating: req.body.review.rating,
      userId: req.body.userId,
      productId: req.params.id
    })
    res.json(newReview)
  } catch (error) {
    next(error)
  }
})

/**
 * edit product (/api/products/)
 * currently assumes that req.body is the same as the form
 */

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.update(
      {...req.body},
      {returning: true, where: {id: req.body.id}}
    )
    res.json(product).status(204)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
