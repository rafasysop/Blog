const express = require('express')
const bodyParser = require('body-parser')
const {connection} = require('./database/connection')
const { categoriesController } = require('./categories/CategoriesController')
const { articlesController } = require('./articles/articlesController')
const { Article } = require('./articles/Article')
const { Category } = require('./categories/Category')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

connection.authenticate()
  .then(() => {
    console.log('Conectado com sucesso ao Blog');
    Category.hasMany(Article)
    Article.belongsTo(Category)
  })
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  Article.findAll().then(articles => {
    Category.findAll().then(categories => {
      res.render('index', { articles, categories , category: { slug: '/' }})
    })
  })
})

app.get('/:slug', (req, res) => {
  const { slug } = req.params
  if(!slug) return res.redirect('/')

  Article.findOne({ where: { slug }, include: [{model: Category}] })
  .then(article => {
    if(!article) return res.redirect('/')
    Category.findAll().then(categories => {
      console.log(article.category);
      res.render('article', { article, categories, category: { slug: article.category.slug } })
    })
  })
  .catch(() => res.redirect('/'))
})

app.use('/', categoriesController)
app.use('/', articlesController)

app.listen(8080, () => console.log('Servidor Rodando'))