// IMPORTS
const express = require('express')
const user = require('./users/model')

// EXPRESS INSTANCE
const server = express()
server.use(express.json())

module.exports = server 
