const Sequelize = require('sequelize')
const {connection} = require('../database/connection')
const { Category } = require('../categories/Category')


const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = { Article }