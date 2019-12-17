const auth = require('express').Router()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");




//TODO

const httpSchemaValidation = () => {
    return 
} 


auth.post('/register', async (req, res) => res.send('registred !'))
auth.post('/login', async (req, res) => res.send('registred !'))




