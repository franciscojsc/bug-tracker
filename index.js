const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')
const { promisify } = require('util')

require('dotenv').config();

const url = process.env.PLANILHA_GOOGLE

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/bug', async (req, res) => {
    let page = req.query.page || 1
    if (req.query.page <= 0) {
        page = 1
    }
    const numberLine = 50
    const InitLine = (1 + (parseInt(numberLine) * page)) - 50

    console.log('pg', page)
    console.log('qtd de linhas', numberLine)
    console.log('linha inicial', InitLine)

    try {
        const { body } = await promisify(request.get)(`${url}?InitLine=${InitLine}&InitColumn=${1}&numberLine=${numberLine}&numberColumn=${10}`)
        res.render('bugs', {
            bugs: JSON.parse(body),
            page: { "pageAtual": page }
        })
    } catch (err) {
        res.send('Erro ao tentar recuperar os dados dos bugs')
        console.log(err)
    }
})

app.post('/', async (req, res) => {
    try {
        await promisify(request.post)(url, {
            form: {
                name: req.body.name,
                email: req.body.email,
                issueType: req.body.issueType,
                howToReproduce: req.body.howToReproduce,
                expectedOutput: req.body.expectedOutput,
                receivedOutput: req.body.receivedOutput,
                userAgent: req.body.userAgent,
                userDate: req.body.userDate,
                source: req.query.source || 'direct'
            }
        })
        res.render('sucesso')
    } catch (err) {
        res.send('Erro ao enviar formulário')
        console.log(err)
    }
})

app.listen(3000, (err) => {
    if (err) {
        console.log('aconteceu um erro', err)
    } else {
        console.log('bugtracker rodando na porta http://localhost:3000')
    }
})