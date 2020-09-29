const express = require('express');
require('dotenv').config()
const axios = require('axios')
const {
    report
} = require('process')
const bodyParser = require('body-parser')
const path = require('path')

const OPEN_KEY = ""
const app = express()
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index', {
        data: null
    })
})

app.post('/', (req, res, next) => {
    const cityName = req.body.city
    console.log(req.body)
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OPEN_KEY}&units=metric`)
        .then(response => {
            console.log(response.data)
            res.render('index', {
                data: response.data
            })
        })
        .catch(e => {
            console.log(e)
        })
})
app.listen(4000, () => {
    console.log("app started")
})