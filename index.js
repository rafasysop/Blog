const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/connection')


const app = express()
app.set('view engine', 'ejs')


app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

connection.authenticate()
  .then(() => {
    console.log('Conectado com sucesso ao Blog');
  })
  .catch((err) => console.log(err))

app.get('/', (req, res) => {res.render('index')})

app.listen(8080, () => console.log('Servidor Rodando'))