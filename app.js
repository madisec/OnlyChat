// Project Name ==>  Onlychat
// Owner ===> Mohammad Mehdi Kamari
// For ===> cuniversity
// course Name ===> Softwer engineering lab
// Teacher ===> Bahador Pirani
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.port || 4000
const server = app.listen(port, () => {
    console.log(`Chat server running on ${port}`)
})
app.use(express.static(path.join(__dirname, 'public')))