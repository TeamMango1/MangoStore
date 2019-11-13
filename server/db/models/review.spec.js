describe('Sequelize Model for Products', () => {

  before(() => db.sync({ force: true }))

  afterEach(() => db.sync({ force: true }))

  it('must have name, price, inventory, availability, & description fields', async () => {

    const goodReview = {
      rating: 5,
      reviewText: 'THE BEST THING EVER'
    }
    const okReview = {
      rating: 3.5,
      reviewText: 'EH...'
    }
    const badReview = {
      rating: 1,
      reviewText: 'NO COMMENT...'
    }
    review.notARealAttribute = 'does not compute'
    const GoodReview = await review.create(goodReview)
    const OKReview = await review.create(okReview)
    const BadReview = await review.create(badReview)

    expect(addedRewview.rating).to.equal(5)
    expect(addedRewview.description).to.equal('THE BEST THING EVER')

    expect(addedRewview.rating).to.equal(3.5)
    expect(addedRewview.description).to.equal('EH...')

    expect(addedRewview.rating).to.equal(1)
    expect(addedRewview.description).to.equal('NO COMMENT...')
  })
})
