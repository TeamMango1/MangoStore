const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('ProductOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

module.exports = ProductOrder
