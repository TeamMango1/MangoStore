const Sequelize = require('sequelize')
const db = require('../db')

// if you want the enum : Order.rawAttributes.status.values

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('CART', 'PAID', 'PROCESSING', 'COMPLETED', 'CANCELED')
  }
})

module.exports = Order
