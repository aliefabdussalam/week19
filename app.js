const express = require("express")
const parser = require('body-parser')
const db = require('./source/config/db')
const bodyParser = require("body-parser")
const router = require('./source/router/users.router')


const app = express()
app.use(bodyParser.json())
app.use(router)
app.listen(8800,() =>{
    console.log('connect to 8800')
})