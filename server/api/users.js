const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('./middleware')
module.exports = router

/**
 *  GET all users (api/users)
 */
router.get('/', isAdmin, async (req, res, next) => {
  try {
    let allUsers = await User.findAll()
    res.json(allUsers).status(200)
  } catch (error) {
    next(error)
  }
})

/**
 *  GET single user (api/users/:id)
 */

router.get('/:userId', async (req, res, next) => {
  try {
    console.log(req.session)
    let user = await User.findByPk(req.params.userId)
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

router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {id: req.body.userId}
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

/**
 *  PATCH promote single user (api/users/:id)
 */

router.patch('/:userId', isAdmin, async (req, res, next) => {
  try {
    await User.update(
      {
        isAdmin: true
      },
      {where: {id: req.body.userId}}
    )
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

/**
 *  PATCH trigger password reset single user (api/users/triggerpasswordreset/:id)
 */

router.patch(
  '/triggerpasswordreset/:userId',
  isAdmin,
  async (req, res, next) => {
    try {
      await User.update(
        {
          passwordReset: true
        },
        {where: {id: req.body.userId}}
      )
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
)

/**
 *  PATCH reset password single user (api/users/passwordreset/:id)
 */

router.patch('/passwordreset/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.userId)

    await user.update({
      password: req.body.password,
      passwordReset: false
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
