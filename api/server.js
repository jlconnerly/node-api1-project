// IMPORTS
const express = require('express')
const res = require('express/lib/response')
const Users = require('./users/model')

// EXPRESS INSTANCE
const server = express()
server.use(express.json())

// [ POST ] a User
server.post('/api/users', async (request, response) => {
    try {
        if (!request.body.name || !request.body.bio) {
            response.status(400).json({
               message: "name and bio required" 
            })
        } else {
            const newUser = await Users.insert(request.body)
            response.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something bad happend',
            error: err.message,
        })
    }
})

// [ GET ] All Users
server.get('/api/users', async (request, response) => {
    try {
        const users = await Users.find()
        response.json(users)
    } catch (error) {
        response.status(500).json({
            message: "Unable to fetch all Users",
            error: error.message
        })
    }
})

// [ GET ] a Single User
server.get('/api/users/:id', async (request, response) => {
    try {
        if (!request.params.id) {
            response.status(400).json({
                message: `No user found for id:${request.params.id}`
             })            
        } else {
            const user = await Users.findById(request.params.id)
            response.json(user)
        }
    } catch (error) {
        response.status(500).json({
            message: "Unable to fetch all Users",
            error: error.message
        })
    }    
})

// [ PUT ] Update a user
server.put('/api/users/:id', async (request, response) => {
    const { id } = request.params
    const { body } = request
    try {
        const updated = await Users.update(id, body)
        if (!updated) {
            response.status(404).json({
                message: `user by id ${id} does not exsist` 
            })
        } else {
            response.json(updated)
        }
    } catch (error) {
        response.status(500).json({
            message: 'error updating exsisting user',
            error: error.message,
        })        
    }
})

// [ DELETE ] a user
server.delete('/api/users/:id', async (request, response) => {
    const { id } = request.params
    try {
        const deletedUser = await Users.remove(id)
        if (!deletedUser) {
            response.status(404).json({
                message: `user by id ${id} does not exsist` 
            })
        } else {
            response.json(deletedUser)
        }
    } catch (error) {
        response.status(500).json({
            message: `error deleting user with id:${id}`,
            error: error.message,
        }) 
    }

})


module.exports = server 
