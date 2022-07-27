'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reperSchema = Schema({
    title :String,
    author : String,
    start : {type: Date, default: Date.now},
    end : {type:Date, default:null},
    link : String
});

module.exports = mongoose.model('reper',reperSchema);