const express = require('express')
const app = express()
const bodyLogger = require('./middlewares/BodyLogger')
const morgan = require('morgan')
const port = process.env.PORT || 8080

const Auth = require('./routes/Auth')


app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(bodyLogger)



app.use('/auth', Auth)




app.get('/' , (req,res) => {
    res.status(200).send('ok')
})

 


app.get('*' , (req ,res) => res.status(404).send('not found !!'))

app.listen(port, () =>  console.log(`listening on port : ${port}`))




