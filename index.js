const express = require('express')
const app = express()
// require('dotenv').config()
const bodyLogger = require('./middleware/BodyLogger')
const port = process.env.PORT || 8080
const cors = require('cors')
const Auth = require('./routes/Auth')
const cv_edit = require('./routes/CvEditing')




app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(bodyLogger)



app.use('/auth', Auth)
app.use('/curriculum', cv_edit)




app.get('/' , (req,res) => {
    res.status(200).send('ok')
})

 
 

app.listen(port, () =>  console.log(`listening on port : ${port}`))




