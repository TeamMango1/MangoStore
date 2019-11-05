const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userLoggedIn: {
    type: Sequelize.BOOLEAN
  },
  status: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 4
    }
  }
})

module.exports = Order
