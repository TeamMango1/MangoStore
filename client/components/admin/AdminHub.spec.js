import sinon from 'sinon'
import * as rrd from 'react-router-dom'
import React from 'react'
import {mount} from 'enzyme'
import configureMockStore from "redux-mock-store";
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux'
const middlewares = [thunkMiddleware]

const mockStore = configureMockStore(middlewares)

import AdminNavbar from './AdminNavbar'

describe('Admin Navigation', () => {
  const initialState = {
    user: {
      isAdmin: true,
      id: 69
    }
  }

  let fakeStore

  beforeEach(() => {
    sinon
      .stub(rrd, 'BrowserRouter')
      .callsFake(({children}) => <div>{children}</div>)
    fakeStore = mockStore(initialState)
  })

  afterEach(() => {
    rrd.BrowserRouter.restore()
  })

  it('navbar shows correct links for an admin', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <AdminNavbar />
      </Provider>
    )

    const links = ['adminhub/products', 'adminhub/users', 'adminhub/orders']
    for (let i; i < links.length; i++) {
      expect(
        wrapper
          .find('a')
          .at(i)
          .props().href
      ).to.be.equal(links[i])
    }
  })
})
