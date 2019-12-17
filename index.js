const express = require('express')
const app = express()
const bodyLogger = require('./middlewares/BodyLogger.js')

const port = 8080

const Auth = require('./controllers/routes/Auth')

app.get('/' , (req,res) => {
    res.send("Bijour test 1")
})


app.listen(port, () =>  console.log(`listening on port : ${port}`))
