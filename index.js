const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
})

const url = 'https://script.google.com/macros/s/AKfycbxgwWPbOwDKAsBUUll0d8sacItxX87wKeKiLMf0dPdRiaGd24Q/exec'

app.get('/bug', (req, res) => {

    request
        .get(`${url}?InitLine=${1}&InitColumn=${1}&numberLine=${10}&numberColumn=${10}`,
            function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);

                res.send(body)
            });
})

app.post('/', (req, res) => {

    request.post(url)
        .form({
            name: req.body.name,
            email: req.body.email,
            issueType: req.body.issueType,
            howToReproduce: req.body.howToReproduce,
            expectedOutput: req.body.expectedOutput,
            receivedOutput: req.body.receivedOutput
        })

    res.send('Bug reoprtado com sucesso!')
})

app.listen(3000, (err) => {
    if (err) {
        console.log('aconteceu um erro', err)
    } else {
        console.log('bugtracker rodando na porta http://localhost:3000')
    }
})