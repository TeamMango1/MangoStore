const db = require('../db')
const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Category = require('./category')
const Order = require('./order')

// Order.belongsTo(User)
User.hasOne(Order)
Order.belongsToMany(Product, {through: 'ProductOrder'})
Product.belongsToMany(Order, {through: 'ProductOrder'})
Product.belongsToMany(Category, {through: 'ProductCategory'})
Category.belongsToMany(Product, {through: 'ProductCategory'})
User.hasMany(Review, {as: 'review'})
Review.belongsTo(User, {as: 'user'})
Product.hasMany(Review, {as: 'review'})
Review.belongsTo(Product, {as: 'product'})

const ProductOrder = db.model('ProductOrder')
const ProductCategory = db.model('ProductCategory')

module.exports = {
  User,
  Product,
  Review,
  Category,
  Order,
  ProductOrder,
  ProductCategory
}
