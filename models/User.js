const mongoose = require('../config/Mongodb');
const Schema = mongoose.Schema

const UserScheme = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    education : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at : {
        type : Date,
        required : true
    },

})

const User = mongoose.model('User', UserScheme)
module.exports = User   