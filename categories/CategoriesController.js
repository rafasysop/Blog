const express = require('express')

const categoriesController = express.Router()

categoriesController.get('/categories', (req, res) => {
  res.send('Rotas de categories')
})

module.exports = { categoriesController }