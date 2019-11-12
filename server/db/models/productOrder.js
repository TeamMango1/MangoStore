const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('ProductOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  oldUnitPrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = ProductOrder
