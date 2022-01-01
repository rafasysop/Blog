const Sequelize = require('sequelize')

const connection = new Sequelize('blog', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql'
})


module.exports = connection
