const express = require('express')
const app = express()
require('dotenv').config()
const bodyLogger = require('./middlewares/BodyLogger')
const authroute = require('./middlewares/authmiddleware')
const morgan = require('morgan')
const port = 8080

const Auth = require('./controller/Auth')


app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(bodyLogger)




app.use('/auth', Auth)


app.get('/' , (req,res) => {
    res.status(200).send('ok')
})

app.get('/admin', authroute ,(req,res) => {
  res.send(' espace privé !')
})


app.get('*' , (req ,res) => res.status(404).send('not found !!'))

app.listen(port, () =>  console.log(`listening on port : ${port}`))




