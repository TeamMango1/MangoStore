const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


/**
 *  GET all users (api/users)
 */

router.get('/', async(req,res,next)=>{
  try{
    let allUsers = await User.findAll()
    res.json(allUsers).status(200)
  } catch(error){
    next(error)
  }
})

/**
 *  GET single user (api/users/:id)
 */

router.get('/:userId', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {id: req.params.userId}
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})


/**
 *  PUT single user (api/users/:id)
 */

router.put('/:userId', async (req, res, next) => {
  try {
    let oldUser = await User.findById(req.params.userId)
    await oldUser.update({
      email: req.body.email,
      password: req.body.password,
      googleId: req.body.googleId
    })
  } catch (error) {
    next(error)
  }
})

/**
 *  DELETE single user (api/users/:id)
 */

router.delete('/', async (req, res, next) => {
  try {
    await User.destroy({
      where: {id: req.body.id}
    })
  } catch (error) {
    next(error)
  }
})
