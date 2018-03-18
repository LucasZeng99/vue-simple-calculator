const express = require('express')
const fs = require('fs')

const app = express()
app.use('/', express.static('dist'))

const content = fs.readFileSync("index.html")

app.get('/', (req,res) => {
    res.send(content)
})

var port = process.env.PORT || 80

app.listen(port, () => {
    console.log('hello world. server running on port '+port)
})