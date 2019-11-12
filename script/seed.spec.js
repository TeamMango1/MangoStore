'use strict'
/* global describe it */

const { expect } = require('chai');
const { db } = require('../server/db')
const seed = require('./seed')
const { Product, User, Category, Review, } = require('../../server/db/models')

const seed = require('./seed')

describe('seed script', () => {
  it('completes successfully', seed)
})
