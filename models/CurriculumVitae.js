const mongoose = require('../config/Mongodb');
const Schema = mongoose.Schema

const CurriculumScheme = new Schema({
 
     title : {
        type: String,
        required: true
    },
    data : {
        type : Object
    },
    created_at : {
        type : Date , 
        resquired : true
    }
})

const CurriculumVitae = mongoose.model('CurriculumVitae', CurriculumScheme)
module.exports = CurriculumVitae  