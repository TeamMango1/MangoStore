const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', async(req,res,next)=>{
  try{
    let allcategory = await Category.findAll()
    res.json(allcategory).status(200)
  } catch(error){
    next(error)
  }
})
