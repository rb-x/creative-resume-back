const express = require('express')
const auth = express.Router() 
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const User = require("../models/User")



//TODO

const httpSchemaValidation = (input , type) => {
    let schema;
    if(type === "login") {
  
        schema = {
                email : Joi.string().min(5).required(),
                password : Joi.string().min(5).required(),
                }
        }
    else if (type === "register") {
     
            schema = {
                email : Joi.string().min(5).required(),
                password : Joi.string().min(5).required(),
                firstName : Joi.string().min(3).required(),
                lastName : Joi.string().min(1).required(),
                education : Joi.string().required()
            }
        }
 
        return Joi.validate(input, schema)
} 

auth.post('/register', async (req, res) =>{
    const {email , password, firstName, lastName, education} = req.body
    const {error} = httpSchemaValidation(req.body , "register") 
    if (error) return res.status(400).send(error.details[0].message)
    
    const today = new Date()

    const userData = {
        email : email,
        password : password,
        firstName : firstName,
        lastName : lastName,
        education : education,
        created_at : today
    }

    // Verification si l'utilisateur existe deja ?

    try {
        const userIsFound = await User.findOne({email : userData.email})
        if (userIsFound) return res.status(409).json({err : "Mail alerady registred !"})
    }catch(err)
    {
        return res.status(500).json({err})
    }

    // Cryptage du password

    const hashedpassword = await bcrypt.hash(password , 10)
    userData.password = hashedpassword

    // Enregistrement de l'utilisateur
    try{
        await User.create(userData)
        return res.status(201).json({msg : "User successfully created !"})
    }catch(err){
        return res.status(500).json({err})
    }

})

auth.post('/login', async (req, res) =>{

    const {email , password} = req.body
    const {error} = httpSchemaValidation(req.body,"login") 
    if (error) return res.status(400).send(error.details[0].message)
   
    // Verification exist ?
    const userFound = await User.findOne({
        email
    })
    if (!userFound) return res.status(401).json({err : "User or password incorrect"})

    // verification du mot de passe
    const passwordMatch = bcrypt.compareSync(password, userFound.password)

    // creation de token JWT

    let payload = {
        id : userFound._id , 
        email : userFound.email,
        firstName: userFound.firstName,
        lastname: userFound.lastName,
        education: userFound.education
    }
    let token = jwt.sign(payload, process.env.SECRET_KEY , {
        expiresIn: 7200
        //2hours
    })

    if(passwordMatch) {

    return res.status(200).json({token , user : {
        id : userFound._id , 
        email : userFound.email , 
        created : userFound.created_at
    }})
    }else {
        return res.status(401).json({err : "User or password incorrect"})
    }
})


module.exports = auth

