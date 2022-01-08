const express = require('express')
const slug = require('slugify')
const { Article } = require('../articles/Article')
const { Category } = require('./Category')

const categoriesController = express.Router()

categoriesController.get('/admin/categories/new', (req, res) => {
  res.render('./admin/categories/new')
})

categoriesController.get('/admin/categories/', (req, res) => {
  Category.findAll().then(categories => {
    res.render('./admin/categories/index', { categories })
  }).catch(() => res.redirect('/'))
})

categoriesController.get('/cat/:slug', (req, res) => {
  const { slug } = req.params
  if(!slug) return res.redirect('/')
  Category.findOne({ where: { slug }, include: [{ model: Article }] })
  .then(category => {
      Category.findAll().then(categories => {
        if(!category) return res.redirect('/')
        res.render('cat', { category, articles: category.articles, categories })
      })
    })
    .catch(() => res.redirect('/'))
})

categoriesController.post('/admin/categories/save', (req, res) => {
  const { title } = req.body
  if (!title) return res.redirect('/admin/categories/new')

  Category.create({
    title,
    slug: slug(title, { lower: true })
  }).then(() => res.redirect('/admin/categories'))
  .catch(() => res.redirect('/admin/categories'))
})

categoriesController.post('/admin/categories/save-edit', (req, res) => {
  const { title, id } = req.body
  if (!title || !id) return res.redirect('/admin/categories')

  Category.update({
    title,
    slug: slug(title, { lower: true })
  },{
    where: { id }
  }
  ).then(() => res.redirect('/admin/categories'))
  .catch(() => res.redirect('/admin/categories'))
})

categoriesController.post('/admin/categories/delete', (req, res) => {
  const { id } = req.body
  if (!id && !isNaN(id)) return res.redirect('/admin/categories')

  Category.destroy({
    where : { id }
  }).then(() => res.redirect('/admin/categories'))
  .catch(() => res.redirect('/admin/categories'))
})

categoriesController.get('/admin/categories/edit/:id', (req, res) => {
  const { id } = req.params
  if (isNaN(Number(id))) return res.redirect('/admin/categories')
  Category.findByPk(id).then(category => {
    if (category) return res.render('./admin/categories/edit', { category })
    else return res.redirect('/admin/categories')
  })
  .catch(() => res.redirect('/admin/categories'))
})

module.exports = { categoriesController }