const express = require('express')
const { getlist, getdetail, insert, update, destroy,  } = require('../controller/users')


const router =express.Router()
router
.get('/user', getlist)
.get('/user/:id', getdetail)
.post('/user', insert)
.put('/user/:id', update)
.delete('/user/:id', destroy)

module.exports = router