const { expect } = require('chai');
import enzyme, { mount } from 'enzyme'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

import appReducer from '../../app/redux'
import { createStore } from 'redux'

import {orders} from './orders'


const initialState = {
  orders: [],
}

describe('Redux', () => {
  let fakeStore;

  const orders = [
    { id: 1, product: 'Ripe Mango',},
    { id: 2, product: 'Spoiled Mango' },
  ]

  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  describe('set/fetch orders', () => {
    it('gotOrders action creator', () => {
      expect(setRobots(robots)).to.deep.equal({
        type: 'GET_ORDERS',
        orders,
      })
    })

    it('fetchOrders thunk creator', async () => {

      await fakeStore.dispatch(fetchOrders())
      const actions = fakeStore.getActions()
      expect(actions[0].type).to.equal('GET_ORDERS')
      expect(actions[0].orders).to.deep.equal(orders)
    })
  })

})
