const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.get('/', (resquest, response) => {
    response.render('home')
})

app.get('/soma', (resquest, response) => {
    const a = parseInt(resquest.query.a)
    const b = parseInt(resquest.query.b)
    const soma = a + b
    response.send('<h1>A soma é: ' + soma + "</h1>")
})

app.listen(3000)