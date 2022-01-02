const sequelize = require('sequelize')
const { Category } = require('../categories/Category')
const connection = require('../database/connection')


const Article = connection.define('articles', {
  title: {
    type: sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: sequelize.STRING,
    allowNull: false
  },
  body: {
    type: sequelize.TEXT,
    allowNull: false
  }
})

Category.hasMany(Article)
Article.belongsTo(Category)

module.exports = { Article }