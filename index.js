const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (resquest, response) => {
    response.render('home')
})

app.post('/', (resquest, response) => {
    response.send(resquest.body)
})

app.listen(3000)