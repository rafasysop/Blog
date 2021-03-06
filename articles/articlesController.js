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
  Article.findOne({ where: { slug }, include: [{ model: Category }]}).then(article => {
    res.render('./articles/index.ejs', { article })
  })
})

articlesController.get('/admin/articles/', (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  }).then(articles => {
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

articlesController.post('/admin/articles/delete', (req, res) => {
  const { id } = req.body
  if (!id) return res.redirect('/admin/articles/')

  Article.destroy({
    where: { id }
  }).then(() => {
    return res.redirect('/admin/articles/')
  })
})

articlesController.get('/admin/articles/edit/:id', (req, res) => {
  const { id } = req.params
  if (!id || isNaN(id)) return res.redirect('/admin/articles/')

  console.log(id);
  Category.findAll().then(categories => {
    Article.findOne({ where: { id }}).then(article => {
      res.render('admin/articles/edit.ejs', { categories, article})
    })
  })
})

articlesController.post('/admin/articles/save-edit', (req, res) => {
  const { category, title, body, id} = req.body

  if (!id || !category || !title || !body) return res.redirect('/admin/articles/')

  Article.update({
    title,
    slug: slug(title, { lower: true }),
    body,
    categoryId: category
  },{
    where: { id } 
  }).then(() => {
    return res.redirect('/admin/articles/')
  })
})

module.exports = { articlesController }