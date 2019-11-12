const router = require('express').Router()
const {Product, Category, Review, ProductCategory} = require('../db/models')
const {isAdmin} = require('./middleware')
module.exports = router

const paginate = page => {
  const offset = (page - 1) * 20
  const limit = 21

  return {
    offset,
    limit
  }
}

/**
 * get all products (/api/projects)
 */
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{model: Category}],
      ...paginate(req.query.pageNumber),
      order: [['id', 'ASC']]
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
router.post('/:id/productcategory', isAdmin, async (req, res, next) => {
  try {
    const productcategory = await ProductCategory.create({
      productId: req.body.productId,
      categoryId: req.body.categoryId
    })
    res.json(productcategory).status(204)
  } catch (err) {
    next(err)
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

// removing assocation between category and product in edit view
router.put('/:id/productcategory', isAdmin, async (req, res, next) => {
  try {
    await ProductCategory.destroy({
      where: {productId: req.body.productId, categoryId: req.body.categoryId}
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
