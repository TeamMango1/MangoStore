const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories',require('./category'))
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  console.log("ERROR\n\n")
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
