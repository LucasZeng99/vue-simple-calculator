const express = require('express')
const fs = require('fs')

const app = express()
app.use('/', express.static('dist'))

const content = fs.readFileSync("index.html")

app.get('/', (req,res) => {
    res.send(content)
})

app.listen(3000, () => {
    console.log('hello world. server running on port 3000')
})