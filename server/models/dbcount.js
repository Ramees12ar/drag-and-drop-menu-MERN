const mongoose = require('mongoose');
const CountId = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    count: {
        type:Number,
        required: true
    }
})
const CountDb = mongoose.model("dbCount",CountId);
module.exports = CountDb;