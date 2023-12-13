// Project Name ==>  Onlychat
// Owner ===> Mohammad Mehdi Kamari
// For ===> cuniversity
// course Name ===> Softwer engineering lab
// Teacher ===> Bahador Pirani
const express = require('express')
const path = require('path')
// const moment = require('moment')
const app = express()
const port = process.env.port || 4000
const server = app.listen(port, () => {
    console.log(`Chat server running on ${port}`)
})
const io = require('socket.io')(server)
app.use(express.static(path.join(__dirname, 'public')))

let socketsConnected = new Set()
io.on('connection', onConnected)

function onConnected(socket) {
    console.log(socket.id)

    socketsConnected.add(socket.id)

    socket.emit('clients-total', socketsConnected.size)

    socket.on('disconnected', () => {
        console.log('Socket disconnected', socket.id)
        socketsConnected.delete(socket.id)

        socket.emit('clients-total', socketsConnected.size)
    })
    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('chat-message', data)
    })
}