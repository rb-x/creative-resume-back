const express = require('express')
const app = express()
const bodyLogger = require('./middlewares/BodyLogger.js')

const port = 8080

const Auth = require('./controllers/routes/Auth')

app.use('/auth', Auth)


app.get('/' , (req,res) => {
    res.status(200).send('ok')
})



app.get('*' , (req ,res) => res.status(404).send('not found !!'))

app.listen(port, () =>  console.log(`listening on port : ${port}`))




