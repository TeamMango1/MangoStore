'use strict'
/* global describe it */

const { expect } = require('chai');
const { db } = require('../server/db')
const seed = require('./seed')
const { Product, User, Category, Review, ProductOrder, Order, index} = require('../../server/db/models')

const seed = require('./seed')




describe('Seed File', () => {
  let robots, projects

  beforeEach(async () => {
    await seed()
    robots = await Robot.findAll({ include: [Project] })
    projects = await Project.findAll({ include: [Robot] })
  })

  it('creates at least one product that has no projects', () => {

    const robotsWithNoProjects = robots
      .filter(robot => !robot.projects.length)
      .map(robot => robot.name)
    expect(robotsWithNoProjects).to.have.lengthOf.above(0)
  })

  it('creates at least one project that has no robots', () => {
    const projectsWithNoRobots = projects
      .filter(project => !project.robots.length)
      .map(project => project.title)
    expect(projectsWithNoRobots).to.have.lengthOf.above(0)
  })


})
