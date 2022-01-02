const express = require('express')

const articlesController = express.Router()

articlesController.get('/articles', (req, res) => {
  res.send('Rotas de articles')
})

module.exports = { articlesController }