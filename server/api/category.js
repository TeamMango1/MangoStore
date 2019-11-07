const router = require('express').Router()
const {Category} = require('../db/models')
const {isAdmin} = require('./middleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allcategory = await Category.findAll()
    res.json(allcategory).status(200)
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newcategory = await Category.create(req.body)
    res.json(newcategory).status(201)
  } catch (err) {
    next(err)
  }
})
