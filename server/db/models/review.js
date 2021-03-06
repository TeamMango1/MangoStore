const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
