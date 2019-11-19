const express = require('express')
const app = express()

app.get('/', (resquest, response) => {
    response.send({
        data: [
            { id: 1 },
            { id: 2 }
        ]
    })
})

app.get('/soma', (resquest, response) => {
    const a = parseInt(resquest.query.a)
    const b = parseInt(resquest.query.b)
    const soma = a + b
    response.send('<h1>A soma é: ' + soma + "</h1>")
})

app.listen(3000)