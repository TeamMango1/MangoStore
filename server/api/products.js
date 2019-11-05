const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

/**
 * get all products (/api/projects)
 */
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})
/**
 * get single product (/api/products/:id)
 */
router.get('/:id', async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          as: 'review'
        }
      ]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

/**
 * post new product (/api/products/)
 * currently assumes that req.body is the same as the form
 */
router.post('', async (req, res, next) => {
  try {
    const product = await Product.create({where: {...req.body}})
    res.json(product)
  } catch (err) {
    next(err)
  }
})

/**
 * edit product (/api/products/)
 * currently assumes that req.body is the same as the form
 */
router.put('', async (req, res, next) => {
  try {
    const product = await Product.update(
      {...req.body},
      {returning: true, where: {id: req.body.id}}
    )
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
  } catch (err) {
    next(err)
  }
})
