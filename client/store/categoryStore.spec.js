const {expect} = require('chai')
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { createStore } from 'redux'
import store from '../../app/store'
import reducer from './index.js'
import {gotCategories,fetchCategories} from './categoryStore'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  robots: [],
}
describe('category store', () => {
  let fakeStore;
  const categories = [
    { id: 1, name: 'panda' },
    { id: 2, name: 'WALL-E'},
  ]
  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })
  describe('Redux', () => {
    describe('fetch categories', () => {
      it('gotCategories action creator', () => {
        expect(gotCategories(categories)).to.deep.equal({
          type: 'GOT_CATEGORIES',
          categories,
        })
      })
      it('fetchCategories thunk creator', async () => {
        await fakeStore.dispatch(fetchCategories())
        const actions = fakeStore.getAction()
        expect(actions[0].type).to.equal("GOT_CATEGORIES")
        expect(actions[0].categories).to.deep.equal(categories)
      })
    })
    describe('categories reducer', () => {
      let testStore
      beforeEach(() => {
        testStore = createStore(reducer)
      })
      it('reduces on GOT_CATEGORIES action', () => {
        const action = { type: 'GOT_CATEGORIES', categories }
        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()
        expect(newState.categories).to.be.deep.equal(categories);
        expect(newState.categoriess).to.not.be.equal(prevState.categories);
      })
    })
  })
})
