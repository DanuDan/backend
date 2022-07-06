const express = require('express')

const router = require('./src/routes')

const app = express()

const PORT = 5000

app.use(express.json())

app.get('/', function(req,res){
    res.send("halaman utama")
})

app.use('/api/v1/', router)

app.listen(PORT, function()
{console.log(`Server running on port ${PORT}`)})

