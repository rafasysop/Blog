const express = require('express')
const slug = require('slugify')
const { Category } = require('../categories/Category')
const { Article } = require('./Article')


const articlesController = express.Router()

articlesController.get('/admin/articles/new', (req, res) => {
  Category.findAll().then(categories => {
    res.render('./admin/articles/new.ejs', { categories })
  })
})

articlesController.get('/articles/:slug', (req, res) => {
  const { slug } = req.params
  Article.findOne({ where: { slug } }).then(article => {
    res.render('./articles/index.ejs', { article })
  })
})

articlesController.get('/admin/articles/', (req, res) => {
  Article.findAll().then(articles => {
    res.render('./admin/articles/index.ejs', { articles })
  })
})


articlesController.post('/admin/articles/save', (req, res) => {
  const { category, title, body } = req.body

  if ( !category || !title || !body) return res.redirect('/admin/articles/')

  Article.create({
    title,
    slug: slug(title, { lower: true }),
    body,
    categoryId: category
  }).then(() => {
    return res.redirect('/admin/articles/')
  })
})

module.exports = { articlesController }