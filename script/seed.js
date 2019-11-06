'use strict'

const db = require('../server/db')
const faker = require('faker')
const {
  User,
  Product,
  Review,
  Category,
  Order,
  ProductCategory,
  ProductOrder
} = require('../server/db/models')

const SEED = 42069

const ORDER_COUNT = 40
const USER_COUNT = 100
const PRODUCT_COUNT = 100
const REVIEW_COUNT = 100
const CATEGORY_COUNT = 10

faker.seed(SEED)

const createUser = async () => {
  try {
    let currentUser = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      isAdmin: faker.random.boolean()
    })
    return currentUser
  } catch (error) {
    console.log(error)
  }
}
const createProduct = async () => {
  try {
    let currentProduct = await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      photoURL: faker.random.image(),
      price: faker.commerce.price(),
      inventory: faker.random.number()
    })
    return currentProduct
  } catch (error) {
    console.log(error)
  }
}
const createReview = async () => {
  try {
    let currentReview = await Review.create({
      reviewText: faker.lorem.paragraph(),
      rating: Math.ceil(Math.random() * 5)
    })
    return currentReview
  } catch (error) {
    console.log(error)
  }
}
const createCategory = async () => {
  try {
    let currentCategory = await Category.create({
      name: faker.lorem.word()
    })
    return currentCategory
  } catch (error) {
    console.log(error)
  }
}
const createOrder = async () => {
  try {
    let currentOrder = await Order.create({
      status: Order.rawAttributes.status.values[Math.floor(Math.random() * 4)]
    })
    return currentOrder
  } catch (error) {
    console.log(error)
  }
}
const createProductCategory = async num => {
  try {
    await ProductCategory.create({
      productId: num,
      categoryId: Math.ceil(Math.random() * (CATEGORY_COUNT - 1))
    })
  } catch (error) {
    console.log(error)
  }
}
const createProductOrder = async num => {
  try {
    await ProductOrder.create({
      orderId: Math.ceil(Math.random() * (ORDER_COUNT - 1)),
      productId: num
    })
  } catch (error) {
    console.log(error)
  }
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let i = 1; i < CATEGORY_COUNT; i++) {
    await createCategory()
  }

  for (let i = 0; i < REVIEW_COUNT; i++) {
    await createReview()
  }

  for (let i = 1; i < USER_COUNT; i++) {
    let currentUser = await createUser()
    const currentReview = await Review.findByPk(i)
    currentUser.addReview(currentReview)
  }

  for (let i = 0; i < ORDER_COUNT; i++) {
    const currentOrder = createOrder()
    const randUser = await User.findByPk(
      Math.ceil(Math.random() * (USER_COUNT - 1))
    )
    randUser.addOrder(currentOrder)
  }

  for (let i = 0; i < PRODUCT_COUNT; i++) {
    let currentProduct = await createProduct()
    await createProductOrder(i)
    const currentReview = await Review.findByPk(i)
    currentProduct.addReview(currentReview)
    await createProductCategory(i)
  }

  await User.create({
    email: 'default@gmail.com',
    password: 'password',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    isAdmin: false
  })

  await User.create({
    email: 'admin@gmail.com',
    password: 'password',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    isAdmin: true
  })

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
