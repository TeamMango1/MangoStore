'use strict'

const db = require('../server/db')
const faker = require('faker')
const {User, Product, Review, Category, Order} = require('../server/db/models')

faker.seed(69)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const createUser = async () => {
    try {
      await User.create({
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        isAdmin: faker.random.boolean()
      })
    } catch (error) {
      console.log(error)
    }
  }
  const createProduct = async () => {
    try {
      await Product.create({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        photoURL: faker.image.fashion(),
        price: faker.commerce.price(),
        inventory: faker.random.number()
      })
    } catch (error) {
      console.log(error)
    }
  }
  const createReview = async () => {
    try {
      await Review.create({
        reviewText: faker.lorem.paragraph(),
        rating: Math.ceil(Math.random() * 5)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const createCategory = async () => {
    try {
      await Category.create({
        name: faker.lorem.word()
      })
    } catch (error) {
      console.log(error)
    }
  }
  for (let i = 0; i < 100; i++) {
    await createUser()
    await createProduct()
    await createReview()
    if (i < 10) {
      await createCategory()
    }
  }

  // console.log(`seeded ${users.length} users`)
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
