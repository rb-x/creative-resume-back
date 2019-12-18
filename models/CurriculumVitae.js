const mongoose = require('../config/Mongodb');
const Schema = mongoose.Schema

const CurriculumScheme = new Schema({
 
    author : { type: Schema.Types.ObjectId, ref: 'User' },
     title : {
        type: String,
        required: true
    },

    data : {
        type : Object
    }
})

const CurriculumVitae = mongoose.model('CurriculumVitae', CurriculumScheme)
module.exports = CurriculumVitae  