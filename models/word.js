const mongoose = require('mongoose');

//in case we need something to be unique 
// const uniqueValidator = require('mongoose-unique-validator');

var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

/**
 * 
 */
let wordSchema = new Schema({
    keyword: {//main keyword 
       type: String,
       required: true,
       default: "", 
    },
    contributions: {
        type: String, //Contribution String to keyword
        required: false,
        default: "", 
    }
});

var word = mongoose.model('word', wordSchema);
module.exports = word;
