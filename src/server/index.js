const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('dist'))

const BASE_URL = 'https://api.meaningcloud.com/sentiment-2.1'
const API_KEY = process.env.MEANING_CLOUD_API_KEY

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //   res.sendFile(path.resolve('src/client/views/index.html'))
})
let input = [];
app.post('/add', async (req, res) => {
    input = req.body.url;
    const API_URL = `${BASE_URL}?key=${process.env.API_KEY}&lang=en&url=${input}`

    const response = await fetch(API_URL)
    const data = await response.json()
    const projectData = {
        score_tag: data.score_tag,
        agreement: data.agreement,
        subjectivity: data.subjectivity,
        confidence: data.confidence,
        irony: data.irony
    }
    res.send(projectData)

})


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
